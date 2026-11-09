import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AuthRightSidebar from '../components/AuthRightSidebar';
import { toast } from 'sonner';

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email?.trim() || !password?.trim()) {
      toast.error('Please enter both email and password');
      return;
    }
setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Welcome back to ZeeWork!', {
        description: `Signed in as ${email}. Redirecting to dashboard...`,
      });
      // Push directly to the freelancer dashboard
      navigate('/freelancer', {
        state: {
          userName: 'Pulok D.',
          role: 'freelancer',
        },
      });
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Form Column matching Screenshot 1 */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-20 max-w-2xl mx-auto w-full">
        {/* Brand Logo Header */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2 group mb-12 sm:mb-16">
            <div className="text-[#00c26f] flex items-center justify-center transition-transform group-hover:rotate-45 duration-300">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#00c26f]">
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <line x1="12" y1="12" x2="20.66" y2="7"></line>
                <line x1="12" y1="12" x2="20.66" y2="17"></line>
                <line x1="12" y1="12" x2="3.34" y2="17"></line>
                <line x1="12" y1="12" x2="3.34" y2="7"></line>
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-foreground lowercase">
              zeework
            </span>
          </Link>

          {/* Form Header */}
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-normal">
              Log in to pick up where you left off.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-foreground/80">
                Email <span className="text-[#00c26f]">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.co"
                required
                className="h-12 px-4 rounded-xl bg-card border-border/80 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-[#00c26f] focus-visible:border-[#00c26f]"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-foreground/80">
                  Password <span className="text-[#00c26f]">*</span>
                </Label>
                <button
                  type="button"
                  onClick={() => toast.info('Password reset instructions sent to your email.')}
                  className="text-xs font-semibold text-[#00c26f] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 px-4 pr-11 rounded-xl bg-card border-border/80 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-[#00c26f] focus-visible:border-[#00c26f]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Keep me signed in Checkbox */}
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="keep-signed"
                checked={keepSignedIn}
                onCheckedChange={(checked) => setKeepSignedIn(checked === true)}
                className="data-[state=checked]:bg-[#00c26f] data-[state=checked]:border-[#00c26f] rounded"
              />
              <Label
                htmlFor="keep-signed"
                className="text-xs sm:text-sm font-normal text-muted-foreground cursor-pointer select-none"
              >
                Keep me signed in
              </Label>
            </div>

            {/* Primary Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#00c26f] hover:bg-[#00b064] text-white font-semibold text-sm sm:text-base rounded-full shadow-md shadow-[#00c26f]/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span>{isSubmitting ? 'Signing in...' : 'Continue with email'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/60" />
              </div>
              <span className="relative bg-background px-4 text-xs text-muted-foreground font-medium">
                Don&apos;t have a ZeeWork account?
              </span>
            </div>

            {/* Secondary Create Account Button */}
            <Button
              type="button"
              asChild
              variant="outline"
              className="w-full h-12 bg-secondary/50 hover:bg-secondary text-foreground font-semibold text-sm sm:text-base rounded-full border-border/60 transition-all"
            >
              <Link to="/join">Create an account</Link>
            </Button>

            {/* Footnote Terms */}
            <p className="text-center text-[11px] sm:text-xs text-muted-foreground pt-4 leading-relaxed">
              By continuing you agree to our{' '}
              <a href="#terms" className="text-foreground hover:underline font-medium">
                Terms
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-foreground hover:underline font-medium">
                Privacy policy
              </a>
              .
            </p>
          </form>
        </div>

        {/* Footer copyright */}
        <div className="pt-10 text-xs text-muted-foreground">
          © 2026 ZeeWork. All rights reserved.
        </div>
      </div>

      {/* Right Column with Emerald Photo & Testimonial */}
      <AuthRightSidebar />
    </div>
  );
}