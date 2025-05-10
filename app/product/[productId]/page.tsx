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
  
  const product = products.find(p => p.id === productId);
  
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
        return <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />;
      } else if (i === fullStars && hasHalfStar) {
        return (
          <div key={i} className="relative" style={{ width: 16, height: 16 }}>
            <Star size={16} className="text-black" />
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      }
      return <Star key={i} size={16} className="text-black" />;
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
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-8 relative aspect-square">
            <Badge className="absolute top-4 left-4 bg-game-pink text-white z-10 shadow-md">
              {product.platform}
            </Badge>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-md w-20 h-20 flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-game-pink transition-colors">
                <img 
                  src={product.image} 
                  alt={`Preview ${i}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6 bg-white">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                {renderStars()}
                <span className="text-sm text-black ml-1">({rating.toFixed(1)})</span>
              </div>
              <span className="text-sm text-black">•</span>
              <span className="text-sm text-game-pink font-medium">In Stock</span>
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
                <span className="text-sm text-black line-through">
                  {getFormattedPrice(product.price * 1.3)}
                </span>
              )}
            </div>
            
            <p className="text-black leading-relaxed">
              {product.description || 'Premium quality product with excellent performance and durability.'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 transition-all duration-300 ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-pink-500 hover:bg-pink-700'}`}
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
                className="hover:bg-gray-100"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart 
                  size={20} 
                  className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-black'} 
                />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="hover:bg-gray-100"
              >
                <Share2 size={20} className="text-black" />
              </Button>
            </div>
          </div>
          
          {/* Highlights */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h3 className="font-semibold mb-3 text-black">Highlights</h3>
            <ul className="space-y-2 text-sm text-black">
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
          
          {/* Product Details Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger 
                  value="description" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger 
                  value="specs" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Specifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-6 bg-white rounded-b-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-3 text-black">Product Details</h3>
                <p className="text-black mb-4 leading-relaxed">
                  {product.description || 'This premium product offers exceptional quality and performance. Designed for enthusiasts who demand the best, it delivers outstanding results in all conditions.'}
                </p>
                <p className="text-black leading-relaxed">
                  The {product.name} features advanced technology and premium materials for long-lasting durability and exceptional performance. Perfect for both casual and professional use.
                </p>
              </TabsContent>
              <TabsContent value="specs" className="p-6 bg-white rounded-b-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-3 text-black">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-black mb-2">General</h4>
                    <ul className="space-y-2 text-sm text-black">
                      <li className="flex justify-between">
                        <span className="text-black">Platform</span>
                        <span>{product.platform}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-black">Category</span>
                        <span>{product.category}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-black">Release Date</span>
                        <span>2023</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-2">Details</h4>
                    <ul className="space-y-2 text-sm text-black">
                      <li className="flex justify-between">
                        <span className="text-black">Product ID</span>
                        <span>{product.id}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-black">Weight</span>
                        <span>0.5 kg</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-black">Dimensions</span>
                        <span>10 × 10 × 5 cm</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;