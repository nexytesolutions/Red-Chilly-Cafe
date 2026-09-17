import React, { createContext, useContext, useEffect, useState } from 'react';
import { menuItems as initialMenuItems, type MenuItem } from '../data/menuItems';
import { reviews as initialReviews, type Review, type ReviewStatus } from '../data/reviews';

interface DataContextValue {
  menu: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  reviewList: Review[];
  addReview: (review: Review) => void;
  setReviewStatus: (id: string, status: ReviewStatus) => void;
  deleteReview: (id: string) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(() => loadFromStorage('rc_menu', initialMenuItems));
  const [reviewList, setReviewList] = useState<Review[]>(() => loadFromStorage('rc_reviews', initialReviews));

  useEffect(() => {
    localStorage.setItem('rc_menu', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem('rc_reviews', JSON.stringify(reviewList));
  }, [reviewList]);

  const addMenuItem = (item: MenuItem) => setMenu((prev) => [...prev, item]);
  const updateMenuItem = (item: MenuItem) =>
    setMenu((prev) => prev.map((m) => (m.id === item.id ? item : m)));
  const deleteMenuItem = (id: string) => setMenu((prev) => prev.filter((m) => m.id !== id));

  const addReview = (review: Review) => setReviewList((prev) => [review, ...prev]);
  const setReviewStatus = (id: string, status: ReviewStatus) =>
    setReviewList((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  const deleteReview = (id: string) => setReviewList((prev) => prev.filter((r) => r.id !== id));

  return (
    <DataContext.Provider
      value={{ menu, addMenuItem, updateMenuItem, deleteMenuItem, reviewList, addReview, setReviewStatus, deleteReview }}
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
