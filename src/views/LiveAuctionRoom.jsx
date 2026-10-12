import React, { useState, useEffect } from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  Gavel, 
  ShieldCheck, 
  Clock, 
  Users, 
  Send, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Settings,
  HelpCircle
} from 'lucide-react';
import { auctionAudio } from '../utils/sound';

export default function LiveAuctionRoom() {
  const { 
    catalog, 
    liveStreamSettings, 
    setLiveStreamSettings, 
    placeLiveBid, 
    user, 
    setAuthModalOpen,
    isAdminMode,
    setAdminModalOpen,
    showToast
  } = useAuction();

  // Active lot on the block
  const currentLot = catalog.find(item => item.id === liveStreamSettings.currentLotId) || catalog[0];

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [customBidAmount, setCustomBidAmount] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Clerk (Montgomery Staff)", text: "Welcome to the Spring Heavy Machinery Simulcast! John Montgomery is on the podium.", time: "10:00 AM", isClerk: true },
    { id: 2, sender: "Bidder #3021", text: "Are all hydraulics on Lot 101 tested?", time: "10:02 AM", isClerk: false },
    { id: 3, sender: "Clerk (Montgomery Staff)", text: "Yes! Full CAT TA1 inspection report available in catalog. High-flow auxiliary working 100%.", time: "10:03 AM", isClerk: true },
    { id: 4, sender: "Floor Ringman (Lexington)", text: "Floor bid at $165,000!", time: "10:04 AM", isClerk: true }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Countdown timer simulation
  const [secondsLeft, setSecondsLeft] = useState(42);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          // Play warning chime when fair warning
          auctionAudio.playWarningChime();
          return 45;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBidIncrement = (increment) => {
    const current = currentLot.currentBid || currentLot.startingBid || 100000;
    const newBid = current + increment;
    placeLiveBid(currentLot.id, newBid);
    setSecondsLeft(45); // reset countdown on new bid
  };

  const handleCustomBid = (e) => {
    e.preventDefault();
    const amount = Number(customBidAmount);
    const current = currentLot.currentBid || currentLot.startingBid || 0;
    if (isNaN(amount) || amount <= current) {
      showToast(`Your bid must exceed current bid of $${current.toLocaleString()}`, "error");
      return;
    }
    placeLiveBid(currentLot.id, amount);
    setCustomBidAmount('');
    setSecondsLeft(45);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    if (!user.isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }

    const msg = {
      id: Date.now(),
      sender: `${user.name} (#${user.bidderNumber})`,
      text: newChatText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isClerk: false
    };

    setChatMessages(prev => [...prev, msg]);
    setNewChatText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Live Header Banner */}
      <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>LIVE SIMULCAST BROADCAST</span>
          </div>
          <span className="text-sm font-semibold text-white hidden sm:inline">
            Tri-State Fall Heavy Equipment & Fleet Auction
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Users className="w-4 h-4 text-amber-400" />
            <span><strong className="text-white font-mono">412</strong> Bidders Connected</span>
          </div>

          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              auctionAudio.enabled = next;
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all ${
              soundEnabled 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? 'Audio Chimes On' : 'Audio Muted'}</span>
          </button>

          {isAdminMode && (
            <button
              onClick={() => setAdminModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin Stream Settings</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Simulcast Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Stream Viewer + Current Lot Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Stream Video Player Box */}
          <div className="relative rounded-2xl overflow-hidden bg-black border-2 border-slate-800 aspect-video shadow-2xl group">
            {/* Embedded Live Video */}
            <iframe
              src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=1&showinfo=0&rel=0&modestbranding=1"
              title="Montgomery Premier Live Stream"
              className="w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Overlaid Live Auction Bar */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-white text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold">PODIUM: John Montgomery</span>
              <span className="text-slate-400">&bull; Lexington Central Ring</span>
            </div>

            {/* Countdown Fair Warning Box */}
            <div className="absolute bottom-4 right-4 z-10 bg-black/85 backdrop-blur-md border border-amber-500/50 rounded-xl p-3 text-center shadow-xl">
              <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Fair Warning In
              </div>
              <div className={`font-mono text-2xl font-black ${secondsLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                00:{String(secondsLeft).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Current Lot On The Block */}
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-mono font-bold text-sm">
                  NOW ON BLOCK: LOT #{currentLot.lotNumber}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {currentLot.category} &bull; {currentLot.year}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Location: <strong className="text-white">{currentLot.location}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-4 rounded-xl overflow-hidden h-36 bg-slate-950 border border-slate-800">
                <img src={currentLot.image} alt={currentLot.title} className="w-full h-full object-cover" />
              </div>
              <div className="sm:col-span-8 space-y-2">
                <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                  {currentLot.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {currentLot.description}
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] pt-1 text-slate-400">
                  <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    Hours: <strong className="text-white">{currentLot.hours}</strong>
                  </span>
                  <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    Condition: <strong className="text-emerald-400">{currentLot.condition}</strong>
                  </span>
                  <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    Est. Value: <strong className="text-white">${currentLot.estimatedValue ? currentLot.estimatedValue.toLocaleString() : 'N/A'}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Live Bidding Panel + Bid History + Live Chat */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Bidding Console */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-[#101726] border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block">
                Current Winning Bid
              </span>
              <div className="font-serif-luxury text-4xl sm:text-5xl font-extrabold gold-gradient-text">
                ${(currentLot.currentBid || currentLot.startingBid || 0).toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Reserve Met &bull; High Bidder: {liveStreamSettings.bidHistory[0]?.bidder || 'Simulcast'}</span>
              </div>
            </div>

            {/* Quick Bid Increment Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                One-Click Bid Increments
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleBidIncrement(1000)}
                  className="py-3 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 hover:border-amber-500/50 transition-all flex items-center justify-center gap-1 shadow-md"
                >
                  <Gavel className="w-3.5 h-3.5 text-amber-400" />
                  <span>+$1,000</span>
                </button>
                <button
                  onClick={() => handleBidIncrement(2500)}
                  className="py-3 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 hover:border-amber-500/50 transition-all flex items-center justify-center gap-1 shadow-md"
                >
                  <Gavel className="w-3.5 h-3.5 text-amber-400" />
                  <span>+$2,500</span>
                </button>
                <button
                  onClick={() => handleBidIncrement(5000)}
                  className="py-3 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 hover:border-amber-500/50 transition-all flex items-center justify-center gap-1 shadow-md"
                >
                  <Gavel className="w-3.5 h-3.5 text-amber-400" />
                  <span>+$5,000</span>
                </button>
                <button
                  onClick={() => handleBidIncrement(10000)}
                  className="py-3 px-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-md"
                >
                  <Gavel className="w-3.5 h-3.5 text-slate-950" />
                  <span>+$10,000</span>
                </button>
              </div>
            </div>

            {/* Custom Bid input */}
            <form onSubmit={handleCustomBid} className="space-y-2 pt-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">$</span>
                  <input
                    type="number"
                    placeholder="Custom Bid Amount"
                    value={customBidAmount}
                    onChange={(e) => setCustomBidAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-7 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  Place Bid
                </button>
              </div>
            </form>

            {/* User Bidder Status */}
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Your Bidder ID:</span>
              {user.isLoggedIn ? (
                <span className="font-mono text-amber-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {user.bidderNumber} ({user.name.split(' ')[0]})
                </span>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-amber-400 hover:underline font-bold"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>

          {/* Bid History Ledger */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-serif-luxury border-b border-slate-800 pb-2">
              Live Bid Ledger
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {liveStreamSettings.bidHistory.map((bid, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between text-xs p-2 rounded-lg ${
                    i === 0 
                      ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold' 
                      : 'bg-slate-950/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono">{bid.bidder}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-white">${bid.amount.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500">{bid.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simulcast Chat / Clerk Feed */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-serif-luxury border-b border-slate-800 pb-2">
              Clerk & Auction Room Feed
            </h4>
            
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 text-xs">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-2.5 rounded-lg ${
                    msg.isClerk 
                      ? 'bg-amber-950/30 border border-amber-500/30 text-amber-200' 
                      : 'bg-slate-950 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-amber-400">{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Message clerk or ask question..."
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
