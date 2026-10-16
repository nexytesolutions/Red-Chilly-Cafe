import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { menuItemNeedsMigration, normalizeMenuItem, type MenuItem } from '../data/menuItems';
import { convertGoogleDriveImageUrl } from '../utils/googleDriveImage';
import { type Review, type ReviewStatus, reviews } from '../data/reviews';
import { fetchDietTypes } from '../api/dietTypes';
import { demoDietTypes, type DietType } from '../data/dietTypes';
import { fetchCategories } from '../api/categories';
import { demoCategories, type Category } from '../data/categories';
import {
  createMenuItem as createMenuItemRequest,
  deleteMenuItem as deleteMenuItemRequest,
  fetchMenuItems,
  updateMenuItem as updateMenuItemRequest,
} from '../api/menu';
import {
  createReview as createReviewRequest,
  deleteReview as deleteReviewRequest,
  fetchReviews,
  updateReviewStatus as updateReviewStatusRequest,
} from '../api/reviews';

interface DataContextValue {
  isDemoMode: boolean;
  menu: MenuItem[];
  menuError: string | null;
  dietTypes: DietType[];
  categories: Category[];
  addMenuItem: (item: MenuItem) => Promise<boolean>;
  updateMenuItem: (item: MenuItem) => Promise<boolean>;
  deleteMenuItem: (id: string) => Promise<boolean>;
  reviewList: Review[];
  reviewError: string | null;
  addReview: (review: Review & { email: string }) => Promise<boolean>;
  setReviewStatus: (id: string, status: ReviewStatus) => Promise<boolean>;
  deleteReview: (id: string) => Promise<boolean>;
}

const API_URL = import.meta.env.VITE_API_URL?.trim() ?? '';
const isDemoMode = API_URL.length === 0;
const MENU_STORAGE_KEY = 'rc_menu';
const REVIEWS_STORAGE_KEY = 'rc_reviews';

const DataContext = createContext<DataContextValue | undefined>(undefined);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isReview(value: unknown): value is Review {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    (value.email === undefined || typeof value.email === 'string') &&
    typeof value.avatar === 'string' &&
    typeof value.rating === 'number' &&
    Number.isInteger(value.rating) &&
    value.rating >= 1 &&
    value.rating <= 5 &&
    typeof value.text === 'string' &&
    (value.status === 'Approved' || value.status === 'Pending' || value.status === 'Hidden') &&
    typeof value.date === 'string'
  );
}

function readLocalArray<T>(key: string, isItem: (value: unknown) => value is T): T[] | null {
  const stored = window.localStorage.getItem(key);
  if (stored === null) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch {
    throw new Error(`Saved demo data in ${key} is invalid JSON and was left unchanged.`);
  }

  if (!Array.isArray(parsed) || !parsed.every(isItem)) {
    throw new Error(`Saved demo data in ${key} has an invalid structure and was left unchanged.`);
  }

  return parsed;
}

function loadLocalArray<T>(
  key: string,
  isItem: (value: unknown) => value is T,
  fallback: T[],
): { value: T[]; error: string | null } {
  try {
    return { value: readLocalArray(key, isItem) ?? fallback, error: null };
  } catch (error) {
    return {
      value: [],
      error: error instanceof Error ? error.message : `Failed to load ${key}.`,
    };
  }
}

function loadLocalMenu(): { value: MenuItem[]; error: string | null; canWrite: boolean } {
  const stored = window.localStorage.getItem(MENU_STORAGE_KEY);
  if (stored === null) return { value: [], error: null, canWrite: true };

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch {
    return {
      value: [],
      error: 'Saved menu data in rc_menu is not valid JSON. Its contents were left unchanged; copy the rc_menu value before attempting manual recovery.',
      canWrite: false,
    };
  }

  if (!Array.isArray(parsed)) {
    return {
      value: [],
      error: 'Saved menu data in rc_menu is not an array. Its contents were left unchanged; copy the rc_menu value before attempting manual recovery.',
      canWrite: false,
    };
  }

  const items: MenuItem[] = [];
  const seenIds = new Set<string>();
  let unrecognizedCount = 0;
  let needsMigration = false;

  for (const record of parsed) {
    const item = normalizeMenuItem(record);
    if (!item || seenIds.has(item.id)) {
      unrecognizedCount += 1;
      continue;
    }
    seenIds.add(item.id);
    items.push(item);
    needsMigration ||= menuItemNeedsMigration(record, item);
  }

  if (unrecognizedCount > 0) {
    return {
      value: items,
      error: `Loaded ${items.length} of ${parsed.length} menu items. ${unrecognizedCount} record${unrecognizedCount === 1 ? '' : 's'} could not be safely normalized; rc_menu was left unchanged and menu edits are disabled to protect the original data. Copy the rc_menu value before recovering those records.`,
      canWrite: false,
    };
  }

  if (!needsMigration) return { value: items, error: null, canWrite: true };

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupBase = `${MENU_STORAGE_KEY}_backup_${timestamp}`;
  let backupKey = backupBase;
  let suffix = 1;
  while (window.localStorage.getItem(backupKey) !== null) {
    backupKey = `${backupBase}_${suffix}`;
    suffix += 1;
  }

  try {
    window.localStorage.setItem(backupKey, stored);
    window.localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
    return { value: items, error: null, canWrite: true };
  } catch (error) {
    const detail = error instanceof Error ? ` ${error.message}` : '';
    return {
      value: items,
      error: `Menu items were normalized for display, but rc_menu was not migrated because a complete backup could not be saved.${detail} The original rc_menu value remains available.`,
      canWrite: false,
    };
  }
}

function getBackendError(action: string, error: unknown): string {
  if (error instanceof TypeError) {
    return `Unable to reach the configured backend at ${API_URL} while trying to ${action}. Check that the backend is running and VITE_API_URL is correct.`;
  }
  return error instanceof Error ? error.message : `Failed to ${action}.`;
}

function mergeCatalog<T extends Category | DietType>(defaults: T[], saved: T[]): T[] {
  const byId = new Map<string, T>();
  for (const item of saved) byId.set(item.id, item);
  for (const item of defaults) {
    if (!byId.has(item.id)) byId.set(item.id, item);
  }
  return [...byId.values()];
}

function uniqueId(baseId: string, existingIds: string[]): string {
  let id = baseId;
  let suffix = 1;
  while (existingIds.includes(id)) {
    id = `${baseId}-${suffix}`;
    suffix += 1;
  }
  return id;
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialMenu] = useState(() =>
    isDemoMode
      ? loadLocalMenu()
      : { value: [] as MenuItem[], error: null, canWrite: true },
  );
  const [initialReviews] = useState(() =>
    isDemoMode
      ? loadLocalArray(REVIEWS_STORAGE_KEY, isReview, reviews.map((review) => ({ ...review })))
      : { value: [] as Review[], error: null },
  );
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu.value);
  const menuChangedDuringInitialLoad = useRef(false);
  const [menuError, setMenuError] = useState<string | null>(initialMenu.error);
  const [reviewList, setReviewList] = useState<Review[]>(initialReviews.value);
  const [reviewError, setReviewError] = useState<string | null>(initialReviews.error);
  const [dietTypesFromApi, setDietTypesFromApi] = useState<DietType[]>([]);
  const [categoriesFromApi, setCategoriesFromApi] = useState<Category[]>([]);

  const categories = isDemoMode
    ? mergeCatalog(demoCategories, menu.map((item) => item.category))
    : categoriesFromApi;
  const dietTypes = isDemoMode
    ? mergeCatalog(demoDietTypes, menu.map((item) => item.dietType))
    : dietTypesFromApi;

  useEffect(() => {
    if (isDemoMode) return;

    let active = true;
    fetchMenuItems()
      .then((items) => {
        if (active && !menuChangedDuringInitialLoad.current) setMenu(items);
      })
      .catch((error: unknown) => {
        if (active) setMenuError(getBackendError('load menu data', error));
      });

    fetchReviews()
      .then((items) => {
        if (active) setReviewList(items);
      })
      .catch((error: unknown) => {
        if (active) setReviewError(getBackendError('load reviews', error));
      });

    fetchCategories()
      .then((items) => {
        if (active) setCategoriesFromApi(items);
      })
      .catch((error: unknown) => {
        if (active) setMenuError(getBackendError('load menu categories', error));
      });

    fetchDietTypes()
      .then((items) => {
        if (active) setDietTypesFromApi(items);
      })
      .catch((error: unknown) => {
        if (active) setMenuError(getBackendError('load diet types', error));
      });

    return () => {
      active = false;
    };
  }, []);

  const addMenuItem = async (item: MenuItem) => {
    try {
      if (isDemoMode) {
        if (!initialMenu.canWrite) throw new Error(initialMenu.error ?? 'Menu edits are disabled until the saved data can be safely recovered.');
        if (menu.some((current) => current.id === item.id)) {
          throw new Error(`A menu item with ID "${item.id}" already exists.`);
        }
        const next = [...menu, item];
        window.localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(next));
        menuChangedDuringInitialLoad.current = true;
        setMenu(next);
      } else {
        const id = await createMenuItemRequest(item);
        menuChangedDuringInitialLoad.current = true;
        setMenu((previous) => [...previous, { ...item, id }]);
      }
      setMenuError(null);
      return true;
    } catch (error) {
      setMenuError(isDemoMode ? (error instanceof Error ? error.message : 'Failed to save menu item locally.') : getBackendError('create menu item', error));
      return false;
    }
  };

  const updateMenuItem = async (item: MenuItem) => {
    try {
      const updatedItem = {
        ...item,
        image: convertGoogleDriveImageUrl(item.image.trim()),
      };
      if (isDemoMode) {
        if (!initialMenu.canWrite) throw new Error(initialMenu.error ?? 'Menu edits are disabled until the saved data can be safely recovered.');
        if (!menu.some((current) => current.id === item.id)) {
          throw new Error(`Menu item "${item.id}" was not found in saved demo data.`);
        }
        const next = menu.map((current) => (current.id === item.id ? updatedItem : current));
        window.localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(next));
        menuChangedDuringInitialLoad.current = true;
        setMenu(next);
      } else {
        await updateMenuItemRequest(updatedItem);
        menuChangedDuringInitialLoad.current = true;
        setMenu((previous) =>
          previous.map((current) => (current.id === updatedItem.id ? updatedItem : current)),
        );
      }
      setMenuError(null);
      return true;
    } catch (error) {
      setMenuError(isDemoMode ? (error instanceof Error ? error.message : 'Failed to save menu item locally.') : getBackendError('update menu item', error));
      return false;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      if (isDemoMode) {
        if (!initialMenu.canWrite) throw new Error(initialMenu.error ?? 'Menu edits are disabled until the saved data can be safely recovered.');
        const next = menu.filter((item) => item.id !== id);
        window.localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(next));
        menuChangedDuringInitialLoad.current = true;
        setMenu(next);
      } else {
        await deleteMenuItemRequest(id);
        menuChangedDuringInitialLoad.current = true;
        setMenu((previous) => previous.filter((item) => item.id !== id));
      }
      setMenuError(null);
      return true;
    } catch (error) {
      setMenuError(isDemoMode ? (error instanceof Error ? error.message : 'Failed to save menu data locally.') : getBackendError('delete menu item', error));
      return false;
    }
  };

  const addReview = async (review: Review & { email: string }) => {
    const name = review.name.trim();
    const email = review.email.trim();
    const text = review.text.trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !text || !Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) {
      setReviewError('Enter a name, valid email, review, and a rating from 1 to 5.');
      return false;
    }

    const normalizedReview = { ...review, name, email, text };
    try {
      if (isDemoMode) {
        if (initialReviews.error) throw new Error(initialReviews.error);
        const id = uniqueId(review.id, reviewList.map((current) => current.id));
        const next = [{ ...normalizedReview, id }, ...reviewList];
        window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(next));
        setReviewList(next);
      } else {
        const id = await createReviewRequest(normalizedReview);
        const { email: _email, ...publicReview } = normalizedReview;
        setReviewList((previous) => [{ ...publicReview, id }, ...previous]);
      }
      setReviewError(null);
      return true;
    } catch (error) {
      setReviewError(isDemoMode ? (error instanceof Error ? error.message : 'Failed to save review locally.') : getBackendError('submit review', error));
      return false;
    }
  };

  const setReviewStatus = async (id: string, status: ReviewStatus) => {
    try {
      if (isDemoMode) {
        if (initialReviews.error) throw new Error(initialReviews.error);
        const next = reviewList.map((review) => (review.id === id ? { ...review, status } : review));
        window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(next));
        setReviewList(next);
      } else {
        await updateReviewStatusRequest(id, status);
        setReviewList((previous) => previous.map((review) => (review.id === id ? { ...review, status } : review)));
      }
      setReviewError(null);
      return true;
    } catch (error) {
      setReviewError(isDemoMode ? (error instanceof Error ? error.message : 'Failed to save review data locally.') : getBackendError('update review status', error));
      return false;
    }
  };

  const deleteReview = async (id: string) => {
    try {
      if (isDemoMode) {
        if (initialReviews.error) throw new Error(initialReviews.error);
        const next = reviewList.filter((review) => review.id !== id);
        window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(next));
        setReviewList(next);
      } else {
        await deleteReviewRequest(id);
        setReviewList((previous) => previous.filter((review) => review.id !== id));
      }
      setReviewError(null);
      return true;
    } catch (error) {
      setReviewError(isDemoMode ? (error instanceof Error ? error.message : 'Failed to save review data locally.') : getBackendError('delete review', error));
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        isDemoMode,
        menu,
        menuError,
        categories,
        dietTypes,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        reviewList,
        reviewError,
        addReview,
        setReviewStatus,
        deleteReview,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
