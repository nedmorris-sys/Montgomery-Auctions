import React, { useState, useMemo } from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  SlidersHorizontal, 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  MapPin, 
  Heart, 
  Gavel, 
  CheckCircle, 
  ArrowUpDown,
  Tag,
  Eye,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function CatalogView() {
  const { 
    catalog, 
    searchQuery, 
    setSearchQuery, 
    setSelectedLotModal, 
    toggleWatchlist, 
    user, 
    isAdminMode, 
    deleteCatalogItem,
    setAdminModalOpen
  } = useAuction();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const categories = [
    'All',
    'Heavy Equipment',
    'Farm Equipment',
    'On & Off-Road Vehicles',
    'Real Estate',
    'Farm Equipment & Tools'
  ];

  // Filtering & Sorting
  const filteredCatalog = useMemo(() => {
    return catalog.filter(item => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Condition match
      if (selectedCondition !== 'All' && item.condition !== selectedCondition) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = (item.description || '').toLowerCase().includes(query);
        const matchesLot = (item.lotNumber || '').toLowerCase().includes(query);
        const matchesLocation = (item.location || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesLot && !matchesLocation) {
          return false;
        }
      }
      // Price filters
      const price = item.currentBid || item.startingBid || 0;
      if (minPrice && price < Number(minPrice)) return false;
      if (maxPrice && price > Number(maxPrice)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      }
      if (sortBy === 'price-low') {
        return (a.currentBid || a.startingBid) - (b.currentBid || b.startingBid);
      }
      if (sortBy === 'price-high') {
        return (b.currentBid || b.startingBid) - (a.currentBid || a.startingBid);
      }
      if (sortBy === 'bids') {
        return (b.bidsCount || 0) - (a.bidsCount || 0);
      }
      if (sortBy === 'year') {
        return (b.year || 0) - (a.year || 0);
      }
      return 0;
    });
  }, [catalog, selectedCategory, selectedCondition, searchQuery, minPrice, maxPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Client Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs tracking-wider uppercase mb-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Comprehensive Asset Directory & Live Inventory</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Equipment & Real Estate Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Explore active auction lots, equipment specifications, inspection records, and real-time bid ledgers.
          </p>
        </div>

        {/* Client Admin Mode banner button */}
        {isAdminMode && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAdminModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Catalog Lot</span>
            </button>
          </div>
        )}
      </div>

      {/* Search & Top Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Main search box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by lot #, keyword, machine model (e.g. CAT 336, John Deere 8R)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 appearance-none cursor-pointer"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="bids">Most Active Bids</option>
                <option value="year">Newest Year</option>
              </select>
              <ArrowUpDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Grid / List toggle & Mobile filter */}
          <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-2">
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs border border-slate-700"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid View"
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="List View"
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Advanced Filter Drawer (Price, Condition) */}
        {(showFiltersMobile || true) && (
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Condition:</span>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Conditions</option>
                <option value="Like New">Like New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Turnkey">Turnkey</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Price Range:</span>
              <input
                type="number"
                placeholder="Min $"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-amber-500"
              />
              <span className="text-slate-500">-</span>
              <input
                type="number"
                placeholder="Max $"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-amber-500"
              />
              {(minPrice || maxPrice) && (
                <button
                  onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                  className="text-amber-400 hover:underline text-[11px]"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="ml-auto text-xs text-slate-400">
              Showing <strong className="text-amber-400 font-mono">{filteredCatalog.length}</strong> catalog lots
            </div>
          </div>
        )}

      </div>

      {/* Catalog Results Grid / List */}
      {filteredCatalog.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <SlidersHorizontal className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="font-serif-luxury text-xl font-bold text-white">No Equipment Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms, clearing filters, or checking back soon as new lots are added daily.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedCondition('All');
              setSearchQuery('');
              setMinPrice('');
              setMaxPrice('');
            }}
            className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCatalog.map((item) => {
            const isWatchlisted = user.watchlist.includes(item.id);
            return (
              <div 
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 rounded-xl overflow-hidden shadow-xl flex flex-col group transition-all duration-200 hover:-translate-y-1"
              >
                {/* Image Box */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Lot Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-amber-400 font-mono text-[11px] font-bold border border-amber-500/30">
                      LOT #{item.lotNumber}
                    </span>
                    {item.featured && (
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Watchlist & Client Actions */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    {isAdminMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCatalogItem(item.id);
                        }}
                        title="Client: Delete item"
                        className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => toggleWatchlist(item.id)}
                      title="Save to Watchlist"
                      className={`p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                        isWatchlisted
                          ? 'bg-red-500/90 text-white border-red-500 shadow-md'
                          : 'bg-black/70 text-slate-300 hover:text-white border-slate-700'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWatchlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Year & Condition overlay */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white">
                    <span className="bg-slate-950/85 px-2 py-0.5 rounded text-amber-400 font-medium">
                      {item.year || '2022'} &bull; {item.hours || 'Verified'}
                    </span>
                    <span className="bg-slate-950/85 px-2 py-0.5 rounded text-slate-300">
                      {item.condition}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-500">
                      {item.category}
                    </div>
                    <h3 
                      onClick={() => setSelectedLotModal(item)}
                      className="font-serif-luxury text-sm font-bold text-white hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>

                  {/* Pricing info */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block">Current Bid</span>
                        <span className="font-serif-luxury text-lg font-bold text-amber-400">
                          ${(item.currentBid || item.startingBid).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">
                          Est. ${item.estimatedValue ? item.estimatedValue.toLocaleString() : 'Call'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {item.bidsCount || 0} bids placed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setSelectedLotModal(item)}
                      className="py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <Gavel className="w-3.5 h-3.5" />
                      <span>Bid Now</span>
                    </button>
                    <button
                      onClick={() => setSelectedLotModal(item)}
                      className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredCatalog.map((item) => {
            const isWatchlisted = user.watchlist.includes(item.id);
            return (
              <div 
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-xl overflow-hidden p-4 flex flex-col md:flex-row gap-5 items-center justify-between transition-all"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  <div className="relative w-full sm:w-44 h-32 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-amber-400 font-mono text-[10px] font-bold">
                      LOT #{item.lotNumber}
                    </span>
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] uppercase tracking-wider text-amber-500 font-semibold">
                      {item.category} &bull; {item.year}
                    </span>
                    <h3 
                      onClick={() => setSelectedLotModal(item)}
                      className="font-serif-luxury text-base font-bold text-white hover:text-amber-400 cursor-pointer"
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                      <span>{item.condition}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Current High Bid</span>
                    <span className="font-serif-luxury text-xl font-bold text-amber-400">
                      ${(item.currentBid || item.startingBid).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 block">{item.bidsCount || 0} bids</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWatchlist(item.id)}
                      className={`p-2 rounded-lg border ${isWatchlisted ? 'bg-red-500 text-white border-red-500' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedLotModal(item)}
                      className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md"
                    >
                      Bid / Inspect
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
