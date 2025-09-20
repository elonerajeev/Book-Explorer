import React from 'react';
    import { Search, Filter, Star } from 'lucide-react';

    const SearchFilters = ({
      searchTerm,
      setSearchTerm,
      selectedRating,
      setSelectedRating,
      priceRange,
      setPriceRange,
      stockFilter,
      setStockFilter
    }) => {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="h-5 w-5 text-pink-600" />
            <h2 className="text-lg font-semibold text-gray-900">Search & Filter</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search Input */}
            <div className="relative">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Books
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="search"
                  type="text"
                  placeholder="Enter book title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                id="rating"
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              >
                <option value="" className="text-gray-900">All Ratings</option>
                <option value="4" className="text-gray-900">4+ Stars</option>
                <option value="3" className="text-gray-900">3+ Stars</option>
                <option value="2" className="text-gray-900">2+ Stars</option>
                <option value="1" className="text-gray-900">1+ Stars</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Max Price ($)
              </label>
              <input
                id="price"
                type="number"
                placeholder="Enter max price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Stock Filter */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                id="stock"
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              >
                <option value="" className="text-gray-900">All Books</option>
                <option value="in-stock" className="text-gray-900">In Stock</option>
                <option value="out-of-stock" className="text-gray-900">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
      );
    };

    export default SearchFilters;
