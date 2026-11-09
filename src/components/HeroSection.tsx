import { useState } from 'react';
import { Search, ShieldCheck, Zap, Star, CheckCircle2, ArrowRight, Sparkles, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  onSearch: (query: string, type: 'talent' | 'jobs') => void;
  onOpenPostJob: () => void;
  initialMode: 'client' | 'freelancer';
}

export default function HeroSection({ onSearch, onOpenPostJob, initialMode }: HeroSectionProps) {
  const [searchMode, setSearchMode] = useState<'talent' | 'jobs'>(
    initialMode === 'freelancer' ? 'jobs' : 'talent'
  );
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, searchMode);
  };

  const trendingTags = [
    'AI Engineer', 'Next.js 14', 'Figma UX', 'Python LLM', 'Kubernetes', 'Fractional CTO'
  ];

const trendingSkills = ['Designer', 'Developer', 'WordPress', 'Copywriter', 'Video editor'];

  return (
    <section className="relative overflow-hidden pt-6 pb-20 md:pt-10 md:pb-28">
      {/* Mint green ambient glow on top edges as shown in image 1 */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-100/60 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Exactly like Image 1 */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Avatars social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                <img
                  src="/images/avatar-marcus.jpg"
                  alt="Client"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <img
                  src="/images/avatar-elena.jpg"
                  alt="Client"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <img
                  src="/images/avatar-priya.jpg"
                  alt="Client"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
              <span className="text-xs sm:text-[13px] text-muted-foreground font-medium">
                42,000+ clients hiring this week
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-foreground leading-[1.08]">
              Meet the people <br />
              who <br />
              <span className="text-[#00c26f]">
                build what&apos;s next
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed font-normal">
              ZeeWork matches your brief with vetted freelancers in minutes — then handles contracts, milestones and payouts so you can focus on shipping.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button
                onClick={onOpenPostJob}
                className="h-12 px-7 bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full font-semibold text-sm shadow-sm gap-2 transition-transform hover:scale-[1.02]"
              >
                Hire a freelancer
                <ArrowRight className="w-4 h-4" />
              </Button>

              <button
                type="button"
                onClick={onOpenPostJob}
                className="h-12 px-7 bg-muted/60 hover:bg-muted text-foreground rounded-full font-semibold text-sm transition-all"
              >
                Become a freelancer
              </button>
            </div>

            {/* Trending tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground font-medium mr-1">Trending:</span>
              {trendingSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => onSearch(skill, 'talent')}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-muted/50 hover:bg-muted text-foreground/80 hover:text-foreground font-medium transition-colors"
                >
                  {skill}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Collage Exactly matching Image 1 */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              
              {/* Main portrait image with big rounded corners */}
              <div className="relative w-full aspect-[4/5] rounded-[2.75rem] overflow-hidden shadow-2xl bg-muted border border-border/40">
                <img
                  src="/images/hero-freelancer-woman.jpg"
                  alt="Talented professional with laptop"
                  width={600}
                  height={750}
                  className="w-full h-full object-cover"
                />

                {/* Rating floating badge on top right */}
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md rounded-full px-3.5 py-1.5 shadow-md flex items-center gap-1.5 border border-border/20">
                  <div className="flex items-center text-[#00c26f]">
                    <Star className="w-3.5 h-3.5 fill-[#00c26f] text-[#00c26f]" />
                    <Star className="w-3.5 h-3.5 fill-[#00c26f] text-[#00c26f]" />
                    <Star className="w-3.5 h-3.5 fill-[#00c26f] text-[#00c26f]" />
                    <Star className="w-3.5 h-3.5 fill-[#00c26f] text-[#00c26f]" />
                    <Star className="w-3.5 h-3.5 fill-[#00c26f] text-[#00c26f]" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">4.9 average</span>
                </div>
              </div>

              {/* Smaller overlapping bottom-left photo */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-44 sm:w-52 aspect-[4/3] rounded-[1.75rem] overflow-hidden shadow-2xl border-4 border-white bg-muted">
                <img
                  src="/images/colleagues-collaborating.jpg"
                  alt="Colleagues collaborating"
                  width={300}
                  height={225}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}