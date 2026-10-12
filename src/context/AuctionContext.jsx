import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CATALOG, INITIAL_BUY_NOW_SALES, INITIAL_UPCOMING_AUCTIONS, INITIAL_USER } from '../data/initialData';
import { auctionAudio } from '../utils/sound';

const AuctionContext = createContext();

export function AuctionProvider({ children }) {
  // Navigation
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLotModal, setSelectedLotModal] = useState(null);
  const [shareAuctionModal, setShareAuctionModal] = useState(null);
  const [buyNowModal, setBuyNowModal] = useState(null);
  const [makeOfferModal, setMakeOfferModal] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(() => {
    return localStorage.getItem('montgomery_admin_mode') === 'true';
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // State with localStorage persistence
  const [catalog, setCatalog] = useState(() => {
    const saved = localStorage.getItem('montgomery_catalog');
    return saved ? JSON.parse(saved) : INITIAL_CATALOG;
  });

  const [buyNowSales, setBuyNowSales] = useState(() => {
    const saved = localStorage.getItem('montgomery_buynow');
    return saved ? JSON.parse(saved) : INITIAL_BUY_NOW_SALES;
  });

  const [upcomingAuctions, setUpcomingAuctions] = useState(() => {
    const saved = localStorage.getItem('montgomery_auctions');
    return saved ? JSON.parse(saved) : INITIAL_UPCOMING_AUCTIONS;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('montgomery_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Live Auction Stream State
  const [liveStreamSettings, setLiveStreamSettings] = useState(() => {
    const saved = localStorage.getItem('montgomery_stream_settings');
    return saved ? JSON.parse(saved) : {
      activeAuctionId: "AUC-2026-01",
      streamEmbedUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&enablejsapi=1", // High-quality ambient live stream
      isLiveBroadcasting: true,
      currentLotId: "CAT-101",
      currentBid: 168000,
      bidHistory: [
        { bidder: "Bidder #4082 (You)", amount: 168000, time: "Just now" },
        { bidder: "Floor Bidder #104", amount: 165000, time: "2m ago" },
        { bidder: "Online Bidder #3911", amount: 160000, time: "4m ago" },
        { bidder: "Floor Bidder #208", amount: 155000, time: "6m ago" }
      ]
    };
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('montgomery_catalog', JSON.stringify(catalog));
  }, [catalog]);

  useEffect(() => {
    localStorage.setItem('montgomery_buynow', JSON.stringify(buyNowSales));
  }, [buyNowSales]);

  useEffect(() => {
    localStorage.setItem('montgomery_auctions', JSON.stringify(upcomingAuctions));
  }, [upcomingAuctions]);

  useEffect(() => {
    localStorage.setItem('montgomery_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('montgomery_admin_mode', isAdminMode ? 'true' : 'false');
  }, [isAdminMode]);

  useEffect(() => {
    localStorage.setItem('montgomery_stream_settings', JSON.stringify(liveStreamSettings));
  }, [liveStreamSettings]);

  // Client Admin Operations: Catalog
  const addCatalogItem = (newItem) => {
    const item = {
      ...newItem,
      id: `CAT-${Date.now().toString().slice(-4)}`,
      lotNumber: newItem.lotNumber || (catalog.length + 101).toString(),
      currentBid: Number(newItem.startingBid) || 0,
      bidsCount: 0,
      reserveMet: false,
      closingDate: newItem.closingDate || new Date(Date.now() + 7 * 86400000).toISOString()
    };
    setCatalog(prev => [item, ...prev]);
    showToast(`Added Lot #${item.lotNumber}: ${item.title}`);
  };

  const updateCatalogItem = (id, updatedFields) => {
    setCatalog(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
    showToast(`Updated item ${id}`);
  };

  const deleteCatalogItem = (id) => {
    setCatalog(prev => prev.filter(item => item.id !== id));
    showToast(`Item ${id} removed from catalog`, 'info');
  };

  // Client Admin Operations: Upcoming Auctions
  const addUpcomingAuction = (newAuction) => {
    const auction = {
      ...newAuction,
      id: `AUC-${new Date().getFullYear()}-${Date.now().toString().slice(-3)}`,
      registeredBidders: 0,
      isLiveNow: false
    };
    setUpcomingAuctions(prev => [auction, ...prev]);
    showToast(`Auction created: ${auction.title}`);
  };

  const updateUpcomingAuction = (id, updatedFields) => {
    setUpcomingAuctions(prev => prev.map(auc => auc.id === id ? { ...auc, ...updatedFields } : auc));
    showToast(`Updated auction ${id}`);
  };

  const deleteUpcomingAuction = (id) => {
    setUpcomingAuctions(prev => prev.filter(auc => auc.id !== id));
    showToast(`Auction ${id} removed`, 'info');
  };

  // Client Admin Operations: Buy Now Sales
  const addBuyNowItem = (newItem) => {
    const item = {
      ...newItem,
      id: `BN-${Date.now().toString().slice(-4)}`,
      status: "Available"
    };
    setBuyNowSales(prev => [item, ...prev]);
    showToast(`Added Buy Now item: ${item.title}`);
  };

  const updateBuyNowItem = (id, updatedFields) => {
    setBuyNowSales(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
    showToast(`Updated Buy Now listing ${id}`);
  };

  const deleteBuyNowItem = (id) => {
    setBuyNowSales(prev => prev.map(item => item.id === id ? { ...item, status: 'Sold / Delisted' } : item));
    showToast(`Listing ${id} marked as sold/removed`, 'info');
  };

  // Reset to initial demo data
  const resetToFactoryDefaults = () => {
    setCatalog(INITIAL_CATALOG);
    setBuyNowSales(INITIAL_BUY_NOW_SALES);
    setUpcomingAuctions(INITIAL_UPCOMING_AUCTIONS);
    setUser(INITIAL_USER);
    localStorage.removeItem('montgomery_catalog');
    localStorage.removeItem('montgomery_buynow');
    localStorage.removeItem('montgomery_auctions');
    localStorage.removeItem('montgomery_user');
    showToast("Reset all catalog and auction data to defaults", "info");
  };

  // User Watchlist
  const toggleWatchlist = (itemId) => {
    setUser(prev => {
      const exists = prev.watchlist.includes(itemId);
      const newWatchlist = exists ? prev.watchlist.filter(id => id !== itemId) : [...prev.watchlist, itemId];
      showToast(exists ? "Removed from your Watchlist" : "Saved to your Watchlist");
      return { ...prev, watchlist: newWatchlist };
    });
  };

  // Live Auction Bidding
  const placeLiveBid = (lotId, amount) => {
    if (!user.isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }

    // Play bid audio
    auctionAudio.playBidBeep();

    // Update catalog item
    setCatalog(prev => prev.map(item => {
      if (item.id === lotId) {
        return {
          ...item,
          currentBid: amount,
          bidsCount: (item.bidsCount || 0) + 1,
          reserveMet: true
        };
      }
      return item;
    }));

    // Update live stream ledger
    setLiveStreamSettings(prev => ({
      ...prev,
      currentBid: amount,
      bidHistory: [
        {
          bidder: `${user.name} (#${user.bidderNumber})`,
          amount: amount,
          time: "Just now"
        },
        ...prev.bidHistory.slice(0, 9)
      ]
    }));

    // Update user active bids
    setUser(prev => {
      const existing = prev.activeBids.filter(b => b.id !== lotId);
      return {
        ...prev,
        activeBids: [
          { id: lotId, amount: amount, time: new Date().toISOString(), status: "High Bidder" },
          ...existing
        ]
      };
    });

    showToast(`Bid Placed: $${amount.toLocaleString()} on Lot #${lotId}! You are the High Bidder.`, "success");
  };

  // Buy Now Immediate Purchase Flow
  const processBuyNowPurchase = (item, paymentDetails) => {
    // Mark item as sold
    setBuyNowSales(prev => prev.map(b => b.id === item.id ? { ...b, status: 'Sold' } : b));

    const newOrder = {
      orderId: `ORD-${Date.now().toString().slice(-4)}`,
      itemTitle: item.title,
      date: new Date().toISOString().split('T')[0],
      amount: item.price,
      status: "Processing & Loading Scheduled",
      buyer: paymentDetails.name || user.name,
      contact: paymentDetails.email || user.email
    };

    setUser(prev => ({
      ...prev,
      purchases: [newOrder, ...prev.purchases]
    }));

    auctionAudio.playGavel();
    showToast(`Purchase Confirmed! Invoice #${newOrder.orderId} generated. John Montgomery's team will contact you for transport.`, "success");
    setBuyNowModal(null);
  };

  // Make an Offer
  const submitOffer = (item, offerAmount, message) => {
    showToast(`Formal offer of $${Number(offerAmount).toLocaleString()} submitted directly to John Montgomery. You will receive a response within 4 hours.`, "success");
    setMakeOfferModal(null);
  };

  return (
    <AuctionContext.Provider value={{
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery,
      selectedLotModal,
      setSelectedLotModal,
      shareAuctionModal,
      setShareAuctionModal,
      buyNowModal,
      setBuyNowModal,
      makeOfferModal,
      setMakeOfferModal,
      authModalOpen,
      setAuthModalOpen,
      adminModalOpen,
      setAdminModalOpen,
      isAdminMode,
      setIsAdminMode,
      toast,
      showToast,
      catalog,
      buyNowSales,
      upcomingAuctions,
      user,
      setUser,
      liveStreamSettings,
      setLiveStreamSettings,
      addCatalogItem,
      updateCatalogItem,
      deleteCatalogItem,
      addUpcomingAuction,
      updateUpcomingAuction,
      deleteUpcomingAuction,
      addBuyNowItem,
      updateBuyNowItem,
      deleteBuyNowItem,
      resetToFactoryDefaults,
      toggleWatchlist,
      placeLiveBid,
      processBuyNowPurchase,
      submitOffer
    }}>
      {children}
    </AuctionContext.Provider>
  );
}

export const useAuction = () => useContext(AuctionContext);
