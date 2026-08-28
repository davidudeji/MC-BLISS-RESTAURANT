import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, AlertCircle, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    try {
      await login(data.username, data.password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#1E392A] flex items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, #D4A373 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, #D4A373 0%, transparent 50%)`,
      }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <img
            src="/mc-bliss-logo.png"
            alt="MC Bliss"
            className="h-20 w-20 rounded-full object-cover ring-4 ring-[#D4A373]/30 mx-auto mb-4"
          />
          <h1 className="font-display font-bold text-white text-3xl">MC Bliss</h1>
          <p className="text-white/50 font-body text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <h2 className="font-display font-bold text-white text-2xl mb-1">Sign In</h2>
          <p className="text-white/50 font-body text-sm mb-8">Enter your admin credentials to continue</p>

          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 mb-5">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-300 font-body text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80 font-body">Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  placeholder="MCBliss"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 text-sm font-body bg-white/8 border border-white/15 text-white placeholder-white/30 rounded-xl focus:outline-none focus:border-[#D4A373] focus:ring-2 focus:ring-[#D4A373]/20 transition-colors"
                  {...register('username')}
                  aria-invalid={!!errors.username}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-400 font-body">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80 font-body">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 text-sm font-body bg-white/8 border border-white/15 text-white placeholder-white/30 rounded-xl focus:outline-none focus:border-[#D4A373] focus:ring-2 focus:ring-[#D4A373]/20 transition-colors"
                  {...register('password')}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 font-body">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#D4A373] hover:bg-[#b8864f] text-white font-body font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none mt-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Hint */}
          <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/8">
            <p className="text-white/30 font-body text-xs text-center">
              Username: <span className="text-white/50 font-semibold">MCBliss</span>
              &nbsp;·&nbsp;
              Password: <span className="text-white/50 font-semibold">mcbliss123</span>
            </p>
          </div>
        </div>

        <p className="text-center text-white/30 font-body text-xs mt-6">
          MC Bliss Admin Portal · Authorized Access Only
        </p>
      </div>
    </div>
  );
}
