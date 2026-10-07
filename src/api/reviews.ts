import type { Review, ReviewStatus } from '../data/reviews';

const API_URL = import.meta.env.VITE_API_URL;
const fallbackAvatar =
  'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop';

interface ReviewRow {
  review_id: string;
  name: string;
  rating: number;
  description: string;
  status_name: ReviewStatus;
  created_on: string;
}

async function request(path: string, method: string, body?: unknown) {
  const response = await fetch(`${API_URL}/api/reviews${path}`, {
    method,
    ...(body !== undefined && {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error ?? `Review request failed: ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
}

function fromRow(row: ReviewRow): Review {
  return {
    id: row.review_id,
    name: row.name,
    avatar: fallbackAvatar,
    rating: row.rating,
    text: row.description,
    status: row.status_name,
    date: new Date(`${row.created_on.replace(' ', 'T')}Z`).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  };
}

export async function fetchReviews(): Promise<Review[]> {
  const data: { reviews: ReviewRow[] } = await request('', 'GET');
  return data.reviews.map(fromRow);
}

export async function createReview(review: Review & { email: string }): Promise<string> {
  const data = await request('', 'POST', {
    review: {
      name: review.name,
      email: review.email,
      rating: review.rating,
      description: review.text,
    },
  });
  return data.review_id;
}

export async function updateReviewStatus(id: string, status: ReviewStatus): Promise<void> {
  await request(`/${encodeURIComponent(id)}/status`, 'PUT', { status });
}

export async function deleteReview(id: string): Promise<void> {
  await request(`/${encodeURIComponent(id)}`, 'DELETE');
}