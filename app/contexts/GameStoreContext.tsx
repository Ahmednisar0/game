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
  image: string;
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
    image: '/images/ps55.png',
    platform: 'playstation',
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.'
  },
  {
    id: 'ps5digitial',
    name: 'PlayStation 5 Digital Edition',
    price: 399.99,
    category: 'console',
    image: '/images/s2.png',
    platform: 'playstation',
    description: 'The PS5 Digital Edition boasts the same powerful features as the regular PS5 but without a disc drive.'
  },
  {
    id: 'ps5slimdig',
    name: 'PlayStation 5 Slim Digital Console',
    price: 584.99,
    category: 'console',
    image: '/images/slim2.png',
    platform: 'playstation',
    description: 'The sleek new digital edition PS5 with reduced size and improved efficiency.'
  },
  {
    id: 'ps5discastro',
    name: 'PlayStation 5 Disc Console + Astro Bot',
    price: 644.99,
    category: 'console',
    image: '/images/ps5.png',
    platform: 'playstation',
    description: 'PS5 disc console bundled with the delightful Astro Bot game.'
  },
  {
    id: 'ps5slimac',
    name: 'PlayStation 5 Slim Console + Assassins Creed Shadows Special Edition Bundle',
    price: 749.99,
    category: 'console',
    image: '/playstation/psc3.png',
    platform: 'playstation',
    description: 'PS5 Slim bundled with the special edition of Assassin\'s Creed Shadows.'
  },
  {
    id: 'ps5discastri',
    name: 'PlayStation 5 Pro Console',
    price: 930.79,
    category: 'console',
    image: '/images/pro11.png',
    platform: 'playstation',
    description: 'The most powerful PlayStation console ever with enhanced graphics and performance.'
  },

   {
    id: 'ps5discartri',
    name: 'PlayStation 5 Console Two DualSense Wireless Controllers Bundle (model group - slim)',
    price: 700.27,
    category: 'console',
    image: '/images/m2.jpg',
    platform: 'playstation',
    description: 'The most powerful PlayStation console ever with enhanced graphics and performance.'
  },
  
  {
    id: 'ps5slimdisc',
    name: 'PlayStation 5 Slim Disc Console',
    price: 719.99,
    category: 'console',
    image: '/playstation/psc4.png',
    platform: 'playstation',
    description: 'The new slim version of the PS5 with disc drive included.'
  },
  {
    id: 'ps5witcher',
    name: 'PlayStation 5 Slim Console + FREE The Witcher Complete Edition Bundle',
    price: 749.99,
    category: 'console',
    image: '/playstation/psc5.png',
    platform: 'playstation',
    description: 'PS5 Slim bundled with the complete Witcher game collection.'
  },

  // Games
  {
    id: 'capre2',
    name: 'Resident Evil 2 Remake',
    price: 37.49,
    category: 'games',
    image: '/playstation/resident1.png',
    platform: 'playstation',
    description: 'Return to Raccoon City in this stunning remake of the survival horror classic.'
  },
  {
    id: 'capre3',
    name: 'Resident Evil 3 Remake',
    price: 37.49,
    category: 'games',
    image: '/playstation/resident3.png',
    platform: 'playstation',
    description: 'Experience Jill Valentine\'s desperate escape from Raccoon City in this thrilling remake.'
  },
  {
    id: 'eafc25',
    name: 'EA SPORTS FC™ 25',
    price: 71.99,
    category: 'games',
    image: '/playstation/fc25.png',
    platform: 'playstation',
    description: 'The next evolution of football gaming with hyper-realistic gameplay and next-gen graphics.'
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
    description: 'High-fidelity wireless headset with noise cancellation and immersive audio.'
  },
  {
    id: 'pulseexplore',
    name: 'PULSE Explore Wireless Earbuds – Midnight Black',
    price: 299.99,
    category: 'accessories',
    image: '/playstation/earbuds.png',
    platform: 'playstation',
    description: 'Premium wireless earbuds with lossless audio and sleek design.'
  },
  {
    id: 'gioteckvx4',
    name: 'Gioteck VX-4+ Wired RGB PS4 Controller - Camo',
    price: 18.75,
    category: 'accessories',
    image: '/playstation/giatck.png',
    platform: 'playstation',
    description: 'Affordable wired controller with RGB lighting and camouflage design.'
  },
  {
    id: 'powerachargeuk',
    name: 'Twin Charging Station for DualSense Wireless Controllers (UK Plug)',
    price: 29.99,
    category: 'accessories',
    image: '/playstation/twin.png',
    platform: 'playstation',
    description: 'Official licensed twin charging station for DualSense controllers with UK plug.'
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
    id: 'psngift100',
    name: 'Ghost Of Yotei',
    price: 104.99,
    category: 'games',
    image: '/xbox/xbox1.png',
    platform: 'playstation',
    description: 'Discover a bold, new story of a warrior in Japan who is on her own mission of vengeance.Set 300 years after the critically acclaimed Ghost of Tsushima, Ghost of Yotei is a standalone experience set in 1600s rural Japan. The story follows a haunted, lone mercenary named Atsu. Thirstyfor revenge, she travels through the beautiful, rugged landscapes of northern Japan, hunting those who killed her family many years earlier.Sixteen years after her family’s death, Atsu’s quest across Ezo brings her to unexplored lands in search of a gang of six outlaws, but she finds much more than vengeance. Throughout her journey, Atsu will discover unlikely allies, and greater bonds than she could haveimagined'
  },
  // Xbox Products
    {
      id: 'xbox-series-x',
      name: 'Xbox Series s Console',
      price: 374.99,
      category: 'console',
      image: '/xbox/seriess.png',
      platform: 'xbox',
      description: 'The most powerful Xbox ever with 12 teraflops of raw graphic processing power.'
    },
    {
      id: 'xbox-series-s-white',
      name: 'Xbox Series S 512GB White - 2024 Packaging',
      price: 374.99,
      category: 'console',
      image: '/xbox/seriess.png',
      platform: 'xbox',
      description: 'Next-gen performance in the smallest Xbox console. Perfect for all-digital gaming.'
    },
    {
      id: 'gamepass-core-12',
      name: 'Xbox Game Pass Core - 12 Month Membership',
      price: 83.99,
      category: 'console',
      image: '/xbox/12.png',
      platform: 'xbox',
      description: 'Access to online multiplayer gaming and a collection of over 25 high-quality games.'
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
      description: 'Vibrant translucent design with customizable lighting and responsive buttons.'
    },
    {
      id: 'controller',
      name: 'PowerA Advantage Wired Controller for Xbox Series X|S - Warriors Nirvana',
      price: 25.49,
      category: 'accessories',
      image: '/xbox/nivrana.png',
      platform: 'xbox',
      description: ''
    },
    {
      id: 'stealth-battery-pack',
      name: 'High Capacity Rechargeable Battery Twin Pack - black',
      price: 29.99,
      category: 'accessories',
      image: '/xbox/stealth.png',
      platform: 'xbox',
      description: 'Never run out of power with this twin pack of high-capacity rechargeable batteries.'
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
     {
      id: 'poweraa',
      name: 'Xbox Series X Black',
      price: 719.99,
      category: 'console',
      image: '/xbox/xbox2.png',
      platform: 'xbox',
      description: 'Introducing Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles - all games look and play best on Xbox Series X.Experience next-gen speed and performance with the Xbox Velocity Architecture, powered by a custom SSD and integrated software.Play thousands of games from four generations of Xbox with Backward Compatibility, including optimized titles at launch.Xbox Game Pass Ultimate includes Xbox Live Gold, over 100 high-quality games on console, PC, and Android mobile devices, and soon an EA Play membership for one low monthly price (membership sold separately).Xbox Smart Delivery ensures you play the best available version of your game no matter which console youre playing on.Important Information'
    },




      // Nintendo Consoles
      {
        id: 'switch-oled-white-mk8',
        name: 'Nintendo Switch - White OLED + Mario Kart 8 Deluxe Bundle',
        price: 494.99,
        category: 'console',
        image: '/nintendo/switchwhite.png',
        platform: 'nintendo',
        description: 'Includes OLED Model Switch (7" screen) and Mario Kart 8 Deluxe game. Perfect bundle for multiplayer fun.'
      },
      {
        id: 'switch-oled-mario-nso',
        name: 'Nintendo Switch (OLED) + Mario Wonder + 12 Months NSO',
        price: 449.99,
        category: 'console',
        image: '/nintendo/nintendo.png',
        platform: 'nintendo',
        description: 'Premium bundle with OLED Switch, Super Mario Bros. Wonder game, and 12-month Nintendo Switch Online membership.'
      },
      {
        id: 'switch-neon-sports-nso',
        name: 'Nintendo Switch (Neon Red/Blue) + Switch Sports + 12 Months NSO',
        price: 374.99,
        category: 'console',
        image: 'nintendo/switch2.png',
        platform: 'nintendo',
        description: 'Standard Switch with neon Joy-Cons, Nintendo Switch Sports game, and annual online membership.'
      },
      {
        id: 'switch-lite-turquoise',
        name: 'Nintendo Switch Lite - Turquoise',
        price: 299.99,
        category: 'console',
        image: 'nintendo/t.png',
        platform: 'nintendo',
        description: 'Compact handheld-only Switch in vibrant turquoise color. Perfect for gaming on the go.'
      },
      {
        id: 'switch-lite-coral',
        name: 'Nintendo Switch Lite - Coral Pink',
        price: 299.99,
        category: 'console',
        image: 'nintendo/p.png',
        platform: 'nintendo',
        description: 'Stylish coral pink edition of the handheld Nintendo Switch Lite console.'
      },
      {
        id: 'switch-lite-y',
        name: 'Nintendo Switch Lite - Coral yellow',
        price: 299.99,
        category: 'console',
        image: 'nintendo/y.png',
        platform: 'nintendo',
        description: 'Stylish coral yellow edition of the handheld Nintendo Switch Lite console.'
      },



    
      // Nintendo Games
      {
        id: 'hogwarts-legacy-switch',
        name: 'Harry Potter - Hogwarts Legacy',
        price: 44.99,
        category: 'games',
        image: '/nintendo/hogwarts.png',
        platform: 'nintendo',
        description: 'Experience the wizarding world in this open-world RPG set in 1800s Hogwarts.'
      },
      {
        id: 'minecraft-switch',
        name: 'Minecraft for Nintendo Switch',
        price: 32.99,
        category: 'games',
        image: '/nintendo/minecraft.png',
        platform: 'nintendo',
        description: 'The complete Minecraft experience optimized for Nintendo Switch with cross-platform play.'
      },
      {
        id: 'mario-kart-8-deluxe',
        name: 'Mario Kart 8 Deluxe',
        price: 64.49,
        category: 'games',
        image: '/nintendo/mario.png',
        platform: 'nintendo',
        description: 'Definitive Mario Kart experience with all DLC tracks and characters included.'
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
      description: 'Extra-large LED-lit gaming surface for PC and consoles with non-slip base.'
    },
    {
      id: 'dualsenseedge',
      name: 'DualSense Edge Wireless Controller',
      price: 299.99,
      category: 'accessories',
      image: '/ac/dual.png',
      platform: 'pc',
      description: 'Premium customizable controller with interchangeable components.'
    },
    {
      id: 'aoc24monitor',
      name: 'AOC 24G4XF Monitor',
      price: 209.99,
      category: 'accessories',
      image: '/ac/aoc.png',
      platform: 'pc',
      description: '24" gaming monitor with 165Hz refresh rate.'
    },
    {
      id: 'yunixmicblack',
      name: 'GXT234 Yunix Microphone',
      price: 44.99,
      category: 'accessories',
      image: '/ac/gxt234.png',
      platform: 'pc',
      description: 'Professional condenser microphone.'
    },
    {
      id: 'exiscam',
      name: 'Exis Webcam',
      price: 10.50,
      category: 'accessories',
      image: '/ac/exis.png',
      platform: 'pc',
      description: 'HD webcam with built-in microphone.'
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
