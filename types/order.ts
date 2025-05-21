export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
}

export interface Order {
  _id?: string;
  amount: number;
  items: CartItem[];
  customer: CustomerInfo;
  paymentMethod: string;
  status: 'pending' | 'paid' | 'failed' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  paymentId?: string;
  btcAmount?: number;
  btcAddress?: string;
}