import { useState } from 'react';
import FreelancerLayout from '../components/dashboard/FreelancerLayout';
import { Search, Paperclip, Send, CheckCheck, ChevronUp, User, ExternalLink, FileText, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface Message {
  id: string;
  sender: 'client' | 'freelancer';
  text?: string;
  time: string;
  isOffer?: boolean;
  offerDetails?: {
    title: string;
    rate: string;
    type: string;
    contractId: string;
  };
}

interface Conversation {
  id: string;
  clientName: string;
  clientSubtitle: string;
  projectSnippet: string;
  company: string;
  avatar: string;
  date: string;
  lastMessage: string;
  unreadCount?: number;
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    clientName: 'Sean W.',
    clientSubtitle: '(Development Su... )',
    projectSnippet: '(Development Support - CFL & Zee)',
    company: 'CoFoundersLab',
    avatar: '/images/avatar-marcus.jpg',
    date: 'Aug 17',
    lastMessage: 'Thank you for the offer',
  },
  {
    id: 'conv-2',
    clientName: 'Elena Rostova',
    clientSubtitle: '(AI Extraction P... )',
    projectSnippet: '(AI Extraction Pipeline - LLM)',
    company: 'BioSynthetica Inc.',
    avatar: '/images/avatar-elena.jpg',
    date: 'Aug 15',
    lastMessage: 'Can you start on Monday?',
  },
  {
    id: 'conv-3',
    clientName: 'Sarah Jenkins',
    clientSubtitle: '(Design System... )',
    projectSnippet: '(Design System & UI Components)',
    company: 'KiteFlow Logistics',
    avatar: '/images/avatar-priya.jpg',
    date: 'Aug 12',
    lastMessage: 'Figma prototypes reviewed and approved.',
  }
];

export default function MessagesPage() {
  const [conversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>('conv-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [selectedOfferContract, setSelectedOfferContract] = useState<{ title: string; rate: string; company: string } | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'client',
      time: '07:45 PM',
      isOffer: true,
      offerDetails: {
        title: 'Development Support - CFL & Zee',
        rate: '$6/hr',
        type: 'Hourly',
        contractId: 'CTR-92841'
      }
    },
    {
      id: 'm-2',
      sender: 'client',
      time: '07:45 PM',
      isOffer: true,
      offerDetails: {
        title: 'Development Support - CFL & Zee',
        rate: '$6/hr',
        type: 'Hourly',
        contractId: 'CTR-92841'
      }
    },
    {
      id: 'm-3',
      sender: 'freelancer',
      text: 'Thank you for the offer',
      time: '08:32 PM'
    }
  ]);

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText?.trim()) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: 'freelancer',
      text: inputText?.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    toast.success('Message sent');
  };

  const filteredConversations = conversations.filter(c =>
    c.clientName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    c.company?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    c.lastMessage?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <FreelancerLayout>
      <div className="max-w-7xl mx-auto space-y-5 pb-12">
        {/* Top Header matching screenshot */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Messages
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200/80">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>Freelancer Inbox</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Your personal freelancer conversations with clients and agencies.
          </p>
        </div>

        {/* Messaging Box matching screenshot */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[640px]">
          {/* Left Column: Conversations List */}
          <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-slate-200/80 flex flex-col bg-white shrink-0">
            {/* Search Input matching screenshot */}
            <div className="p-3.5 border-b border-slate-100">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations"
                  className="pl-9 pr-3 h-9 bg-slate-50 border-slate-200/70 rounded-full text-xs placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-[#00c26f]"
                />
              </div>
            </div>

            {/* Conversation Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filteredConversations.map((conv) => {
                const isSelected = conv.id === activeConvId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors ${
                      isSelected
                        ? 'bg-[#eefcf5]'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                      <img
                        src={conv.avatar}
                        alt={conv.clientName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-semibold text-slate-900 truncate">
                          {conv.clientName} <span className="font-normal text-slate-500">{conv.clientSubtitle}</span>
                        </span>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {conv.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Chat Thread matching screenshot */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#fafcfb]">
            {/* Header matching screenshot */}
            <div className="p-4 sm:px-6 bg-white border-b border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                <img
                  src={activeConv.avatar}
                  alt={activeConv.clientName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {activeConv.clientName} <span className="font-normal text-slate-600">{activeConv.projectSnippet}</span>
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  {activeConv.company}
                </p>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-5">
              {messages.map((msg, index) => {
                if (msg.isOffer && msg.offerDetails) {
                  const isRightAligned = index === 1;
                  return (
                    <div key={msg.id} className={`flex flex-col ${isRightAligned ? 'items-end' : 'items-start'} space-y-3`}>
                      {/* Offer Card Container */}
                      <div className="w-full max-w-sm rounded-2xl border border-slate-200/90 bg-[#f4fbf7] p-4 text-left shadow-xs transition-all">
                        {/* Offer Header */}
                        <div className="flex items-center justify-between text-xs text-slate-600 font-medium pb-2 border-b border-slate-200/60 mb-2.5">
                          <span className="truncate pr-2">
                            Offer • {msg.offerDetails.title}
                          </span>
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        </div>

                        {/* Offer Content */}
                        <div className="space-y-1 mb-3.5">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {msg.offerDetails.title}
                          </h4>
                          <p className="text-xs text-slate-600 font-medium">
                            {msg.offerDetails.type} <strong className="font-bold text-slate-900">{msg.offerDetails.rate}</strong>
                          </p>
                        </div>

                        {/* Action buttons matching screenshot */}
                        <div className="flex items-center gap-2.5 pt-1">
                          <Button
                            size="sm"
                            onClick={() => setSelectedOfferContract({
                              title: msg.offerDetails!.title,
                              rate: msg.offerDetails!.rate,
                              company: activeConv.company
                            })}
                            className="h-8 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 rounded-xl text-xs font-semibold shadow-xs"
                          >
                            Open Contract
                          </Button>
                          <button
                            onClick={() => toast.info('Navigating to job posting details')}
                            className="text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors"
                          >
                            View Job Post
                          </button>
                        </div>
                      </div>

                      {/* Timestamp capsule matching screenshot */}
                      {!isRightAligned && (
                        <div className="px-3 py-1 bg-white border border-slate-200/80 rounded-full text-[11px] text-slate-500 font-medium shadow-xs">
                          {msg.time}
                        </div>
                      )}
                    </div>
                  );
                }

                // Regular chat bubble
                const isFreelancer = msg.sender === 'freelancer';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isFreelancer ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-normal shadow-xs ${
                        isFreelancer
                          ? 'bg-[#00c26f] text-white rounded-br-sm'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isFreelancer ? 'text-white/80' : 'text-slate-400'
                      }`}>
                        <span>{msg.time}</span>
                        {isFreelancer && <CheckCheck className="w-3.5 h-3.5 text-white/90" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar matching screenshot */}
            <div className="p-4 bg-white border-t border-slate-200/80">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
                {/* Paperclip attachment icon */}
                <button
                  type="button"
                  onClick={() => toast.info('File attachment dialog opened')}
                  className="w-9 h-9 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
                  aria-label="Attach file"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                {/* Input with placeholder matching screenshot */}
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Message ${activeConv.clientName}`}
                    className="h-10 pl-4 pr-10 bg-slate-50 border-slate-200/80 rounded-full text-xs sm:text-sm placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-[#00c26f] transition-all"
                  />
                </div>

                {/* Send Button matching screenshot */}
                <Button
                  type="submit"
                  size="icon"
                  className="w-10 h-10 rounded-full bg-[#00c26f] hover:bg-[#00a85f] text-white shadow-sm shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Detail Modal when clicking "Open Contract" */}
      <Dialog open={!!selectedOfferContract} onOpenChange={(open) => !open && setSelectedOfferContract(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00c26f]" />
              <span>Contract Offer Details</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Review terms for this engagement
            </DialogDescription>
          </DialogHeader>

          {selectedOfferContract && (
            <div className="space-y-3 py-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Role</span>
                <p className="font-bold text-slate-800 text-sm">{selectedOfferContract.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block mb-0.5">Client</span>
                  <span className="font-semibold text-slate-800">{selectedOfferContract.company}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block mb-0.5">Offered Rate</span>
                  <span className="font-semibold text-[#00c26f] text-sm">{selectedOfferContract.rate}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-[11px] leading-relaxed flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00c26f] shrink-0" />
                <span>Payment escrow protection verified for this contract.</span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedOfferContract(null)}
              className="text-xs"
            >
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setSelectedOfferContract(null);
                toast.success('Contract accepted! You can now log billable hours.');
              }}
              className="bg-[#00c26f] hover:bg-[#00a85f] text-white text-xs font-semibold gap-1.5"
            >
              Accept Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FreelancerLayout>
  );
}