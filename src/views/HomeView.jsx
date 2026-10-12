import React from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  Gavel, 
  ArrowRight, 
  Radio, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  ChevronRight, 
  Clock, 
  MapPin, 
  DollarSign, 
  Layers, 
  ShoppingBag, 
  Share2, 
  CheckCircle,
  Truck,
  Wrench,
  Building2,
  Tractor
} from 'lucide-react';

export default function HomeView() {
  const { 
    setActiveTab, 
    upcomingAuctions, 
    buyNowSales, 
    catalog, 
    setShareAuctionModal, 
    setSelectedLotModal, 
    setBuyNowModal 
  } = useAuction();

  const featuredAuctions = upcomingAuctions.slice(0, 3);
  const featuredBuyNow = buyNowSales.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden border-b border-slate-800 bg-[#090d15]">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity filter blur-[1px]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2000&q=80')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d15] via-[#090d15]/85 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8 z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-lg shadow-amber-500/5 animate-fade-in">
            <Award className="w-4 h-4 text-amber-400" />
            <span>25+ Years of Proven Excellence in High-Stakes Auctions</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              High-Stakes Real Estate, <br />
              <span className="gold-gradient-text">Heavy Machinery</span> & Asset Liquidations
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Transparent, competitive, and nationwide bidding. Led by Founder & Principal Auctioneer <strong className="text-white">John Montgomery</strong>. Connecting qualified corporate buyers with premier construction, agricultural, and commercial property assets.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('upcoming')}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
            >
              <span>Explore Upcoming Auctions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('buynow')}
              className="px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 hover:border-amber-500/50 transition-all flex items-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Buy Now Liquidation Inventory</span>
            </button>

            <button
              onClick={() => setActiveTab('live')}
              className="px-5 py-3.5 rounded-xl bg-red-950/70 hover:bg-red-900/80 text-red-200 font-semibold text-sm border border-red-500/40 transition-all flex items-center gap-2"
            >
              <Radio className="w-4 h-4 text-red-400 animate-pulse" />
              <span>Simulcast Room</span>
            </button>
          </div>

          {/* Key Proof Metrics */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-xl p-4 text-center">
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-400">25+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Years Industry Experience</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-xl p-4 text-center">
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">$250M+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Assets Liquidated</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-xl p-4 text-center">
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-400">50</div>
              <div className="text-xs text-slate-400 font-medium mt-1">States Bidder Reach</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-xl p-4 text-center">
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">99.4%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Successful Settlement Rate</div>
            </div>
          </div>

        </div>
      </section>

      {/* Meet John Montgomery Section (As requested in Doc Page 2 & 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#121927] border border-amber-500/30 p-8 sm:p-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Portrait Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-amber-700 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-amber-500/50 shadow-2xl w-72 sm:w-80 h-auto">
                  <img 
                    src="/assets/john_montgomery.png" 
                    alt="John Montgomery, Founder & Principal Auctioneer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if needed
                      e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-center">
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                      Montgomery's Premier
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" /> Leadership & Pedigree
                </div>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
                  John Montgomery
                </h2>
                <p className="text-amber-500 font-medium text-base sm:text-lg">
                  Founder & Principal Auctioneer
                </p>
              </div>

              {/* Exact Text from Client Document Page 3 */}
              <blockquote className="border-l-4 border-amber-500 pl-5 text-slate-200 text-lg sm:text-xl font-light italic leading-relaxed bg-slate-950/40 py-3 rounded-r-lg">
                "With over 25 years in the industry, John specializes in high-stakes real estate and heavy machinery auctions. His commitment to transparency and excellence is the cornerstone of Montgomery Premier."
              </blockquote>

              <p className="text-slate-300 text-sm leading-relaxed">
                Whether liquidating multimillion-dollar contractor machinery fleets, generational farmland, or specialized commercial terminals, John personally oversees asset cataloging, marketing strategy, and live simulcast execution to maximize true market realization.
              </p>

              {/* Key Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Licensed & Bonded Principal Auctioneer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Specialist in Tier 4 Heavy Equipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Nationwide Buyer Network & Marketing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Rapid Consignor Settlement & Escrow</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
                >
                  Contact John Montgomery Directly
                </button>
                <a
                  href="mailto:john.montgomery@montgomeryauctiongroup.com"
                  className="text-xs text-slate-300 hover:text-amber-400 transition-colors font-mono underline decoration-amber-500/40 underline-offset-4"
                >
                  john.montgomery@montgomeryauctiongroup.com
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Featured Upcoming Auctions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-amber-500 font-semibold text-xs tracking-wider uppercase mb-1">
              Mark Your Calendar
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              Upcoming Premier Auctions
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('upcoming')}
              className="text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>View Full Calendar & Schedule</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAuctions.map((auction) => (
            <div 
              key={auction.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 rounded-xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image & Status */}
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img 
                  src={auction.image} 
                  alt={auction.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {auction.isLiveNow ? (
                    <span className="px-2.5 py-1 rounded bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg animate-pulse">
                      <Radio className="w-3 h-3" /> Live Now
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-slate-900/85 backdrop-blur-sm border border-slate-700 text-slate-200 text-[11px] font-medium">
                      {auction.status}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => setShareAuctionModal(auction)}
                    title="Share auction or add to calendar"
                    className="p-2 rounded-lg bg-slate-900/85 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-all shadow-md"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{auction.date} at {auction.time}</span>
                  </div>
                </div>
              </div>

              {/* Auction Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {auction.title}
                  </h3>
                  <div className="flex items-start gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{auction.location}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {auction.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div>
                    <span className="text-white font-bold">{auction.lotCount}</span> Lots Cataloged
                  </div>
                  <div>
                    <span className="text-white font-bold">{auction.registeredBidders}</span> Bidders Registered
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      if (auction.isLiveNow) {
                        setActiveTab('live');
                      } else {
                        setActiveTab('catalog');
                      }
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-center transition-all ${
                      auction.isLiveNow 
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30' 
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    }`}
                  >
                    {auction.isLiveNow ? 'Join Simulcast' : 'Browse Catalog'}
                  </button>

                  <button
                    onClick={() => setShareAuctionModal(auction)}
                    className="py-2 px-3 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Add to Cal</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Buy Now Sales (Client Liquidation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-amber-500 font-semibold text-xs tracking-wider uppercase mb-1">
              Immediate Client Liquidation
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              Featured "Buy Now" Sales
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Big-ticket heavy equipment, farm machinery, and vehicles ready for immediate acquisition without waiting for auction day.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('buynow')}
            className="text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View All Buy Now Equipment</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBuyNow.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-xl overflow-hidden shadow-xl flex flex-col group transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {item.category}
                </div>
                <div className="absolute top-3 right-3 bg-slate-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded">
                  Save ${item.savings.toLocaleString()}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[11px] text-amber-400 font-medium">
                    {item.year} &bull; {item.hours}
                  </div>
                  <h3 className="font-serif-luxury text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Buy Now Price</span>
                    <span className="font-serif-luxury text-xl font-bold text-white">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 line-through block">
                      ${item.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">
                      Immediate Release
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setBuyNowModal(item)}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  Purchase Now or Make Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Specialties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-amber-500 font-semibold text-xs tracking-wider uppercase">
            Full-Spectrum Liquidation Solutions
          </div>
          <h2 className="font-serif-luxury text-3xl font-bold text-white">
            Specialized Asset Liquidation Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Tailored appraisal, marketing, and live execution across high-value commercial sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={() => setActiveTab('catalog')}
            className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
              Heavy Construction
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Excavators, wheel loaders, crawler dozers, backhoes, scrapers, and compaction machinery from top brands.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('catalog')}
            className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Tractor className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
              Farm Equipment & Tools
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Row-crop & 4WD tractors, combines, grain carts, round balers, shop welders, and precision agricultural implements.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('catalog')}
            className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
              On & Off-Road Fleets
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tri-axle heavy dump trucks, Peterbilt & Kenworth road tractors, mechanics service rigs, trailers, and side-by-sides.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('catalog')}
            className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
              High-Stakes Real Estate
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Commercial terminals, industrial fabrication yards with active rail spurs, agricultural acreage, and corporate sites.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-amber-500 font-semibold text-xs tracking-wider uppercase">
              Seamless Process
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              How Montgomery Premier Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center font-serif-luxury text-lg">
                1
              </div>
              <h4 className="text-white font-bold text-base">Register Your Profile</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Create your verified bidder profile in under 2 minutes. Obtain instant approval for live simulcast and buy now purchases.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center font-serif-luxury text-lg">
                2
              </div>
              <h4 className="text-white font-bold text-base">Inspect & Review</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review verified maintenance logs, high-resolution photo suites, hours verification, or visit our yards during scheduled preview days.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center font-serif-luxury text-lg">
                3
              </div>
              <h4 className="text-white font-bold text-base">Bid Live or Buy Now</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bid in real-time from anywhere in the world on our interactive simulcast console, or purchase select assets directly via Buy Now.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center font-serif-luxury text-lg">
                4
              </div>
              <h4 className="text-white font-bold text-base">Settlement & Transport</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enjoy transparent escrow settlements, clear titles, on-site forklift & crane load-out assistance, and nationwide logistics coordination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consignor Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-slate-950 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold tracking-widest uppercase bg-black/15 px-3 py-1 rounded-full">
              For Fleet Owners & Consignors
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-slate-950">
              Need to Liquidate Heavy Machinery or Commercial Real Estate?
            </h3>
            <p className="text-slate-900 text-sm leading-relaxed font-medium">
              Turn idle machinery, agricultural equipment, or corporate property into cash with John Montgomery's proven multi-channel marketing engine.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('contact')}
            className="px-8 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm tracking-wide uppercase transition-all shadow-xl hover:scale-105 flex-shrink-0"
          >
            Request Private Consultation
          </button>
        </div>
      </section>

    </div>
  );
}
