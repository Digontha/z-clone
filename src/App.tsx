import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import FreelancerDashboardPage from './pages/FreelancerDashboardPage';
import FindWorkPage from './pages/FindWorkPage';
import EarningsOverviewPage from './pages/EarningsOverviewPage';
import EarningsTransactionPage from './pages/EarningsTransactionPage';
import EarningsReportPage from './pages/EarningsReportPage';
import MessagesPage from './pages/MessagesPage';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from './components/ui/sonner';

function FreelancerDashboardWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    // Intercept clicks on "Find work" inside the dashboard sidebar
    const handleFindWorkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest('button, a, div');
      if (el && el.textContent?.trim().toLowerCase() === 'find work') {
        e.preventDefault();
        e.stopPropagation();
        navigate('/freelancer/find-work');
      }
    };

    document.addEventListener('click', handleFindWorkClick, true);

    // Detect if "Find work" is already active without loaded feed content
    const syncActiveState = () => {
      const candidates = Array.from(document.querySelectorAll('button, a, div'));
      for (const el of candidates) {
        if (el.textContent?.trim().toLowerCase() === 'find work') {
          const isActive = 
            el.classList.contains('bg-[#00c26f]') || 
            el.classList.contains('bg-white/10') ||
            el.classList.contains('text-white');
          
          if (isActive) {
            const main = document.querySelector('main');
            if (main && (!main.textContent || !main.textContent.includes('open jobs'))) {
              navigate('/freelancer/find-work');
              break;
            }
          }
        }
      }
    };

    const timer = setTimeout(syncActiveState, 100);
    return () => {
      document.removeEventListener('click', handleFindWorkClick, true);
      clearTimeout(timer);
    };
  }, [navigate]);

  return <FreelancerDashboardPage />;
}

export default function App() {
  return (
    <ErrorBoundary name="AppRoot">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <ErrorBoundary name="HomePage">
                <HomePage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/sign-in" 
            element={
              <ErrorBoundary name="SignInPage">
                <SignInPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/login" 
            element={
              <ErrorBoundary name="SignInPage">
                <SignInPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/join" 
            element={
              <ErrorBoundary name="SignUpPage">
                <SignUpPage />
              </ErrorBoundary>
            } 
          />
<Route 
            path="/sign-up" 
            element={
              <ErrorBoundary name="SignUpPage">
                <SignUpPage />
              </ErrorBoundary>
            } 
          />
<Route 
            path="/freelancer" 
            element={
              <ErrorBoundary name="FreelancerDashboardPage">
                <FreelancerDashboardWrapper />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ErrorBoundary name="FreelancerDashboardPage">
                <FreelancerDashboardWrapper />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/find-work" 
            element={
              <ErrorBoundary name="FindWorkPage">
                <FindWorkPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/find-work" 
            element={
              <ErrorBoundary name="FindWorkPage">
                <FindWorkPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/jobs" 
            element={
              <ErrorBoundary name="FindWorkPage">
                <FindWorkPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/findwork" 
            element={
              <ErrorBoundary name="FindWorkPage">
                <FindWorkPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/saved-jobs" 
            element={
              <ErrorBoundary name="FindWorkPage">
                <FindWorkPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/job-offers" 
            element={
              <ErrorBoundary name="FreelancerDashboardPage">
                <FreelancerDashboardPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/completed-jobs" 
            element={
              <ErrorBoundary name="FreelancerDashboardPage">
                <FreelancerDashboardPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/agency-contracts" 
            element={
              <ErrorBoundary name="FreelancerDashboardPage">
                <FreelancerDashboardPage />
              </ErrorBoundary>
            } 
          />
<Route 
            path="/freelancer/my-jobs" 
            element={
              <ErrorBoundary name="FreelancerDashboardPage">
                <FreelancerDashboardPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/my-gigs" 
            element={
              <ErrorBoundary name="FreelancerDashboardPage">
                <FreelancerDashboardPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/gigs" 
            element={
              <ErrorBoundary name="FreelancerDashboardPage">
                <FreelancerDashboardPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/proposals" 
            element={
              <ErrorBoundary name="FreelancerDashboardPage">
                <FreelancerDashboardPage />
              </ErrorBoundary>
            } 
          />
<Route 
            path="/freelancer/invitations" 
            element={
              <ErrorBoundary name="FreelancerDashboardPage">
                <FreelancerDashboardPage />
              </ErrorBoundary>
            } 
          />
{/* Earnings Overview Routes */}
          <Route 
            path="/freelancer/earnings" 
            element={
              <ErrorBoundary name="EarningsOverviewPage">
                <EarningsOverviewPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/overview" 
            element={
              <ErrorBoundary name="EarningsOverviewPage">
                <EarningsOverviewPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/earnings/overview" 
            element={
              <ErrorBoundary name="EarningsOverviewPage">
                <EarningsOverviewPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/earnings-overview" 
            element={
              <ErrorBoundary name="EarningsOverviewPage">
                <EarningsOverviewPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/earnings" 
            element={
              <ErrorBoundary name="EarningsOverviewPage">
                <EarningsOverviewPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/overview" 
            element={
              <ErrorBoundary name="EarningsOverviewPage">
                <EarningsOverviewPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/earnings/overview" 
            element={
              <ErrorBoundary name="EarningsOverviewPage">
                <EarningsOverviewPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/earnings-overview" 
            element={
              <ErrorBoundary name="EarningsOverviewPage">
                <EarningsOverviewPage />
              </ErrorBoundary>
            } 
          />

          {/* Earnings Transactions Routes */}
          <Route 
            path="/freelancer/transaction" 
            element={
              <ErrorBoundary name="EarningsTransactionPage">
                <EarningsTransactionPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/transactions" 
            element={
              <ErrorBoundary name="EarningsTransactionPage">
                <EarningsTransactionPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/earnings/transaction" 
            element={
              <ErrorBoundary name="EarningsTransactionPage">
                <EarningsTransactionPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/earnings/transactions" 
            element={
              <ErrorBoundary name="EarningsTransactionPage">
                <EarningsTransactionPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/transactions" 
            element={
              <ErrorBoundary name="EarningsTransactionPage">
                <EarningsTransactionPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/transaction" 
            element={
              <ErrorBoundary name="EarningsTransactionPage">
                <EarningsTransactionPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/earnings/transactions" 
            element={
              <ErrorBoundary name="EarningsTransactionPage">
                <EarningsTransactionPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/earnings/transaction" 
            element={
              <ErrorBoundary name="EarningsTransactionPage">
                <EarningsTransactionPage />
              </ErrorBoundary>
            } 
          />

{/* Messages Routes */}
          <Route 
            path="/freelancer/messages" 
            element={
              <ErrorBoundary name="MessagesPage">
                <MessagesPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/messages" 
            element={
              <ErrorBoundary name="MessagesPage">
                <MessagesPage />
              </ErrorBoundary>
            } 
          />

          {/* Earnings Reports Routes */}
          <Route 
            path="/freelancer/report" 
            element={
              <ErrorBoundary name="EarningsReportPage">
                <EarningsReportPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/reports" 
            element={
              <ErrorBoundary name="EarningsReportPage">
                <EarningsReportPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/earnings/report" 
            element={
              <ErrorBoundary name="EarningsReportPage">
                <EarningsReportPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/earnings/reports" 
            element={
              <ErrorBoundary name="EarningsReportPage">
                <EarningsReportPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <ErrorBoundary name="EarningsReportPage">
                <EarningsReportPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/report" 
            element={
              <ErrorBoundary name="EarningsReportPage">
                <EarningsReportPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/earnings/reports" 
            element={
              <ErrorBoundary name="EarningsReportPage">
                <EarningsReportPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/earnings/report" 
            element={
              <ErrorBoundary name="EarningsReportPage">
                <EarningsReportPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/freelancer/*" 
            element={
              <ErrorBoundary name="FreelancerDashboardPage">
                <FreelancerDashboardPage />
              </ErrorBoundary>
            } 
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </ErrorBoundary>
  );
}