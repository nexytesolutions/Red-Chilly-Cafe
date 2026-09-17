import React from 'react';
import { X } from 'lucide-react';

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ title, onClose, children }) => (
  <div
    className="fixed inset-0 z-50 bg-ink/50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-label={title}
    onClick={onClose}
  >
    <div
      className="bg-cream rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif-display font-bold text-2xl text-ink">{title}</h3>
        <button onClick={onClose} aria-label="Close" className="text-ink/50 hover:text-terracotta focus-ring">
          <X size={22} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
