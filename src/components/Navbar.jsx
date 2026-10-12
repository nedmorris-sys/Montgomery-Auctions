import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  Gavel, 
  Calendar, 
  ShoppingBag, 
  Layers, 
  Mail, 
  User, 
  ShieldCheck, 
  Radio, 
  Search, 
  Menu, 
  X,
  Settings,
  SlidersHorizontal,
  PhoneCall
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery, 
    user, 
    setAuthModalOpen, 
    isAdminMode, 
    setIsAdminMode,
    setAdminModalOpen
  } = useAuction();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Gavel },
    { id: 'upcoming', label: 'Upcoming Auctions', icon: Calendar },
    { id: 'buynow', label: 'Buy Now Sales', icon: ShoppingBag },
    { id: 'catalog', label: 'Catalog', icon: Layers },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090d15]/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner / Trust Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 text-xs py-1.5 px-4 sm:px-8 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Licensed & Bonded Auctioneers | Certified CAI Principal
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              john.montgomery@montgomeryauctiongroup.com
            </span>
          </div>
          
          <div className="flex items-center gap-3 ml-auto">
            {/* Live Simulcast alert button */}
            <button
              onClick={() => setActiveTab('live')}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 hover:bg-red-900 transition-all font-semibold animate-pulse"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <Radio className="w-3 h-3 text-red-400" />
              <span>LIVE AUCTION ON NOW</span>
            </button>

            {/* Client Mode toggle */}
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                if (!isAdminMode) setAdminModalOpen(true);
              }}
              title="Toggle Client / Admin Management Mode"
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium border transition-all ${
                isAdminMode 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm shadow-amber-500/20' 
                  : 'bg-slate-800/70 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Settings className="w-3 h-3" />
              <span>{isAdminMode ? 'Client Mode: Active' : 'Client Login'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Brand */}
          <div 
            onClick={() => { setActiveTab('home'); }}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="h-14 w-auto flex items-center justify-center p-0.5 rounded bg-black/40 border border-slate-800 shadow-inner group-hover:border-amber-500/50 transition-all">
              <img 
                src="/assets/logo.png" 
                alt="Montgomery's Premier Auction Group Logo" 
                className="h-12 object-contain"
                onError={(e) => {
                  // Fallback if image path has issue
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-serif-luxury text-lg font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors">
                MONTGOMERY'S
              </div>
              <div className="text-[10px] tracking-widest text-amber-500 font-semibold uppercase">
                PREMIER AUCTION GROUP
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Search & Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search equipment, lots, tractors..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'catalog') setActiveTab('catalog');
                }}
                className="w-48 lg:w-60 bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:w-64 transition-all"
              />
            </div>

            {/* Profile / Bidder Button */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-medium transition-all"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{user.isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}</span>
              {user.isLoggedIn && (
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-mono border border-amber-500/30">
                  {user.bidderNumber}
                </span>
              )}
            </button>

            {/* Admin Management Button */}
            {isAdminMode && (
              <button
                onClick={() => setAdminModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 text-xs font-bold shadow-md hover:brightness-110 transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-950" />
                <span>Client Portal</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="p-2 text-slate-300 hover:text-white"
            >
              <User className="w-5 h-5 text-amber-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0e18] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search catalog & equipment..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'catalog') setActiveTab('catalog');
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium w-full text-left ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                setActiveTab('live');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold w-full text-left bg-red-950/60 text-red-300 border border-red-500/40"
            >
              <Radio className="w-4 h-4 text-red-400" />
              Live Auction Stream Room
            </button>

            {isAdminMode && (
              <button
                onClick={() => {
                  setAdminModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold w-full text-left bg-amber-500 text-slate-950"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Client Portal: Manage Catalog & Auctions
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
