import { useState } from 'react';
import { Link } from 'react-router-dom';
import FreelancerLayout from '../components/dashboard/FreelancerLayout';

export default function EarningsOverviewPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'this-week' | 'last-week' | 'two-weeks'>('this-week');

  return (
    <FreelancerLayout>
      <div className="space-y-8 animate-in fade-in-50 duration-300">
        {/* Header matching Screenshot 3 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Earnings
            </h1>
            <p className="text-sm text-slate-500 font-normal">
              Your income, escrow, transactions and reports across all contracts.
            </p>
          </div>

          {/* Quick tab switcher between Overview, Transactions, and Reports */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <Link
              to="/freelancer/earnings"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-900 shadow-sm"
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
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Reports
            </Link>
          </div>
        </div>

        {/* Subheading */}
        <div className="pt-2">
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            Earnings overview
          </h2>
        </div>

        {/* 4 Stat Cards Row matching Screenshot 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Work In Progress (Active card with green border) */}
          <div className="bg-white border-2 border-[#00c26f] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[130px]">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              $6.00
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-2">
              Work In Progress
            </span>
          </div>

          {/* Card 2: Work In Review */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[130px]">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              $0.00
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-2">
              Work In Review
            </span>
          </div>

          {/* Card 3: Processing */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[130px]">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              $0.00
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-2">
              Processing
            </span>
          </div>

          {/* Card 4: Available Funds */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[130px]">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              $373.28
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-2">
              Available Funds
            </span>
          </div>
        </div>

        {/* Section 1: Current work sheet matching Screenshot 3 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          {/* Work sheet header */}
          <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Current work sheet
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Nov 9 – Nov 15, 2026
              </p>
            </div>

            {/* Time filters matching screenshot: This week, Last week, 2 weeks ago */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedTimeRange('this-week')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedTimeRange === 'this-week'
                    ? 'bg-[#00c26f] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                This week
              </button>
              <button
                type="button"
                onClick={() => setSelectedTimeRange('last-week')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedTimeRange === 'last-week'
                    ? 'bg-[#00c26f] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                Last week
              </button>
              <button
                type="button"
                onClick={() => setSelectedTimeRange('two-weeks')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedTimeRange === 'two-weeks'
                    ? 'bg-[#00c26f] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                2 weeks ago
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Hourly contracts</th>
                  <th className="py-4 px-3 font-semibold text-center">Mon</th>
                  <th className="py-4 px-3 font-semibold text-center">Tue</th>
                  <th className="py-4 px-3 font-semibold text-center">Wed</th>
                  <th className="py-4 px-3 font-semibold text-center">Thu</th>
                  <th className="py-4 px-3 font-semibold text-center">Fri</th>
                  <th className="py-4 px-3 font-semibold text-center">Sat</th>
                  <th className="py-4 px-3 font-semibold text-center">Sun</th>
                  <th className="py-4 px-4 font-semibold text-center">Hours</th>
                  <th className="py-4 px-4 font-semibold text-center">Rate</th>
                  <th className="py-4 px-6 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-[#00c26f] hover:underline cursor-pointer">
                      Development Support - CFL & Zee
                    </div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      Sean Walsh · CoFoundersLab&apos;s Team
                    </div>
                  </td>
                  <td className="py-4 px-3 text-center font-medium">1:00</td>
                  <td className="py-4 px-3 text-center text-slate-400">0</td>
                  <td className="py-4 px-3 text-center text-slate-400">0</td>
                  <td className="py-4 px-3 text-center text-slate-400">0</td>
                  <td className="py-4 px-3 text-center text-slate-400">0</td>
                  <td className="py-4 px-3 text-center text-slate-400">0</td>
                  <td className="py-4 px-3 text-center text-slate-400">0</td>
                  <td className="py-4 px-4 text-center font-bold text-slate-800">1:00</td>
                  <td className="py-4 px-4 text-center text-slate-500 font-medium">$6/hr</td>
                  <td className="py-4 px-6 text-right font-bold text-slate-900">$6.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Week total footer row */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="font-bold text-slate-800">Week total</span>
            <span className="font-extrabold text-slate-900 text-base">$6.00</span>
          </div>
        </div>

        {/* Section 2: Fixed-price contracts matching Screenshot 3 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-7 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Fixed-price contracts
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              No active fixed contracts
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-6 font-semibold">Contract</th>
                  <th className="py-3 px-6 font-semibold">Client</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                  <th className="py-3 px-6 font-semibold text-right">Budget</th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Empty state text */}
          <div className="py-14 text-center text-xs text-slate-400 font-medium">
            No active fixed-price contracts found.
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
}