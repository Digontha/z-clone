import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Search, ShieldCheck, Sparkles, Menu, UserCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface NavbarProps {
  onOpenPostJob: () => void;
  activeRole: 'client' | 'freelancer';
  onToggleRole: (role: 'client' | 'freelancer') => void;
}

export default function Navbar({ onOpenPostJob, activeRole, onToggleRole }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/90 backdrop-blur-md">
{/* Main navigation row matching screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 group">
              {/* Green Asterisk Logo Icon */}
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

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-foreground/80">
              <a href="#how-it-works" className="hover:text-foreground transition-colors">
                How it works
              </a>
              <a href="#talent" className="hover:text-foreground transition-colors">
                Talent
              </a>
              <a href="#why-zeework" className="hover:text-foreground transition-colors">
                Why ZeeWork
              </a>
              <a href="#stories" className="hover:text-foreground transition-colors">
                Stories
              </a>
            </nav>
          </div>

{/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-5">
            <Link
              to="/sign-in"
              className="text-sm font-medium text-foreground hover:text-[#00c26f] transition-colors"
            >
              Log in
            </Link>

            <Button 
              asChild
              className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full px-6 py-2.5 font-semibold text-sm shadow-sm transition-all hover:shadow-md"
            >
              <Link to="/join">Get started</Link>
            </Button>
          </div>

          {/* Mobile menu sheet */}
          <div className="flex sm:hidden items-center gap-2">
            <Button 
              size="sm" 
              onClick={onOpenPostJob} 
              className="bg-primary text-primary-foreground text-xs px-3 h-8"
            >
              Post Job
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="w-5 h-5 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card p-6">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="text-lg font-bold flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      Z
                    </span>
                    ZeeWork Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 text-sm font-medium">
                  {/* Role Selector */}
                  <div className="bg-secondary p-1 rounded-lg flex mb-2">
                    <button
                      type="button"
                      onClick={() => onToggleRole('client')}
                      className={`flex-1 py-1.5 text-xs text-center rounded-md ${
                        activeRole === 'client' ? 'bg-card shadow-sm font-semibold text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      Hire Talent
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleRole('freelancer')}
                      className={`flex-1 py-1.5 text-xs text-center rounded-md ${
                        activeRole === 'freelancer' ? 'bg-card shadow-sm font-semibold text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      Find Work
                    </button>
                  </div>

                  <a 
                    href="#talent" 
                    onClick={() => setMobileOpen(false)} 
                    className="py-2 border-b border-border text-foreground hover:text-primary"
                  >
                    Explore Vetted Talent
                  </a>
                  <a 
                    href="#jobs" 
                    onClick={() => setMobileOpen(false)} 
                    className="py-2 border-b border-border text-foreground hover:text-primary"
                  >
                    Browse Open Projects
                  </a>
                  <a 
                    href="#how-it-works" 
                    onClick={() => setMobileOpen(false)} 
                    className="py-2 border-b border-border text-foreground hover:text-primary"
                  >
                    How ZeeWork Works
                  </a>
                  <a 
                    href="#calculator" 
                    onClick={() => setMobileOpen(false)} 
                    className="py-2 border-b border-border text-foreground hover:text-primary"
                  >
                    Fee Calculator (5% flat)
                  </a>
                  <a 
                    href="#enterprise" 
                    onClick={() => setMobileOpen(false)} 
                    className="py-2 border-b border-border text-foreground hover:text-primary"
                  >
                    Enterprise Teams
                  </a>

                  <div className="pt-4 flex flex-col gap-2">
<Button 
                      asChild
                      className="w-full bg-[#00c26f] hover:bg-[#00b064] text-white font-semibold"
                    >
                      <Link to="/join" onClick={() => setMobileOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/sign-in" onClick={() => setMobileOpen(false)}>
                        Log in
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}