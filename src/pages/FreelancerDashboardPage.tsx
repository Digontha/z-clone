import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Search, FileText, Sparkles, Wallet, MessageSquare, Bell, RotateCcw, Clock, Hourglass, DollarSign, Mail, ChevronRight, ChevronDown, ChevronUp, ArrowUpRight, CheckCircle2, Menu, X, Briefcase, LogOut, FolderOpen, Layers, Send, Check, Timer, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface JobItem {
  id: string;
  title: string;
  rate: string;
  type: 'Hourly' | 'Fixed';
  level: string;
  client: string;
  postedTime: string;
  description: string;
  tags: string[];
}

const DASHBOARD_JOBS: JobItem[] = [
  {
    id: 'dj-1',
    title: 'Natural Language Processing Engineer Needed: Develop and Evaluate a Data-Driven Prediction Solution — $65/hr',
    rate: '$65/hr',
    type: 'Hourly',
    level: 'Intermediate',
    client: 'U-Topia',
    postedTime: '2h ago',
    description:
      'Our logistics team needs an experienced Natural Language Processing Engineer to develop and evaluate a data-driven prediction solution. Please deliver data and modeling plan and reproducible model or prototype, with clear progress updates. Send one relevant work example an...',
    tags: [
      'Text Analysis',
      'Model Training and Deployment',
      'Chatbot-based Support',
      'Virtual Customer Service Age...',
      'Personalized Marketing',
    ],
  },
  {
    id: 'dj-2',
    title: 'Audio Engineer Needed: Produce Clean, Broadcast-Ready Audio — $3,000 Fixed Price',
    rate: '$3,000',
    type: 'Fixed',
    level: 'Expert',
    client: 'U-Topia',
    postedTime: '2h ago',
    description:
      'PROJECT OVERVIEW Our travel team is preparing a new project and is looking for an experienced Audio Engineer to produce clean, broadcast-ready audio. The result should be practical, polished, and ready for real-world review. We want a freelancer who can understand the goal...',
    tags: [
      'Adobe Creative Suite',
      'Video Editing',
      'Adobe Premier Pro',
      'Adobe After Effect',
      'Final Cut Pro',
    ],
  },
  {
    id: 'dj-3',
    title: 'GraphQL Developer Needed: Connect and Test a Secure Third-Party Integration — $50/hr',
    rate: '$50/hr',
    type: 'Hourly',
    level: 'Intermediate',
    client: 'U-Topia',
    postedTime: '6d ago',
    description:
      'Our legal services team needs an experienced GraphQL Developer to connect and test a secure third-party integration. Please deliver integration map and working sandbox and production integration, with clear progress updates. Send one relevant work example and your...',
    tags: ['APIs', 'DevOps', 'API Integration', 'API Design and Management'],
  },
  {
    id: 'dj-4',
    title: 'Facebook Ad Designer Needed: Design a Polished, On-Brand Customer Experience — $400 Fixed Price',
    rate: '$400',
    type: 'Fixed',
    level: 'Intermediate',
    client: 'U-Topia',
    postedTime: '6d ago',
    description:
      'PROJECT OVERVIEW Our travel team is preparing a new project and is looking for an experienced Facebook Ad Designer to design a polished, on-brand customer experience. The result should be practical, polished, and ready for real-world review. We want a freelancer who can...',
    tags: ['Visual Effects', 'Print Design', 'Adobe Premier Pro', 'Vector Graphics'],
  },
];

type DashboardMainView =
  | 'dashboard'
  | 'find-work'
  | 'my-jobs'
  | 'agency-contracts'
  | 'completed-jobs'
  | 'job-offers'
  | 'my-proposals'
  | 'invitation'
  | 'my-gigs'
  | 'saved-jobs'
  | 'messages';

export default function FreelancerDashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userState = (location.state as { userName?: string; role?: string }) || {};

  const displayName = userState.userName || 'Pulok D.';

  // Map route path and query parameters to active view
  const determineInitialTab = (): DashboardMainView => {
    const path = location.pathname;
    const search = location.search;
    if (path.includes('my-gigs')) return 'my-gigs';
    if (path.includes('proposals')) {
      if (search.includes('tab=invitations')) return 'invitation';
      return 'my-proposals';
    }
    if (path.includes('saved-jobs')) return 'saved-jobs';
    if (path.includes('job-offers')) return 'job-offers';
    if (path.includes('completed-jobs')) return 'completed-jobs';
    if (path.includes('agency-contracts')) return 'agency-contracts';
    if (path.includes('my-jobs')) return 'my-jobs';
    return 'dashboard';
  };

  const [activeTab, setActiveTab] = useState<DashboardMainView>(determineInitialTab);
  const [contractMenuOpen, setContractMenuOpen] = useState<boolean>(false);
  const [opportunityMenuOpen, setOpportunityMenuOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [contractTab, setContractTab] = useState<'active' | 'pending'>('active');

  // Proposals tab: 'applied' | 'invitations'
  const [proposalsTab, setProposalsTab] = useState<'applied' | 'invitations'>(() => {
    if (location.search.includes('tab=invitations') || location.pathname.includes('invitation')) {
      return 'invitations';
    }
    return 'applied';
  });

  // My Gigs filter
  const [gigsFilter, setGigsFilter] = useState<'active' | 'in-review' | 'all'>('active');
  const [gigSearchQuery, setGigSearchQuery] = useState('');
  const [createGigModalOpen, setCreateGigModalOpen] = useState(false);
  const [invitationModalOpen, setInvitationModalOpen] = useState(false);

  // Job Offers tab: pending, accepted, rejected
  const [jobOffersTab, setJobOffersTab] = useState<'pending' | 'accepted' | 'rejected'>('pending');

  // Completed Jobs & Agency Contracts sub-filter
  const [contractsFilter, setContractsFilter] = useState<'all' | 'fixed' | 'hourly'>('all');
  const [agencyStatus, setAgencyStatus] = useState('all');

  useEffect(() => {
    const currentView = determineInitialTab();
    setActiveTab(currentView);
    if (location.search.includes('tab=invitations') || location.pathname.includes('invitation')) {
      setProposalsTab('invitations');
    } else if (location.search.includes('tab=applied') || location.pathname.includes('proposals')) {
      setProposalsTab('applied');
    }
  }, [location.pathname, location.search]);

  const navigateToView = (view: DashboardMainView, path?: string) => {
    setActiveTab(view);
    setMobileMenuOpen(false);
    if (path) {
      navigate(path);
    }
  };

  const filteredJobs = DASHBOARD_JOBS.filter((job) =>
    searchQuery === ''
      ? true
      : job.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        job.tags.some((t) => t?.toLowerCase().includes(searchQuery?.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f8faf9] flex text-foreground font-sans">
      {/* ================= LEFT SIDEBAR (Dark Green matching screenshot) ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#01261a] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="text-[#00c26f] flex items-center justify-center transition-transform group-hover:rotate-45 duration-300">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#00c26f]">
                  <line x1="12" y1="2" x2="12" y2="22"></line>
                  <line x1="12" y1="12" x2="20.66" y2="7"></line>
                  <line x1="12" y1="12" x2="20.66" y2="17"></line>
                  <line x1="12" y1="12" x2="3.34" y2="17"></line>
                  <line x1="12" y1="12" x2="3.34" y2="7"></line>
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-white lowercase">
                zeework
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-white/70 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items matching Screenshot */}
          <nav className="p-4 space-y-1.5">
            {/* Dashboard (Active) */}
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white/10 text-white shadow-inner shadow-white/5'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 text-[#00c26f]" />
                <span>Dashboard</span>
              </div>
            </button>

            {/* Find work */}
            <button
              onClick={() => {
                setActiveTab('find-work');
                setMobileMenuOpen(false);
                toast.info('Viewing latest job feed');
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'find-work'
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-white/60" />
                <span>Find work</span>
              </div>
            </button>

{/* Contract Collapsible Section */}
            <div>
              <button
                onClick={() => setContractMenuOpen(!contractMenuOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  ['my-jobs', 'agency-contracts', 'completed-jobs', 'job-offers'].includes(activeTab)
                    ? 'text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-white/70" />
                  <span>Contract</span>
                </div>
                {contractMenuOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                )}
              </button>

              {/* Sub-items matching screenshots */}
              {contractMenuOpen && (
                <div className="pl-6 pr-2 pt-1 pb-1 space-y-1">
                  {/* My Jobs */}
                  <button
                    onClick={() => navigateToView('my-jobs', '/freelancer/my-jobs')}
                    className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeTab === 'my-jobs'
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    My Jobs
                  </button>

                  {/* Agency Contracts */}
                  <button
                    onClick={() => navigateToView('agency-contracts', '/freelancer/agency-contracts')}
                    className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeTab === 'agency-contracts'
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Agency Contracts
                  </button>

                  {/* Completed Jobs */}
                  <button
                    onClick={() => navigateToView('completed-jobs', '/freelancer/completed-jobs')}
                    className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeTab === 'completed-jobs'
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Completed Jobs
                  </button>

                  {/* Job Offer */}
                  <button
                    onClick={() => navigateToView('job-offers', '/freelancer/job-offers')}
                    className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeTab === 'job-offers'
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Job Offer
                  </button>
                </div>
              )}
            </div>

{/* Opportunity Collapsible Section matching screenshots */}
            <div>
              <button
                onClick={() => setOpportunityMenuOpen(!opportunityMenuOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  ['my-proposals', 'invitation', 'my-gigs', 'saved-jobs'].includes(activeTab)
                    ? 'text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#00c26f]" />
                  <span>Opportunity</span>
                </div>
                {opportunityMenuOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                )}
              </button>

              {/* Sub-items matching Screenshots 1, 2, 3 */}
              {opportunityMenuOpen && (
                <div className="pl-6 pr-2 pt-1 pb-1 space-y-1">
                  {/* My Proposals */}
                  <button
                    onClick={() => {
                      setProposalsTab('applied');
                      navigateToView('my-proposals', '/freelancer/proposals?tab=applied');
                    }}
                    className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeTab === 'my-proposals' && proposalsTab === 'applied'
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    My Proposals
                  </button>

                  {/* Invitation */}
                  <button
                    onClick={() => {
                      setProposalsTab('invitations');
                      navigateToView('invitation', '/freelancer/proposals?tab=invitations');
                    }}
                    className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      (activeTab === 'invitation' || (activeTab === 'my-proposals' && proposalsTab === 'invitations'))
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Invitation
                  </button>

                  {/* My Gigs */}
                  <button
                    onClick={() => navigateToView('my-gigs', '/freelancer/my-gigs')}
                    className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeTab === 'my-gigs'
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    My Gigs
                  </button>

                  {/* Save Jobs */}
                  <button
                    onClick={() => navigateToView('saved-jobs', '/freelancer/saved-jobs')}
                    className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeTab === 'saved-jobs'
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Save Jobs
                  </button>
                </div>
              )}
            </div>

            {/* Earnings */}
            <button
              onClick={() => toast.info('Available balance: $373.27 ready to withdraw')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <Wallet className="w-4 h-4 text-white/60" />
                <span>Earnings</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            </button>

            {/* Messages */}
            <button
              onClick={() => {
                setActiveTab('messages');
                toast.info('Inbox up to date: 0 unread messages');
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-white/60" />
                <span>Messages</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => {
              toast.success('Logged out successfully');
              navigate('/');
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* ================= MAIN COLUMN ================= */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header matching Screenshot */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-border/40 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar matching screenshot */}
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, clients, skills"
                className="pl-9 h-10 rounded-xl bg-[#f4f7f5] border-transparent focus-visible:bg-white focus-visible:border-border text-sm placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Right Header items: Notification & User Avatar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => toast.info('No new notifications')}
              className="w-9 h-9 rounded-full border border-border/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <Bell className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 pl-1 cursor-pointer" onClick={() => toast.info(`Signed in as ${displayName}`)}>
              <img
                src="/images/avatar-pulok.jpg"
                alt={displayName}
                width={34}
                height={34}
                className="w-8.5 h-8.5 rounded-full object-cover border border-border/60"
              />
              <span className="text-sm font-semibold text-foreground hidden sm:inline">
                {displayName}
              </span>
            </div>
          </div>
        </header>

{/* Dashboard Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* ================= PAGE: My Gigs (Screenshot 1) ================= */}
          {activeTab === 'my-gigs' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      My Gigs
                    </h1>
                    <span className="inline-flex items-center gap-1 bg-[#e7f9f1] text-[#00a85d] text-xs font-bold px-2.5 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      <span>Services</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
                    Manage your published gigs, monitor approval status, and offer your services to clients on ZeeWork.
                  </p>
                </div>

                <Button
                  onClick={() => setCreateGigModalOpen(true)}
                  className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs sm:text-sm font-semibold h-10 px-6 self-start sm:self-auto shadow-sm flex items-center gap-1.5"
                >
                  <span>+ Create New Gig</span>
                </Button>
              </div>

              {/* Filter Tabs & Filter Search Input */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-6 border-b sm:border-b-0 border-border/40 pb-2 sm:pb-0">
                  <button
                    onClick={() => setGigsFilter('active')}
                    className={`text-xs sm:text-sm font-semibold transition-colors pb-1 relative flex items-center gap-1.5 ${
                      gigsFilter === 'active'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>Active</span>
                    <span className="text-[11px] font-bold text-muted-foreground bg-muted/60 px-1.5 py-0.2 rounded-full">0</span>
                    {gigsFilter === 'active' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c26f] rounded-full" />
                    )}
                  </button>

                  <button
                    onClick={() => setGigsFilter('in-review')}
                    className={`text-xs sm:text-sm font-semibold transition-colors pb-1 relative flex items-center gap-1.5 ${
                      gigsFilter === 'in-review'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>In Review</span>
                    <span className="text-[11px] font-bold text-muted-foreground bg-muted/60 px-1.5 py-0.2 rounded-full">0</span>
                    {gigsFilter === 'in-review' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c26f] rounded-full" />
                    )}
                  </button>

                  <button
                    onClick={() => setGigsFilter('all')}
                    className={`text-xs sm:text-sm font-semibold transition-colors pb-1 relative flex items-center gap-1.5 ${
                      gigsFilter === 'all'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>All Gigs</span>
                    <span className="text-[11px] font-bold text-muted-foreground bg-muted/60 px-1.5 py-0.2 rounded-full">0</span>
                    {gigsFilter === 'all' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c26f] rounded-full" />
                    )}
                  </button>
                </div>

                {/* Filter gigs by title search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={gigSearchQuery}
                    onChange={(e) => setGigSearchQuery(e.target.value)}
                    placeholder="Filter gigs by title..."
                    className="pl-8 h-9 rounded-full bg-white border-border/80 text-xs placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              {/* Main Content Box with Empty State matching Screenshot 1 */}
              <div className="bg-white rounded-3xl border border-border/50 shadow-sm p-12 sm:p-24 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center mb-5">
                  <Briefcase className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                  No active gigs yet
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
                  You don't have any active published gigs right now. Once your gigs are reviewed and approved, they will be visible to clients for direct ordering.
                </p>
                <Button
                  onClick={() => setCreateGigModalOpen(true)}
                  className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs font-semibold h-9 px-6 shadow-sm"
                >
                  + Create Your First Gig
                </Button>
              </div>
            </div>
          )}

          {/* ================= PAGE: My Proposals / Invitations (Screenshots 2 & 3) ================= */}
          {(activeTab === 'my-proposals' || activeTab === 'invitation') && (
            <div className="space-y-6">
              {/* Header matching Screenshot 2 & 3 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    My Proposals
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
                    Manage your submitted proposals and client invitations on ZeeWork.
                  </p>
                </div>

                <Button
                  onClick={() => navigateToView('dashboard', '/freelancer')}
                  className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs sm:text-sm font-semibold h-10 px-6 self-start sm:self-auto shadow-sm"
                >
                  Find more work
                </Button>
              </div>

              {/* Proposal Main Card */}
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8">
                {/* Header Row inside card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground">
                      {proposalsTab === 'applied' ? 'Submitted Proposals' : 'Job Invitations'}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {proposalsTab === 'applied' ? 'No submitted proposals' : '1 proposal in this section'}
                    </p>
                  </div>

                  {/* Pills on the right: Applied 0, Invitations 1 */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setProposalsTab('applied');
                        navigate('/freelancer/proposals?tab=applied');
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        proposalsTab === 'applied'
                          ? 'bg-[#00c26f] text-white shadow-sm'
                          : 'border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                    >
                      Applied 0
                    </button>
                    <button
                      onClick={() => {
                        setProposalsTab('invitations');
                        navigate('/freelancer/proposals?tab=invitations');
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        proposalsTab === 'invitations'
                          ? 'bg-[#00c26f] text-white shadow-sm'
                          : 'border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                    >
                      Invitations 1
                    </button>
                  </div>
                </div>

                {/* Sub-view: Applied Empty State (Screenshot 3) */}
                {proposalsTab === 'applied' && (
                  <div className="py-20 text-center flex flex-col items-center justify-center max-w-md mx-auto">
                    {/* Tray/Inbox icon in light circle */}
                    <div className="w-14 h-14 rounded-full bg-[#f4f7f5] flex items-center justify-center text-muted-foreground/70 mb-4">
                      <FolderOpen className="w-6 h-6 stroke-[1.5]" />
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-1.5">
                      No submitted proposals
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                      You haven't submitted any job proposals yet. Browse open jobs to find opportunities that fit your skills.
                    </p>

                    <Button
                      variant="outline"
                      onClick={() => navigateToView('dashboard', '/freelancer')}
                      className="rounded-full border-border/80 text-xs font-semibold h-9 px-5 hover:bg-muted/50 flex items-center gap-1.5"
                    >
                      <span>Browse open jobs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}

                {/* Sub-view: Invitations List (Screenshot 2) */}
                {proposalsTab === 'invitations' && (
                  <div className="pt-4 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-border/40 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                          <th className="pb-3 font-semibold">PROPOSAL / JOB</th>
                          <th className="pb-3 font-semibold">CLIENT</th>
                          <th className="pb-3 font-semibold">TYPE</th>
                          <th className="pb-3 font-semibold">STATUS</th>
                          <th className="pb-3 font-semibold">RATE / BID</th>
                          <th className="pb-3 font-semibold text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        <tr className="group hover:bg-[#fafcfb] transition-colors">
                          <td className="py-4 pr-4">
                            <button
                              onClick={() => setInvitationModalOpen(true)}
                              className="font-bold text-sm text-[#00a85d] hover:underline text-left block"
                            >
                              Full Stack Developer for Our Website
                            </button>
                            <span className="text-[11px] text-muted-foreground mt-0.5 block">
                              Received 3 months ago
                            </span>
                          </td>
                          <td className="py-4 pr-4">
                            <div className="font-semibold text-foreground">CoFoundersLab</div>
                            <span className="text-[11px] text-muted-foreground">Ireland</span>
                          </td>
                          <td className="py-4 pr-4 text-muted-foreground font-medium">Hourly</td>
                          <td className="py-4 pr-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e7f9f1] text-[#00a85d] border border-[#c1f0db]">
                              Interviewing
                            </span>
                          </td>
                          <td className="py-4 pr-4 font-bold text-foreground">$6 /hr</td>
                          <td className="py-4 text-right">
                            <Button
                              variant="outline"
                              onClick={() => setInvitationModalOpen(true)}
                              className="rounded-full text-xs font-semibold h-8 px-3 border-border/80 hover:bg-muted/50 flex items-center gap-1 ml-auto"
                            >
                              <span>View Invitation</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= PAGE: Saved Jobs ================= */}
          {activeTab === 'saved-jobs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    Saved Jobs
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
                    Review and apply to contracts and gigs you have bookmarked.
                  </p>
                </div>

                <Button
                  onClick={() => navigateToView('dashboard', '/freelancer')}
                  className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs sm:text-sm font-semibold h-10 px-6 self-start sm:self-auto shadow-sm"
                >
                  Find more work
                </Button>
              </div>

              <div className="bg-white rounded-3xl border border-border/50 shadow-sm p-12 sm:p-20 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">
                  No saved jobs yet
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mb-6">
                  Bookmark interesting job listings from the feed to review them later before submitting proposals.
                </p>
                <Button
                  onClick={() => navigateToView('dashboard', '/freelancer')}
                  className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs font-semibold h-9 px-5"
                >
                  Explore Jobs
                </Button>
              </div>
            </div>
          )}

          {/* ================= SUB-PAGE 1: Job Offers ================= */}
          {activeTab === 'job-offers' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    Job Offers
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
                    Review and manage all direct contract offers received from clients on ZeeWork.
                  </p>
                </div>

                <Button
                  onClick={() => navigateToView('dashboard', '/freelancer')}
                  className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs sm:text-sm font-semibold h-10 px-6 self-start sm:self-auto shadow-sm"
                >
                  Find more work
                </Button>
              </div>

              {/* Job Offers Main Card */}
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8">
                {/* Header row inside card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground">
                      {jobOffersTab === 'pending'
                        ? 'Pending Offers'
                        : jobOffersTab === 'accepted'
                        ? 'Accepted Offers'
                        : 'Rejected Offers'}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {jobOffersTab === 'pending'
                        ? 'No pending job offers'
                        : jobOffersTab === 'accepted'
                        ? '1 active contract accepted'
                        : 'No rejected job offers'}
                    </p>
                  </div>

                  {/* Pills on the right: Pending 0, Accepted 1, Rejected 0 */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setJobOffersTab('pending')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        jobOffersTab === 'pending'
                          ? 'bg-[#00c26f] text-white shadow-sm'
                          : 'bg-muted/70 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Pending 0
                    </button>
                    <button
                      onClick={() => setJobOffersTab('accepted')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        jobOffersTab === 'accepted'
                          ? 'bg-[#00c26f] text-white shadow-sm'
                          : 'border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                    >
                      Accepted 1
                    </button>
                    <button
                      onClick={() => setJobOffersTab('rejected')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        jobOffersTab === 'rejected'
                          ? 'bg-[#00c26f] text-white shadow-sm'
                          : 'border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                    >
                      Rejected 0
                    </button>
                  </div>
                </div>

                {/* Tab content */}
                {jobOffersTab === 'pending' && (
                  <div className="py-20 text-center flex flex-col items-center justify-center max-w-md mx-auto">
                    {/* Paper Airplane in light circle matching Screenshot 1 */}
                    <div className="w-14 h-14 rounded-full bg-[#f4f7f5] flex items-center justify-center text-muted-foreground/70 mb-4">
                      <Send className="w-6 h-6 stroke-[1.5]" />
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-1.5">
                      No pending job offers
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                      When clients send you direct job offers or contract agreements, they will appear here for your review.
                    </p>

                    <Button
                      variant="outline"
                      onClick={() => navigateToView('dashboard', '/freelancer')}
                      className="rounded-full border-border/80 text-xs font-semibold h-9 px-5 hover:bg-muted/50 flex items-center gap-1.5"
                    >
                      <span>Browse open jobs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}

                {jobOffersTab === 'accepted' && (
                  <div className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-border/60 hover:border-border transition-colors gap-4 bg-[#fbfdfc]">
                      <div className="flex items-center gap-3.5">
                        <img
                          src="/images/client-avatar-1.jpg"
                          alt="CoFoundersLab"
                          width={44}
                          height={44}
                          className="w-11 h-11 rounded-full object-cover border border-border/60"
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-foreground">
                              Development Support - CFL & Zee
                            </h4>
                            <Badge className="bg-[#e7f9f1] text-[#00a85d] hover:bg-[#e7f9f1] border-none text-[10px] font-bold px-2 py-0">
                              ACTIVE CONTRACT
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Client: CoFoundersLab · Accepted on Aug 17, 2026 · $6.00/hr
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          onClick={() => toast.info('Contract Terms: 20 hrs/week tracked with ZeeWork Desktop Timer')}
                          className="h-8 px-3 rounded-full text-xs font-medium"
                        >
                          View Agreement
                        </Button>
                        <Button
                          onClick={() => navigateToView('my-jobs', '/freelancer/my-jobs')}
                          className="h-8 px-4 bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs font-semibold"
                        >
                          Open Workspace
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {jobOffersTab === 'rejected' && (
                  <div className="py-16 text-center text-muted-foreground">
                    <p className="text-xs font-medium">You have not declined any offers.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= SUB-PAGE 2: Completed Jobs (Screenshot 2) ================= */}
          {activeTab === 'completed-jobs' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    Completed Jobs
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
                    Review your finished contracts, client feedback, and work history on ZeeWork.
                  </p>
                </div>

                <Button
                  onClick={() => navigateToView('dashboard', '/freelancer')}
                  className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs sm:text-sm font-semibold h-10 px-6 self-start sm:self-auto shadow-sm"
                >
                  Find more work
                </Button>
              </div>

              {/* 3 Metric Cards matching Screenshot 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Completed Contracts */}
                <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col justify-between min-h-[110px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                      COMPLETED CONTRACTS
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-foreground tracking-tight">0</div>
                </div>

                {/* Fixed Price */}
                <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col justify-between min-h-[110px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                      FIXED PRICE
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-foreground tracking-tight">0</div>
                </div>

                {/* Hourly Rate */}
                <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col justify-between min-h-[110px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                      HOURLY RATE
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center">
                      <Timer className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-foreground tracking-tight">0</div>
                </div>
              </div>

              {/* Filter Tabs & Search row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-6 border-b sm:border-b-0 border-border/40 pb-2 sm:pb-0">
                  <button
                    onClick={() => setContractsFilter('all')}
                    className={`text-xs sm:text-sm font-semibold transition-colors pb-1 relative ${
                      contractsFilter === 'all'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>All Contracts</span>
                    {contractsFilter === 'all' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c26f] rounded-full -mb-1 sm:mb-0" />
                    )}
                  </button>

                  <button
                    onClick={() => setContractsFilter('fixed')}
                    className={`text-xs sm:text-sm font-semibold transition-colors pb-1 relative ${
                      contractsFilter === 'fixed'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>Fixed Price</span>
                    {contractsFilter === 'fixed' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c26f] rounded-full" />
                    )}
                  </button>

                  <button
                    onClick={() => setContractsFilter('hourly')}
                    className={`text-xs sm:text-sm font-semibold transition-colors pb-1 relative ${
                      contractsFilter === 'hourly'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>Hourly Rate</span>
                    {contractsFilter === 'hourly' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c26f] rounded-full" />
                    )}
                  </button>
                </div>

                {/* Search Input on right */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search contracts or clients..."
                    className="pl-8 h-9 rounded-full bg-white border-border/80 text-xs placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              {/* Main Content Box with Empty State matching Screenshot 2 */}
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-12 sm:p-20 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">
                  No completed contracts found
                </h3>
                <p className="text-xs text-muted-foreground">
                  No completed jobs found in your history yet.
                </p>
              </div>
            </div>
          )}

          {/* ================= SUB-PAGE 3: Agency Contracts (Screenshot 3) ================= */}
          {activeTab === 'agency-contracts' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    Agency Contracts
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
                    Manage client contracts assigned to you by your agency team.
                  </p>
                </div>

                <Button
                  onClick={() => navigateToView('dashboard', '/freelancer')}
                  className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs sm:text-sm font-semibold h-10 px-6 self-start sm:self-auto shadow-sm"
                >
                  Find more work
                </Button>
              </div>

              {/* 4 Metric Cards matching Screenshot 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Agency Contracts */}
                <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col justify-between min-h-[110px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                      AGENCY CONTRACTS
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-foreground tracking-tight">0</div>
                </div>

                {/* Fixed Price */}
                <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col justify-between min-h-[110px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                      FIXED PRICE
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-foreground tracking-tight">0</div>
                </div>

                {/* Hourly Rate */}
                <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col justify-between min-h-[110px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                      HOURLY RATE
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center">
                      <Timer className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-foreground tracking-tight">0</div>
                </div>

                {/* Tasks in Review */}
                <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col justify-between min-h-[110px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                      TASKS IN REVIEW
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-foreground tracking-tight">0</div>
                </div>
              </div>

              {/* Filter Tabs & Search row + All Statuses */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-6 border-b sm:border-b-0 border-border/40 pb-2 sm:pb-0">
                  <button
                    onClick={() => setContractsFilter('all')}
                    className={`text-xs sm:text-sm font-semibold transition-colors pb-1 relative ${
                      contractsFilter === 'all'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>All Contracts</span>
                    {contractsFilter === 'all' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c26f] rounded-full" />
                    )}
                  </button>

                  <button
                    onClick={() => setContractsFilter('fixed')}
                    className={`text-xs sm:text-sm font-semibold transition-colors pb-1 relative ${
                      contractsFilter === 'fixed'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>Fixed Price</span>
                    {contractsFilter === 'fixed' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c26f] rounded-full" />
                    )}
                  </button>

                  <button
                    onClick={() => setContractsFilter('hourly')}
                    className={`text-xs sm:text-sm font-semibold transition-colors pb-1 relative ${
                      contractsFilter === 'hourly'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>Hourly Rate</span>
                    {contractsFilter === 'hourly' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c26f] rounded-full" />
                    )}
                  </button>
                </div>

                {/* Right controls: Search input + All Statuses select */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-56">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search contracts or clients..."
                      className="pl-8 h-9 rounded-full bg-white border-border/80 text-xs placeholder:text-muted-foreground/60"
                    />
                  </div>

                  <Select value={agencyStatus} onValueChange={setAgencyStatus}>
                    <SelectTrigger className="h-9 w-32 rounded-full bg-white border-border/80 text-xs text-muted-foreground">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Main Content Box with Empty State matching Screenshot 3 */}
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-12 sm:p-20 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">
                  No agency contracts found
                </h3>
                <p className="text-xs text-muted-foreground">
                  There are no contracts assigned to you from your agency.
                </p>
              </div>
            </div>
          )}

          {/* ================= SUB-PAGE 4: My Jobs ================= */}
          {activeTab === 'my-jobs' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    My Jobs
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
                    Track your active assignments, milestones, and tracked working hours.
                  </p>
                </div>

                <Button
                  onClick={() => navigateToView('dashboard', '/freelancer')}
                  className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs sm:text-sm font-semibold h-10 px-6 self-start sm:self-auto shadow-sm"
                >
                  Find more work
                </Button>
              </div>

              {/* Active Contract Card */}
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="/images/client-avatar-1.jpg"
                      alt="CoFoundersLab"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border border-border/60"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base sm:text-lg font-bold text-foreground">
                          Development Support - CFL & Zee
                        </h2>
                        <Badge className="bg-[#e7f9f1] text-[#00a85d] border-none text-[11px] font-bold">
                          HOURLY ($6.00/hr)
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Client: CoFoundersLab · Started Aug 17, 2026 · Weekly Limit: 40 hrs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Button
                      onClick={() => toast.info('Time Tracker: 0:42 recorded today')}
                      variant="outline"
                      className="rounded-full text-xs h-9"
                    >
                      Log Manual Time
                    </Button>
                    <Button
                      onClick={() => toast.success('Work snapshot sent to client')}
                      className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs font-semibold h-9"
                    >
                      Submit Work
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                  <div className="p-4 rounded-xl bg-[#f8faf9] border border-border/40">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase">THIS WEEK</span>
                    <div className="text-xl font-extrabold text-foreground mt-1">$4.00</div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">0.67 hrs logged</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f8faf9] border border-border/40">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase">LIFETIME EARNED</span>
                    <div className="text-xl font-extrabold text-foreground mt-1">$2,623.00</div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Across all deliverables</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f8faf9] border border-border/40">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase">NEXT PAYOUT</span>
                    <div className="text-xl font-extrabold text-[#00c26f] mt-1">Wednesday</div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Automatic escrow release</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= DEFAULT VIEW: Dashboard ================= */}
          {activeTab === 'dashboard' && (
            <>
          {/* ================= 1. Green Welcome Banner ================= */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#00ba6a] to-[#00d077] p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Profile Avatar with white border */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white/20 p-1 flex-shrink-0">
                <img
                  src="/images/avatar-pulok.jpg"
                  alt={displayName}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Profile Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                    Freelancer Profile
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                    India
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Welcome back, {displayName}
                </h1>
                <p className="text-xs sm:text-sm text-white/80 font-normal">
                  Your Professional Role
                </p>
              </div>
            </div>

            {/* Right Banner Controls */}
            <div className="flex items-center gap-2 self-start md:self-center">
              <button
                onClick={() => toast.success('Dashboard metrics refreshed')}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                title="Refresh metrics"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <Button
                onClick={() => {
                  toast.info('Showing latest matching recommendations');
                  const target = document.getElementById('recommended-feed');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-white/95 text-[#00a85d] font-semibold text-xs sm:text-sm rounded-full h-10 px-5 shadow-sm flex items-center gap-2"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Find work</span>
              </Button>
            </div>
          </div>

          {/* ================= 2. Four Metrics Cards ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: In-Progress Work */}
            <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col justify-between min-h-[120px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                  IN-PROGRESS WORK
                </span>
                <div className="w-7 h-7 rounded-full bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-foreground tracking-tight">$4.00</div>
                <p className="text-xs text-muted-foreground mt-1">1 active milestone running</p>
              </div>
            </div>

            {/* Card 2: Pending Clearance */}
            <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col justify-between min-h-[120px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                  PENDING CLEARANCE
                </span>
                <div className="w-7 h-7 rounded-full bg-[#fef5e7] text-[#f59e0b] flex items-center justify-center">
                  <Hourglass className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-foreground tracking-tight">$0.00</div>
                <p className="text-xs text-muted-foreground mt-1">0 transactions in review & escrow</p>
              </div>
            </div>

            {/* Card 3: Gross Earnings */}
            <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col justify-between min-h-[120px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                  GROSS EARNINGS
                </span>
                <div className="w-7 h-7 rounded-full bg-[#e7f9f1] text-[#00c26f] flex items-center justify-center">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-foreground tracking-tight">
                  $2,623.00
                </div>
                <p className="text-xs text-muted-foreground mt-1">$373.27 ready to withdraw</p>
              </div>
            </div>

            {/* Card 4: Job Invitations */}
            <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col justify-between min-h-[120px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                  JOB INVITATIONS
                </span>
                <div className="w-7 h-7 rounded-full bg-[#e8f6f8] text-[#0891b2] flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-foreground tracking-tight">1</div>
                <p className="text-xs text-muted-foreground mt-1">0 proposals submitted</p>
              </div>
            </div>
          </div>

          {/* ================= 3. Main Split Content ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 columns: Active Contracts & Recommended For You */}
            <div className="lg:col-span-8 space-y-6">
              {/* Active Contracts Widget */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-border/50 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setContractTab('active')}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        contractTab === 'active'
                          ? 'bg-[#00c26f] text-white'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Active Contracts (1)</span>
                    </button>
                    <button
                      onClick={() => setContractTab('pending')}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        contractTab === 'pending'
                          ? 'bg-[#00c26f] text-white'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Hourglass className="w-3.5 h-3.5" />
                      <span>Pending Settlements (0)</span>
                    </button>
                  </div>

                  <button
                    onClick={() => toast.info('Loading all contracts ledger')}
                    className="text-xs font-semibold text-[#00c26f] hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>View all contracts</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Contract Item from Screenshot */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border/60 hover:border-border transition-colors gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/client-avatar-1.jpg"
                      alt="CoFoundersLab"
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border border-border/60"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm text-foreground">
                          Development Support - CFL & Zee
                        </h3>
                        <Badge className="bg-[#e7f9f1] text-[#00a85d] hover:bg-[#e7f9f1] border-none text-[10px] font-bold px-2 py-0">
                          HOURLY
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        CoFoundersLab · Created Aug 17, 2026
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <div className="text-sm font-bold text-foreground">$6.00</div>
                    <div className="flex items-center sm:justify-end gap-1.5 text-[11px] font-semibold text-[#00c26f]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00c26f] animate-pulse" />
                      <span>In Progress</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended For You Section */}
              <div id="recommended-feed" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-lg font-extrabold text-foreground tracking-tight">
                      Recommended For You
                    </h2>
                    <span className="bg-[#e7f9f1] text-[#00a85d] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      Live Feed
                    </span>
                  </div>

                  <button
                    onClick={() => toast.info('Loading 340+ open engineering and design jobs')}
                    className="text-xs font-semibold text-[#00c26f] hover:underline"
                  >
                    Browse all jobs
                  </button>
                </div>

                {/* Job Cards List */}
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Job Header: Title + Rate + View Button */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-bold text-foreground leading-snug flex-1">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-3 self-start sm:self-auto flex-shrink-0">
                          <span className="text-sm font-bold text-foreground whitespace-nowrap">
                            {job.rate}
                          </span>
                          <Button
                            onClick={() => setSelectedJob(job)}
                            className="h-8 px-3.5 bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm"
                          >
                            <span>View</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Meta info: Type · Level · Client · Time */}
                      <div className="text-xs text-muted-foreground font-medium mb-3">
                        {job.type} · {job.level} · {job.client} · {job.postedTime}
                      </div>

                      {/* Job Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {job.description}
                      </p>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#f2f5f4] text-muted-foreground text-[11px] font-medium px-2.5 py-1 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {filteredJobs.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center border border-border/50">
                      <Search className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-foreground">No matching jobs found</p>
                      <p className="text-xs text-muted-foreground mt-1">Try searching with different keywords</p>
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery('')}
                        className="mt-4 text-xs rounded-full"
                      >
                        Clear search
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

{/* Right 4 columns: Invitations, Proposals, Profile Readiness */}
            <div className="lg:col-span-4 space-y-6">
              {/* Invitations Card */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-border/50 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-foreground">Invitations</h3>
                  <button
                    onClick={() => navigateToView('job-offers', '/freelancer/job-offers')}
                    className="text-xs font-semibold text-[#00c26f] hover:underline"
                  >
                    View All (1)
                  </button>
                </div>

                {/* Single Invitation Pill Box matching Screenshot */}
                <div className="bg-[#f0faf5] border border-[#d2f2e3] rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="font-bold text-xs text-foreground truncate">
                      Full Stack Developer for Our...
                    </h4>
                    <span className="bg-[#00c26f] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                      New Invite
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground italic mb-3">
                    &quot;Hi Pulok - Inviting you to the position&quot;
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-[#d2f2e3]/60">
                    <span className="text-muted-foreground text-[11px]">From CoFoundersLab</span>
                    <button
                      onClick={() => navigateToView('job-offers', '/freelancer/job-offers')}
                      className="text-[#00c26f] font-semibold text-xs hover:underline flex items-center gap-0.5"
                    >
                      <span>View Job</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Proposals Card matching Screenshot */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-border/50 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-sm text-foreground">Proposals</h3>
                  <button
                    onClick={() => toast.info('You currently have no active proposals')}
                    className="text-xs font-semibold text-[#00c26f] hover:underline"
                  >
                    View all (0)
                  </button>
                </div>

                {/* Empty State matching Screenshot */}
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-muted/40 flex items-center justify-center text-muted-foreground mb-3">
                    <FileText className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    No submitted proposals yet.
                  </p>
                </div>
              </div>

              {/* Profile Readiness Card matching Screenshot */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-border/50 shadow-sm">
                <h3 className="font-bold text-sm text-foreground mb-4">Profile Readiness</h3>

                <div className="space-y-3.5 mb-6">
                  {/* Payment verification */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground/60" />
                      <span>Payment verification</span>
                    </div>
                    <span className="text-amber-600 font-semibold text-[11px] bg-amber-50 px-2 py-0.5 rounded-full">
                      Pending
                    </span>
                  </div>

                  {/* Skills listed */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Sparkles className="w-4 h-4 text-[#00c26f]" />
                      <span>Skills listed</span>
                    </div>
                    <span className="font-bold text-foreground">8 skills</span>
                  </div>

                  {/* Portfolio projects */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FolderOpen className="w-4 h-4 text-muted-foreground/60" />
                      <span>Portfolio projects</span>
                    </div>
                    <span className="font-bold text-foreground">0 items</span>
                  </div>
                </div>

                {/* Update Profile button */}
                <Button
                  onClick={() =>
                    toast.info('Profile Settings', {
                      description: 'Complete your portfolio and payment details to earn the Top Rated badge.',
                    })
                  }
                  variant="outline"
                  className="w-full rounded-full border-border/80 text-foreground text-xs font-semibold h-10 hover:bg-muted/40"
                >
                  Update profile & settings
                </Button>
              </div>
            </div>
          </div>
          </>
          )}
        </main>
      </div>

{/* ================= Create New Gig Dialog ================= */}
      <Dialog open={createGigModalOpen} onOpenChange={setCreateGigModalOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#e7f9f1] text-[#00a85d] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Service Catalog
              </span>
            </div>
            <DialogTitle className="text-lg font-bold text-foreground text-left">
              Create a New Gig
            </DialogTitle>
            <DialogDescription className="text-left text-xs font-medium text-muted-foreground">
              Define a predefined service package with clear deliverables, pricing, and turnaround time.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Gig Title</label>
              <Input
                placeholder="e.g. I will build a responsive Next.js frontend with Tailwind CSS"
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Category</label>
                <Select defaultValue="web-dev">
                  <SelectTrigger className="h-10 text-xs rounded-xl">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-dev">Web Development</SelectItem>
                    <SelectItem value="design">UI/UX & Product Design</SelectItem>
                    <SelectItem value="mobile">Mobile Apps</SelectItem>
                    <SelectItem value="ai">AI & Machine Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Starting Price ($)</label>
                <Input
                  type="number"
                  defaultValue="250"
                  className="h-10 text-xs rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Deliverables & Summary</label>
              <textarea
                rows={3}
                placeholder="Describe what the buyer will receive, revisions included, and source files provided..."
                className="w-full text-xs p-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setCreateGigModalOpen(false)}
              className="rounded-full text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast.success('Gig submitted for review!', {
                  description: 'Our moderation team will review and approve your gig within 24 hours.',
                });
                setCreateGigModalOpen(false);
              }}
              className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs font-semibold shadow-sm"
            >
              Publish Gig
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= View Invitation Dialog ================= */}
      <Dialog open={invitationModalOpen} onOpenChange={setInvitationModalOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#e7f9f1] text-[#00a85d] text-[11px] font-bold px-2 py-0.5 rounded-full">
                Interviewing
              </span>
              <span className="text-xs text-muted-foreground">Received 3 months ago</span>
            </div>
            <DialogTitle className="text-lg font-bold text-foreground text-left">
              Full Stack Developer for Our Website
            </DialogTitle>
            <DialogDescription className="text-left text-xs font-medium text-muted-foreground">
              Client: CoFoundersLab · Ireland · Rate: $6.00/hr
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2 text-xs">
            <div className="p-3.5 rounded-xl bg-[#f8faf9] border border-border/50">
              <span className="font-bold text-foreground block mb-1">Invitation Message</span>
              <p className="text-muted-foreground leading-relaxed">
                "Hi Pulok - We reviewed your technical experience and would like to invite you to discuss our full-stack web application development on ZeeWork. We offer flexible hours with automated escrow guarantees."
              </p>
            </div>

            <div>
              <span className="font-bold text-foreground block mb-1">Contract Terms</span>
              <ul className="space-y-1 text-muted-foreground list-disc pl-4">
                <li>Hourly billing: $6.00/hour</li>
                <li>Up to 20 hrs/week with automatic time tracking</li>
                <li>Weekly disbursements every Wednesday</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setInvitationModalOpen(false)}
              className="rounded-full text-xs font-semibold"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                toast.success('Invitation accepted! Workspace initialized.');
                setInvitationModalOpen(false);
              }}
              className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs font-semibold"
            >
              Accept & Start Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= Job Quick View Dialog ================= */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="sm:max-w-xl rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-[#e7f9f1] text-[#00a85d] border-none text-xs">
                {selectedJob?.type}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {selectedJob?.client} · {selectedJob?.postedTime}
              </span>
            </div>
            <DialogTitle className="text-lg font-bold text-foreground text-left leading-snug">
              {selectedJob?.title}
            </DialogTitle>
            <DialogDescription className="text-left text-xs font-medium text-muted-foreground pt-1">
              Rate: <span className="font-bold text-foreground">{selectedJob?.rate}</span> · Experience:{' '}
              {selectedJob?.level}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <h4 className="text-xs font-bold text-foreground mb-1">Project Details</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedJob?.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-foreground mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedJob?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[11px] font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setSelectedJob(null)}
              className="rounded-full text-xs font-semibold"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                toast.success('Proposal submitted to client!', {
                  description: `Your bid for "${selectedJob?.title.slice(0, 40)}..." was sent.`,
                });
                setSelectedJob(null);
              }}
              className="bg-[#00c26f] hover:bg-[#00b064] text-white rounded-full text-xs font-semibold shadow-sm"
            >
              Submit Proposal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}