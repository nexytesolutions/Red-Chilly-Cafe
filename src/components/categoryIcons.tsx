import React from 'react';
import { Pizza, Fish, Drumstick, Soup, CakeSlice, GlassWater, UtensilsCrossed } from 'lucide-react';

export const categoryIcon: Record<string, React.ReactNode> = {
  Pizza: <Pizza size={26} />,
  Pasta: <UtensilsCrossed size={26} />,
  Chicken: <Drumstick size={26} />,
  Seafood: <Fish size={26} />,
  Soup: <Soup size={26} />,
  Dessert: <CakeSlice size={26} />,
  Drinks: <GlassWater size={26} />,
};
