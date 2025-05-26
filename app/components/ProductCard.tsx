'use client'

import Link from 'next/link'
import { useGameStore, Product } from '../contexts/GameStoreContext'
import { ShoppingCart, Star, Check } from 'lucide-react'
import { Badge } from './ui/badge'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { getFormattedPrice, addToCart } = useGameStore()
  const [rating, setRating] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Get the first image if image is an array, or use the string directly
  const productImage = Array.isArray(product.image) ? product.image[0] : product.image
  const fallbackImage = '/placeholder.jpg' // Make sure this exists in your public folder

  useEffect(() => {
    // Improved rating system that ensures all products get good ratings
    const baseRating = 3; // Minimum rating
    const ratingFactors = {
      nameLength: Math.min(product.name.length / 20, 1),
      priceFactor: 1 - (product.price / 2000),
      randomBoost: Math.random() * 0.5
    };
    
    const calculatedRating = baseRating + 
      (ratingFactors.nameLength * 0.5) + 
      (ratingFactors.priceFactor * 0.5) + 
      ratingFactors.randomBoost;
    
    const finalRating = Math.min(Math.max(Math.round(calculatedRating * 2) / 2, 3.5), 5);
    setRating(finalRating);
  }, [product.name, product.price])

  const getDiscountBadge = () => {
    const discounts = [
      { condition: product.id.length % 5 === 0, value: '50% OFF' },
      { condition: product.id.length % 3 === 0, value: '30% OFF' },
      { condition: product.id.length % 2 === 0, value: '10% OFF' }
    ]
    return discounts.find(d => d.condition)?.value
  }

  const discount = getDiscountBadge()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative" style={{ width: 16, height: 16 }}>
            <Star size={16} className="text-black" />
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={16} className="text-black" />);
      }
    }
    return stars;
  };

  return (
    <Link 
      href={`/product/${product.id}`} 
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border text-black border-gray-100 h-full flex flex-col"
      aria-label={`View ${product.name} details`}
    >
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
        {discount && (
          <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white shadow-sm z-10">
            {discount}
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-2 left-2 text-xs z-10 text-black">
          {product.category}
        </Badge>
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            Image not available
          </div>
        ) : (
          <Image
            src={productImage || fallbackImage}
            alt={product.name}
            fill
            className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadingComplete={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            unoptimized={true}
            priority={false}
          />
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2 text-black group-hover:text-pink-700 transition-colors min-h-[3rem]">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex">
            {renderStars()}
          </div>
          <span className="text-xs text-black ml-1">({rating.toFixed(1)})</span>
        </div>
        
        <div className="flex items-center mb-3">
          <p className="text-pink-700 font-bold text-lg">
            {getFormattedPrice(product.price)}
          </p>
          {product.id.length % 4 === 0 && (
            <p className="text-sm text-black line-through ml-2">
              {getFormattedPrice(product.price * 1.3)}
            </p>
          )}
        </div>
        
        <div className="mt-auto">
          <button 
            className={`w-full py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-all duration-200 ${
              isAdded 
                ? 'bg-green-600 text-white' 
                : 'bg-pink-700 text-white hover:bg-game-pink hover:shadow-md'
            }`}
            onClick={handleAddToCart}
            disabled={isAdded}
            aria-label={isAdded ? 'Added to cart' : `Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check size={18} className="stroke-[1.5]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart size={18} className="stroke-[1.5]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard