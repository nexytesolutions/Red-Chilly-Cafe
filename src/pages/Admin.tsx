import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Leaf } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import AdminMenuItemRow from '../components/AdminMenuItemRow';
import AdminReviewCard from '../components/AdminReviewCard';
import Modal from '../components/Modal';
import MenuItemForm from '../components/MenuItemForm';
import AdminReviewForm from '../components/AdminReviewForm';
import LeafDecoration from '../components/LeafDecoration';
import ChiliDecoration from '../components/ChiliDecoration';
import { type MenuItem } from '../data/menuItems';
import { useData } from '../context/DataContext';
import type { Review, ReviewStatus } from '../data/reviews';
import { adminAuthService } from '../auth/demoAdminAuth';

type ReviewFilter = 'All Reviews' | 'Pending Reviews' | 'Approved Reviews' | 'Hidden Reviews';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { menu, menuError, categories, addMenuItem, updateMenuItem, deleteMenuItem, reviewList, reviewError, addReview, setReviewStatus, deleteReview } =
    useData();

  const [tab, setTab] = useState('menu');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | undefined>(undefined);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('All Reviews');

  const handleLogout = () => {
    adminAuthService.logout();
    navigate('/admin/login', { replace: true });
  };

const filteredMenu = useMemo(
  () =>
    menu.filter(
      (item) =>
        (category === 'All' || item.category.id === category) &&
        item.name.toLowerCase().includes(search.toLowerCase())
    ),
  [menu, category, search]
);


  const left = filteredMenu.filter((_, i) => i % 2 === 0);
  const right = filteredMenu.filter((_, i) => i % 2 === 1);

  const filteredReviews = reviewList.filter((r) => {
    if (reviewFilter === 'All Reviews') return true;
    return r.status === (reviewFilter.split(' ')[0] as ReviewStatus);
  });

  const openAdd = () => {
    setEditing(undefined);
    setModalOpen(true);
  };
  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setModalOpen(true);
  };
  const handleSave = async (item: MenuItem) => {
    const saved = editing ? await updateMenuItem(item) : await addMenuItem(item);
    if (saved) setModalOpen(false);
  };

  const handleReviewSave = async (review: Review & { email: string }) => {
    const saved = await addReview(review);
    if (saved) setReviewModalOpen(false);
  };

  const confirmDeleteMenuItem = (item: MenuItem) => {
    if (window.confirm(`Delete "${item.name}"? This cannot be undone.`)) {
      void deleteMenuItem(item.id);
    }
  };

  const confirmDeleteReview = (review: Review) => {
    if (window.confirm(`Delete the review from "${review.name}"? This cannot be undone.`)) {
      void deleteReview(review.id);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader activeTab={tab} onTabChange={setTab} onLogout={handleLogout} />

      <div className="max-w-[1536px] mx-auto px-6 md:px-10 py-8">
        {tab === 'menu' && (
          <div className="relative bg-cream-light/30 border border-ink/10 rounded-2xl p-6 md:p-8 overflow-hidden">
          <LeafDecoration className="absolute left-1 bottom-1 h-16 w-14 opacity-40" />
          <ChiliDecoration className="absolute right-1 top-1 h-10 w-20 opacity-40" />

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
            <div>
              <p className="font-sans text-terracotta text-xs tracking-[0.2em] font-medium mb-2">
                MENU MANAGEMENT
              </p>
              <h1 className="font-serif-display font-bold text-3xl text-ink">Menu Management</h1>
              <p className="font-sans text-sm text-ink/60 mt-1">Add, update and organize your menu items.</p>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 border border-ink/15 rounded-lg px-3 py-2.5 bg-cream w-64">
                <Search size={15} className="text-ink/40" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search menu items..."
                  aria-label="Search menu items"
                  className="bg-transparent outline-none w-full font-sans text-sm placeholder:text-ink/40"
                />
              </label>
              <button
                onClick={openAdd}
                className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-cream-light px-4 py-2.5 rounded-lg font-sans text-sm whitespace-nowrap transition-colors focus-ring"
              >
                <Plus size={15} /> Add New Item
              </button>
            </div>
          </div>

          {menuError && (
            <p role="alert" className="mb-4 rounded-md border border-red-800/20 bg-red-800/5 px-3 py-2 font-sans text-sm text-red-800">
              {menuError}
            </p>
          )}

          <div className="mb-6 overflow-x-auto">
            <div className="flex min-w-max gap-2">
              <button
                onClick={() => setCategory('All')}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-sans transition-colors focus-ring ${
                  category === 'All'
                    ? 'bg-terracotta text-cream-light'
                    : 'border border-ink/15 text-ink/70 hover:border-terracotta/50'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
  <button
    key={cat.id}
    onClick={() => setCategory(cat.id)}
    className={`shrink-0 px-4 py-2 rounded-lg text-sm font-sans transition-colors focus-ring ${
      category === cat.id
        ? 'bg-terracotta text-cream-light'
        : 'border border-ink/15 text-ink/70 hover:border-terracotta/50'
    }`}
  >
    {cat.name}
  </button>
))}

            </div>
          </div>

          {filteredMenu.length === 0 ? (
           <p className="font-sans text-sm text-ink/50 py-10 text-center">
  No {category === 'All'
    ? ''
    : categories.find((c) => c.id === category)?.name ?? ''
  } items found.
</p>

          ) : (
            <div className="max-h-[28rem] overflow-y-auto pr-1 md:max-h-none md:overflow-visible md:pr-0">
              <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
                <div>
                  {left.map((item) => (
                    <AdminMenuItemRow
                      key={item.id}
                      item={item}
                      onEdit={() => openEdit(item)}
                      onDelete={() => confirmDeleteMenuItem(item)}
                    />
                  ))}
                </div>
                <div className="md:border-l md:border-ink/10 md:pl-10">
                  {right.map((item) => (
                    <AdminMenuItemRow
                      key={item.id}
                      item={item}
                      onEdit={() => openEdit(item)}
                      onDelete={() => confirmDeleteMenuItem(item)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-ink/10 font-sans text-xs text-ink/60">
            <Leaf size={13} className="text-green-700" />
            Organic Spelt Flour Option&nbsp;<span className="text-ink font-medium">+₹30/60</span>
          </div>
          </div>
        )}

        {tab === 'reviews' && (
          <div className="relative bg-cream-light/30 border border-ink/10 rounded-2xl p-6 md:p-8 overflow-hidden">
          <LeafDecoration className="absolute left-1 bottom-1 h-16 w-14 opacity-40" />
          <ChiliDecoration className="absolute right-1 top-1 h-10 w-20 opacity-40" />

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <p className="font-sans text-terracotta text-xs tracking-[0.2em] font-medium mb-2">
                REVIEWS MANAGEMENT
              </p>
              <h2 className="font-serif-display font-bold text-3xl text-ink">Reviews Management</h2>
              <p className="font-sans text-sm text-ink/60 mt-1">
                Review, approve or remove customer reviews.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={reviewFilter}
                onChange={(e) => setReviewFilter(e.target.value as ReviewFilter)}
                className="border border-ink/15 rounded-lg px-4 py-2.5 bg-cream font-sans text-sm outline-none focus:border-terracotta"
              >
                <option>All Reviews</option>
                <option>Pending Reviews</option>
                <option>Approved Reviews</option>
                <option>Hidden Reviews</option>
              </select>
              <button
                onClick={() => setReviewModalOpen(true)}
                className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-cream-light px-4 py-2.5 rounded-lg font-sans text-sm whitespace-nowrap transition-colors focus-ring"
              >
                <Plus size={15} /> Add Review
              </button>
            </div>
          </div>

          {reviewError && (
            <p role="alert" className="mb-4 rounded-md border border-red-800/20 bg-red-800/5 px-3 py-2 font-sans text-sm text-red-800">
              {reviewError}
            </p>
          )}

          {filteredReviews.length === 0 ? (
            <p className="font-sans text-sm text-ink/50 py-10 text-center">No reviews match this filter.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredReviews.map((review) => (
                <AdminReviewCard
                  key={review.id}
                  review={review}
                  onApprove={() => setReviewStatus(review.id, 'Approved')}
                  onHide={() => setReviewStatus(review.id, 'Hidden')}
                  onDelete={() => confirmDeleteReview(review)}
                />
              ))}
            </div>
          )}
          </div>
        )}
      </div>

      {modalOpen && (
        <Modal title={editing ? 'Edit Item' : 'Add New Item'} onClose={() => setModalOpen(false)}>
          <MenuItemForm initial={editing} onSave={handleSave} onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
      {reviewModalOpen && (
        <Modal title="Add Review" onClose={() => setReviewModalOpen(false)}>
          <AdminReviewForm onSave={handleReviewSave} onCancel={() => setReviewModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Admin;
