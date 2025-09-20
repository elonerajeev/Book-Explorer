import React from 'react';
    import { X, Star, ShoppingCart, ExternalLink } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';

    const BookModal = ({ book, isOpen, onClose }) => {
      if (!book) return null;

      const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
          stars.push(
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          );
        }

        if (hasHalfStar) {
          stars.push(
            <Star key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400 opacity-50" />
          );
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
          stars.push(
            <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
          );
        }

        return stars;
      };

      return (
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-screen items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50"
                  onClick={onClose}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    <div className="space-y-6">
                      <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
                        <img
                          src={book.thumbnail || `https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center`}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                          {book.title}
                        </h1>

                        <div className="flex items-center space-x-2 mb-4">
                          <div className="flex items-center space-x-1">
                            {renderStars(book.rating)}
                          </div>
                          <span className="text-lg text-gray-600">({book.rating})</span>
                        </div>

                        <div className="flex items-center space-x-4 mb-6">
                          <span className="text-4xl font-bold text-pink-600">
                            ${book.price}
                          </span>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                            book.inStock
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {book.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                        <p className="text-gray-600 leading-relaxed">
                          {book.description || "Discover this amazing book and dive into a world of knowledge and entertainment. This carefully curated selection offers readers an engaging experience with high-quality content and expert insights."}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Book Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Rating:</span>
                            <span className="ml-2 font-medium">{book.rating}/5</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Price:</span>
                            <span className="ml-2 font-medium">${book.price}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Availability:</span>
                            <span className="ml-2 font-medium">
                              {book.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-4 pt-6">
                        <button
                          disabled={!book.inStock}
                          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                            book.inStock
                              ? 'bg-gradient-to-r from-pink-600 to-violet-500 text-white hover:from-pink-700 hover:to-violet-600'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingCart className="h-5 w-5" />
                          <span>{book.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                        </button>

                        {book.detailUrl && (
                          <a
                            href={book.detailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 font-medium"
                          >
                            <ExternalLink className="h-5 w-5" />
                            <span>View Source</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
      );
    };

    export default BookModal;
