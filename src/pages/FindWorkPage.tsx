import { Label } from "@/components/ui/label";

import { useState } from 'react';
import FreelancerLayout from '../components/dashboard/FreelancerLayout';
import { Search, RotateCw, LayoutGrid, Code2, Sparkles, Palette, Megaphone, BookOpen, Headphones, SlidersHorizontal, TrendingUp, DollarSign, CheckCircle, Building2, MapPin, Bookmark, ChevronDown, ChevronRight, Send, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface JobItem {
  id: string;
  title: string;
  rate: string;
  rateType: 'Hourly' | 'Fixed';
  experience: 'Entry' | 'Intermediate' | 'Expert';
  category: string;
  timePosted: string;
  duration: string;
  description: string;
  skills: string[];
  clientName: string;
  country: string;
  paymentVerified: boolean;
  bookmarked?: boolean;
}

const INITIAL_JOBS: JobItem[] = [
  {
    id: 'job-nlp',
    title: 'Natural Language Processing Engineer Needed: Develop and Evaluate a Data-Driven Prediction Solution — $65/hr',
    rate: '$65/hr',
    rateType: 'Hourly',
    experience: 'Intermediate',
    category: 'AI Services',
    timePosted: 'Posted 3h ago',
    duration: '1 to 3 Months',
    description: 'Our logistics team needs an experienced Natural Language Processing Engineer to develop and evaluate a data-driven prediction solution. Please deliver data and modeling plan and reproducible model or prototype, with clear progress updates. Send one relevant work example and your...',
    skills: [
      'Text Analysis',
      'Model Training and Deploy...',
      'Chatbot-based Support',
      'Virtual Customer Service A...',
      'Personalized Marketing',
      'Algorithmic Trading'
    ],
    clientName: 'U-Topia',
    country: 'United States',
    paymentVerified: true,
    bookmarked: false,
  },
  {
    id: 'job-audio',
    title: 'Audio Engineer Needed: Produce Clean, Broadcast-Ready Audio — $3,000 Fixed Price',
    rate: '$3,000',
    rateType: 'Fixed',
    experience: 'Expert',
    category: 'Design & Creative',
    timePosted: 'Posted 3h ago',
    duration: '1 to 3 Months',
    description: 'PROJECT OVERVIEW Our travel team is preparing a new project and is looking for an experienced Audio Engineer to produce clean, broadcast-ready audio. The result should be practical, polished, and ready for real-world review. We want a freelancer who can understand the goal quickly,...',
    skills: [
      'Audio Editing',
      'Sound Design',
      'Audio Mastering',
      'Podcast Production',
      'Noise Reduction',
      'Acoustic Treatment'
    ],
    clientName: 'Aura Media Studio',
    country: 'United Kingdom',
    paymentVerified: true,
    bookmarked: true,
  },
  {
    id: 'job-react-dashboard',
    title: 'Senior React & TypeScript Engineer: Real-Time Usage & Billing Dashboard',
    rate: '$75/hr',
    rateType: 'Hourly',
    experience: 'Expert',
    category: 'Development & IT',
    timePosted: 'Posted 4h ago',
    duration: '3 to 6 Months',
    description: 'We are seeking a seasoned frontend architect to develop an ultra-responsive billing, telemetry, and analytics dashboard with Stripe integration and WebSocket live metrics.',
    skills: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Chart.js',
      'Stripe API',
      'WebSockets'
    ],
    clientName: 'ApexMetrics Ltd.',
    country: 'Canada',
    paymentVerified: true,
    bookmarked: false,
  },
  {
    id: 'job-brand-design',
    title: 'Complete SaaS Brand Identity, Design System & Mobile Prototypes in Figma',
    rate: '$4,200',
    rateType: 'Fixed',
    experience: 'Expert',
    category: 'Design & Creative',
    timePosted: 'Posted 6h ago',
    duration: '1 to 2 Months',
    description: 'Looking for a world-class UI/UX product designer to create full design system components, interactive tablet & desktop prototypes, and iconography guidelines.',
    skills: [
      'Figma',
      'UI/UX Design',
      'Design Systems',
      'Mobile App UI',
      'Prototyping'
    ],
    clientName: 'KiteFlow Technologies',
    country: 'Germany',
    paymentVerified: true,
    bookmarked: false,
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All work', icon: LayoutGrid },
  { id: 'dev', label: 'Development & IT', icon: Code2 },
  { id: 'ai', label: 'AI Services', icon: Sparkles },
  { id: 'design', label: 'Design & Creative', icon: Palette },
  { id: 'sales', label: 'Sales & Marketing', icon: Megaphone },
  { id: 'writing', label: 'Writing & Translation', icon: BookOpen },
  { id: 'admin', label: 'Admin & Customer Support', icon: Headphones },
];

export default function FindWorkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [paymentVerifiedOnly, setPaymentVerifiedOnly] = useState(true);
  const [contractFilter, setContractFilter] = useState<string>('All');
  const [experienceFilter, setExperienceFilter] = useState<string>('All');
  const [jobs, setJobs] = useState<JobItem[]>(INITIAL_JOBS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Apply dialog state
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobItem | null>(null);
  const [proposalRate, setProposalRate] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Job feed updated with latest postings');
    }, 500);
  };

  const handleToggleBookmark = (jobId: string, title: string) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        const nextState = !job.bookmarked;
        if (nextState) {
          toast.success('Job saved to your bookmarks');
        } else {
          toast.info('Job removed from bookmarks');
        }
        return { ...job, bookmarked: nextState };
      }
      return job;
    }));
  };

  const handleOpenApply = (job: JobItem) => {
    setSelectedJobForApply(job);
    setProposalRate(job.rate);
    setCoverLetter('');
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverLetter?.trim()) {
      toast.error('Please write a short cover letter to introduce yourself');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedJobForApply(null);
      toast.success('Proposal submitted successfully!', {
        description: `Your proposal for "${selectedJobForApply?.title.slice(0, 40)}..." has been sent to the client.`
      });
    }, 700);
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      !searchQuery?.trim() ||
      job.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      job.skills.some(skill => skill?.toLowerCase().includes(searchQuery?.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'all' ||
      (selectedCategory === 'ai' && job.category === 'AI Services') ||
      (selectedCategory === 'design' && job.category === 'Design & Creative') ||
      (selectedCategory === 'dev' && job.category === 'Development & IT') ||
      (selectedCategory === 'sales' && job.category === 'Sales & Marketing') ||
      (selectedCategory === 'writing' && job.category === 'Writing & Translation') ||
      (selectedCategory === 'admin' && job.category === 'Admin & Customer Support');

    const matchesVerified = !paymentVerifiedOnly || job.paymentVerified;
    const matchesContract = contractFilter === 'All' || job.rateType === contractFilter;
    const matchesExperience = experienceFilter === 'All' || job.experience === experienceFilter;

    return matchesSearch && matchesCategory && matchesVerified && matchesContract && matchesExperience;
  });

  return (
    <FreelancerLayout>
      <div className="space-y-6 max-w-6xl mx-auto pb-16">
        {/* Top Hero Banner matching screenshot */}
        <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-[#00b96b] via-[#00c26f] to-[#04c775] p-7 sm:p-9 text-white shadow-lg shadow-[#00c26f]/15">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Find work
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Live feed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/90">
                <strong className="font-bold text-white text-base">230</strong> open jobs available for you to apply
              </p>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-sm"
              aria-label="Refresh job feed"
              title="Refresh job feed"
            >
              <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Search Input matching screenshot */}
          <div className="mt-6 max-w-2xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, skill, tag, or description..."
                className="w-full h-11 pl-11 pr-4 bg-white text-slate-900 rounded-full text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills Bar matching screenshot */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar select-none">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isActive
                    ? 'bg-[#00c26f] text-white shadow-sm'
                    : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
          <div className="pl-1">
            <button 
              className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-colors shrink-0"
              aria-label="Next categories"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary Filter Bar matching screenshot */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Filter Dropdowns on the left */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Contract Type */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-9 px-3.5 bg-white border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span>Contract Type{contractFilter !== 'All' ? `: ${contractFilter}` : ''}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuItem onClick={() => setContractFilter('All')} className={contractFilter === 'All' ? 'font-semibold text-[#00c26f]' : ''}>
                  All Types
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setContractFilter('Hourly')} className={contractFilter === 'Hourly' ? 'font-semibold text-[#00c26f]' : ''}>
                  Hourly
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setContractFilter('Fixed')} className={contractFilter === 'Fixed' ? 'font-semibold text-[#00c26f]' : ''}>
                  Fixed Price
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Experience */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-9 px-3.5 bg-white border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                  <span>Experience{experienceFilter !== 'All' ? `: ${experienceFilter}` : ''}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuItem onClick={() => setExperienceFilter('All')} className={experienceFilter === 'All' ? 'font-semibold text-[#00c26f]' : ''}>
                  All Levels
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setExperienceFilter('Intermediate')} className={experienceFilter === 'Intermediate' ? 'font-semibold text-[#00c26f]' : ''}>
                  Intermediate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setExperienceFilter('Expert')} className={experienceFilter === 'Expert' ? 'font-semibold text-[#00c26f]' : ''}>
                  Expert
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Budget Rates */}
            <Button 
              variant="outline" 
              size="sm"
              className="h-9 px-3.5 bg-white border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              <span>Budget Rates</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </Button>
          </div>

          {/* Payment Verified Only Toggle on the right */}
          <div className="flex items-center gap-2.5">
            <Switch
              checked={paymentVerifiedOnly}
              onCheckedChange={setPaymentVerifiedOnly}
              className="data-[state=checked]:bg-[#00c26f]"
            />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <CheckCircle className="w-3.5 h-3.5 text-[#00c26f]" />
              <span>Payment verified only</span>
            </div>
          </div>
        </div>

        {/* Job Listings Feed matching screenshot */}
        <div className="space-y-4 pt-1">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
              <p className="text-slate-500 text-sm">No jobs match your selected filters.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setContractFilter('All');
                  setExperienceFilter('All');
                }}
                className="mt-3 text-xs"
              >
                Reset filters
              </Button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
              >
                {/* Header row: Title + Rate & Apply Actions */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1 pr-0 sm:pr-4">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-[#00c26f] cursor-pointer transition-colors">
                      {job.title}
                    </h2>

                    {/* Metadata line matching screenshot */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>{job.rateType}</span>
                      <span>•</span>
                      <span>{job.experience}</span>
                      <span>•</span>
                      <span>{job.category}</span>
                      <span>•</span>
                      <span>{job.timePosted}</span>
                      <span>•</span>
                      <span>{job.duration}</span>
                    </div>
                  </div>

                  {/* Right side: Rate + Bookmark + Apply Button */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
                    <div className="text-lg sm:text-xl font-bold text-slate-900">
                      {job.rate}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleBookmark(job.id, job.title)}
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                          job.bookmarked
                            ? 'border-[#00c26f] bg-[#00c26f]/10 text-[#00c26f]'
                            : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                        aria-label="Bookmark job"
                      >
                        <Bookmark className={`w-4 h-4 ${job.bookmarked ? 'fill-[#00c26f]' : ''}`} />
                      </button>

                      <Button
                        onClick={() => handleOpenApply(job)}
                        className="h-9 px-5 rounded-xl bg-[#00c26f] hover:bg-[#00a85f] text-white text-xs font-semibold shadow-sm transition-all"
                      >
                        Apply now
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Job Description matching screenshot */}
                <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {job.description}
                </p>

                {/* Skill Tags matching screenshot */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-slate-100/90 text-slate-600 rounded-lg text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Client info footer matching screenshot */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-700">{job.clientName}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.country}</span>
                  </div>

                  {job.paymentVerified && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                      <CheckCircle className="w-3 h-3 text-[#00c26f]" />
                      <span>Payment verified</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Apply Proposal Modal Dialog */}
      <Dialog open={!!selectedJobForApply} onOpenChange={(open) => !open && setSelectedJobForApply(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 leading-tight">
              Submit a proposal
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              {selectedJobForApply?.title}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitProposal} className="space-y-4 py-2">
            <div>
              <Label className="text-xs font-semibold text-slate-700 block mb-1">
                Your bid / rate ({selectedJobForApply?.rateType})
              </Label>
              <Input
                value={proposalRate}
                onChange={(e) => setProposalRate(e.target.value)}
                placeholder="e.g. $65/hr or $3,000"
                className="h-10 text-xs sm:text-sm"
                required
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-700 block mb-1">
                Cover letter
              </Label>
              <Textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Introduce yourself, mention relevant past experience, and explain how you will tackle this deliverable..."
                className="min-h-[120px] text-xs sm:text-sm"
                required
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedJobForApply(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#00c26f] hover:bg-[#00a85f] text-white text-xs font-semibold gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending...' : 'Send proposal'}</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FreelancerLayout>
  );
}