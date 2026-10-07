export type ReviewStatus = 'Approved' | 'Pending' | 'Hidden';

export interface Review {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  rating: number;
  text: string;
  status: ReviewStatus;
  date: string;
}

export const reviews: Review[] = [
  {
    id: 'sneha-r',
    name: 'Sneha R.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 4,
    text: 'The pizza was amazing! Fresh ingredients, perfectly baked and such a cozy ambience.',
    status: 'Approved',
    date: '12 Aug 2025',
  },
  {
    id: 'arjun-k',
    name: 'Arjun K.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    text: 'Great food, great service! The pasta and seafood were absolutely delicious.',
    status: 'Approved',
    date: '08 Aug 2025',
  },
  {
    id: 'priya-s',
    name: 'Priya S.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    rating: 4,
    text: 'A lovely place with a warm vibe. Loved the homemade desserts and the atmosphere.',
    status: 'Pending',
    date: '02 Aug 2025',
  },
];
