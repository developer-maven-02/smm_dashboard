import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  if (!email || !password) {
    setError('Please fill in all fields');
    setIsLoading(false);
    return;
  }

 try {
  const res = await api.post<{
    success: boolean;
    user: { id: string; email: string };
  }>('/api/auth/login', {
    email,
    password,
  });

  // ✅ CHECK SUCCESS
  if (res.success) {
    localStorage.setItem("smm_user", JSON.stringify(res.user));

    router.push('/dashboard');
  } else {
    setError("Login failed");
  }

} catch (err: unknown) {
  setError(err instanceof Error ? err.message : 'Invalid email or password');
} finally {
    setIsLoading(false);
  }
};
  return (
    <>
      <Head>
        <title>Sign In | Social Media Marketing Dashboard</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-[hsl(var(--brand-primary)/0.08)] to-[hsl(var(--brand-secondary)/0.12)] px-4">
        <div className="w-full max-w-md">
          <div className="section-card p-8">
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl font-bold text-foreground">Welcome Back</h1>
              <p className="mt-2 text-muted-foreground">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-foreground placeholder-muted-foreground focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="pill-btn brand-gradient text-primary-foreground w-full justify-center"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                <LogIn className="h-4 w-4" />
              </button>
            </form>

            {/* <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/auth/register" className="font-medium text-brand-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div> */}
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}