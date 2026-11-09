import { useState } from 'react';
import { Briefcase, Clock, MapPin, DollarSign, CheckCircle2, Send, Filter, ArrowRight } from 'lucide-react';
import { JobGig } from '../types/zeework';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface JobsBoardProps {
  jobs: JobGig[];
  onApplyJob: (job: JobGig) => void;
  onOpenPostJob: () => void;
}

export default function JobsBoard({ jobs, onApplyJob, onOpenPostJob }: JobsBoardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Development', 'AI & Data Science', 'Design & Creative', 'DevOps & Cloud'];

  const filteredJobs = jobs.filter((job) => {
    if (selectedCategory === 'All') return true;
    return job.category?.toLowerCase().includes(selectedCategory?.toLowerCase());
  });

  return (
    <section id="jobs" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Remote Project Marketplace
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-1">
            Browse Active Remote Projects
          </h2>
          <p className="text-muted-foreground mt-2 text-base max-w-xl">
            Verified enterprise and funded startups looking for immediate contractor kick-offs with funded escrow accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={onOpenPostJob}
            className="bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-md shadow-primary/20"
          >
            <Briefcase className="w-4 h-4 mr-1.5" /> Post Your Project
          </Button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-border">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                : 'bg-card text-muted-foreground hover:text-foreground border border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Jobs Listing */}
      <div className="flex flex-col gap-4">
        {filteredJobs.map((job) => (
          <Card 
            key={job.id} 
            className="bg-card hover:border-primary/40 transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="flex-1">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs font-semibold text-foreground border-border bg-secondary/50">
                    {job.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {job.timePosted}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    Level: <strong className="text-foreground">{job.level}</strong>
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-emerald-600 font-medium">
                    {job.proposalsCount} proposals submitted
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                  {job.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {job.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[11px] font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Client Trust Line */}
                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    {job.clientName}
                    {job.clientVerified && (
<span title="Payment Verified" className="inline-flex">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      </span>
                    )}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </span>
                </div>
              </div>

              {/* Price & Action Column */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 shrink-0 gap-3">
                <div className="text-left md:text-right">
                  <span className="text-xs text-muted-foreground font-medium block">
                    {job.budgetType} Budget
                  </span>
                  <span className="text-xl md:text-2xl font-extrabold text-foreground">
                    {job.budgetAmount}
                  </span>
                </div>

                <Button
                  onClick={() => onApplyJob(job)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs sm:text-sm px-5"
                >
                  Apply & Submit Proposal
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

    </section>
  );
}