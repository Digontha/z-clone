import { Link } from 'react-router-dom';
import FreelancerLayout from '../components/dashboard/FreelancerLayout';

interface MonthBar {
  month: string;
  amount: number;
  label: string;
  heightPercent: number; // For styling bar height
}

const MONTH_DATA: MonthBar[] = [
  { month: 'Jun', amount: 0, label: '$0.00', heightPercent: 4 },
  { month: 'Jul', amount: 0, label: '$0.00', heightPercent: 4 },
  { month: 'Aug', amount: 468, label: '$468.00', heightPercent: 51 },
  { month: 'Sep', amount: 919, label: '$919.00', heightPercent: 100 },
  { month: 'Oct', amount: 841, label: '$841.00', heightPercent: 91 },
  { month: 'Nov', amount: 395, label: '$395.00', heightPercent: 43 },
];

export default function EarningsReportPage() {
  return (
    <FreelancerLayout>
      <div className="space-y-8 animate-in fade-in-50 duration-300">
{/* Header matching Screenshot 1 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              My Reports
            </h1>
            <p className="text-sm text-slate-500 font-normal">
              Earnings trends, withdrawals and top clients across your contracts.
            </p>
          </div>

          {/* Quick tab switcher between Overview, Transactions, and Reports */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <Link
              to="/freelancer/earnings"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Overview
            </Link>
            <Link
              to="/freelancer/transactions"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Transactions
            </Link>
            <Link
              to="/freelancer/reports"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-900 shadow-sm"
            >
              Reports
            </Link>
          </div>
        </div>

        {/* 3 Stat Cards matching Screenshot 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card 1: Gross Earnings (Green border active card) */}
          <div className="bg-white border-2 border-[#00c26f] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[130px]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Gross Earnings
            </span>
            <span className="text-3xl font-bold text-slate-900 tracking-tight my-1">
              $2,623.00
            </span>
            <span className="text-xs text-slate-400">
              Last 6 months
            </span>
          </div>

          {/* Card 2: Money Withdrawn */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[130px]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Money Withdrawn
            </span>
            <span className="text-3xl font-bold text-slate-900 tracking-tight my-1">
              $2,195.46
            </span>
            <span className="text-xs text-slate-400">
              Last 6 months
            </span>
          </div>

          {/* Card 3: Total Hours */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[130px]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Hours
            </span>
            <span className="text-3xl font-bold text-slate-900 tracking-tight my-1">
              1.17 hrs
            </span>
            <span className="text-xs text-slate-400">
              All time
            </span>
          </div>
        </div>

        {/* Main Grid: Gross earnings by month (2/3) + Top clients (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Gross earnings by month Histogram Chart matching Screenshot 1 */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-7 shadow-sm flex flex-col justify-between">
            <div className="mb-8">
              <h2 className="text-base font-bold text-slate-900">
                Gross earnings by month
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Total $2,623.00 across 6 months
              </p>
            </div>

            {/* Custom Bar Chart matching screenshot aesthetic */}
            <div className="h-64 sm:h-72 flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-3 px-2 sm:px-6">
              {MONTH_DATA.map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center justify-end h-full group">
                  {/* Amount on top of bar */}
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-600 mb-2 transition-transform group-hover:-translate-y-0.5">
                    {item.label}
                  </span>

                  {/* The Bar */}
                  <div className="w-full max-w-[76px] flex items-end h-[180px]">
                    <div 
                      className={`w-full rounded-2xl transition-all duration-500 ease-out shadow-sm ${
                        item.amount > 0 
                          ? 'bg-gradient-to-t from-[#00c26f] to-[#00d87c] group-hover:from-[#00b064] group-hover:to-[#00c26f]' 
                          : 'bg-[#00c26f] h-2 rounded-full'
                      }`}
                      style={{ 
                        height: item.amount > 0 ? `${item.heightPercent}%` : '8px' 
                      }}
                    />
                  </div>

                  {/* Month Label */}
                  <span className="text-xs font-medium text-slate-400 mt-3">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Top clients Card matching Screenshot 1 */}
          <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-7 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-6">
                Top clients
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800">CoFoundersLab</span>
                  <span className="text-slate-900 font-bold">$2,623.00</span>
                </div>

                {/* Progress bar matching green line */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#00c26f] rounded-full" />
                </div>

                <div className="text-[11px] text-slate-400">
                  1 contract
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 text-[11px] text-slate-400">
              Showing top client relationships by billed volume.
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
}