'use client'
import { useGameStore, Product } from "@/app/contexts/GameStoreContext";
import Button from "@/app/components/ui/button";
import { ChevronLeft, ShoppingCart, Info, Check, Star, Share2, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/seprator";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

const ProductDetails = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;
  const { products, addToCart, getFormattedPrice } = useGameStore();
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const product = products.find(p => p.id === productId);
  
  // Use the product's image as the main image - properly typed as string[]
  const productImages = product?.image 
    ? (Array.isArray(product.image) ? product.image : [product.image])
    : ['/placeholder.jpg'];

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
        <div className="flex flex-col items-center justify-center py-12 bg-white">
          <h1 className="text-2xl font-bold mb-4 text-black">Product not found</h1>
          <p className="text-black mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft size={18} />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Calculate rating (for demo purposes)
  const rating = 4.5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => {
      if (i < fullStars) {
        return <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />;
      } else if (i === fullStars && hasHalfStar) {
        return (
          <div key={i} className="relative" style={{ width: 20, height: 20 }}>
            <Star size={20} className="text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      }
      return <Star key={i} size={20} className="text-gray-300" />;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl bg-white">
      <Button 
        onClick={() => router.back()}
        variant="ghost" 
        className="mb-6 flex items-center gap-2 text-black hover:text-game-pink transition-colors"
      >
        <ChevronLeft size={18} />
        <span>Back to Products</span>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative group rounded-xl overflow-hidden bg-gray-50 aspect-square flex items-center justify-center">
            <Badge className="absolute top-4 left-4 bg-game-pink text-white z-10 shadow-md">
              {product.platform}
            </Badge>
            <img 
              src={productImages[selectedImageIndex]} 
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Thumbnail Gallery - only show if there are multiple images */}
          {productImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 ${selectedImageIndex === index ? 'border-game-pink' : 'border-transparent'}`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="space-y-6 bg-white">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                {renderStars()}
                <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
              </div>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
              {product.id.length % 3 === 0 && (
                <Badge className="bg-red-600 hover:bg-red-700 text-white">
                  SALE
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-pink-700">
                {getFormattedPrice(product.price)}
              </span>
              {product.id.length % 4 === 0 && (
                <span className="text-sm text-gray-500 line-through">
                  {getFormattedPrice(product.price * 1.3)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full sm:w-auto min-w-[160px] px-4 sm:px-6 transition-all duration-300 ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-pink-600 hover:bg-pink-700'}`}
              size="lg"
            >
              {isAdded ? (
                <>
                  <Check size={20} className="mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                className="hover:bg-gray-100 border-gray-200"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart 
                  size={20} 
                  className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'} 
                />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="hover:bg-gray-100 border-gray-200"
              >
                <Share2 size={20} className="text-gray-700" />
              </Button>
            </div>
          </div>
          
          {/* Highlights */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6 border border-gray-200">
            <h3 className="font-semibold mb-3 text-black">Highlights</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Free shipping on orders over $50</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>30-day return policy</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Official licensed product</span>
              </li>
            </ul>
          </div>
          
          {/* Product Description */}
          <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-3 text-black">About This Product</h3>
            {/* Render the description exactly as it is, preserving any formatting */}
            {product.description ? (
              <div className="text-gray-700 whitespace-pre-line">
                {product.description}
              </div>
            ) : (
              <p className="text-gray-700">No description available for this product.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;