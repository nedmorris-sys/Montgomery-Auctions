import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  X, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  DollarSign, 
  FileText,
  CreditCard,
  Building
} from 'lucide-react';

export default function BuyNowModal() {
  const { buyNowModal, setBuyNowModal, processBuyNowPurchase, user, setAuthModalOpen } = useAuction();

  const [paymentMethod, setPaymentMethod] = useState('wire');
  const [buyerName, setBuyerName] = useState(user.name || '');
  const [buyerEmail, setBuyerEmail] = useState(user.email || '');
  const [buyerPhone, setBuyerPhone] = useState(user.phone || '');
  const [companyName, setCompanyName] = useState(user.company || '');
  const [pickupDate, setPickupDate] = useState('2026-10-28');
  const [agreedTerms, setAgreedTerms] = useState(false);

  if (!buyNowModal) return null;

  const item = buyNowModal;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreedTerms) {
      alert("Please agree to the liquidation settlement and pickup terms.");
      return;
    }

    processBuyNowPurchase(item, {
      name: buyerName,
      email: buyerEmail,
      phone: buyerPhone,
      company: companyName,
      paymentMethod,
      pickupDate
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl relative animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={() => setBuyNowModal(null)}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          
          {/* Header */}
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4" />
              <span>Immediate Equipment Purchase & Reservation</span>
            </div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white pr-8">
              {item.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span>Category: <strong className="text-white">{item.category}</strong></span>
              <span>Location: <strong className="text-white">{item.location}</strong></span>
            </div>
          </div>

          {/* Pricing Calculation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Agreed Liquidation Price:</span>
              <span className="font-mono text-white text-sm font-bold">${item.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Standard Dealer Retail Value:</span>
              <span className="line-through text-slate-500 font-mono">${item.originalPrice ? item.originalPrice.toLocaleString() : ''}</span>
            </div>
            <div className="flex justify-between text-xs text-emerald-400 font-semibold border-t border-slate-800 pt-2">
              <span>Immediate Liquidation Savings:</span>
              <span className="font-mono">-${item.savings ? item.savings.toLocaleString() : '0'}</span>
            </div>
          </div>

          {/* Buyer Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-serif-luxury">
              Purchaser & Bill of Sale Info
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-medium">Full Legal / Entity Name *</label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-medium">Company / LLC (Optional)</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-medium">Email for Invoice & Title *</label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-medium">Direct Phone *</label>
                <input
                  type="tel"
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Payment & Transport */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-serif-luxury">
              Payment & Transport Method
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <label 
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                  paymentMethod === 'wire' 
                    ? 'bg-amber-500/15 border-amber-500 text-white font-semibold' 
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'wire'}
                  onChange={() => setPaymentMethod('wire')}
                  className="hidden"
                />
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Bank Wire / Escrow ACH</span>
              </label>

              <label 
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                  paymentMethod === 'check' 
                    ? 'bg-amber-500/15 border-amber-500 text-white font-semibold' 
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'check'}
                  onChange={() => setPaymentMethod('check')}
                  className="hidden"
                />
                <Building className="w-4 h-4 text-amber-400" />
                <span>Certified Cashier's Check</span>
              </label>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <Truck className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>Target Load-Out Date:</span>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs"
              />
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-0"
              />
              <span>
                I agree to the Montgomery Premier Buy Now terms. Wire transfer or certified payment within 48 hours. Asset release upon confirmed escrow funds.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Confirm Acquisition & Generate Bill of Sale</span>
          </button>

        </form>

      </div>
    </div>
  );
}
