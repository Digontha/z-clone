import { useState } from 'react';
import { Star, CheckCircle2, MapPin, ShieldCheck, Clock, Send, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { Freelancer } from '../types/zeework';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface TalentShowcaseProps {
  freelancers: Freelancer[];
  onSelectFreelancer: (freelancer: Freelancer) => void;
  onOpenPostJob: () => void;
}

export default function TalentShowcase({ freelancers, onSelectFreelancer, onOpenPostJob }: TalentShowcaseProps) {
  const [filterRate, setFilterRate] = useState<'all' | 'under75' | 'above75'>('all');

  const filteredFreelancers = freelancers.filter((fl) => {
    if (filterRate === 'under75') return fl.hourlyRate <= 75;
    if (filterRate === 'above75') return fl.hourlyRate > 75;
    return true;
  });

  return (
    <section id="talent" className="py-16 md:py-24 bg-secondary/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-primary bg-primary/10 border-primary/30 text-xs">
                Verified Global Roster
              </Badge>
              <span className="text-xs text-muted-foreground">Top 3% Acceptance Rate</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
              Featured Verified Specialists
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-base">
              Directly hire senior remote contributors with verified client track records, instant contract generation, and escrow safety.
            </p>
          </div>

          {/* Rate Filter Toggle */}
          <div className="flex items-center gap-2 bg-card p-1 rounded-lg border border-border self-start md:self-auto text-xs">
            <span className="text-muted-foreground px-2 font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              type="button"
              onClick={() => setFilterRate('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                filterRate === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Rates
            </button>
            <button
              type="button"
              onClick={() => setFilterRate('under75')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                filterRate === 'under75' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              $50 - $75/hr
            </button>
            <button
              type="button"
              onClick={() => setFilterRate('above75')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                filterRate === 'above75' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              $80+/hr (Lead / Architect)
            </button>
          </div>
        </div>

        {/* Talent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFreelancers.map((talent) => (
            <Card 
              key={talent.id}
              className="bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full">
                
                <div>
                  {/* Top Bar with Avatar and Rates */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={talent.avatar}
                          alt={talent.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-border"
                        />
                        {talent.verified && (
                          <div 
                            title="Identity & Technical Test Verified"
                            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shadow-md"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 fill-primary-foreground text-primary" />
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-foreground hover:text-primary transition-colors">
                            {talent.name}
                          </h3>
                          {talent.topRated && (
                            <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full border border-amber-500/20">
                              TOP RATED
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-primary mt-0.5">
                          {talent.title}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {talent.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-semibold text-foreground">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {talent.rating?.toFixed(1)}
                            <span className="text-muted-foreground font-normal">({talent.reviewsCount})</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-extrabold text-xl sm:text-2xl text-foreground">
                        ${talent.hourlyRate}
                        <span className="text-xs text-muted-foreground font-medium">/hr</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 mt-0.5">
                        <Clock className="w-3 h-3" /> {talent.availability}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {talent.bio}
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {talent.skills.map((skill) => (
                      <Badge 
                        key={skill}
                        variant="secondary"
                        className="text-xs font-medium bg-secondary text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Footer Metrics & Actions */}
                <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div>
                      <span className="font-bold text-foreground">{talent.completedJobs}</span> Jobs Done
                    </div>
                    <div>
                      <span className="font-bold text-foreground">{talent.earnedAmount}</span> Earned
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectFreelancer(talent)}
                      className="text-xs font-semibold"
                    >
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onSelectFreelancer(talent)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold gap-1"
                    >
                      <Send className="w-3 h-3" /> Hire Elena
                    </Button>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-card to-background border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-foreground">Need a custom technical team or specialized stack?</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                ZeeWork Enterprise pairs you with a dedicated Talent Partner within 24 hours.
              </p>
            </div>
          </div>
          <Button 
            onClick={onOpenPostJob}
            className="bg-primary text-primary-foreground font-semibold px-6 shadow-md shadow-primary/20 shrink-0"
          >
            Post a Custom Project
          </Button>
        </div>

      </div>
    </section>
  );
}