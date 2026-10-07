import type { Category } from '../data/categories';

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/categories`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const data = await response.json();

  return data.categories.map(
    (category: {
      category_id: string;
      name: string;
    }) => ({
      id: category.category_id,
      name: category.name,
    })
  );
}
