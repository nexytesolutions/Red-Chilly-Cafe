import type { Category } from './categories';
import type { DietType } from './dietTypes';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  dietType: DietType;
  description: string;
  image: string;
  regularPrice: number;
  largePrice: number;
}

