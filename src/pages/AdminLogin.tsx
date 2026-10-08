import React, { useState } from 'react';
import { Eye, EyeOff, Leaf, LoaderCircle, LockKeyhole } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import ChiliDecoration from '../components/ChiliDecoration';
import Logo from '../components/Logo';
import { adminAuthService } from '../auth/adminAuth';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (adminAuthService.isAuthenticated()) return <Navigate to="/admin" replace />;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setError('');
    setIsSubmitting(true);

    try {
      const result = await adminAuthService.authenticate(username, password);
      if (!result.success) {
        setError(result.message || 'Unable to sign in. Please try again.');
        return;
      }

      navigate('/admin', { replace: true });
    } catch (authError) {
      setError(
        authError instanceof Error && authError.message
          ? authError.message
          : 'Unable to connect to the authentication service. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="paper-texture min-h-screen bg-cream md:grid md:grid-cols-[minmax(280px,0.85fr)_1.15fr]">
      <section className="relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-espresso px-7 py-8 text-cream-light sm:px-10 md:min-h-screen md:px-14 md:py-12">
        <ChiliDecoration className="absolute -right-2 top-8 h-14 w-28 opacity-50 md:right-8 md:top-12 md:h-20 md:w-40" />
        <div className="relative flex items-center gap-4">
          <Logo className="h-16 w-16" />
          <span className="h-10 w-px bg-white/20" />
          <div>
            <p className="font-serif-display text-xl font-semibold">Red Chilly</p>
            <p className="mt-0.5 font-sans text-[10px] tracking-[0.24em] text-cream-light/65">CAFE</p>
          </div>
        </div>

        <div className="relative mt-8 max-w-md md:mb-10 md:mt-auto">
          <Leaf className="mb-5 text-terracotta-light" size={20} strokeWidth={1.5} />
          <p className="font-sans text-[10px] font-medium tracking-[0.24em] text-terracotta-light">ADMINISTRATION</p>
          <h1 className="mt-3 font-serif-display text-3xl font-semibold leading-tight sm:text-4xl">
            A place for the details behind every good meal.
          </h1>
        </div>
        <p className="relative mt-6 hidden font-sans text-xs tracking-wide text-cream-light/50 md:block">
          RED CHILLY CAFE
        </p>
      </section>

      <section className="flex items-center justify-center px-6 py-12 sm:px-10 md:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-terracotta/25 text-terracotta">
              <LockKeyhole size={17} strokeWidth={1.7} />
            </div>
            <p className="font-sans text-[10px] font-semibold tracking-[0.22em] text-terracotta">STAFF ACCESS</p>
            <h2 className="mt-2 font-serif-display text-3xl font-bold text-ink">Welcome back</h2>
            <p className="mt-2 font-sans text-sm text-ink/60">Sign in to manage the cafe.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="admin-username" className="mb-2 block font-sans text-xs font-semibold tracking-wide text-ink/80">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter admin username"
                className="w-full rounded-md border border-ink/15 bg-cream-light px-4 py-3 font-sans text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-terracotta"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="mb-2 block font-sans text-xs font-semibold tracking-wide text-ink/80">
                Password
              </label>
              <div className="flex items-center rounded-md border border-ink/15 bg-cream-light pr-2 transition-colors focus-within:border-terracotta">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-transparent px-4 py-3 font-sans text-sm text-ink placeholder:text-ink/35 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="rounded p-2 text-ink/55 transition-colors hover:text-terracotta focus-visible:outline-2 focus-visible:outline-terracotta"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-md border border-red-800/20 bg-red-800/5 px-3 py-2 font-sans text-sm text-red-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!username.trim() || !password || isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-terracotta px-5 py-3.5 font-sans text-xs font-semibold tracking-[0.12em] text-cream-light transition-colors hover:bg-terracotta-dark focus-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && <LoaderCircle size={15} className="animate-spin" />}
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;