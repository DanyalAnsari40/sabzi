'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react';

const ERROR_MESSAGES: Record<string, string> = {
  required: 'Email and password are required.',
  invalid: 'Invalid email or password. Please try again.',
  server: 'Something went wrong. Please try again.',
};

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('admin@wholegrains.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'include' })
      .then((r) => r.ok && r.json())
      .then((data) => {
        if (data?.user) router.replace('/');
      })
      .catch(() => {});
  }, [router]);

  useEffect(() => {
    const code = searchParams.get('error');
    if (code && ERROR_MESSAGES[code]) {
      setError(ERROR_MESSAGES[code]);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError(ERROR_MESSAGES.required);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = '/';
        return;
      }
      setError(data.error || ERROR_MESSAGES.invalid);
    } catch {
      setError(ERROR_MESSAGES.server);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
      </div>

      <div className="w-full max-w-md px-4 relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sabzi</h1>
              <p className="text-sm text-foreground/70 font-medium">Halal & Fresh – Admin</p>
            </div>
          </div>
        </div>

        {/* Card */}
        <Card className="p-8 border-0 shadow-2xl bg-white/95 backdrop-blur-sm animate-fade-in-up">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-foreground/60">Sign in to access your wholesale dashboard</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 border-destructive/50 bg-destructive/10" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@wholegrains.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-semibold">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <span className="text-foreground/70">Remember me</span>
              </label>
              <Link href="#" className="text-primary hover:text-primary/80 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg font-semibold text-base"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Login Credentials */}
          <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-xs font-semibold text-primary mb-2">Default credentials (run seed once):</p>
            <p className="text-xs text-foreground/70">Email: <code className="bg-white/50 px-2 py-1 rounded">admin@wholegrains.com</code></p>
            <p className="text-xs text-foreground/70">Password: <code className="bg-white/50 px-2 py-1 rounded">Admin@123</code></p>
            <p className="text-xs text-foreground/70 mt-2">First time? POST /api/seed-admin to create this user.</p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-foreground/75 text-sm mt-8 font-medium">
          Need help?{' '}
          <a href="mailto:support@wholegrains.com" className="text-primary hover:text-primary/80 font-medium">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
