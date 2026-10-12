import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  X, 
  User, 
  ShieldCheck, 
  Heart, 
  Gavel, 
  ShoppingBag, 
  FileText, 
  LogOut, 
  CheckCircle,
  Building,
  Mail,
  Phone
} from 'lucide-react';

export default function AuthModal() {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    user, 
    setUser, 
    catalog, 
    buyNowSales, 
    setSelectedLotModal,
    showToast 
  } = useAuction();

  const [mode, setMode] = useState(user.isLoggedIn ? 'profile' : 'login'); // 'login' | 'register' | 'profile'
  const [loginEmail, setLoginEmail] = useState('');
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  if (!authModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      isLoggedIn: true,
      email: loginEmail || prev.email
    }));
    showToast(`Welcome back, ${user.name}! Bidder ID #${user.bidderNumber} ready.`);
    setMode('profile');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newBidderNum = `MP-${Math.floor(1000 + Math.random() * 9000)}`;
    setUser({
      isLoggedIn: true,
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      company: registerData.company,
      bidderNumber: newBidderNum,
      approvedBiddingLimit: 250000,
      watchlist: [],
      activeBids: [],
      purchases: []
    });
    showToast(`Profile created! Approved Bidder ID #${newBidderNum} issued.`, 'success');
    setMode('profile');
  };

  const handleLogout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    showToast("Signed out of bidder account", "info");
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl relative animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Mode (Logged In) */}
        {user.isLoggedIn && mode === 'profile' ? (
          <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-serif-luxury text-2xl font-black shadow-lg shadow-amber-500/20">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif-luxury text-xl font-bold text-white">
                    {user.name}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      Bidder #{user.bidderNumber}
                    </span>
                    <span>&bull;</span>
                    <span>{user.company || 'Verified Private Bidder'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950/60 hover:text-red-300 border border-slate-700 text-xs text-slate-300 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Approval Limits & Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Pre-Approved Limit</span>
                <span className="font-serif-luxury text-lg font-bold text-amber-400">
                  ${(user.approvedBiddingLimit || 500000).toLocaleString()}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Simulcast Status</span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Approved Bidder
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Contact Info</span>
                <span className="text-xs text-slate-300 block truncate mt-1 font-mono">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Active Bids */}
            <div className="space-y-3">
              <h3 className="font-serif-luxury text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Gavel className="w-4 h-4 text-amber-500" />
                <span>Your Active Bids ({user.activeBids?.length || 0})</span>
              </h3>

              {user.activeBids && user.activeBids.length > 0 ? (
                <div className="space-y-2">
                  {user.activeBids.map((bid, i) => {
                    const item = catalog.find(c => c.id === bid.id);
                    return (
                      <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-white block font-medium">
                            {item ? item.title : `Lot #${bid.id}`}
                          </strong>
                          <span className="text-slate-500 font-mono text-[11px]">Placed {new Date(bid.time).toLocaleDateString()}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-amber-400 block">${bid.amount.toLocaleString()}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            bid.status === 'High Bidder' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-red-950 text-red-300'
                          }`}>
                            {bid.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No active bids placed yet.</p>
              )}
            </div>

            {/* Saved Watchlist */}
            <div className="space-y-3">
              <h3 className="font-serif-luxury text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Saved Watchlist ({user.watchlist?.length || 0})</span>
              </h3>

              {user.watchlist && user.watchlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {user.watchlist.map((id) => {
                    const item = catalog.find(c => c.id === id) || buyNowSales.find(b => b.id === id);
                    if (!item) return null;
                    return (
                      <div 
                        key={id}
                        onClick={() => {
                          setAuthModalOpen(false);
                          setSelectedLotModal(item);
                        }}
                        className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-colors flex items-center gap-3"
                      >
                        <img src={item.image} alt={item.title} className="w-12 h-10 object-cover rounded bg-slate-900" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-white truncate">{item.title}</div>
                          <div className="text-[10px] text-amber-400 font-mono">${(item.price || item.currentBid || 0).toLocaleString()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No equipment bookmarked yet.</p>
              )}
            </div>

            {/* Purchases & Invoices */}
            <div className="space-y-3">
              <h3 className="font-serif-luxury text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>Settled Purchases & Bills of Sale ({user.purchases?.length || 0})</span>
              </h3>

              {user.purchases && user.purchases.length > 0 ? (
                <div className="space-y-2">
                  {user.purchases.map((pur, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono text-amber-500 font-bold block text-[11px]">{pur.orderId}</span>
                        <strong className="text-white block font-medium">{pur.itemTitle}</strong>
                        <span className="text-slate-500">{pur.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-white block">${pur.amount.toLocaleString()}</span>
                        <span className="text-[10px] text-emerald-400">{pur.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No settled purchases yet.</p>
              )}
            </div>

          </div>
        ) : mode === 'login' ? (
          /* Sign In Form */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Bidder Access</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                Sign In to Your Bidder Account
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Access live simulcasts, place verified increments, and view your active machinery watchlist.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Registered Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="r.harrison@bluegrassholdings.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Password / PIN</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  defaultValue="demo1234"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
              >
                Sign In & Enter Live Bidding
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-400 border-t border-slate-800">
              New bidder?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-amber-400 hover:underline font-bold"
              >
                Register a new bidder profile
              </button>
            </div>
          </div>
        ) : (
          /* Register Form */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>Instant Bidder Approval</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                Create Your Bidder Profile
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Join live simulcasts, submit Buy Now reservations, and bid in all upcoming Montgomery Premier events.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4 max-w-md mx-auto">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Full Name / Authorized Signer *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thomas Wayne"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Company Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Wayne Contracting LLC"
                  value={registerData.company}
                  onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="t.wayne@domain.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Direct Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 234-5678"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
              >
                Register & Issue Bidder Number
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-400 border-t border-slate-800">
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-amber-400 hover:underline font-bold"
              >
                Sign in here
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
