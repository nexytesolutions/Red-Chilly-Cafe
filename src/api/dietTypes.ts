import type { DietType } from '../data/dietTypes';

export async function fetchDietTypes(): Promise<DietType[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/diet_types`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch diet types: ${response.status}`);
  }

  const data = await response.json();

  return data.diet_types.map((dietType: {
    diet_type_id: string;
    name: string;
  }) => ({
    id: dietType.diet_type_id,
    name: dietType.name,
  }));
}
