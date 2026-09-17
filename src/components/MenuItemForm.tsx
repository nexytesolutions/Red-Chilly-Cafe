import React, { useState } from 'react';
import { categories, type MenuItem, type DietType } from '../data/menuItems';

interface Props {
  initial?: MenuItem;
  onSave: (item: MenuItem) => void;
  onCancel: () => void;
}

const emptyItem: Omit<MenuItem, 'id'> = {
  name: '',
  category: 'Pizza',
  dietType: 'veg',
  description: '',
  image: '',
  regularPrice: 0,
  largePrice: 0,
};

const MenuItemForm: React.FC<Props> = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState<Omit<MenuItem, 'id'>>(initial ?? emptyItem);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim() || !form.image.trim()) {
      setError('Name, description and image URL are required.');
      return;
    }
    if (form.regularPrice < 0 || form.largePrice < 0) {
      setError('Prices must be zero or greater.');
      return;
    }
    setError('');
    onSave({
      id: initial?.id ?? `item-${Date.now()}`,
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
    });
  };

  const inputClass =
    'w-full border border-ink/15 rounded-lg px-3 py-2.5 bg-cream-light/40 font-sans text-sm outline-none focus:border-terracotta';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-sans text-xs text-ink/60 mb-1 block">Name</label>
        <input
          required
          className={inputClass}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-sans text-xs text-ink/60 mb-1 block">Category</label>
          <select
            className={inputClass}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-sans text-xs text-ink/60 mb-1 block">Diet Type</label>
          <select
            className={inputClass}
            value={form.dietType}
            onChange={(e) => setForm({ ...form, dietType: e.target.value as DietType })}
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>
      </div>

      <div>
        <label className="font-sans text-xs text-ink/60 mb-1 block">Description</label>
        <textarea
          required
          rows={3}
          className={`${inputClass} resize-none`}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div>
        <label className="font-sans text-xs text-ink/60 mb-1 block">Food Image URL</label>
          <input
          required
            type="url"
          className={inputClass}
          placeholder="https://..."
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
      </div>

      {error && <p className="font-sans text-sm text-terracotta-dark">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-sans text-xs text-ink/60 mb-1 block">Regular Price (₹)</label>
          <input
            required
            type="number"
            min={0}
            className={inputClass}
            value={form.regularPrice}
            onChange={(e) => setForm({ ...form, regularPrice: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="font-sans text-xs text-ink/60 mb-1 block">Large Price (₹)</label>
          <input
            required
            type="number"
            min={0}
            className={inputClass}
            value={form.largePrice}
            onChange={(e) => setForm({ ...form, largePrice: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg border border-ink/20 text-ink/70 font-sans text-sm hover:bg-ink/5 transition-colors focus-ring"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-terracotta hover:bg-terracotta-dark text-cream-light font-sans text-sm transition-colors focus-ring"
        >
          {initial ? 'Update Item' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm;
