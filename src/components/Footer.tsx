import { Link } from 'react-router-dom';
import { ShieldCheck, Globe, Heart, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border text-foreground pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-lg">
                Z
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                Zee<span className="text-primary">Work</span>
              </span>
            </Link>
            
            <p className="text-sm text-muted-foreground max-w-sm mb-4 leading-relaxed">
              The next-generation work operating system connecting fast-growing startups and enterprises with vetted remote specialists with 5% flat escrow.
            </p>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 font-medium text-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" /> SOC2 Type II Certified
              </span>
              <span>•</span>
              <span>Global Payouts in 140+ Currencies</span>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">For Clients</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#talent" className="hover:text-primary transition-colors">How to Hire</a></li>
              <li><a href="#talent" className="hover:text-primary transition-colors">Talent Directory</a></li>
              <li><a href="#enterprise" className="hover:text-primary transition-colors">Enterprise Solutions</a></li>
              <li><a href="#calculator" className="hover:text-primary transition-colors">Fee Comparison</a></li>
              <li><a href="#jobs" className="hover:text-primary transition-colors">Direct Escrow Contracts</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">For Talent</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#jobs" className="hover:text-primary transition-colors">Find Remote Jobs</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">Skill Testing & Verification</a></li>
              <li><a href="#calculator" className="hover:text-primary transition-colors">5% Fee Structure</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">Instant Payouts</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">Contract Templates</a></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">ZeeWork Platform</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">Trust & Escrow Safety</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">Dispute Arbitration</a></li>
              <li><a href="#enterprise" className="hover:text-primary transition-colors">Compliance & Taxes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ZeeWork Platform Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> English (US) • USD ($)
            </span>
            <a href="#" className="hover:text-primary transition-colors">Security</a>
            <a href="#" className="hover:text-primary transition-colors">Status</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
          </div>
        </div>

      </div>
    </footer>
  );
}