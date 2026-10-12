import React from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Calendar, 
  Clock, 
  ArrowUpRight,
  Settings
} from 'lucide-react';

export default function Footer() {
  const { setActiveTab, setIsAdminMode, setAdminModalOpen } = useAuction();

  return (
    <footer className="bg-[#070a10] border-t border-slate-800 text-slate-400 text-sm">
      {/* Upper Brand Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Principal */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-16 w-auto p-1 bg-black/50 border border-slate-800 rounded">
                <img 
                  src="/assets/logo.png" 
                  alt="Montgomery's Premier Auction Group" 
                  className="h-14 object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white tracking-wide">
                  MONTGOMERY'S
                </h3>
                <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
                  PREMIER AUCTION GROUP
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              With over 25 years in the industry, Founder & Principal Auctioneer John Montgomery specializes in high-stakes real estate and heavy machinery auctions. His commitment to transparency and excellence is the cornerstone of Montgomery Premier.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 font-medium">
                <Award className="w-3.5 h-3.5" /> 25+ Years Proven Excellence
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Bonded & Insured
              </span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase font-serif-luxury border-b border-slate-800 pb-2">
              Auction Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('upcoming')} className="hover:text-amber-400 transition-colors">
                  Upcoming Auctions & Calendar
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('buynow')} className="hover:text-amber-400 transition-colors">
                  Buy Now Sales (Equipment Liquidation)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('catalog')} className="hover:text-amber-400 transition-colors">
                  Search Full Catalog & Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('live')} className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 font-medium">
                  Live Simulcast Auction Room <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-amber-400 transition-colors">
                  Contact Us & Consignment
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Asset Classes */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase font-serif-luxury border-b border-slate-800 pb-2">
              Specialized Asset Classes
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-300">Commercial & Agricultural Real Estate</li>
              <li className="text-slate-300">Heavy Construction Equipment</li>
              <li className="text-slate-300">High-Horsepower Farm Tractors</li>
              <li className="text-slate-300">Commercial Fleets & Heavy Haul</li>
              <li className="text-slate-300">Industrial Fabrication & Shop Tooling</li>
              <li className="text-slate-300">Complete Corporate Fleet Liquidations</li>
            </ul>
          </div>

          {/* Col 5: Direct Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase font-serif-luxury border-b border-slate-800 pb-2">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-500">Official Inquiries:</div>
                  <a 
                    href="mailto:john.montgomery@montgomeryauctiongroup.com" 
                    className="text-slate-200 hover:text-amber-400 transition-colors break-all font-mono text-xs"
                  >
                    john.montgomery@montgomeryauctiongroup.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-500">Direct Office Line:</div>
                  <a href="tel:8595550188" className="text-slate-200 hover:text-amber-400 font-mono text-xs">
                    (859) 555-0188
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-500">Headquarters & Central Yard:</div>
                  <p className="text-xs text-slate-300">
                    4800 Industrial Parkway<br />Lexington, KY 40511
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsAdminMode(true);
                    setAdminModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors py-1"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Client / Admin Management Portal</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-black/60 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Montgomery's Premier Auction Group. All rights reserved. John Montgomery, Principal Auctioneer.
          </p>
          <div className="flex items-center gap-6">
            <span>Terms & Conditions</span>
            <span>Simulcast Bidding Policy</span>
            <span>Consignor Privacy</span>
            <span className="text-amber-500/80">Kentucky Board of Auctioneers Lic #2489</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
