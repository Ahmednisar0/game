'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../contexts/GameStoreContext';
import ProductCard from '../components/ProductCard';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

const PCPage = () => {
  const { filterProductsByPlatform, getFormattedPrice } = useGameStore();
  
  // State for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  
  const pcProducts = filterProductsByPlatform('pc');
  
  // Filter products based on price range
  const filteredProducts = pcProducts.filter(product => {
    return product.price >= priceRange[0] && product.price <= priceRange[1];
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen ">
      {/* Mobile Filters Button */}
      <div className="md:hidden mb-4">
        <details className="dropdown">
          <summary className="btn btn-primary w-full text-black ">Filter Products</summary>
          <div className="dropdown-content bg-white p-4 rounded-lg shadow-md mt-2 w-full">
            {/* Price filters */}
            <div>
              <h3 className="font-semibold mb-3 text-black ">Price Range</h3>
              <div className="px-2">
                <Slider 
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>{getFormattedPrice(priceRange[0])}</span>
                <span>{getFormattedPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>
        </details>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters - Hidden on mobile */}
        <div className="hidden md:block md:w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-game-pink text-black ">Filter Products</h2>
          
          {/* Price filters */}
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="px-2">
              <Slider 
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>{getFormattedPrice(priceRange[0])}</span>
              <span>{getFormattedPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="w-full md:w-3/4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black ">PC Gaming Products</h1>
          
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-100 p-8 rounded-lg text-center"
            >
              <h3 className="text-xl font-medium text-gray-700">No products match your filters</h3>
              <p className="text-gray-500 mt-2">Try adjusting your price range</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={item}
                  className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PCPage;