'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '../components/ui/sooner';

export type CurrencyType = 'USD' | 'GBP' | 'EUR';

export const currencySymbols: Record<CurrencyType, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€'
};

export const currencyRates: Record<CurrencyType, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92
};

export type ProductCategory = 'console' | 'digital' | 'games' | 'accessories';

export interface Product {
  id: string;
  name: string;
  price: number; // Base price in USD
  category: ProductCategory;
  image: string | string[];
  platform: 'playstation' | 'xbox' | 'nintendo' | 'pc';
  description?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface GameStoreContextType {
  products: Product[];
  cartItems: CartItem[];
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => number;
  getFormattedPrice: (price: number) => string;
  filterProductsByPlatform: (platform: string) => Product[];
  filterProductsByCategory: (platform: string, category: ProductCategory) => Product[];
}

const GameStoreContext = createContext<GameStoreContextType | undefined>(undefined);

// Mock products data
const mockProducts: Product[] = [
  // PlayStation Products
 {
  id: 'ps5console',
  name: 'PlayStation 5 Console',
  price: 499.99,
  category: 'console',
  image: [
      '/images/ps55.png',
      '/playstation/console5.png',
      
    ],
  
  platform: 'playstation',
  description: `Unleash the next generation of gaming with the PlayStation 5 Console, a powerful machine built for speed, immersion, and mind-blowing visuals. The PS5 is more than just a console—it's an experience designed to push boundaries and elevate your gameplay to the next level.

Key Features:

- Ultra-High Speed SSD  
  Say goodbye to long loading screens. The lightning-fast custom SSD dramatically boosts load times for installed games.

- Revolutionary DualSense™ Controller  
  Enjoy a new level of tactile immersion with haptic feedback and adaptive triggers that respond uniquely to in-game actions.

- Immersive 3D Audio  
  Get lost in rich, spatial soundscapes with Tempest 3D AudioTech—hear every whisper, explosion, and footstep with incredible realism.

- Ray Tracing & 4K Gaming  
  Experience breathtaking graphics with ray tracing technology and play your favorite games in stunning 4K resolution up to 120fps.

- Backward Compatibility  
  Access a massive library of PlayStation 4 games with enhanced visuals and performance.

- Expandable Storage  
  Easily add more space for your games with compatible NVMe SSD drives (sold separately).

Perfect for: Hardcore gamers, tech enthusiasts, and anyone ready to embrace the future of gaming.`
},

 {
  id: 'ps5digitial',
  name: 'PlayStation 5 Digital Edition',
  price: 399.99,
  category: 'console',
  image: [ '/add/digital.png',
    '/add/d4.png',
  ],
  platform: 'playstation',
  description: `The PS5 Digital Edition offers the same lightning-fast performance and next-gen features as the standard PS5—but without a disc drive.

Enjoy ultra-fast load times with the built-in SSD, immersive gameplay with haptic feedback and adaptive triggers, and stunning 4K visuals powered by ray tracing.

Perfect for digital-only gamers who prefer downloading their games and want a sleek, all-digital experience.`
},
 {
  id: 'ps5slimdig',
  name: 'PlayStation 5 Slim Digital Console',
  price: 644.99,
  category: 'console',
  image: ['/add/s1.png',
    '/add/s2.png',
    '/add/slim1.png',
    '/add/slim2.png',
    '/add/slim4.png',
     '/add/s4.png'
  ],
  platform: 'playstation',
  description: `Slim Design
With PS5, players get powerful gaming technology packed inside a sleek and compact console design.

1TB of Storage
Keep your favorite games ready and waiting for you to jump in and play with 1TB of SSD storage built in.

Ultra-High Speed SSD
Maximize your play sessions with near-instant load times for installed PS5 games.

Integrated I/O
The custom integration of the PS5 console's systems lets creators pull data from the SSD so quickly that they can design games in ways never before possible.

Ray Tracing
Immerse yourself in worlds with a new level of realism as rays of light are individually simulated, creating true-to-life shadows and reflections in supported PS5 games.

4K-TV Gaming
Play your favorite PS5 games on your stunning 4K TV.

Up to 120fps with 120Hz output
Enjoy smooth and fluid high frame rate gameplay at up to 120fps for compatible games, with support for 120Hz output on 4K displays.

HDR Technology
With an HDR TV, supported PS5 games display an unbelievably vibrant and lifelike range of colors.

Tempest 3D AudioTech
Immerse yourself in soundscapes where it feels as if the sound comes from every direction. Your surroundings truly come alive with Tempest 3D AudioTech in supported games.

Haptic Feedback
Experience haptic feedback via the DualSense wireless controller in select PS5 titles and feel the effects and impact of your in-game actions through dynamic sensory feedback.

Adaptive Triggers
Get to grips with immersive adaptive triggers, featuring dynamic resistance levels that simulate the physical impact of in-game activities in select PS5 games.

Includes ASTRO’S Playroom
Explore four worlds, each one showcasing innovative gameplay using the versatile features of the DualSense wireless controller, in this game included for all PS5 console users.

Lightning Speed
Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do.

Stunning Games
Marvel at incredible graphics and experience new PS5 features. Play a back catalogue of supported PS4 games.

Breathtaking Immersion
Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio technology.

Backwards Compatibility & Game Boost
The PS5 console can play over 4,000 PS4 games. With the Game Boost feature, you can even enjoy faster and smoother frame rates in some of the PS4 console’s greatest games.`
},
 {
  id: 'ps5discastro',
  name: 'PlayStation 5 Disc Console + Astro Bot',
  price: 644.99,
  category: 'console',
  image: '/add/astro.jpg',
  platform: 'playstation',
  description: `Get the ultimate gaming combo with the PlayStation 5 Disc Console bundled with the charming Astro Bot game.

Enjoy ultra-fast load times, breathtaking 4K visuals, ray tracing, and deeply immersive gameplay with the innovative DualSense™ controller.

This bundle includes:
- PlayStation 5 Disc Console with disc drive for physical and digital games
- Astro Bot: a fun, family-friendly platformer that showcases the full potential of the PS5's features

Perfect for players who want top-tier performance and a delightful game right out of the box.`
},
 {
  id: 'ps5slimac',
  name: 'PlayStation 5 Slim Console + Assassin’s Creed Shadows Special Edition Bundle',
  price: 749.99,
  category: 'console',
  image: '/playstation/psc3.png',
  platform: 'playstation',
  description: `Immerse yourself in next-gen performance and legendary storytelling with the PlayStation 5 Slim Console bundled with Assassin’s Creed Shadows Special Edition.

Key Features:

- Sleeker, more compact PS5 Slim design with full next-gen capabilities  
- Ultra-fast SSD for near-instant load times  
- DualSense™ controller with adaptive triggers and haptic feedback  
- Stunning 4K graphics with ray tracing support  

Bundle includes:
- PlayStation 5 Slim Disc Console  
- Assassin’s Creed Shadows (Special Edition) with exclusive content  

Step into feudal Japan and rewrite history with stealth, power, and precision—only on PS5.`
},
  {
  id: 'ps5discastri',
  name: 'PlayStation 5 Pro Console',
  price: 1049.99,
  category: 'console',
  image: [ '/images/pro11.png',
     '/add/p1.png',
     '/add/p2.png',
     
  ],
  platform: 'playstation',
  description: `PlayStation Spectral Super Resolution (PSSR) - Get super sharp image clarity on your 4K TV using AI-enhanced resolution for ultra-high definition play with astonishing detail.

Optimized Console Performance - Reach higher and more consistent frame rates for silky smooth gameplay with support for 60Hz and 120Hz displays.

Advanced Ray Tracing - Experience next-level realism with ray-traced reflections, shadows, and high-quality global illumination as you explore stunning game worlds.

2TB of Storage - Keep your favorite games ready and waiting for you to jump in and play with 2TB of SSD storage built in.

PS5 Pro Game Boost and Backwards Compatibility - The PS5 Pro console can play over 8,500 PS4 games. With the PS5 Pro version of the Game Boost feature, you can even enjoy faster and smoother frame rates in some of the PS4 and PS5 console’s greatest games. Enjoy more immersive worlds, responsive gameplay, and stunning detail like never before.`
},

   {
    id: 'ps5discartri',
    name: 'PlayStation 5 Console Two DualSense Wireless Controllers Bundle (model group - slim)',
    price: 700.27,
    category: 'console',
    image: '/images/m2.jpg',
    platform: 'playstation',
    description: `Embark on an unforgettable journey with the PlayStation 5 Slim Console bundled with The Witcher 3: Wild Hunt – Complete Edition, absolutely FREE.\n
This sleek, space-saving version of the PS5 offers the full power of next-gen gaming with:\n
- Ultra-fast SSD for near-instant loading\n
- 4K graphics and ray tracing support\n
- DualSense™ controller for immersive haptic feedback and adaptive triggers\n
- Built-in disc drive for physical and digital games\n
\n
Included Game:\n🎮 The Witcher 3: Complete Edition – Includes all DLCs and expansions (Hearts of Stone & Blood and Wine), upgraded for PS5 with enhanced visuals, performance, and new gameplay features.\n
Explore a vast open world, slay monsters, make impactful choices, and live the legend of Geralt of Rivia—all in one powerful bundle.`
  },
  
  {
  id: 'ps5slimdisc',
  name: 'PlayStation 5 Slim Disc Console',
  price: 719.99,
  category: 'console',
  image: [
    '/playstation/psc4.png',
    '/add/slim1.png',
    '/add/slim2.png',
    '/add/slim3.png',
    '/add/slim4.png'

  ],
  platform: 'playstation',
  description: `Slim Design
With PS5, players get powerful gaming technology packed inside a sleek and compact console design.

1TB of Storage
Keep your favorite games ready and waiting for you to jump in and play with 1TB of SSD storage built in.

Ultra-High Speed SSD
Maximize your play sessions with near-instant load times for installed PS5 games.

Integrated I/O
The custom integration of the PS5 console's systems lets creators pull data from the SSD so quickly that they can design games in ways never before possible.

Ray Tracing
Immerse yourself in worlds with a new level of realism as rays of light are individually simulated, creating true-to-life shadows and reflections in supported PS5 games.

4K-TV Gaming
Play your favorite PS5 games on your stunning 4K TV.

Up to 120fps with 120Hz output
Enjoy smooth and fluid high frame rate gameplay at up to 120fps for compatible games, with support for 120Hz output on 4K displays.

HDR Technology
With an HDR TV, supported PS5 games display an unbelievably vibrant and lifelike range of colors.

Tempest 3D AudioTech
Immerse yourself in soundscapes where it feels as if the sound comes from every direction. Your surroundings truly come alive with Tempest 3D AudioTech in supported games.

Haptic Feedback
Experience haptic feedback via the DualSense wireless controller in select PS5 titles and feel the effects and impact of your in-game actions through dynamic sensory feedback.

Adaptive Triggers
Get to grips with immersive adaptive triggers, featuring dynamic resistance levels that simulate the physical impact of in-game activities in select PS5 games.

Includes ASTRO’S Playroom
Explore four worlds, each one showcasing innovative gameplay using the versatile features of the DualSense wireless controller, in this game included for all PS5 console users.

Lightning Speed
Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do.

Stunning Games
Marvel at incredible graphics and experience new PS5 features. Play a back catalog of supported PS4 games.

Breathtaking Immersion
Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio technology.

Backwards Compatibility & Game Boost
The PS5 console can play over 4,000 PS4 games. With the Game Boost feature, you can even enjoy faster and smoother frame rates in some of the PS4 console’s greatest games..`
},

  {
    id: 'ps5witcher',
    name: 'PlayStation 5 Slim Console + FREE The Witcher Complete Edition Bundle',
    price: 719.99,
    category: 'console',
    image: '/playstation/psc5.png',
    platform: 'playstation',
   description: `PlayStation 5 Slim Disc Console

The Witcher Complete Edition

Slim Design
With PS5, players get powerful gaming technology packed inside a sleek and compact console design.

1TB of Storage
Keep your favorite games ready and waiting for you to jump in and play with 1TB of SSD storage built in.

Ultra-High Speed SSD
Maximize your play sessions with near-instant load times for installed PS5 games.

Integrated I/O
The custom integration of the PS5 console's systems lets creators pull data from the SSD so quickly that they can design games in ways never before possible.

Ray Tracing
Immerse yourself in worlds with a new level of realism as rays of light are individually simulated, creating true-to-life shadows and reflections in supported PS5 games.

4K-TV Gaming
Play your favorite PS5 games on your stunning 4K TV.

Up to 120fps with 120Hz output
Enjoy smooth and fluid high frame rate gameplay at up to 120fps for compatible games, with support for 120Hz output on 4K displays.

HDR Technology
With an HDR TV, supported PS5 games display an unbelievably vibrant and lifelike range of colors.

Tempest 3D AudioTech
Immerse yourself in soundscapes where it feels as if the sound comes from every direction. Your surroundings truly come alive with Tempest 3D AudioTech in supported games.

Haptic Feedback
Experience haptic feedback via the DualSense wireless controller in select PS5 titles and feel the effects and impact of your in-game actions through dynamic sensory feedback.

Adaptive Triggers
Get to grips with immersive adaptive triggers, featuring dynamic resistance levels that simulate the physical impact of in-game activities in select PS5 games.

Includes ASTRO’S Playroom
Explore four worlds, each one showcasing innovative gameplay using the versatile features of the DualSense wireless controller, in this game included for all PS5 console users.

Lightning Speed
Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do.

Stunning Games
Marvel at incredible graphics and experience new PS5 features. Play a back catalogue of supported PS4 games.

Breathtaking Immersion
Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio technology.

Backwards Compatibility & Game Boost
The PS5 console can play over 4,000 PS4 games. With the Game Boost feature, you can even enjoy faster and smoother frame rates in some of the PS4 console’s greatest games.`

  },

  // Games
 {
  id: 'capre2',
  name: 'Resident Evil 2 Remake',
  price: 37.49,
  category: 'games',
  image: '/playstation/resident1.png',
  platform: 'playstation',
  description: 'Step back into the terrifying world of Raccoon City with Resident Evil 2 Remake, a beautifully reimagined version of the 1998 survival horror masterpiece. Experience heart-pounding gameplay as you follow rookie police officer Leon S. Kennedy and college student Claire Redfield as they struggle to survive a zombie outbreak that has engulfed the city. Featuring breathtaking visuals, modernized controls, and a haunting atmosphere, this remake brings the horrors of the original game to life with intense realism. Uncover dark secrets, solve challenging puzzles, and fight off grotesque creatures in a gripping story of survival, fear, and courage.'
},
  {
  id: 'capre3',
  name: 'Resident Evil 3 Remake',
  price: 37.49,
  category: 'games',
  image: '/playstation/resident3.png',
  platform: 'playstation',
  description: 'Join elite operative Jill Valentine in her desperate fight for survival as Raccoon City descends into chaos in Resident Evil 3 Remake. Reimagined with stunning modern visuals and immersive gameplay, this action-packed thriller puts you face-to-face with the relentless bioweapon Nemesis. Navigate intense escape sequences, uncover the sinister secrets of the Umbrella Corporation, and team up with fellow survivors in a race against time. With enhanced mechanics, cinematic storytelling, and heart-pounding horror, this remake delivers a gripping and unforgettable experience.'
} ,
  {
  id: 'eafc25',
  name: 'EA SPORTS FC™ 25',
  price: 71.99,
  category: 'games',
  image: '/playstation/fc25.png',
  platform: 'playstation',
  description: 'Step onto the pitch with EA SPORTS FC™ 25, the next evolution in football gaming. Featuring hyper-realistic gameplay, cutting-edge graphics, and next-gen physics, this title delivers the most immersive football experience to date. Build your dream squad in Ultimate Team, rise through the ranks in Career Mode, or challenge players around the world in intense online matches. With updated rosters, authentic stadium atmospheres, and smarter AI, FC™ 25 redefines what it means to play the beautiful game. Get ready to feel every pass, tackle, and goal like never before.'
},
  {
    id: 'indycircle',
    name: 'Indiana Jones and the Great Circle',
    price: 101.99,
    category: 'games',
    image: '/playstation/in.png',
    platform: 'playstation',
    description: 'Embark on a globe-trotting adventure as the legendary archaeologist in this action-packed game.'
  },
  {
    id: 'alonedark',
    name: 'Alone In The Dark',
    price: 31.49,
    category: 'games',
    image: '/playstation/aloneindark.png',
    platform: 'playstation',
    description: 'A reimagining of the survival horror classic with modern gameplay and visuals.'
  },
  {
    id: 'unknown9',
    name: 'Unknown 9: Awakening',
    price: 22.50,
    category: 'games',
    image: '/playstation/silent.png',
    platform: 'playstation',
    description: 'Uncover hidden truths in this mysterious action-adventure game with supernatural elements.'
  },
  {
    id: 'tlou2rem',
    name: 'The Last of Us Part II Remastered',
    price: 64.49,
    category: 'games',
    image: '/playstation/lastofus.png',
    platform: 'playstation',
    description: 'Enhanced version of the acclaimed post-apocalyptic adventure with improved visuals and new content.'
  },
  {
    id: 'topspin25',
    name: 'TopSpin 2K25',
    price: 9.00,
    category: 'games',
    image: '/playstation/topspin.png',
    platform: 'playstation',
    description: 'The tennis franchise returns with legendary players and competitive gameplay modes.'
  },
  {
    id: 'warhammer40k',
    name: 'Warhammer 40,000: Space Marine 2',
    price: 89.99,
    category: 'games',
    image: '/playstation/warharmers.png',
    platform: 'playstation',
    description: 'Battle hordes of aliens in this action-packed third-person shooter set in the Warhammer universe.'
  },

  // Accessories
  {
    id: 'venomdock',
    name: 'Docking Station For PS Portal',
    price: 29.99,
    category: 'accessories',
    image: '/playstation/dock.png',
    platform: 'playstation',
    description: 'Convenient docking station for your PlayStation Portal device.'
  },
  {
    id: 'wdsn850p',
    name: 'WD_BLACK SN850P NVMe SSD for PS5 - 1TB',
    price: 187.49,
    category: 'accessories',
    image: '/playstation/wd.png',
    platform: 'playstation',
    description: 'High-performance SSD expansion for your PS5 console.'
  },
  {
    id: 'dsmidnight',
    name: 'DualSense Edge Wireless Controller – Midnight Black',
    price: 299.99,
    category: 'accessories',
    image: '/playstation/controller.png',
    platform: 'playstation',
    description: 'Premium customizable controller with advanced features and sleek black design.'
  },
  {
  id: 'pulseelite',
  name: 'PULSE Elite Wireless Headset – Midnight Black',
  price: 194.99,
  category: 'accessories',
  image: '/playstation/wireless.png',
  platform: 'playstation',
  description: 'Immerse yourself in rich, high-fidelity audio with the PULSE Elite Wireless Headset. Designed for PlayStation, it features advanced noise cancellation, precise positional audio, and a comfortable, lightweight design for extended gaming sessions. Enjoy wireless freedom with crystal-clear chat and deep bass that brings your games and media to life.'
},
  {
  id: 'pulseexplore',
  name: 'PULSE Explore Wireless Earbuds – Midnight Black',
  price: 299.99,
  category: 'accessories',
  image: '/playstation/earbuds.png',
  platform: 'playstation',
  description: 'Experience premium sound quality with the PULSE Explore Wireless Earbuds. Designed for PlayStation gamers, these earbuds deliver lossless audio clarity, deep bass, and a sleek, comfortable fit for all-day use. Featuring advanced wireless connectivity, long battery life, and intuitive touch controls, they offer the perfect blend of style and performance for immersive gaming and media enjoyment.'
},
   {
  id: 'gioteckvx4',
  name: 'Gioteck VX-4+ Wired RGB PS4 Controller - Camo',
  price: 18.75,
  category: 'accessories' ,  
  image: '/playstation/giatck.png',
  platform: 'playstation',
  description: 'Get reliable performance and style with the Gioteck VX-4+ Wired Controller, featuring vibrant RGB lighting and a rugged camouflage design. This affordable controller offers responsive buttons, ergonomic grips, and plug-and-play compatibility with PS4 consoles. Perfect for gamers who want an eye-catching and functional controller without breaking the bank.'
},
   {
  id: 'powerachargeuk',
  name: 'Twin Charging Station for DualSense Wireless Controllers (UK Plug)',
  price: 29.99,
  category: 'accessories',
  image: '/playstation/twin.png',
  platform: 'playstation',
  description: 'Keep your DualSense wireless controllers powered up and ready with this official licensed twin charging station. Designed for convenience, it features simultaneous charging for two controllers, a compact design, and a UK plug for easy connection. Perfect for avid PlayStation gamers who want to keep their controllers charged without the hassle.'
},

  // Digital Gift Cards
  {
    id: 'psngift20',
    name: '£20 PlayStation Gift Card',
    price: 30.00,
    category: 'digital',
    image: '/playstation/pd2.png',
    platform: 'playstation',
    description: 'Redeem for games, DLC, subscriptions and more on PlayStation Store.'
  },
  {
    id: 'psngift50',
    name: '£50 PlayStation Gift Card',
    price: 75.00,
    category: 'digital',
    image: '/playstation/pd3.png',
    platform: 'playstation',
    description: 'Redeem for games, DLC, subscriptions and more on PlayStation Store.'
  },
  {
    id: 'psngift100',
    name: '£100 PlayStation Gift Card',
    price: 150.00,
    category: 'digital',
    image: '/playstation/pd4.png',
    platform: 'playstation',
    description: 'Redeem for games, DLC, subscriptions and more on PlayStation Store.'
  },

  
   {
    id: 'psngift1000',
    name: 'Ghost Of Yotei',
    price: 104.99,
    category: 'games',
    image: '/xbox/xbox1.png',
    platform: 'playstation',
    description: 'Discover a bold, new story of a warrior in Japan who is on her own mission of vengeance.Set 300 years after the critically acclaimed Ghost of Tsushima, Ghost of Yotei is a standalone experience set in 1600s rural Japan. The story follows a haunted, lone mercenary named Atsu. Thirstyfor revenge, she travels through the beautiful, rugged landscapes of northern Japan, hunting those who killed her family many years earlier.Sixteen years after her family’s death, Atsu’s quest across Ezo brings her to unexplored lands in search of a gang of six outlaws, but she finds much more than vengeance. Throughout her journey, Atsu will discover unlikely allies, and greater bonds than she could haveimagined'
  },
  // Xbox Products
   {
      id: 'poweraa',
      name: 'Xbox Series X Black',
      price: 719.99,
      category: 'console',
      image: ['/xbox/xbox2.png',
        '/add/black1.png',
        '/add/black2.png',
        '/add/black3.png',
        '/add/black4.png',
        '/add/black5.png',
        

      ],
      platform: 'xbox',
      description: 'Introducing Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles - all games look and play best on Xbox Series X.Experience next-gen speed and performance with the Xbox Velocity Architecture, powered by a custom SSD and integrated software.Play thousands of games from four generations of Xbox with Backward Compatibility, including optimized titles at launch.Xbox Game Pass Ultimate includes Xbox Live Gold, over 100 high-quality games on console, PC, and Android mobile devices, and soon an EA Play membership for one low monthly price (membership sold separately).Xbox Smart Delivery ensures you play the best available version of your game no matter which console youre playing on.Important Information'
    },
    {
  id: 'xbox-series-x',
  name: 'Xbox Series S Console',
  price: 374.99,
  category: 'console',
  image: '/images/sers.png',
  platform: 'xbox',
  description: `Introducing the Xbox Series S — the smallest, sleekest Xbox ever, designed to bring you powerful next-gen performance at an incredible value.

Don’t be fooled by its size — the Series S packs a punch with a custom-built SSD and Xbox Velocity Architecture, delivering lightning-fast load times and incredibly smooth gameplay up to 120 frames per second.

Enjoy rich, vibrant visuals with ray tracing support, high dynamic range (HDR), and up to 1440p resolution with 4K upscaling. Whether you're jumping into expansive open worlds or fast-paced shooters, the Series S offers fluid responsiveness and performance that keeps up with your skills.

Key Features:
- All-digital console with 512GB custom SSD  
- Quick Resume to switch between multiple games instantly  
- Ray tracing and ultra-low latency  
- Smart Delivery ensures you always play the best version of your games  
- Backward compatibility with thousands of Xbox One, Xbox 360, and original Xbox titles  

Perfect for gamers who want an affordable, digital-only gateway into next-gen gaming — all in a compact, modern design that fits anywhere.`
},
    {
  id: 'xbox-series-s-white',
  name: 'Xbox Series S 512GB White - 2024 Packaging',
  price: 374.99,
  category: 'console',
  image: '/xbox/seriess.png',
  platform: 'xbox',
  description: `Introducing the Xbox Series S (512GB, 2024 Packaging) — the all-digital, next-gen console packed into the most compact Xbox ever.

This updated version comes in refreshed 2024 packaging and delivers stunning performance, ultra-fast load times, and smooth gameplay up to 120FPS — all powered by the Xbox Velocity Architecture and a custom SSD.

Highlights:
- Sleek white design with 512GB storage  
- All-digital gaming: download and play the latest blockbusters and Xbox exclusives  
- Up to 1440p resolution with 4K upscaling  
- DirectX ray tracing and high dynamic range (HDR) for realistic visuals  
- Quick Resume and faster load times  
- Compatible with thousands of backward compatible titles  
- Smart Delivery support for optimized game versions

Ideal for players who want affordable, digital-only access to the latest generation of Xbox gaming with style, speed, and power.`
},
   {
  id: 'gamepass-core-12',
  name: 'Xbox Game Pass Core - 12 Month Membership',
  price: 83.99,
  category: 'console',
  image: '/xbox/12.png',
  platform: 'xbox',
  description: `Get a full year of nonstop gaming with Xbox Game Pass Core – 12 Month Membership.

Enjoy access to online multiplayer gaming, exclusive member deals, and a handpicked collection of 25+ high-quality titles you can play anytime. Whether you're into action, sports, strategy, or indie hits, there's something for every gamer.

Benefits include:
- 12 months of access to online console multiplayer  
- A rotating library of 25+ popular and high-quality games  
- Exclusive discounts on games and add-ons  
- Access to free play days for select titles  
- Seamless integration with your Xbox console experience  

Perfect for Xbox players who want affordable, long-term access to multiplayer and great games — all in one package.`
},
    {
      id: 'gamepass-core-3',
      name: 'Xbox Game Pass Core - 3 Month Membership',
      price: 26.99,
      category: 'console',
      image: '/xbox/3.png',
      platform: 'xbox',
      description: 'Access to online multiplayer gaming.'
    },
    {
      id: 'gamepass-core-6',
      name: 'Xbox Game Pass Core - 6 Month Membership',
      price: 44.99,
      category: 'console',
      image: '/xbox/6.png',
      platform: 'xbox',
      description: 'Access to online multiplayer gaming.'
    },
    {
      id: 'star-wars-outlaws',
      name: 'Star Wars Outlaws - Special Edition',
      price: 58.50,
      category: 'games',
      image: '/xbox/starwars.png',
      platform: 'xbox',
      description: 'Experience the first open-world Star Wars game set between Empire Strikes Back and Return of the Jedi.'
    },
    {
      id: 'lords',
      name: 'Lords Of The Fallen',
      price: 9.99,
      category: 'games',
      image: '/xbox/lords.png',
      platform: 'xbox',
      description: '.'
    },
    {
      id: '2k25',
      name: 'PGA Tour 2K25',
      price: 85.49,
      category: 'games',
      image: '/xbox/2k255.png',
      platform: 'xbox',
      description: '.'
    },
    {
      id: 'assassins-creed-shadows',
      name: 'Assassins Creed Shadows Special Edition',
      price: 97.49,
      category: 'games',
      image: '/xbox/ass.png',
      platform: 'xbox',
      description: 'Explore feudal Japan in this latest installment of the acclaimed Assassin\'s Creed series.'
    },
    {
      id: 'starship-troopers',
      name: 'Starship Troopers',
      price: 21.00,
      category: 'games',
      image: '/xbox/startship.png',
      platform: 'xbox',
      description: 'Product code: 384386. Battle alien bugs in this action-packed shooter based on the classic film.'
    },
    {
      id: 'witcher3-complete',
      name: 'The Witcher 3: Wild Hunt - Complete Edition',
      price: 6.00,
      category: 'games',
      image: '/xbox/which.png',
      platform: 'xbox',
      description: 'Play as a monster slayer in this award-winning RPG with all DLC included.'
    },
    {
      id: 'cod-modern-warfare3',
      name: 'Call of Duty: Modern Warfare III',
      price: 15.00,
      category: 'games',
      image: '/xbox/cod.png',
      platform: 'xbox',
      description: 'The latest installment in the iconic Call of Duty franchise with intense multiplayer action.'
    },
    {
      id: 'afterglow-controller',
      name: 'Afterglow wave Xbox controller',
      price: 45.00,
      category: 'accessories',
      image: '/xbox/glow.png.png',
      platform: 'xbox',
      description: 'Illuminate your gaming sessions with the Afterglow Wave Xbox Controller, featuring a vibrant translucent design and fully customizable RGB lighting. Built for both style and performance, this controller offers responsive buttons, precision analog sticks, and a comfortable ergonomic grip for extended play. Easily adjust lighting effects and profiles to match your setup or mood, and enjoy seamless compatibility with Xbox consoles and Windows PCs. Whether youre gaming casually or competitively, this controller brings both flair and function to your hands.'
    },
    {
  id: 'controller',
  name: 'PowerA Advantage Wired Controller for Xbox Series X|S - Warriors Nirvana',
  price: 25.49,
  category: 'accessories',
  image: '/xbox/nivrana.png',
  platform: 'xbox',
  description: 'Unleash precision and power with the PowerA Advantage Wired Controller for Xbox Series X|S – Warriors Nirvana Edition. Featuring a bold, battle-ready design, this officially licensed controller offers advanced gaming performance with responsive buttons, dual rumble motors, and mappable advanced gaming buttons for quick in-game actions. Its ergonomic shape ensures comfort during long sessions, while the detachable 10ft USB cable provides the freedom you need. Compatible with Xbox Series X|S, Xbox One, and Windows PCs, this controller is built for both competitive play and stunning style.'
},
   {
  id: 'stealth-battery-pack',
  name: 'High Capacity Rechargeable Battery Twin Pack - Black',
  price: 29.99,
  category: 'accessories',
  image: '/xbox/stealth.png',
  platform: 'xbox',
  description: 'Stay in the game longer with the High Capacity Rechargeable Battery Twin Pack – Black, designed specifically for Xbox controllers. This twin pack includes two powerful rechargeable battery packs that deliver extended playtime and eliminate the need for disposable batteries. With fast charging capabilities and a long-lasting charge, you can keep one battery powered up while using the other, ensuring you’re always ready for action. Compatible with Xbox Series X|S and Xbox One controllers, it’s the perfect power solution for uninterrupted gaming.'
},
    {
      id: 'turtle-beach-headset-white',
      name: 'Stealth 600 Gen 3 Headset for Xbox PS5 PS4 & PC - White',
      price: 149.99,
      category: 'accessories',
      image: '/xbox/turtule.png',
      platform: 'xbox',
      description: 'Product code: 988547. Premium wireless gaming headset with 50mm speakers and noise-cancelling mic.'
    },
    {
      id: 'powera-wired-controller',
      name: 'Xbox Series X|S Wired Controller - Black',
      price: 37.49,
      category: 'accessories',
      image: '/xbox/powera.png',
      platform: 'xbox',
      description: 'Officially licensed wired controller with customizable buttons and ergonomic design.'
    },
    {
      id: 'powera',
      name: 'PowerA charging Station for PlayStation Portal',
      price: 44.99,
      category: 'accessories',
      image: '/xbox/portal.png',
      platform: 'xbox',
      description: 'Officially licensed wired controller with customizable buttons and ergonomic design.'
    },
    




      // Nintendo Consoles
      {
  id: 'switch-oled-white-mk8',
  name: 'Nintendo Switch - White OLED + Mario Kart 8 Deluxe Bundle',
  price: 494.99,
  category: 'console',
  image: '/nintendo/switchwhite.png',
  platform: 'nintendo',
  description: `Bring home the ultimate Nintendo gaming experience with the Nintendo Switch OLED White + Mario Kart 8 Deluxe Bundle.

This special bundle includes the upgraded Nintendo Switch OLED model featuring a vibrant 7" OLED screen, enhanced audio, a wide adjustable stand, and 64GB of internal storage. Paired with Mario Kart 8 Deluxe — one of the most fun and fast-paced multiplayer games — this bundle is perfect for solo players, families, and competitive racers alike.

Bundle Features:
- Nintendo Switch OLED Model (White Joy-Con)  
- Stunning 7" OLED screen with vivid colors and enhanced contrast  
- Built-in 64GB of internal storage  
- Wide adjustable stand for tabletop gaming  
- Enhanced onboard speakers for improved audio  
- Includes full digital version of Mario Kart 8 Deluxe  
- Play anytime, anywhere — TV mode, tabletop mode, or handheld mode  

Ideal for both casual and serious gamers, this bundle delivers everything you need to jump into the world of Nintendo with beautiful visuals and nonstop multiplayer fun.`
},
      {
  id: 'switch-oled-mario-nso',
  name: 'Nintendo Switch (OLED) + Mario Wonder + 12 Months NSO',
  price: 449.99,
  category: 'console',
  image: '/nintendo/nintendo.png',
  platform: 'nintendo',
  description: `Experience the ultimate Nintendo package with this premium bundle featuring the Nintendo Switch OLED model, the exciting Super Mario Bros. Wonder game, and a full 12-month Nintendo Switch Online membership.

Enjoy the vibrant 7-inch OLED screen with enhanced colors and audio, perfect for handheld and tabletop gaming. Dive into the whimsical new adventures of Mario Wonder, packed with fresh levels and surprises. Plus, stay connected with friends and access classic games with the 12-month NSO membership.

Bundle Highlights:
- Nintendo Switch OLED with brilliant 7" OLED display  
- Super Mario Bros. Wonder — a fresh, fun-filled Mario adventure  
- 12-month Nintendo Switch Online membership for online play, classic games, and exclusive offers  
- Enhanced audio and adjustable stand for versatile gameplay  

Perfect for players seeking premium visuals, new Mario challenges, and the best online gaming experience all in one pack.`
},
      {
  id: 'switch-neon-sports-nso',
  name: 'Nintendo Switch (Neon Red/Blue) + Switch Sports + 12 Months NSO',
  price: 374.99,
  category: 'console',
  image: '/nintendo/switch2.png',
  platform: 'nintendo',
  description: `Get active and connected with the Nintendo Switch Neon Red/Blue bundle, featuring the classic Switch console with vibrant neon Joy-Cons, the energetic Nintendo Switch Sports game, and a full 12-month Nintendo Switch Online membership.

Enjoy hours of fun with friends and family through interactive sports like tennis, bowling, and more, all optimized for intuitive motion controls. Stay online with your friends to play multiplayer games, access classic titles, and get exclusive discounts.

Bundle Includes:
- Nintendo Switch console with Neon Red and Neon Blue Joy-Cons  
- Nintendo Switch Sports game for immersive, motion-controlled gameplay  
- 12-month Nintendo Switch Online membership for online multiplayer and access to a library of classic games  
- Versatile play modes: handheld, tabletop, and TV  

Perfect for players looking for a fun, social gaming experience with an iconic console and a year of online benefits.`
},
      {
  id: 'switch-lite-turquoise',
  name: 'Nintendo Switch Lite - Turquoise',
  price: 299.99,
  category: 'console',
  image: '/nintendo/t.png',
  platform: 'nintendo',
  description: `Take your gaming anywhere with the Nintendo Switch Lite in a vibrant turquoise finish.

Designed exclusively for handheld play, this compact and lightweight console delivers all your favorite Nintendo games in a portable form. Its bright turquoise color adds a stylish touch, perfect for gamers on the move.

Key Features:
- Dedicated handheld-only design for ultimate portability  
- Vibrant turquoise color that stands out  
- Compatible with the entire Nintendo Switch game library (handheld-compatible titles)  
- Built-in controls and ergonomic design for comfortable play  
- Long battery life for gaming sessions on the go  

Ideal for gamers seeking a lightweight, stylish, and affordable way to enjoy Nintendo's vast game library anytime, anywhere.`
},{
  id: 'switch-lite-coral',
  name: 'Nintendo Switch Lite - Coral Pink',
  price: 299.99,
  category: 'console',
  image: '/nintendo/p.png',
  platform: 'nintendo',
  description: `Experience portable gaming in style with the Nintendo Switch Lite Coral Pink edition.

This lightweight, compact handheld console is designed for gaming on the go, featuring a vibrant coral pink color that adds a fun and trendy look. Perfect for players who want a dedicated handheld device, it supports the entire Nintendo Switch game library compatible with handheld mode.

Features include:
- Compact, ergonomic design for comfortable handheld play  
- Vibrant coral pink finish for a stylish look  
- Built-in controls for intuitive gameplay  
- Compatible with all Nintendo Switch handheld-compatible games  
- Long-lasting battery for extended gaming sessions  

Ideal for gamers seeking a portable and fashionable way to enjoy Nintendo games anytime, anywhere.`
},
     {
  id: 'switch-lite-y',
  name: 'Nintendo Switch Lite - Coral Yellow',
  price: 299.99,
  category: 'console',
  image: '/nintendo/y.png',
  platform: 'nintendo',
  description: `Brighten up your gaming experience with the Nintendo Switch Lite Coral Yellow edition.

This lightweight, handheld-only console features a vibrant coral yellow finish that stands out. Designed for gamers on the move, it supports all Nintendo Switch games playable in handheld mode.

Key Features:
- Compact and ergonomic handheld design  
- Eye-catching coral yellow color  
- Built-in controls for seamless gameplay  
- Compatible with all handheld Nintendo Switch games  
- Long battery life for gaming wherever you go  

Perfect for gamers who want portability combined with style and performance.`
},



    
      // Nintendo Games
      {
  id: 'hogwarts-legacy-switch',
  name: 'Harry Potter - Hogwarts Legacy',
  price: 44.99,
  category: 'games',
  image: '/nintendo/hogwarts.png',
  platform: 'nintendo',
  description: 'Embark on a magical journey in *Hogwarts Legacy*, an open-world action RPG set in the 1800s Wizarding World. Discover hidden secrets, master powerful spells, and forge your own legacy as a student at Hogwarts School of Witchcraft and Wizardry. Explore iconic locations like Hogsmeade, the Forbidden Forest, and beyond, while shaping your destiny through choices and alliances. With deep customization, magical creatures, and thrilling combat, this immersive experience lets you live the untold story of the wizarding world—now on Nintendo.'
},
    {
  id: 'minecraft-switch',
  name: 'Minecraft for Nintendo Switch',
  price: 32.99,
  category: 'games',
  image: '/nintendo/minecraft.png',
  platform: 'nintendo',
  description: 'Dive into endless creativity and adventure with Minecraft for Nintendo Switch — the complete Minecraft experience optimized for on-the-go play. Build, explore, and survive in infinite worlds, whether you\'re crafting your dream home or braving the dangers of the Nether. With cross-platform multiplayer, you can join friends on any device, anytime. Enjoy regular updates, creative and survival modes, and access to the Minecraft Marketplace filled with skins, maps, and community content. Perfect for all ages, Minecraft on Switch offers boundless possibilities in the palm of your hand.'
},
       {
  id: 'mario-kart-8-deluxe',
  name: 'Mario Kart 8 Deluxe',
  price: 64.49,
  category: 'games',
  image: '/nintendo/mario.png',
  platform: 'nintendo',
  description: 'Race to victory in Mario Kart 8 Deluxe, the definitive Mario Kart experience on Nintendo Switch. Featuring all DLC tracks and characters, this edition offers enhanced graphics, new items, and revamped gameplay modes. Play solo, with friends locally, or compete online with players worldwide. Master new vehicles, customize your kart, and enjoy fast-paced, fun-filled racing action for all ages. Whether you’re a casual racer or a competitive pro, Mario Kart 8 Deluxe delivers endless thrills and excitement.'
},
      {
        id: 'star-wars-heritage',
        name: 'Star Wars Heritage Pack',
        price: 52.50,
        category: 'games',
        image: '/nintendo/starwars.png',
        platform: 'nintendo',
        description: 'Collection of classic Star Wars games remastered for Nintendo Switch.'
      },
      {
        id: 'ubisoft',
        name: 'Ubisoft Rayman Legends Definitive Edition',
        price: 22.49,
        category: 'games',
        image: '/nintendo/ubisoft.png',
        platform: 'nintendo',
        description: ''
      },
      {
        id: 'animal-crossing-nh',
        name: 'Animal Crossing: New Horizons',
        price: 64.49,
        category: 'games',
        image: '/nintendo/animal.png',
        platform: 'nintendo',
        description: 'Create your perfect island getaway in this beloved life simulation game.'
      },


    
      // Nintendo Accessories
      {
        id: 'switch-pro-controller-2',
        name: 'Nintendo Switch 2 Pro Controller',
        price: 112.49,
        category: 'accessories',
        image: '/nintendo/switchpro.png',
        platform: 'nintendo',
        description: 'Enhanced Pro Controller with improved ergonomics and battery life.'
      },
      {
        id: 'switch-case-nofear',
        name: 'Switch Case',
        price: 7.50,
        category: 'accessories',
        image: '/nintendo/switchcase.png',
        platform: 'nintendo',
        description: 'Protective carrying case for Nintendo Switch consoles.'
      },
      {
        id: 'joycon-charging-dock',
        name: 'Joy-Con Charging Dock',
        price: 26.99,
        category: 'accessories',
        image: '/nintendo/joycon.png',
        platform: 'nintendo',
        description: 'Charge up to 4 Joy-Con controllers simultaneously.'
      },
      {
        id: 'joycon-pair-lr',
        name: 'Joy-Con (L+R) Pair',
        price: 112.49,
        category: 'accessories',
        image: '/nintendo/joyconpair.png',
        platform: 'nintendo',
        description: 'Additional Joy-Con controllers for multiplayer gaming.'
      },
      {
        id: 'nano-controller-spring',
        name: 'Nano Enhanced Wireless Controller - Spring Dream',
        price: 45.00,
        category: 'accessories',
        image: '/nintendo/wireless.png',
        platform: 'nintendo',
        description: 'Compact wireless controller with floral spring design and motion controls.'
      },
      

        // Nintendo Digital Subscriptions
        {
          id: 'nso-3month',
          name: 'Nintendo Switch Online 3 Month Membership',
          price: 10.49,
          category: 'digital',
          image: '/nintendo/3month.png',
          platform: 'nintendo',
          description: '90-day access to online play, cloud saves, and NES/SNES game library.'
        },
        {
          id: 'nso-12month',
          name: 'Nintendo Switch Online 12 Month Membership',
          price: 26.99,
          category: 'digital',
          image: '/nintendo/12.png',
          platform: 'nintendo',
          description: '1-year subscription for online multiplayer, classic games, and cloud backup.'
        },
        {
          id: 'nso-family-12month',
          name: 'Nintendo Switch Online 12 Month Family Membership',
          price: 47.99,
          category: 'digital',
          image: '/nintendo/12family.png',
          platform: 'nintendo',
          description: 'Annual plan covering up to 8 Nintendo accounts for the whole family.'
        },
        {
          id: 'nso-expansion-12month',
          name: 'NSO + Expansion Pack 12 Month Membership',
          price: 52.49,
          category: 'digital',
          image: '/nintendo/nso.png',
          platform: 'nintendo',
          description: 'Includes N64, Genesis games and Animal Crossing DLC along with standard NSO benefits.'
        },
        {
          id: 'nso-expansion-family',
          name: 'NSO + Expansion Pack 12 Month Family Membership',
          price: 89.99,
          category: 'digital',
          image: '/nintendo/nsof.png',
          platform: 'nintendo',
          description: 'Premium family plan with expansion content for up to 8 users.'
        },
        // Nintendo Game DLCs
        {
          id: 'botw-expansion',
          name: 'Zelda: Breath of the Wild Expansion Pass',
          price: 26.99,
          category: 'digital',
          image: '/nintendo/wild.png',
          platform: 'nintendo',
          description: 'Includes The Master Trials and The Champions Ballad DLC packs with new story content.'
        },
        {
          id: 'acnh-happy-home',
          name: 'Animal Crossing: Happy Home Paradise',
          price: 33.74,
          category: 'digital',
          image: '/nintendo/animalcrossing.png',
          platform: 'nintendo',
          description: 'Design vacation homes and facilities in this massive New Horizons expansion.'
        },
        {
          id: 'mk8-booster-pass',
          name: 'Mario Kart 8 Deluxe Booster Course Pass',
          price: 37.49,
          category: 'digital',
          image: '/nintendo/mariocart.png',
          platform: 'nintendo',
          description: '48 remastered courses from Mario Kart history across 6 waves of content.'
        },
        {
          id: 'pokemon-sv-expansion',
          name: 'Pokémon Scarlet/Violet Expansion Pass',
          price: 47.24,
          category: 'digital',
          image: '/nintendo/pokemon.png',
          platform: 'nintendo',
          description: 'The Hidden Treasure of Area Zero DLC with new areas, stories and Pokémon.'
        },
        {
          id: 'ssbu-ultima',
          name: 'Super Smash Bros. Ultimate DDC AOC',
          price: 8.09,
          category: 'digital',
          image: '/nintendo/nsw.png',
          platform: 'nintendo',
          description: 'Additional content pack for Super Smash Bros. Ultimate (specific content may vary).'
        },
    

        
      
        
          {
            id: 'sociable24',
            name: 'Sociable Soccer 24',
            price: 18.00,
            category: 'games',
            image: '/pc/sociable.png',
            platform: 'pc',
            description: 'Fast-paced arcade football game with modern mechanics and retro spirit.'
          },
          {
            id: 'wrthaeon',
            name: 'Wrath: Aeon Of Ruin',
            price: 9.00,
            category: 'games',
            image: '/pc/wrath.png',
            platform: 'pc',
            description: 'Classic FPS with modern visuals set in a dark fantasy world.'
          },
          {
            id: 'acshadowsce',
            name: 'Assassins Creed Shadows Collectors Edition',
            price: 284.99,
            category: 'games',
            image: '/pc/ass.png',
            platform: 'pc',
            description: 'Collector\'s edition featuring exclusive physical and digital content.'
          },
          {
            id: 'fsim22p',
            name: 'Farming Simulator 22 Premium Expansion',
            price: 7.50,
            category: 'games',
            image: '/pc/farming.png',
            platform: 'pc',
            description: 'Expansion adding new crops, vehicles and farming activities.'
          },
          {
            id: 'endlessdng',
            name: 'ENDLESS Dungeon Day One Edition',
            price: 15.00,
            category: 'games',
            image: '/pc/endless.png',
            platform: 'pc',
            description: 'Roguelike tactical action with shooting and tower defense elements.'
          },
          {
            id: 'forgiveme',
            name: 'Forgive me Father',
            price: 9.00,
            category: 'games',
            image: '/pc/forgive.png',
            platform: 'pc',
            description: 'Lovecraftian horror FPS with comic book-style visuals.'
          },
          {
            id: 'talisman40',
            name: 'Talisman - 40th Anniversary Edition',
            price: 16.50,
            category: 'games',
            image: '/pc/talisman.png',
            platform: 'pc',
            description: 'Digital adaptation of the classic fantasy board game.'
          },
          {
            id: 'theinvinc',
            name: 'The Invincible',
            price: 37.49,
            category: 'games',
            image: '/pc/the.png',
            platform: 'pc',
            description: 'Story-driven adventure based on Stanislaw Lem\'s sci-fi novel.'
          },
          {
            id: 'tpmuseum',
            name: 'Two Point Museum - Explorer Edition',
            price: 52.49,
            category: 'games',
            image: '/pc/two.png',
            platform: 'pc',
            description: 'Build and manage your dream museum in this management sim.'
          },
          {
            id: 'civ7',
            name: 'Sid Meier\'s Civilization VII',
            price: 79.49,
            category: 'games',
            image: '/pc/sid.png',
            platform: 'pc',
            description: 'Next installment in the award-winning strategy franchise.'
          },
          {
            id: 'indianajonesce',
            name: 'Indiana Jones and the Great Circle: Collector\'s Edition',
            price: 284.99,
            category: 'games',
            image: '/pc/in.png',
            platform: 'pc',
            description: 'Collector\'s edition with exclusive physical and digital content.'
          },
  
  // Accessories (General)
    {
  id: 'stealthledmat',
  name: 'Light-Up LED XL Gaming Mat',
  price: 22.49,
  category: 'accessories',
  image: '/ac/lightup.png',
  platform: 'pc',
  description: 'Enhance your gaming setup with the Light-Up LED XL Gaming Mat, featuring an extra-large surface illuminated by vibrant LED lighting. Designed for PC and consoles, it provides a smooth, precise surface for mouse movement and controller placement. The non-slip base ensures stability during intense gameplay sessions, while the customizable LED colors add a dynamic aesthetic to your battlestation. Perfect for gamers who want both performance and style.'
},
     {
  id: 'dualsenseedge',
  name: 'DualSense Edge Wireless Controller',
  price: 299.99,
  category: 'accessories',
  image: '/ac/dual.png',
  platform: 'pc',
  description: 'Experience next-level gaming precision with the DualSense Edge Wireless Controller. Designed for ultimate customization, it features interchangeable thumbsticks and paddles, adjustable trigger stops, and a built-in rechargeable battery. Enjoy enhanced comfort with its ergonomic design and haptic feedback technology for immersive gameplay. Compatible with PC and PlayStation, this premium controller lets you tailor your playstyle and dominate every match with confidence.'
},
    {
  id: 'aoc24monitor',
  name: 'AOC 24G4XF Monitor',
  price: 209.99,
  category: 'accessories',
  image: '/ac/aoc.png',
  platform: 'pc',
  description: 'Experience smooth and responsive gameplay on the AOC 24G4XF Monitor, featuring a 24-inch Full HD display with a blazing 165Hz refresh rate and 1ms response time. Designed specifically for gamers, this monitor delivers crisp visuals, reduced motion blur, and AMD FreeSync support to eliminate screen tearing. Its sleek, adjustable stand and slim bezels make it perfect for immersive gaming setups or multi-monitor configurations.'
}, {
  id: 'yunixmicblack',
  name: 'GXT234 Yunix Microphone',
  price: 44.99,
  category: 'accessories',
  image: '/ac/gxt234.png',
  platform: 'pc',
  description: 'Capture crystal-clear audio with the GXT234 Yunix Professional Condenser Microphone. Ideal for streaming, podcasting, and gaming, this microphone offers excellent sound quality with low noise and wide frequency response. Its durable build and easy setup make it perfect for both beginners and professionals looking to elevate their audio experience.'
},
   {
  id: 'exiscam',
  name: 'Exis Webcam',
  price: 10.50,
  category: 'accessories',
  image: '/ac/exis.png',
  platform: 'pc',
  description: 'Stay connected with the Exis Webcam, featuring HD video quality and a built-in microphone for clear audio during calls and streaming. Easy to set up and compatible with most PCs, it’s perfect for video conferencing, online classes, and casual streaming.'
},
    {
      id: 'rival600',
      name: 'Rival 600 Mouse',
      price: 42.00,
      category: 'accessories',
      image: '/ac/rival.png',
      platform: 'pc',
      description: 'High-performance gaming mouse.'
    },
    {
      id: 'ferrariwheel',
      name: 'Ferrari SF1000 Wheel',
      price: 472.49,
      category: 'accessories',
      image: '/ac/g920.png',
      platform: 'pc',
      description: 'Premium racing wheel with F1 controls.'
    },
    {
      id: 'nofearmat',
      name: 'Mouse Mat',
      price: 3.75,
      category: 'accessories',
      image: '/ac/mousemat.png',
      platform: 'pc',
      description: 'Standard non-slip mouse pad.'
    },
    {
      id: 'mantismic',
      name: 'GXT232 Mantis Mic',
      price: 37.49,
      category: 'accessories',
      image: '/ac/gxt232.png',
      platform: 'pc',
      description: 'Compact USB microphone.'
    },
    {
      id: 'recon70',
      name: 'Recon 70 Headset',
      price: 44.99,
      category: 'accessories',
      image: '/ac/recon.png',
      platform: 'pc',
      description: 'Lightweight gaming headset.'
    },
  

    {
      id: 'roccatpad',
      name: 'ROCCAT Mousepad',
      price: 14.99,
      category: 'accessories',
      image: '/ac/sense.png',
      platform: 'pc',
      description: 'Square gaming mousepad.'
    },
    {
      id: 'neatmic',
      name: 'Neat Skyline Mic',
      price: 30.00,
      category: 'accessories',
      image: '/ac/neat.png',
      platform: 'pc',
      description: 'USB condenser microphone.'
    },
    {
      id: 'xenonctrl',
      name: 'Xenon Xbox Controller',
      price: 52.49,
      category: 'accessories',
      image: '/ac/xenon.png',
      platform: 'pc',
      description: 'Wired Xbox controller.'
    },
    {
      id: 'g502mouse',
      name: 'G502 Hero Mouse',
      price: 60.00,
      category: 'accessories',
      image: '/ac/g502.png',
      platform: 'pc',
      description: 'Popular gaming mouse with Hero sensor.'
    },
    {
      id: 'quantum400',
      name: 'Quantum 400 Headset',
      price: 52.50,
      category: 'accessories',
      image: '/ac/quantum.png',
      platform: 'pc',
      description: 'Wired gaming headset.'
    },
    {
      id: 'roccatstand',
      name: 'ROCCAT Headset Stand',
      price: 7.50,
      category: 'accessories',
      image: '/ac/headset.png',
      platform: 'pc',
      description: 'Headset holder with cable management.'
    },
    {
      id: 'silentmouse',
      name: 'Silent Bluetooth Mouse',
      price: 19.49,
      category: 'accessories',
      image: '/ac/silent.png',
      platform: 'pc',
      description: 'Quiet wireless mouse.'
    },
    
    {
      id: 'rgbdesk',
      name: 'Luminous RGB Desk',
      price: 224.99,
      category: 'accessories',
      image: '/ac/gxt709w.png',
      platform: 'pc',
      description: 'Gaming desk with RGB lighting.'
    },
    {
      id: 'ultralightmouse',
      name: 'Ultralight Mouse',
      price: 26.99,
      category: 'accessories',
      image: '/ac/ultra.png',
      platform: 'pc',
      description: 'Lightweight wireless gaming mouse.'
    },
    {
      id: 'hxheadset',
      name: 'HX-WPRO Headset',
      price: 49.50,
      category: 'accessories',
      image: '/ac/hx.png',
      platform: 'pc',
      description: 'Wireless gaming headset.'
    },
    {
      id: 'mxw3mouse',
      name: 'MX-W3 Mouse',
      price: 19.50,
      category: 'accessories',
      image: '/ac/hxblack.png',
      platform: 'pc',
      description: 'Wireless RGB mouse.'
    },
    {
      id: 'mx3mouse',
      name: 'MX3 Mouse',
      price: 14.99,
      category: 'accessories',
      image: '/ac/mx.png',
      platform: 'pc',
      description: 'Basic wired mouse.'
    },
    {
      id: 'duchessblack',
      name: 'DuchesS Xbox Controller',
      price: 59.99,
      category: 'accessories',
      image: '/ac/mx3.png',
      platform: 'pc',
      description: 'Xbox controller in black.'
    },
    {
      id: 'duchesswhite',
      name: 'DuchesS Xbox Controller',
      price: 59.99,
      category: 'accessories',
      image: '/ac/hyperkinw.png',
      platform: 'pc',
      description: 'Xbox controller in white.'
    },
    {

      id: 'origins60',
      name: 'Alloy Origins 60 Keyboard',
      price: 164.99,
      category: 'accessories',
      image: '/ac/alloy.png',
      platform: 'pc',
      description: 'Compact mechanical keyboard.'
    },
    {
      id: 'wolverinev2',
      name: 'Wolverine V2 Pro Controller',
      price: 299.99,
      category: 'accessories',
      image: '/ac/wolverine.png',
      platform: 'pc',
      description: 'Wireless PS5 controller.'
    },
    {
      id: 'magmakeyboard',
      name: 'Magma Keyboard',
      price: 45.00,
      category: 'accessories',
      image: '/ac/magma.png',
      platform: 'pc',
      description: 'Membrane RGB keyboard.'
    },
    {
      id: 'vulkankeyboard',
      name: 'Vulcan TKL Keyboard',
      price: 75.00,
      category: 'accessories',
      image: '/ac/vulcan.png',
      platform: 'pc',
      description: 'Tenkeyless mechanical keyboard.'
    },
   
    {
      id: 'apex3keyboard',
      name: 'Apex 3 TKL Keyboard',
      price: 57.00,
      category: 'accessories',
      image: '/ac/apex.png',
      platform: 'pc',
      description: 'Tenkeyless gaming keyboard.'
    },
    {
      id: 'gprokeyboard',
      name: 'G Pro TKL Keyboard',
      price: 149.99,
      category: 'accessories',
      image: '/ac/gpro.png',
      platform: 'pc',
      description: 'Mechanical esports keyboard.'
    },
    {
      id: 'wolverinev3te',
      name: 'Wolverine V3 TE',
      price: 149.99,
      category: 'accessories',
      image: '/ac/razer.png',
      platform: 'pc',
      description: 'Tournament edition controller.'
    },
    {
      id: 'wolverinev3pro',
      name: 'Wolverine V3 Pro',
      price: 299.99,
      category: 'accessories',
      image: '/ac/razer2.png',
      platform: 'pc',
      description: 'Premium tournament controller.'
    },
    
    
    {
      id: 'tdaggertanker',
      name: 'T-Dagger Tanker Keyboard',
      price: 14.99,
      category: 'accessories',
      image: '/images/tdagger.png',
      platform: 'pc',
      description: 'Budget gaming keyboard.'
    },
    {
      id: 'thadokeyboard',
      name: 'GXT Thado Keyboard',
      price: 34.49,
      category: 'accessories',
      image: '/images/gxt.png',
      platform: 'pc',
      description: 'TKL mechanical keyboard.'
    },
   
  
    {
      id: 'tplinkmesh',
      name: 'TP-Link Mesh Wi-Fi 6',
      price: 254.99,
      category: 'accessories',
      image: '/images/tplink.png',
      platform: 'pc',
      description: 'Whole home Wi-Fi 6 system.'
    },
    {
      id: 'yunixmicwhite',
      name: 'Yunix Mic (White)',
      price: 44.99,
      category: 'accessories',
      image: '/images/gxt234.png',
      platform: 'pc',
      description: 'White version of condenser mic.'
    },
    {
      id: 'nanoleaf4d',
      name: 'Nanoleaf 4D Kit',
      price: 52.50,
      category: 'accessories',
      image: '/images/na.png',
      platform: 'pc',
      description: 'Screen mirror lighting kit.'
    }
  
];

export const GameStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  
  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
    
    const savedCurrency = localStorage.getItem('currency') as CurrencyType;
    if (savedCurrency) {
      setCurrency(savedCurrency || 'USD');
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Save currency to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);
  
  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product exists in cart, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        toast(`Added another ${product.name} to your cart`);
        return updatedItems;
      } else {
        // Product doesn't exist in cart, add it
        toast(`${product.name} added to your cart`);
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast(`${itemToRemove.product.name} removed from cart`);
      }
      return prevItems.filter(item => item.product.id !== productId);
    });
  };
  
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.product.price * currencyRates[currency];
      return total + (itemPrice * item.quantity);
    }, 0);
  };
  
  const getFormattedPrice = (price: number) => {
    const convertedPrice = price * currencyRates[currency];
    return `${currencySymbols[currency]}${convertedPrice.toFixed(2)}`;
  };
  
  const filterProductsByPlatform = (platform: string) => {
    return products.filter(product => product.platform === platform);
  };
  
  const filterProductsByCategory = (platform: string, category: ProductCategory) => {
    return products.filter(
      product => product.platform === platform && product.category === category
    );
  };
  
  const value = {
    products,
    cartItems,
    currency,
    setCurrency,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getCartTotal,
    getFormattedPrice,
    filterProductsByPlatform,
    filterProductsByCategory
  };
  
  return (
    <GameStoreContext.Provider value={value}>
      {children}
    </GameStoreContext.Provider>
  );
};

export const useGameStore = () => {
  const context = useContext(GameStoreContext);
  if (context === undefined) {
    throw new Error('useGameStore must be used within a GameStoreProvider');
  }
  return context;
};
