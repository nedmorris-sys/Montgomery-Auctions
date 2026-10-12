import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  HelpCircle,
  Building,
  Calendar
} from 'lucide-react';

export default function ContactUsView() {
  const { showToast } = useAuction();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Consign Heavy Equipment',
    message: '',
    urgency: 'Standard (Within 1-2 weeks)'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitted(true);
    showToast(`Inquiry sent directly to John Montgomery. We will review your equipment and contact you promptly.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Direct Access to Principal Auctioneer</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
          Contact Montgomery Premier
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Whether you are looking to liquidate a single multi-ton excavator, an entire fleet, or 500 acres of commercial land, John Montgomery and his senior team are ready to advise you.
        </p>
      </div>

      {/* Main Grid: Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Contact Information & Yards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Email Card */}
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="font-serif-luxury text-lg font-bold text-white border-b border-slate-800 pb-3">
              Principal Auctioneer Contact
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Official Email</div>
                  <a 
                    href="mailto:john.montgomery@montgomeryauctiongroup.com" 
                    className="text-amber-400 hover:text-amber-300 font-mono text-sm break-all font-semibold"
                  >
                    john.montgomery@montgomeryauctiongroup.com
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">Monitored directly by John Montgomery</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Direct Line / Appraisal Desk</div>
                  <a href="tel:8595550188" className="text-white hover:text-amber-400 font-mono text-base font-bold">
                    (859) 555-0188
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">Toll-free across US & Canada</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Yard & Office Hours</div>
                  <div className="text-white text-xs font-medium">Monday - Friday: 8:00 AM - 5:00 PM EST</div>
                  <div className="text-slate-400 text-xs">Saturday: 9:00 AM - 1:00 PM (Auction Preview Days)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Yard Hubs */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="font-serif-luxury text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              <span>Inspection & Storage Yards</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <strong className="text-amber-400 block text-sm font-serif-luxury">Lexington Central Yard & Arena (HQ)</strong>
                <p className="text-slate-300 mt-1">4800 Industrial Parkway, Lexington, KY 40511</p>
                <p className="text-slate-500 mt-0.5">Heavy machinery ramps, 50-ton scale, full staging bays.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <strong className="text-amber-400 block text-sm font-serif-luxury">Midwest Agricultural Terminal</strong>
                <p className="text-slate-300 mt-1">1220 Corn Belt Highway, Springfield, IL 62707</p>
                <p className="text-slate-500 mt-0.5">Tractor, combine & farm implement display grounds.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <strong className="text-amber-400 block text-sm font-serif-luxury">Commercial Fleet & Transport Hub</strong>
                <p className="text-slate-300 mt-1">7700 Grade Lane, Louisville, KY 40219</p>
                <p className="text-slate-500 mt-0.5">Commercial truck parking & certified title administration.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Interactive Inquiry Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
            
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-white">
                Request Consignment or Bidding Consultation
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Fill out the form below. For urgent equipment liquidations, John Montgomery will personally contact you.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-amber-500/10 border border-amber-500/40 text-center space-y-4 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="font-serif-luxury text-xl font-bold text-white">Thank You, {formData.name}</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Your request has been routed to <strong>john.montgomery@montgomeryauctiongroup.com</strong>. We will get back to you shortly with valuation insights or bidding credentials.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', inquiryType: 'Consign Heavy Equipment', message: '', urgency: 'Standard' });
                  }}
                  className="px-6 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs uppercase"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Campbell"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Bluegrass Contracting Inc."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Inquiry Purpose</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      <option>Consign Heavy Equipment</option>
                      <option>Consign Farm Machinery / Tractors</option>
                      <option>Commercial Real Estate Auction</option>
                      <option>Buy Now Immediate Purchase Inquiry</option>
                      <option>Bidder Registration & Credit Approval</option>
                      <option>General Question</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Liquidation Urgency</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      <option>Immediate (Under 14 Days)</option>
                      <option>Upcoming 30-60 Days Auction</option>
                      <option>Future Planning / Appraisal</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Equipment or Property Details *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe machine makes, models, hours, year, or real estate acreage and location..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Submit Inquiry to John Montgomery</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
