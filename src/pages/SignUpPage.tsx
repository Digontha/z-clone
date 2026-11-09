import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Briefcase, Search, Check, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AuthRightSidebar from '../components/AuthRightSidebar';
import { toast } from 'sonner';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Role: client or freelancer
  const initialRole = (searchParams.get('role') as 'client' | 'freelancer') || 'client';
  const initialStep = searchParams.get('step') ? parseInt(searchParams.get('step') || '1', 10) : (searchParams.get('role') ? 2 : 1);

  const [step, setStep] = useState<number>(initialStep);
  const [selectedRole, setSelectedRole] = useState<'client' | 'freelancer'>(initialRole);

  // Form Fields for Step 2
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState('United States');
  const [sendTips, setSendTips] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'client' || roleParam === 'freelancer') {
      setSelectedRole(roleParam);
    }
  }, [searchParams]);

  const handleProceedToStep2 = () => {
    setStep(2);
    setSearchParams({ role: selectedRole, step: '2' });
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error('Please accept the Terms of Service and Privacy Policy to continue');
      return;
    }
    if (!firstName?.trim() || !lastName?.trim() || !workEmail?.trim() || !password?.trim()) {
      toast.error('Please complete all required fields');
      return;
    }
setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const userFullName = `${firstName} ${lastName ? lastName[0] + '.' : ''}`.trim();
      toast.success('Account created successfully!', {
        description: `Welcome to ZeeWork, ${firstName}! Redirecting to your dashboard...`,
      });
      // Push directly to the freelancer dashboard with user details
      navigate('/freelancer', {
        state: {
          userName: userFullName || 'Pulok D.',
          role: selectedRole,
        },
      });
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Form Column matching Screenshot 2 & 3 */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-20 max-w-2xl mx-auto w-full">
        <div>
          {/* Top Header with Step indicator */}
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
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

            <span className="text-xs font-semibold text-muted-foreground tracking-wide">
              Step {step} of 4
            </span>
          </div>

          {/* Progress Bar under header */}
          <div className="w-full bg-border/60 h-1 rounded-full overflow-hidden mb-10 sm:mb-14">
            <div
              className="bg-[#00c26f] h-full transition-all duration-500 ease-out"
              style={{ width: step === 1 ? '25%' : '50%' }}
            />
          </div>

          {/* ================= STEP 1: Role Selection (Screenshot 2) ================= */}
          {step === 1 && (
            <div className="animate-in fade-in-50 duration-300">
              <div className="space-y-2 mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                  Join as a client <br className="hidden sm:inline" />
                  or freelancer
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground font-normal">
                  Choose how you&apos;ll use ZeeWork. You can switch views any time.
                </p>
              </div>

              {/* Role Cards Grid matching Screenshot 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {/* Client Card */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedRole('client')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedRole('client');
                  }}
                  className={`relative p-6 rounded-3xl border-2 text-left cursor-pointer transition-all duration-200 select-none flex flex-col justify-between min-h-[220px] ${
                    selectedRole === 'client'
                      ? 'border-[#00c26f] bg-[#00c26f]/[0.03] shadow-md shadow-[#00c26f]/10'
                      : 'border-border/70 hover:border-border bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    {/* Briefcase Icon in rounded box */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                        selectedRole === 'client'
                          ? 'bg-[#00c26f] text-white'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      <Briefcase className="w-5 h-5" />
                    </div>

                    {/* Radio Checkmark */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        selectedRole === 'client'
                          ? 'bg-[#00c26f] text-white'
                          : 'border-2 border-border/80'
                      }`}
                    >
                      {selectedRole === 'client' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">I&apos;m a client</h3>
                    <p className="text-xs font-semibold text-muted-foreground mb-3">
                      Hiring for a project
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Post a brief, compare proposals and hire vetted talent.
                    </p>
                  </div>
                </div>

                {/* Freelancer Card */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedRole('freelancer')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedRole('freelancer');
                  }}
                  className={`relative p-6 rounded-3xl border-2 text-left cursor-pointer transition-all duration-200 select-none flex flex-col justify-between min-h-[220px] ${
                    selectedRole === 'freelancer'
                      ? 'border-[#00c26f] bg-[#00c26f]/[0.03] shadow-md shadow-[#00c26f]/10'
                      : 'border-border/70 hover:border-border bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    {/* Search Icon */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                        selectedRole === 'freelancer'
                          ? 'bg-[#00c26f] text-white'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      <Search className="w-5 h-5" />
                    </div>

                    {/* Radio Indicator */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        selectedRole === 'freelancer'
                          ? 'bg-[#00c26f] text-white'
                          : 'border-2 border-border/80'
                      }`}
                    >
                      {selectedRole === 'freelancer' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">I&apos;m a freelancer</h3>
                    <p className="text-xs font-semibold text-muted-foreground mb-3">
                      Looking for work
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Build a profile, apply to jobs and get paid securely.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                type="button"
                onClick={handleProceedToStep2}
                className="w-full h-12 bg-[#00c26f] hover:bg-[#00b064] text-white font-semibold text-sm sm:text-base rounded-full shadow-md shadow-[#00c26f]/20 transition-all flex items-center justify-center gap-2 group mb-6"
              >
                <span>
                  {selectedRole === 'client' ? 'Join as a client' : 'Apply as a freelancer'}
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Already have an account link */}
              <div className="text-center text-xs sm:text-sm text-muted-foreground font-medium">
                Already have an account?{' '}
                <Link to="/sign-in" className="text-[#00c26f] hover:underline font-semibold">
                  Log in
                </Link>
              </div>
            </div>
          )}

          {/* ================= STEP 2: Registration Form (Screenshot 3) ================= */}
          {step === 2 && (
            <div className="animate-in fade-in-50 duration-300">
              {/* Back to Step 1 link */}
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setSearchParams({});
                }}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 transition-colors"
              >
                ← Back to role selection
              </button>

              {/* Account Type Badge */}
              <div className="mb-2">
                <span className="text-[11px] font-bold tracking-wider text-[#00c26f] uppercase">
                  {selectedRole === 'client' ? 'CLIENT ACCOUNT' : 'FREELANCER ACCOUNT'}
                </span>
              </div>

              {/* Form Title & Subtitle matching Screenshot 3 */}
              <div className="space-y-1.5 mb-7">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {selectedRole === 'client' ? 'Sign up to hire talent' : 'Sign up to find work'}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                  {selectedRole === 'client'
                    ? 'Free to join. You only pay when you hire.'
                    : 'Free to join. Create a profile and connect with verified clients.'}
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleStep2Submit} className="space-y-4">
                {/* First and Last name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="first-name" className="text-xs font-semibold text-foreground/80">
                      First name <span className="text-[#00c26f]">*</span>
                    </Label>
                    <Input
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      required
                      className="h-11 px-4 rounded-xl bg-card border-border/80 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-[#00c26f] focus-visible:border-[#00c26f]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="last-name" className="text-xs font-semibold text-foreground/80">
                      Last name <span className="text-[#00c26f]">*</span>
                    </Label>
                    <Input
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      required
                      className="h-11 px-4 rounded-xl bg-card border-border/80 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-[#00c26f] focus-visible:border-[#00c26f]"
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="work-email" className="text-xs font-semibold text-foreground/80">
                    Work email <span className="text-[#00c26f]">*</span>
                  </Label>
                  <Input
                    id="work-email"
                    type="email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="you@company.co"
                    required
                    className="h-11 px-4 rounded-xl bg-card border-border/80 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-[#00c26f] focus-visible:border-[#00c26f]"
                  />
                </div>

                {/* Password with helper */}
                <div className="space-y-1.5">
                  <Label htmlFor="signup-password" className="text-xs font-semibold text-foreground/80">
                    Password <span className="text-[#00c26f]">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="e.g., MyP@ssw0rd"
                      required
                      className="h-11 px-4 pr-11 rounded-xl bg-card border-border/80 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-[#00c26f] focus-visible:border-[#00c26f]"
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
                  <p className="text-[11px] text-muted-foreground">
                    Must include uppercase, lowercase, number and any special character
                  </p>
                </div>

                {/* Country dropdown matching screenshot */}
                <div className="space-y-1.5">
                  <Label htmlFor="country" className="text-xs font-semibold text-foreground/80">
                    Country <span className="text-[#00c26f]">*</span>
                  </Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="h-11 rounded-xl bg-card border-border/80 text-foreground">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Netherlands">Netherlands</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Singapore">Singapore</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Other">Other Country</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Checkbox 1: Tips */}
                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="send-tips"
                    checked={sendTips}
                    onCheckedChange={(checked) => setSendTips(checked === true)}
                    className="data-[state=checked]:bg-[#00c26f] data-[state=checked]:border-[#00c26f] rounded mt-0.5"
                  />
                  <Label
                    htmlFor="send-tips"
                    className="text-xs font-normal text-muted-foreground cursor-pointer select-none leading-tight"
                  >
                    Send me tips on how to find the best talent
                  </Label>
                </div>

                {/* Checkbox 2: Terms and conditions */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agree-terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                    className="data-[state=checked]:bg-[#00c26f] data-[state=checked]:border-[#00c26f] rounded mt-0.5"
                  />
                  <Label
                    htmlFor="agree-terms"
                    className="text-xs font-normal text-muted-foreground cursor-pointer select-none leading-tight"
                  >
                    I agree to the ZeeWork{' '}
                    <a href="#terms" className="text-[#00c26f] hover:underline font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#privacy" className="text-[#00c26f] hover:underline font-medium">
                      Privacy Policy
                    </a>{' '}
                    <span className="text-[#00c26f]">*</span>
                  </Label>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#00c26f] hover:bg-[#00b064] text-white font-semibold text-sm sm:text-base rounded-full shadow-md shadow-[#00c26f]/20 transition-all flex items-center justify-center gap-2 group pt-1"
                >
                  <span>{isSubmitting ? 'Creating account...' : 'Create an account'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>

                {/* Already have an account link */}
                <div className="text-center text-xs sm:text-sm text-muted-foreground font-medium pt-2">
                  Already have an account?{' '}
                  <Link to="/sign-in" className="text-[#00c26f] hover:underline font-semibold">
                    Log in
                  </Link>
                </div>
              </form>
            </div>
          )}
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