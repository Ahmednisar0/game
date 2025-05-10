'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import CurrencySwitcher from './CurrencySwitcher';
import { useGameStore } from '../contexts/GameStoreContext';

type Product = {
  id: string;
  name: string;
  category: string;
};

type NavbarProps = {
  onSearch?: (query: string, category: string) => void;
};

const Navbar = ({ onSearch = () => {} }: NavbarProps) => {
  const { cartItems } = useGameStore();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const bannerMessages = [
    "ORDER NOW - GET EXCLUSIVE LAUNCH DAY BONUSES!",
    "NEW ARRIVALS: CHECK OUT THE LATEST GAMES & ACCESSORIES",
    "CHECK OUT THE LATEST GAMES & ACCESSORIES",
  ];

  const categories = [
    { id: '#', name: 'Home', path: '/#' },
    { id: 'all', name: 'All Categories', path: '/shop' },
    { id: 'playstation', name: 'PlayStation', path: '/playstation' },
    { id: 'xbox', name: 'Xbox', path: '/xbox' },
    { id: 'nintendo', name: 'Nintendo', path: '/nintendo' },
    { id: 'pc', name: 'PC', path: '/pc' },
    { id: 'accessories', name: 'Accessories', path: '/accessories' },
  ];

  // Calculate total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === bannerMessages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerMessages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategory);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onSearch(searchQuery, categoryId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Thin pink header above navbar */}
      <div className="bg-[#bc2679] h-4 w-full"></div>

      {/* Main navbar - fixed when scrolling */}
      <nav className={`bg-white shadow-md sticky top-0 z-50 transition-all ${isScrolled ? 'shadow-lg' : ''}`}>
        {/* Top bar with logo, search, and icons */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Mobile menu button and logo */}
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link href="/" className="flex items-center">
              <div className="relative h-14 w-32">
                <Image
                  src="/images/logo.png"
                  alt="Game Store Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="flex w-full">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border text-black border-gray-300 rounded-l-lg px-3 focus:outline-none focus:ring-1 focus:ring-pink-400"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-4 border-t border-b text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-pink-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
              </div>
              <button 
                type="submit"
                className="bg-pink-600 text-white px-4 rounded-r-lg hover:bg-pink-700 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Desktop icons */}
          <div className="hidden md:flex items-center space-x-6  ">
            <CurrencySwitcher />
            
            <div className="relative">
              <Link 
                href="/cart" 
                className="text-gray-700 hover:text-pink-600 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile cart icon (always visible) */}
          <div className="md:hidden relative">
            <Link 
              href="/cart" 
              className="text-gray-700 hover:text-pink-600 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu content (shown when menu is open) */}
        {isMenuOpen && (
          <div className="md:hidden bg-white w-full">
            <div className="px-4 py-3 border-t">
              <form onSubmit={handleSearch} className="mb-4">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-400"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="relative flex">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-pink-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search products"
                  />
                  <button 
                    type="submit"
                    className="bg-pink-600 text-white px-4 rounded-r-lg hover:bg-pink-700 transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>

              <div className="mb-4 text-black ">
                <CurrencySwitcher  />
              </div>

              <h3 className="font-bold text-gray-900 mb-2 uppercase">Categories</h3>
              <ul className="space-y-3">
                {categories.filter(c => c.id !== 'all').map((category) => (
                  <li key={category.id}>
                    <Link
                      href={category.path}
                      className={`block w-full text-left py-2 px-2 rounded transition-colors ${selectedCategory === category.id ? 'bg-pink-100 text-pink-600' : 'text-gray-800 hover:bg-gray-100'}`}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Desktop navigation */}
        <div className="hidden md:block border-t border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto py-3 hide-scrollbar">
              {categories.filter(c => c.id !== 'all').map((category) => (
                <Link
                  key={category.id}
                  href={category.path}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`px-4 py-1 whitespace-nowrap text-sm font-medium rounded-full transition-colors mx-1 ${selectedCategory === category.id ? 'bg-pink-600 text-white' : 'text-gray-800 hover:bg-gray-100'}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Rotating text banner */}
      <div className="bg-[#bc2679] text-white text-center py-2 text-sm overflow-hidden h-12 relative">
        <div className="relative h-full flex items-center justify-center">
          {bannerMessages.map((message, index) => (
            <div
              key={index}
              className={`absolute w-full px-4 transition-all duration-500 ease-in-out ${
                index === currentBannerIndex
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-full'
              }`}
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;