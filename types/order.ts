export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type SanityOrder = {
  _type: 'order';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
};

type OrderItem = {
  _key: string;
  _type: 'orderItem';
  product: {
    _type: 'reference';
    _ref: string;
  };
  quantity: number;
  price: number;
};

type ShippingAddress = {
  _type: 'shippingAddress';
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};