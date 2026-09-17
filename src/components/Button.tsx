import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  icon?: React.ReactNode;
}

const Button: React.FC<Props> = ({ variant = 'solid', icon, children, className = '', ...rest }) => {
  const base =
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm tracking-[0.1em] font-sans transition-colors focus-ring';
  const styles =
    variant === 'solid'
      ? 'bg-terracotta text-cream-light hover:bg-terracotta-dark'
      : 'border border-terracotta text-cream-light hover:bg-terracotta/10';

  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
      {icon}
    </button>
  );
};

export default Button;
