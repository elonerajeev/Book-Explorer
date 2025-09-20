import React from 'react';
    import { Star, ShoppingCart, Eye } from 'lucide-react';
    import { motion } from 'framer-motion';

    const BookCard = ({ book, onViewDetails }) => {
      const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
          stars.push(
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          );
        }

        if (hasHalfStar) {
          stars.push(
            <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />
          );
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
          stars.push(
            <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
          );
        }

        return stars;
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
            <img
              src={book.thumbnail || `https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=center`}
              alt={book.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                book.inStock
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {book.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
              {book.title}
            </h3>

            <div className="flex items-center space-x-1 mb-3">
              {renderStars(book.rating)}
              <span className="text-sm text-gray-600 ml-2">({book.rating})</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-pink-600">
                ${book.price}
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onViewDetails(book)}
                className="flex-1 bg-gradient-to-r from-pink-600 to-violet-500 text-white px-4 py-2 rounded-lg hover:from-pink-700 hover:to-violet-600 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
              >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        </motion.div>
      );
    };

    export default BookCard;
