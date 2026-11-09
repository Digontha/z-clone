import { useState } from 'react';
import { Link } from 'react-router-dom';
import FreelancerLayout from '../components/dashboard/FreelancerLayout';
import { Search, Download, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface TransactionItem {
  id: string;
  title: string;
  client: string;
  date: string;
  status: 'Released' | 'Completed' | 'Pending';
  amount: string;
  isNegative?: boolean;
}

const EARNING_TRANSACTIONS: TransactionItem[] = [
  { id: 'tx-1', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Nov 9, 2026', status: 'Released', amount: '$179.00' },
  { id: 'tx-2', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Nov 2, 2026', status: 'Released', amount: '$216.00' },
  { id: 'tx-3', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Oct 26, 2026', status: 'Released', amount: '$129.00' },
  { id: 'tx-4', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Oct 20, 2026', status: 'Released', amount: '$240.00' },
  { id: 'tx-5', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Oct 12, 2026', status: 'Released', amount: '$240.00' },
  { id: 'tx-6', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Oct 5, 2026', status: 'Released', amount: '$232.00' },
  { id: 'tx-7', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Sep 29, 2026', status: 'Released', amount: '$217.00' },
  { id: 'tx-8', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Sep 22, 2026', status: 'Released', amount: '$240.00' },
  { id: 'tx-9', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Sep 15, 2026', status: 'Released', amount: '$240.00' },
  { id: 'tx-10', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Sep 8, 2026', status: 'Released', amount: '$230.00' },
  { id: 'tx-11', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Sep 1, 2026', status: 'Released', amount: '$240.00' },
  { id: 'tx-12', title: 'Development Support - CFL & Zee', client: 'CoFoundersLab', date: 'Aug 25, 2026', status: 'Released', amount: '$220.00' },
];

const WITHDRAW_TRANSACTIONS: TransactionItem[] = [
  { id: 'wd-1', title: 'Direct to Local Bank Account (Wire Transfer)', client: 'Bank Payout', date: 'Nov 10, 2026', status: 'Completed', amount: '-$250.00', isNegative: true },
  { id: 'wd-2', title: 'Direct to Local Bank Account', client: 'Bank Payout', date: 'Nov 3, 2026', status: 'Completed', amount: '-$210.00', isNegative: true },
  { id: 'wd-3', title: 'Payoneer Withdrawal #8921', client: 'Payoneer', date: 'Oct 27, 2026', status: 'Completed', amount: '-$125.00', isNegative: true },
  { id: 'wd-4', title: 'Payoneer Withdrawal #8843', client: 'Payoneer', date: 'Oct 21, 2026', status: 'Completed', amount: '-$235.00', isNegative: true },
  { id: 'wd-5', title: 'Direct to Local Bank Account', client: 'Bank Payout', date: 'Oct 13, 2026', status: 'Completed', amount: '-$235.00', isNegative: true },
  { id: 'wd-6', title: 'Direct to Local Bank Account', client: 'Bank Payout', date: 'Oct 6, 2026', status: 'Completed', amount: '-$228.00', isNegative: true },
  { id: 'wd-7', title: 'Direct to Local Bank Account', client: 'Bank Payout', date: 'Sep 30, 2026', status: 'Completed', amount: '-$212.00', isNegative: true },
  { id: 'wd-8', title: 'Direct to Local Bank Account', client: 'Bank Payout', date: 'Sep 23, 2026', status: 'Completed', amount: '-$235.00', isNegative: true },
  { id: 'wd-9', title: 'Direct to Local Bank Account', client: 'Bank Payout', date: 'Sep 16, 2026', status: 'Completed', amount: '-$235.00', isNegative: true },
];

export default function EarningsTransactionPage() {
  const [activeTab, setActiveTab] = useState<'earning' | 'withdraw' | 'pending'>('earning');
  const [searchQuery, setSearchQuery] = useState('');

  const currentList = activeTab === 'earning' 
    ? EARNING_TRANSACTIONS 
    : activeTab === 'withdraw' 
      ? WITHDRAW_TRANSACTIONS 
      : [];

  const filteredList = currentList.filter(item => 
    item.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    item.client?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    item.date?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const handleExport = () => {
    toast.success('Transactions exported', {
      description: 'Your CSV statement has been downloaded.',
    });
  };

  return (
    <FreelancerLayout>
      <div className="space-y-8 animate-in fade-in-50 duration-300">
{/* Header matching Screenshot 2 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Transactions
            </h1>
            <p className="text-sm text-slate-500 font-normal">
              Every earning and withdrawal across all your contracts.
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
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-900 shadow-sm"
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

        {/* 4 Stat Cards matching Screenshot 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Gross Earnings */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[135px]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Gross Earnings
            </span>
            <span className="text-3xl font-bold text-slate-900 tracking-tight my-1.5">
              $2,623.00
            </span>
            <span className="text-xs text-slate-400">
              Admin-released · VAT incl.
            </span>
          </div>

          {/* Card 2: Pending Settlement */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[135px]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Pending Settlement
            </span>
            <span className="text-3xl font-bold text-slate-900 tracking-tight my-1.5">
              $0.00
            </span>
            <span className="text-xs text-slate-400">
              In clearance / escrow
            </span>
          </div>

          {/* Card 3: Pending Withdrawal */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[135px]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Pending Withdrawal
            </span>
            <span className="text-3xl font-bold text-slate-900 tracking-tight my-1.5">
              $0.00
            </span>
            <span className="text-xs text-slate-400">
              Awaiting payout
            </span>
          </div>

          {/* Card 4: Money Out */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[135px]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Money Out (Withdrawn)
            </span>
            <span className="text-3xl font-bold text-slate-900 tracking-tight my-1.5">
              -$2,195.46
            </span>
            <span className="text-xs text-slate-400">
              Completed payouts
            </span>
          </div>
        </div>

        {/* Filter Controls Row matching Screenshot 2 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Tabs on Left: Earning 12 | Withdraw 9 | Pending Settlement 0 */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('earning')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'earning'
                  ? 'bg-[#00c26f] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Earning</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'earning' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                12
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('withdraw')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'withdraw'
                  ? 'bg-[#00c26f] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Withdraw</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'withdraw' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                9
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'pending'
                  ? 'bg-[#00c26f] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Pending Settlement</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'pending' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                0
              </span>
            </button>
          </div>

          {/* Search & Export on Right */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search earning..."
                className="pl-8 pr-3 h-9 text-xs rounded-lg bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-[#00c26f]"
              />
            </div>

            <button
              type="button"
              onClick={handleExport}
              className="h-9 px-3.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Transactions List Card matching Screenshot 2 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
          {filteredList.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400">
              No transactions found for the selected criteria.
            </div>
          ) : (
            filteredList.map((item) => (
              <div 
                key={item.id}
                className="p-5 sm:px-7 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
              >
                {/* Left side: title + client date */}
                <div className="space-y-1">
                  <div className="font-semibold text-xs sm:text-sm text-[#00c26f] hover:underline cursor-pointer">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-400">
                    {item.client} · {item.date}
                  </div>
                </div>

                {/* Right side: Released badge + Amount */}
                <div className="flex items-center gap-6 sm:gap-10">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                    {item.status}
                  </span>

                  <span className={`text-sm sm:text-base font-bold text-right min-w-[70px] ${
                    item.isNegative ? 'text-slate-800' : 'text-[#00c26f]'
                  }`}>
                    {item.amount}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </FreelancerLayout>
  );
}