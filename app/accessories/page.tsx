'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../contexts/GameStoreContext';
import ProductCard from '../components/ProductCard';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

type AccessoryCategory = 'Gaming Chairs' | 'Gaming Desks' | 'Controllers' | 'Headsets' | 'PC Accessories';

const AccessoriesPage = () => {
  const { products, getFormattedPrice } = useGameStore();
  
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<AccessoryCategory[]>([
    'Gaming Chairs', 'Gaming Desks', 'Controllers', 'Headsets', 'PC Accessories'
  ]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  
  // Get all accessory products
  const accessoryProducts = products.filter(product => product.category === 'accessories');
  
  // Map products to accessory categories
  const getAccessoryCategory = (productId: string): AccessoryCategory => {
    if (productId.includes('chair')) return 'Gaming Chairs';
    if (productId.includes('desk')) return 'Gaming Desks';
    if (productId.includes('controller')) return 'Controllers';
    if (productId.includes('headset')) return 'Headsets';
    return 'PC Accessories';
  };
  
  // Filter products
  const filteredProducts = accessoryProducts.filter(product => {
    const category = getAccessoryCategory(product.id);
    return selectedCategories.includes(category) && 
           product.price >= priceRange[0] && 
           product.price <= priceRange[1];
  });
  
  const toggleCategory = (category: AccessoryCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };

  const emptyState = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 bg-white min-h-screen"
    >
      {/* Mobile Filters Button */}
      <div className="md:hidden mb-4">
        <details className="dropdown w-full">
          <summary className="btn btn-primary w-full  text-black">Filter Accessories</summary>
          <div className="dropdown-content bg-white p-4 rounded-lg shadow-md mt-2 w-full border border-gray-200">
            {/* Category filters */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-black">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {(['Gaming Chairs', 'Gaming Desks', 'Controllers', 'Headsets', 'PC Accessories'] as AccessoryCategory[]).map(category => (
                  <motion.div 
                    key={category} 
                    className="flex items-center"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Checkbox 
                      id={`mobile-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={`mobile-${category}`} className="ml-2 text-black">
                      {category}
                    </Label>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Price filters */}
            <div>
              <h3 className="font-semibold mb-3 text-black">Price Range</h3>
              <div className="px-2">
                <Slider 
                  defaultValue={[0, 500]}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-black">
                <span>{getFormattedPrice(priceRange[0])}</span>
                <span>{getFormattedPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>
        </details>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters - Hidden on mobile */}
        <motion.div 
          className="hidden md:block md:w-1/4 bg-white p-4 rounded-lg shadow-md border border-gray-200"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-6 text-black">Filter Accessories</h2>
          
          {/* Category filters */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-black">Categories</h3>
            <div className="space-y-2">
              {(['Gaming Chairs', 'Gaming Desks', 'Controllers', 'Headsets', 'PC Accessories'] as AccessoryCategory[]).map(category => (
                <motion.div 
                  key={category} 
                  className="flex items-center"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Checkbox 
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={category} className="ml-2 text-black">
                    {category}
                  </Label>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Price filters */}
          <div>
            <h3 className="font-semibold mb-3 text-black">Price Range</h3>
            <div className="px-2">
              <Slider 
                defaultValue={[0, 500]}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-black">
              <span>{getFormattedPrice(priceRange[0])}</span>
              <span>{getFormattedPrice(priceRange[1])}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Products grid */}
        <div className="w-full md:w-3/4">
          <motion.h1 
            className="text-2xl sm:text-3xl font-bold mb-6 text-black"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Gaming Accessories
          </motion.h1>
          
          {filteredProducts.length === 0 ? (
            <motion.div
              variants={emptyState}
              initial="hidden"
              animate="show"
              className="bg-gray-100 p-8 rounded-lg text-center"
            >
              <h3 className="text-xl font-medium text-black">No accessories match your filters</h3>
              <p className="text-black mt-2">Try adjusting your filter criteria</p>
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
                  className="transition-all duration-300 hover:shadow-lg hover:z-10"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AccessoriesPage;