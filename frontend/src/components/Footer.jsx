import React from 'react';
    import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

    const Footer = () => {
      return (
        <footer className="bg-gray-900 text-gray-300 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-xl font-bold text-white mb-4">Book Explorer</h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Discover your next favorite book with our comprehensive collection.
                  Search, filter, and explore thousands of titles with ease.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Browse Books</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Releases</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Best Sellers</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Book Explorer. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;
