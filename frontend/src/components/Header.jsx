import React from 'react';
    import { BookOpen } from 'lucide-react';

    const Header = () => {
      return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-pink-600 to-violet-500 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-violet-500 bg-clip-text text-transparent">
                  Book Explorer
                </h1>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                  Browse
                </a>
                <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                  Categories
                </a>
                <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                  About
                </a>
              </nav>
            </div>
          </div>
        </header>
      );
    };

    export default Header;
