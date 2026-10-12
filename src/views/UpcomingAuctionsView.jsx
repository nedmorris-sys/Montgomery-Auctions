import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  Calendar as CalendarIcon, 
  List, 
  MapPin, 
  Clock, 
  Share2, 
  Radio, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  FileText,
  Users,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function UpcomingAuctionsView() {
  const { 
    upcomingAuctions, 
    setActiveTab, 
    setShareAuctionModal, 
    isAdminMode, 
    deleteUpcomingAuction,
    setAdminModalOpen
  } = useAuction();

  const [viewStyle, setViewStyle] = useState('list'); // 'list' | 'calendar'
  
  // Simple calendar navigation state (Default October 2026)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 9, 1)); // October 2026

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthYearString = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Generate days in month for calendar
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push({ empty: true, key: `empty-${i}` });
  }
  for (let day = 1; day <= totalDays; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const auctionsOnDay = upcomingAuctions.filter(a => a.date === dateStr);
    calendarDays.push({
      empty: false,
      day,
      dateStr,
      auctions: auctionsOnDay,
      key: `day-${day}`
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Mode Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs tracking-wider uppercase mb-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Auction Calendar & Simulcast Schedule</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Upcoming Premier Auctions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            View scheduled live on-site & online simulcast auctions. Add events to your calendar and share with colleagues.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Calendar / List View Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setViewStyle('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                viewStyle === 'list'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List Schedule</span>
            </button>
            <button
              onClick={() => setViewStyle('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                viewStyle === 'calendar'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Interactive Calendar</span>
            </button>
          </div>

          {/* Client Admin Add button */}
          {isAdminMode && (
            <button
              onClick={() => setAdminModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Auction Event</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content: List View */}
      {viewStyle === 'list' ? (
        <div className="space-y-6">
          {upcomingAuctions.map((auction) => (
            <div 
              key={auction.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 rounded-2xl overflow-hidden shadow-2xl transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Image Section */}
                <div className="lg:col-span-4 relative min-h-[220px] lg:min-h-full overflow-hidden bg-slate-950">
                  <img 
                    src={auction.image} 
                    alt={auction.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                  <div className="absolute top-3 left-3">
                    {auction.isLiveNow ? (
                      <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg animate-pulse">
                        <Radio className="w-3.5 h-3.5" /> Live Simulcast Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-sm border border-slate-700 text-amber-400 text-xs font-semibold">
                        {auction.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Info Section */}
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    
                    {/* Date and Share Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-4 text-amber-400 font-bold font-mono">
                        <span className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          {auction.date}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {auction.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isAdminMode && (
                          <button
                            onClick={() => deleteUpcomingAuction(auction.id)}
                            title="Client: Remove Auction"
                            className="p-1.5 rounded-lg bg-red-950/80 text-red-300 border border-red-500/50 hover:bg-red-900"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => setShareAuctionModal(auction)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-amber-500/50 transition-colors text-xs font-medium"
                        >
                          <Share2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Share / Add to Cal</span>
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {auction.title}
                    </h2>

                    {/* Location */}
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{auction.location} ({auction.venueAddress})</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {auction.description}
                    </p>

                    {/* Preview info & featured lot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                        <span className="text-slate-500 block text-[10px] uppercase font-semibold">Inspection & Preview:</span>
                        <span className="text-slate-200 font-medium">{auction.previewDates}</span>
                      </div>
                      <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                        <span className="text-slate-500 block text-[10px] uppercase font-semibold">Featured Machinery Lot:</span>
                        <span className="text-amber-400 font-medium">{auction.featuredLot}</span>
                      </div>
                    </div>

                  </div>

                  {/* Footer & Actions */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6 text-xs text-slate-400">
                      <div>
                        <strong className="text-white font-mono text-sm">{auction.lotCount}</strong> Total Lots
                      </div>
                      <div>
                        <strong className="text-white font-mono text-sm">{auction.registeredBidders}</strong> Registered Bidders
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveTab('catalog')}
                        className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all"
                      >
                        Browse Lot Catalog
                      </button>

                      {auction.isLiveNow ? (
                        <button
                          onClick={() => setActiveTab('live')}
                          className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-900/40 transition-all animate-pulse"
                        >
                          <Radio className="w-3.5 h-3.5" />
                          <span>Enter Live Bidding Room</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTab('live')}
                          className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
                        >
                          <span>Simulcast Room</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Interactive Calendar View */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          
          {/* Calendar Month Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="font-serif-luxury text-2xl font-bold text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-amber-500" />
              <span>{monthYearString}</span>
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((cell) => {
              if (cell.empty) {
                return (
                  <div key={cell.key} className="min-h-[100px] rounded-lg bg-slate-950/30 border border-slate-800/40 opacity-30" />
                );
              }

              const hasAuctions = cell.auctions && cell.auctions.length > 0;

              return (
                <div
                  key={cell.key}
                  className={`min-h-[110px] p-2 rounded-lg border transition-all flex flex-col justify-between ${
                    hasAuctions
                      ? 'bg-slate-900 border-amber-500/50 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold font-mono ${hasAuctions ? 'text-amber-400' : 'text-slate-400'}`}>
                      {cell.day}
                    </span>
                    {hasAuctions && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    )}
                  </div>

                  {hasAuctions && (
                    <div className="space-y-1.5 my-1">
                      {cell.auctions.map(auc => (
                        <div
                          key={auc.id}
                          onClick={() => setShareAuctionModal(auc)}
                          className="p-1.5 rounded bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/30 cursor-pointer transition-colors"
                        >
                          <div className="text-[10px] font-bold text-amber-300 truncate">
                            {auc.time} - {auc.title}
                          </div>
                          <div className="text-[9px] text-slate-400 truncate">
                            {auc.lotCount} lots
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-right">
                    {hasAuctions && (
                      <button
                        onClick={() => setShareAuctionModal(cell.auctions[0])}
                        className="text-[9px] text-amber-400 hover:underline flex items-center gap-0.5 justify-end ml-auto"
                      >
                        <Share2 className="w-2.5 h-2.5" /> Share
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
