import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  Tractor, 
  DollarSign, 
  CheckCircle, 
  ArrowRight, 
  Plus, 
  Trash2, 
  MapPin, 
  Clock, 
  FileCheck2,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

export default function BuyNowSalesView() {
  const { 
    buyNowSales, 
    setBuyNowModal, 
    setMakeOfferModal, 
    isAdminMode, 
    deleteBuyNowItem,
    setAdminModalOpen 
  } = useAuction();

  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = [
    'All',
    'Heavy Equipment',
    'Farm Equipment',
    'On & Off-Road Vehicles',
    'Farm Equipment & Tools'
  ];

  const filteredSales = buyNowSales.filter(item => {
    if (selectedFilter !== 'All' && item.category !== selectedFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Trust Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs tracking-wider uppercase mb-1">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Direct Consignor Liquidation Program</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Buy Now Sales & Immediate Liquidation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Acquire major high-value assets immediately without waiting for auction day. Premium heavy machinery, tractors, commercial service rigs, and shop packages ready for immediate wire settlement and pickup.
          </p>
        </div>

        {/* Client Admin Action */}
        {isAdminMode && (
          <button
            onClick={() => setAdminModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Buy Now Asset</span>
          </button>
        )}
      </div>

      {/* Guarantee & Liquidation Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-amber-400 flex-shrink-0" />
          <div className="text-xs">
            <strong className="text-white block font-medium">Independent Pre-Sale Inspection</strong>
            <span className="text-slate-400">Diagnostic fluid analysis, hydraulic load tests, and frame check verified.</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <FileCheck2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
          <div className="text-xs">
            <strong className="text-white block font-medium">Clear Title & Lien-Free Guarantee</strong>
            <span className="text-slate-400">Guaranteed free of all commercial liens and encumbrances with rapid title release.</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <Truck className="w-8 h-8 text-blue-400 flex-shrink-0" />
          <div className="text-xs">
            <strong className="text-white block font-medium">Immediate Yard Load-Out</strong>
            <span className="text-slate-400">Heavy equipment ramps, forklift assist, and lowboy loading free of yard fees.</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedFilter === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSales.map((item) => {
          const isSold = item.status === 'Sold';

          return (
            <div 
              key={item.id}
              className={`bg-slate-900/90 border rounded-2xl overflow-hidden shadow-2xl flex flex-col group transition-all duration-300 ${
                isSold 
                  ? 'border-slate-800 opacity-60' 
                  : 'border-slate-800 hover:border-amber-500/60 hover:-translate-y-1'
              }`}
            >
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden bg-slate-950">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.urgency && (
                    <span className="px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm border border-red-500/40 text-red-300 text-[10px] font-semibold">
                      {item.urgency}
                    </span>
                  )}
                </div>

                {isSold ? (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-lg bg-red-600 text-white font-serif-luxury text-xl font-bold tracking-wider uppercase transform -rotate-6 border-2 border-white shadow-2xl">
                      SOLD / RESERVED
                    </span>
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
                    Save ${item.savings ? item.savings.toLocaleString() : '15,000'}
                  </div>
                )}

                {isAdminMode && (
                  <button
                    onClick={() => deleteBuyNowItem(item.id)}
                    title="Client: Remove or Mark Sold"
                    className="absolute bottom-3 right-3 p-1.5 rounded bg-red-950/90 text-red-300 border border-red-500 hover:bg-red-900"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <div className="absolute bottom-3 left-3 text-xs text-white">
                  <span className="bg-black/75 px-2.5 py-1 rounded text-amber-400 font-mono">
                    {item.year} &bull; {item.hours}
                  </span>
                </div>
              </div>

              {/* Item Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Highlights Specs pill */}
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {item.condition}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {item.warranty || 'Clear Title'}
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Direct Buy Now Price
                    </span>
                    <span className="font-serif-luxury text-2xl font-bold text-amber-400">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 line-through block">
                      ${item.originalPrice ? item.originalPrice.toLocaleString() : ''}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium">
                      Immediate Wire / ACH
                    </span>
                  </div>
                </div>

                {/* Actions */}
                {!isSold ? (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setBuyNowModal(item)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy Now</span>
                    </button>

                    <button
                      onClick={() => setMakeOfferModal(item)}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-amber-500/50 transition-colors flex items-center justify-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      <span>Make Offer</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-2 text-xs font-mono text-slate-500 border border-slate-800 rounded-lg">
                    This asset was sold or reserved.
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
