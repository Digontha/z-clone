import { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CategoryBrowser from '../components/CategoryBrowser';
import TalentShowcase from '../components/TalentShowcase';
import JobsBoard from '../components/JobsBoard';
import FeeCalculator from '../components/FeeCalculator';
import HowItWorks from '../components/HowItWorks';
import EnterpriseBanner from '../components/EnterpriseBanner';
import Footer from '../components/Footer';
import PostJobModal from '../components/PostJobModal';
import HireModal from '../components/HireModal';
import { MOCK_FREELANCERS, MOCK_JOBS, MOCK_CATEGORIES } from '../data/mockData';
import { Freelancer, JobGig } from '../types/zeework';
import { toast } from 'sonner';

export default function HomePage() {
  const [activeRole, setActiveRole] = useState<'client' | 'freelancer'>('client');
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null);
  const [hireModalOpen, setHireModalOpen] = useState(false);

  // Search filter handlers
  const handleHeroSearch = (query: string, type: 'talent' | 'jobs') => {
    if (!query?.trim()) {
      toast.info(`Showing all ${type === 'talent' ? 'freelancers' : 'projects'}`);
      return;
    }
    toast.success(`Filtering by: "${query}"`, {
      description: `Matched results across ZeeWork verified roster.`,
    });
    // Smooth scroll down to relevant section
    const targetId = type === 'talent' ? 'talent' : 'jobs';
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryName: string) => {
    toast.info(`Viewing ${categoryName} specialists`);
    const el = document.getElementById('talent');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHireClick = (freelancer: Freelancer) => {
    setSelectedFreelancer(freelancer);
    setHireModalOpen(true);
  };

  const handleApplyJob = (job: JobGig) => {
    toast.success(`Proposal application started for "${job.title}"`, {
      description: `Target budget: ${job.budgetAmount}. Escrow protected.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation */}
      <Navbar 
        onOpenPostJob={() => setPostJobOpen(true)}
        activeRole={activeRole}
        onToggleRole={setActiveRole}
      />

{/* Hero with interactive finder */}
      <HeroSection 
        onSearch={handleHeroSearch}
        onOpenPostJob={() => setPostJobOpen(true)}
        initialMode={activeRole}
      />

      {/* Stats Bar matching top of Image 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-12 relative z-20">
        <div className="bg-card rounded-[2.25rem] p-8 sm:p-12 border border-border/40 shadow-xl shadow-black/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
            <div>
              <p className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
                500K+
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                Freelancers
              </p>
            </div>

            <div>
              <p className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
                1M+
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                Projects delivered
              </p>
            </div>

            <div>
              <p className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
                150+
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                Countries
              </p>
            </div>

            <div>
              <p className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
                98%
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                Client satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vetted Talent Showcase (Available Now - Image 2) */}
      <TalentShowcase 
        freelancers={MOCK_FREELANCERS}
        onSelectFreelancer={handleHireClick}
        onOpenPostJob={() => setPostJobOpen(true)}
      />

      {/* Active Jobs & Project Marketplace */}
      <JobsBoard 
        jobs={MOCK_JOBS}
        onApplyJob={handleApplyJob}
        onOpenPostJob={() => setPostJobOpen(true)}
      />

      {/* Interactive Fee Comparison Calculator */}
      <FeeCalculator 
        onOpenPostJob={() => setPostJobOpen(true)}
      />

{/* Why ZeeWork + How It Works matching Image 3 */}
      <HowItWorks 
        onOpenPostJob={() => setPostJobOpen(true)}
      />

      {/* Categories */}
      <CategoryBrowser 
        categories={MOCK_CATEGORIES}
        onSelectCategory={handleSelectCategory}
      />

      {/* Enterprise Managed Teams */}
      <EnterpriseBanner 
        onOpenPostJob={() => setPostJobOpen(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <PostJobModal 
        open={postJobOpen}
        onOpenChange={setPostJobOpen}
      />

      <HireModal 
        freelancer={selectedFreelancer}
        open={hireModalOpen}
        onOpenChange={setHireModalOpen}
      />
    </div>
  );
}