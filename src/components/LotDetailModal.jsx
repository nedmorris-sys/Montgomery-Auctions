import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  X, 
  Gavel, 
  Heart, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Tag, 
  FileText, 
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function LotDetailModal() {
  const { 
    selectedLotModal, 
    setSelectedLotModal, 
    placeLiveBid, 
    user, 
    setAuthModalOpen, 
    toggleWatchlist,
    showToast
  } = useAuction();

  const [bidIncrement, setBidIncrement] = useState('');

  if (!selectedLotModal) return null;

  const item = selectedLotModal;
  const isWatchlisted = user.watchlist.includes(item.id);
  const currentBid = item.currentBid || item.startingBid || 0;

  const handlePlaceBid = (amount) => {
    if (!user.isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }
    placeLiveBid(item.id, amount);
  };

  const handleCustomBid = (e) => {
    e.preventDefault();
    const amount = Number(bidIncrement);
    if (!amount || amount <= currentBid) {
      showToast(`Your bid must exceed $${currentBid.toLocaleString()}`, 'error');
      return;
    }
    handlePlaceBid(amount);
    setBidIncrement('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl relative animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedLotModal(null)}
          className="absolute top-4 right-4 z-20 text-slate-300 hover:text-white bg-black/60 p-2 rounded-full backdrop-blur-sm border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column (5 cols): Media & Specs */}
          <div className="md:col-span-5 bg-slate-950 p-6 space-y-5 border-b md:border-b-0 md:border-r border-slate-800">
            <div className="relative rounded-xl overflow-hidden aspect-video sm:aspect-square bg-slate-900 border border-slate-800 shadow-inner">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-amber-400 font-mono text-xs font-bold border border-amber-500/40">
                LOT #{item.lotNumber}
              </div>
            </div>

            {/* Quick Specs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                Certified Machine Specifications
              </h4>
              <div className="space-y-2 text-xs">
                {item.specs ? Object.entries(item.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-slate-850 text-slate-300">
                    <span className="text-slate-500">{key}:</span>
                    <span className="font-semibold text-white text-right">{val}</span>
                  </div>
                )) : (
                  <div className="text-slate-400">Standard OEM specification suite.</div>
                )}
              </div>
            </div>

            {/* Certified Inspection Badge */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Montgomery Verified Inspection</strong>
                <span>Hour meter reading verified. Fluid analysis and operational safety checks recorded on file.</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Bidding Console & Details */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  {item.category} &bull; Year {item.year}
                </span>

                <button
                  onClick={() => toggleWatchlist(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    isWatchlisted 
                      ? 'bg-red-500/20 text-red-300 border-red-500/50' 
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWatchlisted ? 'fill-current text-red-400' : ''}`} />
                  <span>{isWatchlisted ? 'Watchlisted' : 'Add to Watchlist'}</span>
                </button>
              </div>

              <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                {item.title}
              </h2>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>{item.location}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Bidding Summary Box */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/40 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase font-medium text-slate-400 block">
                      Current High Bid
                    </span>
                    <span className="font-serif-luxury text-3xl font-extrabold gold-gradient-text">
                      ${currentBid.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">
                      Estimated Value: <strong className="text-white">${item.estimatedValue ? item.estimatedValue.toLocaleString() : 'N/A'}</strong>
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">
                      {item.bidsCount || 0} competitive bids placed
                    </span>
                  </div>
                </div>

                {/* Quick Bid Increment Buttons */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                    Instant Increment Buttons
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handlePlaceBid(currentBid + 1000)}
                      className="py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 hover:border-amber-500/50 transition-all flex items-center justify-center gap-1"
                    >
                      <Gavel className="w-3.5 h-3.5 text-amber-400" />
                      <span>+$1,000</span>
                    </button>
                    <button
                      onClick={() => handlePlaceBid(currentBid + 2500)}
                      className="py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 hover:border-amber-500/50 transition-all flex items-center justify-center gap-1"
                    >
                      <Gavel className="w-3.5 h-3.5 text-amber-400" />
                      <span>+$2,500</span>
                    </button>
                    <button
                      onClick={() => handlePlaceBid(currentBid + 5000)}
                      className="py-2.5 px-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1 shadow-md"
                    >
                      <Gavel className="w-3.5 h-3.5" />
                      <span>+$5,000</span>
                    </button>
                  </div>
                </div>

                {/* Custom Bid input */}
                <form onSubmit={handleCustomBid} className="flex gap-2 pt-1">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">$</span>
                    <input
                      type="number"
                      placeholder={`Enter > $${currentBid}`}
                      value={bidIncrement}
                      onChange={(e) => setBidIncrement(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
                  >
                    Place Bid
                  </button>
                </form>
              </div>

            </div>

            {/* Bottom Status */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Letter of Guarantee / Pre-Approved Credit Active</span>
              </div>
              <div className="font-mono text-amber-400">
                Bidder #{user.bidderNumber}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
