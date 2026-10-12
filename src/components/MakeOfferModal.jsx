import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { X, MessageSquare, DollarSign, Send, ShieldCheck } from 'lucide-react';

export default function MakeOfferModal() {
  const { makeOfferModal, setMakeOfferModal, submitOffer, user } = useAuction();

  const [offerAmount, setOfferAmount] = useState('');
  const [offerNote, setOfferNote] = useState('');
  const [contingencies, setContingencies] = useState('Immediate Wire / As-Is Inspection');

  if (!makeOfferModal) return null;

  const item = makeOfferModal;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!offerAmount || Number(offerAmount) <= 0) {
      alert("Please enter a valid offer amount.");
      return;
    }
    submitOffer(item, offerAmount, offerNote);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-scale-in space-y-5">
        
        <button
          onClick={() => setMakeOfferModal(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Submit Direct Counter Offer</span>
          </div>
          <h3 className="font-serif-luxury text-lg font-bold text-white pr-6">
            {item.title}
          </h3>
          <p className="text-xs text-slate-400">
            Current Listed Price: <strong className="text-amber-400 font-mono">${item.price.toLocaleString()}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Your Formal Offer Amount ($ USD) *</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">$</span>
              <input
                type="number"
                required
                placeholder="e.g. 125000"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Offer Settlement Term</label>
            <select
              value={contingencies}
              onChange={(e) => setContingencies(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option>Immediate Wire / As-Is Inspection</option>
              <option>Contingent on 24hr On-Site Diagnostic Inspection</option>
              <option>Package Deal with Multi-Asset Purchase</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Message to John Montgomery (Optional)</label>
            <textarea
              rows={3}
              placeholder="Include transport timeline, fleet inquiries, or specific equipment requests..."
              value={offerNote}
              onChange={(e) => setOfferNote(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Directly transmitted to Principal Auctioneer John Montgomery. Guaranteed response within 4 hours.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-slate-950" />
            <span>Transmit Offer to John Montgomery</span>
          </button>
        </form>

      </div>
    </div>
  );
}
