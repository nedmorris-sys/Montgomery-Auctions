import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  X, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Layers, 
  Calendar, 
  ShoppingBag, 
  Radio, 
  RotateCcw, 
  Save, 
  CheckCircle2,
  Sliders,
  DollarSign,
  Gavel
} from 'lucide-react';
import { auctionAudio } from '../utils/sound';

export default function ClientAdminModal() {
  const { 
    adminModalOpen, 
    setAdminModalOpen, 
    catalog, 
    addCatalogItem, 
    updateCatalogItem, 
    deleteCatalogItem,
    upcomingAuctions, 
    addUpcomingAuction, 
    updateUpcomingAuction, 
    deleteUpcomingAuction,
    buyNowSales,
    addBuyNowItem,
    updateBuyNowItem,
    deleteBuyNowItem,
    liveStreamSettings,
    setLiveStreamSettings,
    resetToFactoryDefaults,
    showToast
  } = useAuction();

  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'auctions' | 'buynow' | 'stream'

  // New Catalog Item Form State
  const [newCatalogItem, setNewCatalogItem] = useState({
    title: '',
    category: 'Heavy Equipment',
    startingBid: '',
    estimatedValue: '',
    condition: 'Excellent',
    year: 2023,
    hours: '1,200 hrs',
    location: 'Montgomery Central Yard, Lexington, KY',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1000&q=80',
    description: '',
    featured: false
  });

  // New Upcoming Auction Form State
  const [newAuction, setNewAuction] = useState({
    title: '',
    date: '2026-11-14',
    time: '10:00 AM EST',
    location: 'Montgomery Central Yard, Lexington, KY & Online Simulcast',
    venueAddress: '4800 Industrial Parkway, Lexington, KY 40511',
    lotCount: 150,
    previewDates: 'Nov 12-13 (9am - 4pm)',
    status: 'Catalog Open for Pre-Bidding',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
    description: '',
    featuredLot: 'CAT 336 Hydraulic Excavator'
  });

  // New Buy Now Item Form State
  const [newBuyNow, setNewBuyNow] = useState({
    title: '',
    category: 'Heavy Equipment',
    price: '',
    originalPrice: '',
    savings: '',
    condition: 'Certified Pass',
    hours: '850 hrs',
    year: 2023,
    location: 'Montgomery Yard 1, Lexington, KY',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80',
    urgency: 'Immediate Client Liquidation',
    description: ''
  });

  if (!adminModalOpen) return null;

  const handleAddCatalog = (e) => {
    e.preventDefault();
    if (!newCatalogItem.title || !newCatalogItem.startingBid) {
      alert("Please provide at least a title and starting bid.");
      return;
    }
    addCatalogItem(newCatalogItem);
    setNewCatalogItem({
      title: '',
      category: 'Heavy Equipment',
      startingBid: '',
      estimatedValue: '',
      condition: 'Excellent',
      year: 2023,
      hours: '1,200 hrs',
      location: 'Montgomery Central Yard, Lexington, KY',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1000&q=80',
      description: '',
      featured: false
    });
  };

  const handleAddAuction = (e) => {
    e.preventDefault();
    if (!newAuction.title || !newAuction.date) {
      alert("Please provide at least a title and date.");
      return;
    }
    addUpcomingAuction(newAuction);
    setNewAuction({
      title: '',
      date: '2026-11-14',
      time: '10:00 AM EST',
      location: 'Montgomery Central Yard, Lexington, KY & Online Simulcast',
      venueAddress: '4800 Industrial Parkway, Lexington, KY 40511',
      lotCount: 150,
      previewDates: 'Nov 12-13 (9am - 4pm)',
      status: 'Catalog Open for Pre-Bidding',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
      description: '',
      featuredLot: 'CAT 336 Hydraulic Excavator'
    });
  };

  const handleAddBuyNow = (e) => {
    e.preventDefault();
    if (!newBuyNow.title || !newBuyNow.price) {
      alert("Please provide at least a title and buy now price.");
      return;
    }
    addBuyNowItem({
      ...newBuyNow,
      price: Number(newBuyNow.price),
      originalPrice: Number(newBuyNow.originalPrice) || Number(newBuyNow.price) * 1.2,
      savings: Number(newBuyNow.savings) || Math.round(Number(newBuyNow.price) * 0.15)
    });
    setNewBuyNow({
      title: '',
      category: 'Heavy Equipment',
      price: '',
      originalPrice: '',
      savings: '',
      condition: 'Certified Pass',
      hours: '850 hrs',
      year: 2023,
      location: 'Montgomery Yard 1, Lexington, KY',
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80',
      urgency: 'Immediate Client Liquidation',
      description: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border-2 border-amber-500/60 rounded-2xl max-w-5xl w-full my-auto overflow-hidden shadow-2xl relative animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={() => setAdminModalOpen(false)}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Client Management Portal</span>
                  <span className="text-[10px] bg-amber-500 text-slate-950 font-sans font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    John Montgomery
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Add, edit, or remove catalog lots, upcoming auctions, liquidation inventory, and configure live simulcast settings.
                </p>
              </div>
            </div>

            <button
              onClick={resetToFactoryDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950 hover:text-red-300 border border-slate-700 text-xs text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Catalog Manager ({catalog.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('auctions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'auctions'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Upcoming Auctions ({upcomingAuctions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('buynow')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'buynow'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Now Inventory ({buyNowSales.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('stream')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'stream'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Live Simulcast Controls</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: CATALOG MANAGER */}
          {activeTab === 'catalog' && (
            <div className="space-y-8">
              
              {/* Add New Lot Form */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="font-serif-luxury text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-500" />
                  <span>Add New Machinery or Real Estate Lot to Catalog</span>
                </h3>

                <form onSubmit={handleAddCatalog} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Lot Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2023 Caterpillar D6XE Dozer"
                        value={newCatalogItem.title}
                        onChange={(e) => setNewCatalogItem({ ...newCatalogItem, title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Category</label>
                      <select
                        value={newCatalogItem.category}
                        onChange={(e) => setNewCatalogItem({ ...newCatalogItem, category: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option>Heavy Equipment</option>
                        <option>Farm Equipment</option>
                        <option>On & Off-Road Vehicles</option>
                        <option>Real Estate</option>
                        <option>Farm Equipment & Tools</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Starting Bid ($ USD) *</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 50000"
                        value={newCatalogItem.startingBid}
                        onChange={(e) => setNewCatalogItem({ ...newCatalogItem, startingBid: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Estimated Value ($)</label>
                      <input
                        type="number"
                        placeholder="e.g. 175000"
                        value={newCatalogItem.estimatedValue}
                        onChange={(e) => setNewCatalogItem({ ...newCatalogItem, estimatedValue: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Condition</label>
                      <select
                        value={newCatalogItem.condition}
                        onChange={(e) => setNewCatalogItem({ ...newCatalogItem, condition: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option>Like New</option>
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Turnkey</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Hours / Mileage</label>
                      <input
                        type="text"
                        placeholder="e.g. 850 hrs"
                        value={newCatalogItem.hours}
                        onChange={(e) => setNewCatalogItem({ ...newCatalogItem, hours: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Lexington, KY"
                        value={newCatalogItem.location}
                        onChange={(e) => setNewCatalogItem({ ...newCatalogItem, location: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Description & Equipment Specifications</label>
                    <textarea
                      rows={2}
                      placeholder="Enter machine features, attachments, hydraulic lines, inspection notes..."
                      value={newCatalogItem.description}
                      onChange={(e) => setNewCatalogItem({ ...newCatalogItem, description: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newCatalogItem.featured}
                        onChange={(e) => setNewCatalogItem({ ...newCatalogItem, featured: e.target.checked })}
                        className="rounded bg-slate-900 border-slate-700 text-amber-500"
                      />
                      <span>Mark as Featured Lot on Homepage</span>
                    </label>

                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md"
                    >
                      Save Lot to Catalog
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Catalog Items List */}
              <div className="space-y-3">
                <h3 className="font-serif-luxury text-sm font-bold text-slate-300 uppercase tracking-wider">
                  Active Lots in Directory ({catalog.length})
                </h3>

                <div className="space-y-2">
                  {catalog.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={item.image} alt={item.title} className="w-12 h-10 object-cover rounded bg-slate-900 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-amber-400 font-bold">LOT #{item.lotNumber}</span>
                            <span className="text-[10px] text-slate-500 uppercase">{item.category}</span>
                          </div>
                          <div className="font-semibold text-white truncate">{item.title}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block">Current High Bid</span>
                          <span className="font-mono font-bold text-amber-400">${(item.currentBid || item.startingBid).toLocaleString()}</span>
                        </div>

                        <button
                          onClick={() => deleteCatalogItem(item.id)}
                          title="Delete Lot"
                          className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: UPCOMING AUCTIONS MANAGER */}
          {activeTab === 'auctions' && (
            <div className="space-y-8">
              
              {/* Add New Auction Form */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="font-serif-luxury text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-500" />
                  <span>Schedule & Add New Upcoming Auction</span>
                </h3>

                <form onSubmit={handleAddAuction} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] text-slate-400">Auction Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bluegrass Heavy Civil Equipment Liquidation"
                        value={newAuction.title}
                        onChange={(e) => setNewAuction({ ...newAuction, title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Auction Date *</label>
                      <input
                        type="date"
                        required
                        value={newAuction.date}
                        onChange={(e) => setNewAuction({ ...newAuction, date: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Time (with Timezone)</label>
                      <input
                        type="text"
                        placeholder="e.g. 10:00 AM EST"
                        value={newAuction.time}
                        onChange={(e) => setNewAuction({ ...newAuction, time: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Total Lots Expected</label>
                      <input
                        type="number"
                        placeholder="e.g. 220"
                        value={newAuction.lotCount}
                        onChange={(e) => setNewAuction({ ...newAuction, lotCount: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Featured Machine / Anchor Lot</label>
                      <input
                        type="text"
                        placeholder="e.g. CAT 336 Excavator"
                        value={newAuction.featuredLot}
                        onChange={(e) => setNewAuction({ ...newAuction, featuredLot: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Venue & Simulcast Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 4800 Industrial Parkway, Lexington, KY 40511"
                      value={newAuction.venueAddress}
                      onChange={(e) => setNewAuction({ ...newAuction, venueAddress: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Auction Overview & Consignor Terms</label>
                    <textarea
                      rows={2}
                      placeholder="Enter description, preview times, buyer premiums..."
                      value={newAuction.description}
                      onChange={(e) => setNewAuction({ ...newAuction, description: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="text-right pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md"
                    >
                      Publish Auction to Calendar
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Auctions */}
              <div className="space-y-3">
                <h3 className="font-serif-luxury text-sm font-bold text-slate-300 uppercase tracking-wider">
                  Scheduled Auctions ({upcomingAuctions.length})
                </h3>

                <div className="space-y-2">
                  {upcomingAuctions.map((auc) => (
                    <div 
                      key={auc.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-amber-400 font-bold">{auc.date} at {auc.time}</span>
                          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">{auc.status}</span>
                        </div>
                        <div className="font-serif-luxury text-sm font-bold text-white mt-0.5">{auc.title}</div>
                        <div className="text-slate-400 text-[11px]">{auc.location} &bull; {auc.lotCount} lots</div>
                      </div>

                      <button
                        onClick={() => deleteUpcomingAuction(auc.id)}
                        className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: BUY NOW LIQUIDATION MANAGER */}
          {activeTab === 'buynow' && (
            <div className="space-y-8">
              
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="font-serif-luxury text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-500" />
                  <span>List New Heavy Equipment or Farm Asset for Direct "Buy Now"</span>
                </h3>

                <form onSubmit={handleAddBuyNow} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] text-slate-400">Equipment Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2022 John Deere 8320R Tractor"
                        value={newBuyNow.title}
                        onChange={(e) => setNewBuyNow({ ...newBuyNow, title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Category</label>
                      <select
                        value={newBuyNow.category}
                        onChange={(e) => setNewBuyNow({ ...newBuyNow, category: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option>Heavy Equipment</option>
                        <option>Farm Equipment</option>
                        <option>On & Off-Road Vehicles</option>
                        <option>Farm Equipment & Tools</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Buy Now Price ($) *</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 145000"
                        value={newBuyNow.price}
                        onChange={(e) => setNewBuyNow({ ...newBuyNow, price: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Original Retail ($)</label>
                      <input
                        type="number"
                        placeholder="e.g. 175000"
                        value={newBuyNow.originalPrice}
                        onChange={(e) => setNewBuyNow({ ...newBuyNow, originalPrice: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Liquidation Urgency</label>
                      <input
                        type="text"
                        placeholder="e.g. Estate Liquidation"
                        value={newBuyNow.urgency}
                        onChange={(e) => setNewBuyNow({ ...newBuyNow, urgency: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Detailed Description & Condition Report</label>
                    <textarea
                      rows={2}
                      placeholder="Machine history, engine diagnostics, warranty status..."
                      value={newBuyNow.description}
                      onChange={(e) => setNewBuyNow({ ...newBuyNow, description: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="text-right pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md"
                    >
                      Publish Buy Now Listing
                    </button>
                  </div>
                </form>
              </div>

              {/* List of current Buy Now items */}
              <div className="space-y-3">
                <h3 className="font-serif-luxury text-sm font-bold text-slate-300 uppercase tracking-wider">
                  Active Liquidation Items ({buyNowSales.length})
                </h3>

                <div className="space-y-2">
                  {buyNowSales.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-12 h-10 object-cover rounded bg-slate-900" />
                        <div>
                          <div className="font-semibold text-white">{item.title}</div>
                          <div className="text-slate-400 text-[11px]">{item.category} &bull; {item.status}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-mono text-amber-400 font-bold text-sm">${item.price.toLocaleString()}</span>
                        <button
                          onClick={() => deleteBuyNowItem(item.id)}
                          className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: LIVE SIMULCAST CONTROLS */}
          {activeTab === 'stream' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="font-serif-luxury text-base font-bold text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-red-500" />
                  <span>Podium Live Broadcast & Lot Controls</span>
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Stream Embed URL (YouTube Live / Vimeo / RTMP embed)</label>
                    <input
                      type="text"
                      value={liveStreamSettings.streamEmbedUrl}
                      onChange={(e) => setLiveStreamSettings({ ...liveStreamSettings, streamEmbedUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                    <p className="text-[11px] text-slate-500">
                      As noted in your instructions: John Montgomery can stream his live feed from anywhere (e.g. YouTube Live, OBS, or yard camera) and paste the URL here.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Select Active Lot on the Auction Block</label>
                    <select
                      value={liveStreamSettings.currentLotId}
                      onChange={(e) => setLiveStreamSettings({ ...liveStreamSettings, currentLotId: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      {catalog.map(c => (
                        <option key={c.id} value={c.id}>
                          LOT #{c.lotNumber} - {c.title} (Current: ${(c.currentBid || c.startingBid).toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        auctionAudio.playGavel();
                        showToast("Hammer knocked: SOLD!");
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase"
                    >
                      <Gavel className="w-4 h-4" />
                      <span>Strike Auction Gavel (Sound)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        auctionAudio.playWarningChime();
                        showToast("Fair warning sounded to all bidders!");
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
                    >
                      <span>Sound Fair Warning</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
