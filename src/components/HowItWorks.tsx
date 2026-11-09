import { useState } from 'react';
import { FileText, Users, ShieldCheck, CreditCard, Award, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HowItWorksProps {
  onOpenPostJob: () => void;
}

export default function HowItWorks({ onOpenPostJob }: HowItWorksProps) {
  return (
    <>
      {/* WHY ZEEWORK SECTION matching Image 3 top */}
      <section id="why-zeework" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Collage matching screenshot */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[460px]">
              {/* Primary image */}
              <div className="relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-xl bg-muted border border-border/30">
                <img
                  src="/images/colleagues-collaborating.jpg"
                  alt="Team collaboration"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping smaller portrait on bottom right */}
              <div className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-6 w-44 sm:w-52 aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-muted">
                <img
                  src="/images/talent-video-call.jpg"
                  alt="Remote specialist"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Why ZeeWork Features */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-bold text-[#00c26f] uppercase tracking-widest">
              WHY ZEEWORK
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              Top-tier talent, on your <br />
              terms.
            </h2>

            <div className="flex flex-col gap-8 pt-4">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00c26f] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Flexibility
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ramp up and down — from a two-day sprint to a full-time embedded team.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00c26f] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Cost saving
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Pay only for hours worked. Transparent hourly rates that fit any budget.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00c26f] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Access to talent
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hire the best from 150+ countries, matched to your brief in minutes.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION matching Image 3 bottom */}
      <section id="how-it-works" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <span className="text-xs font-bold text-[#00c26f] uppercase tracking-widest block mb-3">
            HOW IT WORKS
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-12">
            Hiring in three moves.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 01 */}
          <div className="flex flex-col">
            <span className="text-6xl sm:text-7xl font-extrabold text-[#00c26f]/30 mb-4 select-none">
              01
            </span>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Post your brief
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tell us what you need built, timeline targets, and target budget. Our matching engine selects the top candidates in minutes.
            </p>
          </div>

          {/* Step 02 */}
          <div className="flex flex-col">
            <span className="text-6xl sm:text-7xl font-extrabold text-[#00c26f]/30 mb-4 select-none">
              02
            </span>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Compare proposals
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Review verified portfolios, live code evaluations, and schedule quick video intros to pick your ideal match.
            </p>
          </div>

          {/* Step 03 */}
          <div className="flex flex-col">
            <span className="text-6xl sm:text-7xl font-extrabold text-[#00c26f]/30 mb-4 select-none">
              03
            </span>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Hire and pay safely
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Funds are protected in milestone escrow and only released once you test and approve completed work.
            </p>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-start">
          <Button
            onClick={onOpenPostJob}
            className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full px-8 py-3 font-semibold text-sm shadow-sm gap-2"
          >
            Start hiring now
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </>
  );
}