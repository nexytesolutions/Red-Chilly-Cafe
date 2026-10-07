import React, { createContext, useContext, useEffect, useState } from 'react';
import type { MenuItem } from '../data/menuItems';
import { type Review, type ReviewStatus } from '../data/reviews';
import { fetchDietTypes } from '../api/dietTypes';
import type { DietType } from '../data/dietTypes';
import { fetchCategories } from '../api/categories';
import type { Category } from '../data/categories';
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


const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [menu, setMenu] = useState<MenuItem[]>([]);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [dietTypes, setDietTypes] = useState<DietType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchMenuItems()
      .then(setMenu)
      .catch((error: unknown) => {
        setMenuError(error instanceof Error ? error.message : 'Failed to load menu.');
      });
  }, []);

  useEffect(() => {
    fetchReviews()
      .then(setReviewList)
      .catch((error: unknown) => {
        setReviewError(error instanceof Error ? error.message : 'Failed to load reviews.');
      });
  }, []);

  useEffect(() => {
    fetchDietTypes()
      .then(setDietTypes)
      .catch((error) => {
        console.error('Failed to load diet types:', error);
      });
  }, []);
useEffect(() => {
  fetchCategories()
    .then(setCategories)
    .catch((error) => {
      console.error('Failed to load categories:', error);
    });
}, []);

  const addMenuItem = async (item: MenuItem) => {
    try {
      const id = await createMenuItemRequest(item);
      setMenu((prev) => [...prev, { ...item, id }]);
      setMenuError(null);
      return true;
    } catch (error) {
      setMenuError(error instanceof Error ? error.message : 'Failed to create menu item.');
      return false;
    }
  };

  const updateMenuItem = async (item: MenuItem) => {
    try {
      await updateMenuItemRequest(item);
      setMenu((prev) => prev.map((menuItem) => (menuItem.id === item.id ? item : menuItem)));
      setMenuError(null);
      return true;
    } catch (error) {
      setMenuError(error instanceof Error ? error.message : 'Failed to update menu item.');
      return false;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await deleteMenuItemRequest(id);
      setMenu((prev) => prev.filter((item) => item.id !== id));
      setMenuError(null);
      return true;
    } catch (error) {
      setMenuError(error instanceof Error ? error.message : 'Failed to delete menu item.');
      return false;
    }
  };

  const addReview = async (review: Review & { email: string }) => {
    try {
      const id = await createReviewRequest(review);
      const { email: _email, ...publicReview } = review;
      setReviewList((prev) => [{ ...publicReview, id }, ...prev]);
      setReviewError(null);
      return true;
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : 'Failed to submit review.');
      return false;
    }
  };

  const setReviewStatus = async (id: string, status: ReviewStatus) => {
    try {
      await updateReviewStatusRequest(id, status);
      setReviewList((prev) => prev.map((review) => (review.id === id ? { ...review, status } : review)));
      setReviewError(null);
      return true;
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : 'Failed to update review status.');
      return false;
    }
  };

  const deleteReview = async (id: string) => {
    try {
      await deleteReviewRequest(id);
      setReviewList((prev) => prev.filter((review) => review.id !== id));
      setReviewError(null);
      return true;
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : 'Failed to delete review.');
      return false;
    }
  };

  return (
<DataContext.Provider
  value={{
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
