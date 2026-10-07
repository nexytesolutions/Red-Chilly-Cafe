import type { MenuItem } from '../data/menuItems';

const API_URL = import.meta.env.VITE_API_URL;

interface MenuRow {
  menu_id: string;
  name: string;
  description: string;
  image_url: string;
  regular_price_in_subunits: number;
  large_price_in_subunits: number;
  category_id: string;
  category_name: string;
  diet_type_id: string;
  diet_type_name: string;
}

async function sendMenuRequest(path: string, method: string, menu?: MenuItem) {
  const response = await fetch(`${API_URL}/api/menus${path}`, {
    method,
    ...(menu && {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        menu: {
          ...(method === 'PUT' && { menu_id: menu.id }),
          name: menu.name,
          category_id: menu.category.id,
          diet_type_id: menu.dietType.id,
          description: menu.description,
          image_url: menu.image,
          regular_price: menu.regularPrice,
          large_price: menu.largePrice,
        },
      }),
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error ?? `Menu request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const response = await fetch(`${API_URL}/api/menus`);

  if (!response.ok) {
    throw new Error(`Failed to fetch menu: ${response.status}`);
  }

  const data: { menus: MenuRow[] } = await response.json();
  return data.menus.map((menu) => ({
    id: menu.menu_id,
    name: menu.name,
    category: { id: menu.category_id, name: menu.category_name },
    dietType: { id: menu.diet_type_id, name: menu.diet_type_name },
    description: menu.description,
    image: menu.image_url,
    regularPrice: menu.regular_price_in_subunits / 100,
    largePrice: menu.large_price_in_subunits / 100,
  }));
}

export async function createMenuItem(menu: MenuItem): Promise<string> {
  const data = await sendMenuRequest('', 'POST', menu);
  return data.menu_id;
}

export async function updateMenuItem(menu: MenuItem): Promise<void> {
  await sendMenuRequest('', 'PUT', menu);
}

export async function deleteMenuItem(id: string): Promise<void> {
  await sendMenuRequest(`/${encodeURIComponent(id)}`, 'DELETE');
}
