import React from 'react';
import { useGameStore, CurrencyType, currencySymbols } from '../contexts/GameStoreContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const CurrencySwitcher = () => {
  const { currency, setCurrency } = useGameStore();
  
  const handleCurrencyChange = (value: string) => {
    setCurrency(value as CurrencyType);
  };

  return (
    <div className="currency-switcher relative z-50 text-black">
      <Select value={currency} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-[90px] bg-pink-200 hover:bg-pink-300 text-foreground border text-black border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900">
          <SelectValue
            placeholder={currencySymbols[currency]}
            className="text-foreground"
          />
        </SelectTrigger>
        <SelectContent className="bg-pink-100 border text-black border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 py-1 text-foreground z-50 min-w-[120px]">
          <SelectItem 
            value="USD" 
            className="px-4 py-2 text-black text-sm cursor-pointer hover:bg-pink-200 dark:hover:bg-pink-800 focus:bg-accent focus:text-accent-foreground"
          >
            $ USD
          </SelectItem>
          <SelectItem 
            value="GBP" 
            className="px-4 py-2 text-sm text-black cursor-pointer hover:bg-pink-200 dark:hover:bg-pink-800 focus:bg-accent focus:text-accent-foreground"
          >
            £ GBP
          </SelectItem>
          <SelectItem 
            value="EUR" 
            className="px-4 py-2 text-sm text-black cursor-pointer hover:bg-pink-200 dark:hover:bg-pink-800 focus:bg-accent focus:text-accent-foreground"
          >
            € EUR
          </SelectItem>
        </SelectContent >
      </Select>
    </div>
  );
};

export default CurrencySwitcher;
