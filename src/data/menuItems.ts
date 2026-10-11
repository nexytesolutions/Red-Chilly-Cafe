import type { Category } from './categories';
import { demoCategories } from './categories';
import type { DietType } from './dietTypes';
import { demoDietTypes } from './dietTypes';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  dietType: DietType;
  description: string;
  image: string;
  regularPrice: number;
  largePrice: number;
  badge?: string;
  badges?: string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readPrice(
  item: Record<string, unknown>,
  camelCaseKey: string,
  snakeCaseKey: string,
  subunitsKey: string,
): number | null {
  const value = item[camelCaseKey] ?? item[snakeCaseKey];
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) return value;
  if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value)) && Number(value) >= 0) {
    return Number(value);
  }

  const subunits = item[subunitsKey];
  if (typeof subunits === 'number' && Number.isFinite(subunits) && subunits >= 0) {
    return subunits / 100;
  }
  return null;
}

function normalizeCategory(item: Record<string, unknown>): Category | null {
  const category = item.category;
  if (isRecord(category) && typeof category.id === 'string' && typeof category.name === 'string') {
    return { ...category, id: category.id, name: category.name };
  }

  const categoryName =
    typeof category === 'string'
      ? category
      : typeof item.category_name === 'string'
        ? item.category_name
        : null;
  if (!categoryName?.trim()) return null;

  const name = categoryName.trim();
  const knownCategory = demoCategories.find(
    (candidate) => candidate.name.toLowerCase() === name.toLowerCase(),
  );
  const id =
    typeof item.category_id === 'string'
      ? item.category_id
      : knownCategory?.id ?? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return id ? { id, name } : null;
}

function normalizeDietType(item: Record<string, unknown>): DietType | null {
  const dietType = item.dietType;
  if (isRecord(dietType) && typeof dietType.id === 'string' && typeof dietType.name === 'string') {
    return { ...dietType, id: dietType.id, name: dietType.name };
  }

  const dietName =
    typeof dietType === 'string'
      ? dietType
      : typeof item.diet_type_name === 'string'
        ? item.diet_type_name
        : typeof item.diet_type === 'string'
          ? item.diet_type
          : null;
  if (dietName?.trim()) {
    const name = dietName.trim();
    const knownDietType = demoDietTypes.find(
      (candidate) => candidate.name.toLowerCase() === name.toLowerCase(),
    );
    const id =
      typeof item.diet_type_id === 'string'
        ? item.diet_type_id
        : knownDietType?.id ?? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return id ? { id, name: knownDietType?.name ?? name } : null;
  }

  const vegetarian =
    typeof item.isVegetarian === 'boolean'
      ? item.isVegetarian
      : typeof item.is_vegetarian === 'boolean'
        ? item.is_vegetarian
        : typeof item.isVeg === 'boolean'
          ? item.isVeg
          : null;
  if (vegetarian !== null) {
    return demoDietTypes.find((candidate) =>
      vegetarian ? candidate.name === 'Veg' : candidate.name === 'Non-Veg',
    ) ?? null;
  }

  return null;
}

function isCanonicalMenuItem(value: Record<string, unknown>): boolean {
  const category = value.category;
  const dietType = value.dietType;
  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    isRecord(category) &&
    typeof category.id === 'string' &&
    typeof category.name === 'string' &&
    isRecord(dietType) &&
    typeof dietType.id === 'string' &&
    typeof dietType.name === 'string' &&
    typeof value.description === 'string' &&
    typeof value.image === 'string' &&
    typeof value.regularPrice === 'number' &&
    Number.isFinite(value.regularPrice) &&
    typeof value.largePrice === 'number' &&
    Number.isFinite(value.largePrice)
  );
}

export function normalizeMenuItem(value: unknown): MenuItem | null {
  if (!isRecord(value)) return null;

  const id = typeof value.id === 'string' ? value.id : value.menu_id;
  const name = value.name;
  const description = value.description;
  const image = typeof value.image === 'string' ? value.image : value.image_url;
  const category = normalizeCategory(value);
  const dietType = normalizeDietType(value);
  const regularPrice = readPrice(value, 'regularPrice', 'regular_price', 'regular_price_in_subunits');
  const largePrice = readPrice(value, 'largePrice', 'large_price', 'large_price_in_subunits');

  if (
    typeof id !== 'string' ||
    !id.trim() ||
    typeof name !== 'string' ||
    !name.trim() ||
    typeof description !== 'string' ||
    typeof image !== 'string' ||
    !category ||
    !dietType ||
    regularPrice === null ||
    largePrice === null
  ) {
    return null;
  }

  const normalized: MenuItem = {
    ...value,
    id,
    name,
    category,
    dietType,
    description,
    image,
    regularPrice,
    largePrice,
  };

  return normalized;
}

export function menuItemNeedsMigration(value: unknown, normalized: MenuItem): boolean {
  return !isRecord(value) || !isCanonicalMenuItem(value) || JSON.stringify(value) !== JSON.stringify(normalized);
}
