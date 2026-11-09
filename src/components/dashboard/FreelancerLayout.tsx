import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Search, FileText, Briefcase, Wallet, MessageSquare, ChevronDown, ChevronRight, Bell, Menu, X, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FreelancerLayoutProps {
  children: React.ReactNode;
}

export default function FreelancerLayout({ children }: FreelancerLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

const navigate = useNavigate();
  const [earningsOpen, setEarningsOpen] = useState(false);
  const [contractOpen, setContractOpen] = useState(false);
  const [opportunityOpen, setOpportunityOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const isOverviewActive = 
    currentPath === '/freelancer/earnings' || 
    currentPath === '/freelancer/overview' || 
    currentPath === '/earnings' ||
    currentPath === '/overview' ||
    currentPath.includes('overview') ||
    (currentPath.includes('earnings') && !currentPath.includes('transaction') && !currentPath.includes('report'));

  const isTransactionActive = 
    currentPath.includes('transaction');

  const isReportActive = 
    currentPath.includes('report');

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col md:flex-row text-slate-900 font-sans antialiased">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#04281b] text-white px-4 py-3 flex items-center justify-between border-b border-white/10 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-[#00c26f]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="2" x2="12" y2="22"></line>
              <line x1="12" y1="12" x2="20.66" y2="7"></line>
              <line x1="12" y1="12" x2="20.66" y2="17"></line>
              <line x1="12" y1="12" x2="3.34" y2="17"></line>
              <line x1="12" y1="12" x2="3.34" y2="7"></line>
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight lowercase">zeework</span>
        </Link>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 text-white hover:text-[#00c26f] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#04281b] text-white shrink-0 md:min-h-screen sticky top-0 md:h-screen overflow-y-auto z-40 transition-all select-none`}
      >
        <div className="p-5 flex flex-col h-full justify-between">
          <div className="space-y-6">
            {/* Desktop Logo */}
            <div className="hidden md:flex items-center gap-2.5 px-2 pt-1 pb-4">
              <div className="text-[#00c26f]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="22"></line>
                  <line x1="12" y1="12" x2="20.66" y2="7"></line>
                  <line x1="12" y1="12" x2="20.66" y2="17"></line>
                  <line x1="12" y1="12" x2="3.34" y2="17"></line>
                  <line x1="12" y1="12" x2="3.34" y2="7"></line>
                </svg>
              </div>
              <span className="font-bold text-2xl tracking-tight text-white lowercase">zeework</span>
            </div>

            {/* Menu List */}
            <nav className="space-y-1 text-sm font-medium">
              {/* Dashboard */}
              <Link
                to="/freelancer"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  currentPath === '/freelancer' || currentPath === '/dashboard'
                    ? 'bg-[#00c26f] text-white font-semibold'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

{/* Find work */}
              <Link
                to="/freelancer/find-work"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  currentPath === '/freelancer/find-work' || currentPath === '/find-work' || currentPath.includes('find-work')
                    ? 'bg-[#00c26f] text-white font-semibold shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Find work</span>
              </Link>

              {/* Contract Dropdown */}
              <div>
                <button
                  type="button"
                  onClick={() => setContractOpen(!contractOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4" />
                    <span>Contract</span>
                  </div>
                  {contractOpen ? <ChevronDown className="w-4 h-4 text-white/60" /> : <ChevronRight className="w-4 h-4 text-white/60" />}
                </button>
                {contractOpen && (
                  <div className="pl-9 pr-2 py-1 space-y-1 text-xs">
                    <Link to="/freelancer/my-jobs" className="block py-2 text-white/70 hover:text-white transition-colors">
                      Active Contracts
                    </Link>
                    <Link to="/freelancer/completed-jobs" className="block py-2 text-white/70 hover:text-white transition-colors">
                      Completed Jobs
                    </Link>
                    <Link to="/freelancer/agency-contracts" className="block py-2 text-white/70 hover:text-white transition-colors">
                      Agency Contracts
                    </Link>
                  </div>
                )}
              </div>

{/* Opportunity Dropdown */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpportunityOpen(!opportunityOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-[#00c26f]" />
                    <span>Opportunity</span>
                  </div>
                  {opportunityOpen ? <ChevronDown className="w-4 h-4 text-white/60" /> : <ChevronRight className="w-4 h-4 text-white/60" />}
                </button>
                {opportunityOpen && (
                  <div className="pl-9 pr-2 py-1 space-y-1 text-xs">
                    <Link to="/freelancer/proposals" className="block py-2 text-white/70 hover:text-white transition-colors">
                      My Proposals
                    </Link>
                    <Link to="/freelancer/invitations" className="block py-2 text-white/70 hover:text-white transition-colors">
                      Invitation
                    </Link>
                    <Link to="/freelancer/my-gigs" className="block py-2 text-white/70 hover:text-white transition-colors">
                      My Gigs
                    </Link>
                    <Link to="/freelancer/saved-jobs" className="block py-2 text-white/70 hover:text-white transition-colors">
                      Save Jobs
                    </Link>
                  </div>
                )}
              </div>

{/* Earnings Dropdown (Full row toggle + nested subpages) */}
              <div>
                <button
                  type="button"
                  onClick={() => setEarningsOpen(!earningsOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                    isOverviewActive || isTransactionActive || isReportActive
                      ? 'text-white bg-white/5 font-semibold'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="w-4 h-4 text-[#00c26f]" />
                    <span>Earnings</span>
                  </div>
                  {earningsOpen ? <ChevronDown className="w-4 h-4 text-white/60" /> : <ChevronRight className="w-4 h-4 text-white/60" />}
                </button>

                {earningsOpen && (
                  <div className="pl-9 pr-2 py-1.5 space-y-1 text-xs">
                    {/* Overview */}
                    <Link
                      to="/freelancer/earnings"
                      className={`block py-2 px-3 rounded-xl transition-all ${
                        isOverviewActive
                          ? 'bg-[#00c26f] text-white font-semibold shadow-sm'
                          : 'text-white/75 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Overview
                    </Link>

                    {/* Transaction */}
                    <Link
                      to="/freelancer/transaction"
                      className={`block py-2 px-3 rounded-xl transition-all ${
                        isTransactionActive
                          ? 'bg-[#00c26f] text-white font-semibold shadow-sm'
                          : 'text-white/75 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Transaction
                    </Link>

                    {/* Report */}
                    <Link
                      to="/freelancer/report"
                      className={`block py-2 px-3 rounded-xl transition-all ${
                        isReportActive
                          ? 'bg-[#00c26f] text-white font-semibold shadow-sm'
                          : 'text-white/75 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Report
                    </Link>
                  </div>
                )}
              </div>

{/* Messages */}
              <Link
                to="/freelancer/messages"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  currentPath === '/freelancer/messages' || currentPath === '/messages' || currentPath.includes('messages')
                    ? 'bg-[#00c26f] text-white font-semibold shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Messages</span>
              </Link>
            </nav>
          </div>

{/* Sign Out at bottom of sidebar matching screenshot */}
          <div className="pt-4 border-t border-white/10 px-2">
            <button
              onClick={() => navigate('/sign-in')}
              className="flex items-center gap-2.5 text-xs text-white/70 hover:text-white transition-colors py-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header matching all screenshots */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-30 px-6 sm:px-10 py-3.5 flex items-center justify-between gap-4">
          {/* Search bar matching screenshots */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input 
              type="text"
              placeholder="Search jobs, clients, skills"
              className="pl-10 pr-4 h-10 bg-slate-50 border-slate-200/80 rounded-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus-visible:ring-[#00c26f] focus-visible:bg-white transition-all"
            />
          </div>

{/* Right Controls: Notifications + User Badge matching screenshot */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>

{/* Profile Avatar & Name matching screenshot */}
            <div className="flex items-center gap-2.5 pl-1">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                <img 
                  src="/images/avatar-marcus.jpg" 
                  alt="Pulok D." 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-slate-800 hidden sm:inline-block">
                Pulok D.
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-10 lg:p-12 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}