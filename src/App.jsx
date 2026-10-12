import React, { useEffect } from 'react';
import { useAuction } from './context/AuctionContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomeView from './views/HomeView';
import UpcomingAuctionsView from './views/UpcomingAuctionsView';
import BuyNowSalesView from './views/BuyNowSalesView';
import CatalogView from './views/CatalogView';
import ContactUsView from './views/ContactUsView';
import LiveAuctionRoom from './views/LiveAuctionRoom';

import LotDetailModal from './components/LotDetailModal';
import ShareModal from './components/ShareModal';
import BuyNowModal from './components/BuyNowModal';
import MakeOfferModal from './components/MakeOfferModal';
import AuthModal from './components/AuthModal';
import ClientAdminModal from './components/ClientAdminModal';

export default function App() {
  const { activeTab, toast, setToast } = useAuction();

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'upcoming' && <UpcomingAuctionsView />}
        {activeTab === 'buynow' && <BuyNowSalesView />}
        {activeTab === 'catalog' && <CatalogView />}
        {activeTab === 'contact' && <ContactUsView />}
        {activeTab === 'live' && <LiveAuctionRoom />}
      </main>

      {/* Global Interactive Modals */}
      <LotDetailModal />
      <ShareModal />
      <BuyNowModal />
      <MakeOfferModal />
      <AuthModal />
      <ClientAdminModal />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
