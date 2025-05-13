'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const GamingHomepage = () => {
  // Hero images data
  const heroImages = [
    {
      src: "/images/pic2.jpg",
      alt: "Gaming Setup",
      title: "Next Level ",
      subtitle: "Experience the galaxy far, far away with our exclusive games and collect"
    },
    {
      src: "/images/pic3.jpg",
      alt: "PlayStation 5",
      title: "PlayStation 5 ",
      subtitle: "The most powerful console with stunning 4K graphics"
    },
    {
      src: "/images/pic1.jpg",
      alt: "Xbox Series X",
      title: "Xbox Series X ",
      subtitle: "True 4K gaming at 120FPS with our latest console"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Featured products data with sale prices
  const featuredProducts = [
    {
      id: 1,
      name: "PlayStation 5 Pro",
      image: "/images/pp.png",
      category: "Console",
      tag: "SALE",
      colors: ["#003791", "#FFFFFF"],
      link: "/playstation",
      rating: 4.8,
      price: 599.99,
      originalPrice: 990.70,
      discount: "20% OFF"
    },
    {
      id: 2,
      name: "PlayStation 5 Disc Console + Astro Bot",
      image: "/images/p3.png",
      category: "Console",
      tag: "SALE",
      colors: ["#107C10", "#000000"],
      link: "/playstation",
      rating: 4.6,
      price: 644.99,
      originalPrice: 910.35,
      discount: "30% OFF"
    },
    {
      id: 3,
      name: "PlayStation 5 Console Two DualSense Wireless Controllers Bundle (model group - slim)",
      image: "/images/m2.jpg",
      category: "Console",
      tag: "SALE",
      colors: ["#FFFFFF"],
      link: "/playstation",
      rating: 4.7,
      price: 700.27,
      originalPrice: 910.35,
      discount: "30% OFF"
    },
    {
      id: 10,
      name: "Xbox Series S Console",
      image: "/images/1.png",
      category: "Console",
      tag: "NEW",
      colors: ["#107C10"],
      link: "/xbox",
      rating: 4.5,
      price: 499.99,
      originalPrice: 599.99,
      discount: "17% OFF"
    }
  ];

  // Trending products
  const trendingProducts = [
    {
      id: 4,
      name: "AOC 24G4XF Monitor",
      image: "/images/monitor.png",
      category: "Accessories",
      tag: "TRENDING",
      link: "/product/aoc24monitor",
      rating: 4.5,
      price: 249.99
    },
    {
      id: 5,
      name: "Turtle Beach Stealth",
      image: "/images/head.png",
      category: "Accessories",
      tag: "TRENDING",
      link: "/product/pulseelite",
      rating: 4.3,
      price: 149.99
    },
    {
      id: 6,
      name: "DualSense Edge Wireless Controller",
      image: "/images/wireless.png",
      category: "Accessories",
      tag: "TRENDING",
      link: "/product/dsmidnight",
      rating: 4.4,
      price: 199.99
    },
    {
      id: 11,
      name: "Nintendo Switch - White OLED + Mario Kart 8 Deluxe Bundle",
      image: "/images/2.png",
      category: "Console",
      tag: "BUNDLE",
      link: "https://www.gamifox.com/product/switch-oled-white-mk8",
      rating: 4.7,
      price: 349.99
    }
  ];

  // Exclusive games
  const exclusiveGames = [
    {
      id: 7,
      name: "Resident Evil 3 Remake",
      image: "/playstation/resident3.png",
      category: "PS5 Game",
      tag: "EXCLUSIVE",
      link: "/product/capre3",
      rating: 4.9,
      price: 39.99,
      originalPrice: 59.99,
      discount: "33% OFF"
    },
    {
      id: 8,
      name: "Star Wars Outlaws - Special Edition",
      image: "/xbox/starwars.png",
      category: "Xbox Game",
      tag: "EXCLUSIVE",
      link: "/product/star-wars-outlaws",
      rating: 4.8,
      price: 69.99
    },
    {
      id: 9,
      name: "Harry Potter - Hogwarts Legacy",
      image: "/nintendo/hogwarts.png",
      category: "Nintendo",
      tag: "REMIX",
      link: "/product/hogwarts-legacy-switch",
      rating: 4.7,
      price: 49.99,
      originalPrice: 59.99,
      discount: "17% OFF"
    },
    {
      id: 12,
      name: "Call of Duty: Modern Warfare III",
      image: "/images/3.png",
      category: "PS5 Game",
      tag: "EXCLUSIVE",
      link: "https://www.gamifox.com/product/cod-modern-warfare3",
      rating: 4.8,
      price: 59.99,
      originalPrice: 79.99,
      discount: "25% OFF"
    }
  ];

  // Categories data
  const gamingCategories = [
    {
      name: "PlayStation",
      image: "/images/playstation.png",
      link: "/playstation",
      bgColor: "bg-blue-900/90",
      hoverColor: "hover:bg-blue-900"
    },
    {
      name: "Xbox",
      image: "/images/xbox.png",
      link: "/xbox",
      bgColor: "bg-green-800/90",
      hoverColor: "hover:bg-green-800"
    },
    {
      name: "Nintendo",
      image: "/images/nine.png",
      link: "/nintendo",
      bgColor: "bg-red-600/90",
      hoverColor: "hover:bg-red-600"
    },
    {
      name: "PC Gaming",
      image: "/images/pc.png",
      link: "/pc",
      bgColor: "bg-purple-800/90",
      hoverColor: "hover:bg-purple-800"
    }
  ];

  // Format price function
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Slider */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden">
        {/* Slides container */}
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority
                quality={100}
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-md text-left">
            <span className="inline-block mb-3 px-3 py-1 bg-pink-600/90 text-white rounded-full text-xs sm:text-sm font-semibold">
              New Collection 2025
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
              {heroImages[currentSlide].title}<span className="text-pink-400">Gaming</span> Experience
            </h1>
            <p className="text-sm sm:text-base md:text-lg mb-6 text-gray-100">
              {heroImages[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-start">
              <Link href="/xbox">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/30">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Slider indicators - positioned to the right */}
        <div className="absolute bottom-8 right-4 sm:right-8 flex flex-col gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentSlide ? 'bg-pink-600 h-6 sm:h-8' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
              <div className="w-20 h-1 bg-pink-600 mx-auto md:mx-0 mb-4"></div>
              <p className="text-gray-600">Top picks from our collection</p>
            </div>
            <Link href="/playstation" className="flex items-center text-pink-600 hover:text-pink-700 font-medium group">
              View All Products
              <svg className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group flex flex-col h-full">
                <div className="relative h-64 bg-gray-50 flex items-center justify-center p-8">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
                    quality={85}
                  />
                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {product.tag}
                    </div>
                  )}
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
                      {product.discount}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm ml-1 text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">{product.name}</h3>
                  
                  {/* Price section with original and sale price */}
                  <div className="mb-4 mt-auto">
                    {product.originalPrice ? (
                      <div className="flex items-center gap-2">
                        <p className="text-pink-600 font-bold text-lg">
                          {formatPrice(product.price)}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-900 font-bold text-lg">
                        {formatPrice(product.price)}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Link href={product.link}>
                      <button className="w-full bg-gray-900 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-all">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Featured Gaming Consoles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PlayStation Card */}
            <div className="bg-gray-800 rounded-xl p-6 flex flex-col lg:flex-row gap-6 hover:shadow-lg hover:shadow-pink-500/20 transition-all">
              <div className="lg:w-1/2">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-3 py-1 bg-pink-600 text-white rounded-full text-sm font-semibold">
                    Exclusive Bundle
                  </span>
                  <div className="flex items-center text-yellow-400">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-white">Top Rated</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  PlayStation 5 Disc Edition
                </h3>
                <p className="text-gray-300 mb-4">
                  Experience true 4K gaming at 120FPS with our latest console. Bundle includes exclusive controller and 3 months of PlayStation Plus.
                </p>
                <div className="flex items-center mb-4">
                  <span className="text-green-400 mr-2">●</span>
                  <span className="text-sm">Available Now</span>
                </div>
                <Link href="/playstation">
                  <button className="w-full bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium transition-all">
                    View Details
                  </button>
                </Link>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <Image
                  src="/images/ps5.png"
                  alt="PlayStation 5"
                  width={250}
                  height={200}
                  className="rounded-lg object-contain h-48"
                  quality={90}
                />
              </div>
            </div>

            {/* Xbox Card */}
            <div className="bg-gray-800 rounded-xl p-6 flex flex-col lg:flex-row gap-6 hover:shadow-lg hover:shadow-green-500/20 transition-all">
              <div className="lg:w-1/2">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">
                    Digital Edition
                  </span>
                  <div className="flex items-center text-yellow-400">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-white">Popular Choice</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Xbox Series S 512GB
                </h3>
                <p className="text-gray-300 mb-4">
                  Next-gen performance in the smallest Xbox console. Perfect for all-digital gaming with 2024 updated packaging.
                </p>
                <div className="flex items-center mb-4">
                  <span className="text-green-400 mr-2">●</span>
                  <span className="text-sm">available</span>
                </div>
                <Link href="/xbox">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all">
                    Explore Features
                  </button>
                </Link>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <Image
                  src="/images/c2.png"
                  alt="Xbox Series S"
                  width={250}
                  height={200}
                  className="rounded-lg object-contain h-48"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Trending Now</h2>
            <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hot products everyone is talking about
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group flex flex-col h-full">
                <div className="relative h-64 bg-gray-50 flex items-center justify-center p-8">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
                    quality={85}
                  />
                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {product.tag}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm ml-1 text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">{product.name}</h3>
                  
                  <div className="mb-4 mt-auto">
                    <p className="text-gray-900 font-bold text-lg">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Link href={product.link}>
                      <button className="w-full bg-gray-900 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-all">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Games Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Exclusive Games</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto md:mx-0 mb-4"></div>
              <p className="text-gray-600">Experience the best of gaming</p>
            </div>
            <Link href="/games" className="flex items-center text-blue-600 hover:text-blue-700 font-medium group">
              View All Games
              <svg className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {exclusiveGames.map((game) => (
              <div key={game.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group flex flex-col h-full">
                <div className="relative h-64 bg-gray-50 flex items-center justify-center p-8">
                  <Image
                    src={game.image}
                    alt={game.name}
                    width={300}
                    height={300}
                    className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
                    quality={85}
                  />
                  {game.tag && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {game.tag}
                    </div>
                  )}
                  {game.discount && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
                      {game.discount}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-gray-500 text-sm">{game.category}</p>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm ml-1 text-gray-600">{game.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">{game.name}</h3>
                  
                  <div className="mb-4 mt-auto">
                    {game.originalPrice ? (
                      <div className="flex items-center gap-2">
                        <p className="text-blue-600 font-bold text-lg">
                          {formatPrice(game.price)}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          {formatPrice(game.originalPrice)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-900 font-bold text-lg">
                        {formatPrice(game.price)}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Link href={game.link}>
                      <button className="w-full bg-gray-900 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Platform Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Shop by Platform</h2>
            <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore gaming gear for your favorite platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamingCategories.map((category) => (
              <Link href={category.link} key={category.name}>
                <div className={`group relative h-48 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${category.bgColor} ${category.hoverColor}`}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover opacity-80 mix-blend-overlay transition-transform duration-500 group-hover:scale-110"
                    quality={85}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white text-center px-4">
                      {category.name}
                    </h3>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <button className="bg-white/90 hover:bg-white text-gray-900 px-6 py-2 rounded-full font-medium text-sm transition-all">
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest gaming gear updates, exclusive deals, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto sm:max-w-lg">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-pink-500/30 whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default GamingHomepage;