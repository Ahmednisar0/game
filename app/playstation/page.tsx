'use client'
import React, { useState, useMemo } from 'react';
import { useGameStore, ProductCategory } from '../contexts/GameStoreContext';
import ProductCard from '../components/ProductCard';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

const PlaystationPage = () => {
  const { filterProductsByPlatform, getFormattedPrice } = useGameStore();
  
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(['console', 'digital', 'games', 'accessories']);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]); // Fixed range 0-2000
  
  const playstationProducts = filterProductsByPlatform('playstation');
  
  // Filter products based on selected categories and price range
  const filteredProducts = useMemo(() => {
    return playstationProducts.filter(product => {
      const matchesCategory = selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
  }, [playstationProducts, selectedCategories, priceRange]);
  
  const toggleCategory = (category: ProductCategory) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Mobile Filters Button */}
      <div className="md:hidden mb-4">
        <details className="dropdown">
          <summary className="btn btn-primary w-full">Filter Products</summary>
          <div className="dropdown-content bg-white p-4 rounded-lg shadow-md mt-2 w-full">
            {/* Category filters */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {(['console', 'digital', 'games', 'accessories'] as ProductCategory[]).map(category => (
                  <div key={`mobile-${category}`} className="flex items-center">
                    <Checkbox 
                      id={`mobile-${category}`} 
                      checked={selectedCategories.includes(category)} 
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={`mobile-${category}`} className="ml-2 capitalize">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price filters */}
            <div>
              <h3 className="font-semibold mb-3">Price Range (0 - 2000)</h3>
              <div className="px-2">
                <Slider 
                  
                  max={2000}
                  step={100}
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
          <h2 className="text-xl font-bold mb-6 text-black">Filter Products</h2>
          
          {/* Category filters */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {(['console', 'digital', 'games', 'accessories'] as ProductCategory[]).map(category => (
                <div key={category} className="flex items-center">
                  <Checkbox 
                    id={category} 
                    checked={selectedCategories.includes(category)} 
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={category} className="ml-2 capitalize">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price filters */}
          <div>
            <h3 className="font-semibold mb-3">Price Range (0 - 2000)</h3>
            <div className="px-2">
              <Slider 
              
                max={2000}
                step={100}
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">PlayStation Products</h1>
          
          {filteredProducts.length === 0 ? (
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h3 className="text-xl font-medium text-gray-700">No products match your filters</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  
                 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaystationPage;