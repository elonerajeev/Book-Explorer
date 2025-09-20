import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import SearchFilters from '../components/SearchFilters';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';

//const API_BASE_URL = 'http://localhost:5000'; // Update to your backend URL
const API_BASE_URL = 'https://book-explorer-backend-zo5w.onrender.com';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const booksPerPage = 6;

  const fetchBooks = async (page = 1, search = '', rating = '', price = '', stock = '') => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page,
        limit: booksPerPage,
        ...(search && { search }),
        ...(rating && { rating }),
        ...(price && { price }),
        ...(stock && { stock }),
      });
      const response = await fetch(`${API_BASE_URL}/api/books?${params}`);
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data.books || []);
      setTotalBooks(data.total || 0);
    } catch (err) {
      setError(err.message);
      toast.error('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookDetails = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/books/${id}`);
      if (!response.ok) throw new Error('Failed to fetch book details');
      const book = await response.json();
      setSelectedBook(book);
      setIsModalOpen(true);
    } catch (err) {
      toast.error('Error fetching book details');
    }
  };

  useEffect(() => {
    fetchBooks(currentPage, searchTerm, selectedRating, priceRange, stockFilter);
  }, [currentPage, searchTerm, selectedRating, priceRange, stockFilter]);

  const handleViewDetails = (book) => {
    fetchBookDetails(book.id);
  };

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/refresh`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to refresh data');
      await fetchBooks(currentPage, searchTerm, selectedRating, priceRange, stockFilter);
      toast.success('Book data refreshed successfully!');
    } catch (err) {
      toast.error('Error refreshing data');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Your Next
            <span className="bg-gradient-to-r from-pink-600 to-violet-500 bg-clip-text text-transparent"> Great Read</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our curated collection of books with advanced search and filtering capabilities.
            Find exactly what you're looking for in our extensive library.
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleRefreshData}
              disabled={isRefreshing}
              className="bg-gradient-to-r from-pink-600 to-violet-500 text-white px-6 py-3 rounded-lg hover:from-pink-700 hover:to-violet-600 transition-all duration-200 flex items-center space-x-2 font-medium disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
            </button>
          </div>
        </section>

        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
        />

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {books.length} of {totalBooks} books
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <RefreshCw className="mx-auto h-8 w-8 animate-spin text-pink-600" />
            <p className="mt-4 text-gray-600">Loading books...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : !loading && !error && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {/* Book Detail Modal */}
      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default Home;
