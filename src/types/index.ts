export type UserRole = 'customer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  address: string;
  savedAddresses: string[];
  avatar?: string;
  storeId?: string; // For sellers
}

export type StoreCategory = 
  | 'Groceries'
  | 'Food'
  | 'Fruits & Vegetables'
  | 'Stationery'
  | 'Electronics'
  | 'Personal Care'
  | 'Household Essentials';

export interface Store {
  id: string;
  storeName: string;
  owner: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  category: StoreCategory;
  rating: number;
  deliveryTimeEst: string;
  status: 'active' | 'pending' | 'suspended';
  image: string;
  banner: string;
  totalOrders: number;
  revenue: number;
  coordinates: { x: number; y: number }; // Simulated city coordinate (0-100%)
}

export interface Product {
  id: string;
  storeId: string;
  storeName: string;
  name: string;
  category: StoreCategory;
  price: number;
  stock: number;
  image: string;
  description: string;
  weightKg: number;
  rating: number;
  isPopular?: boolean;
  droneDeliveryEligible: boolean;
  brand?: string;
  originalPrice?: number;
  mrp?: number;
  discountPercent?: number;
  ratingsCount?: number;
  reviewsCount?: number;
  galleryImages?: string[];
  highlights?: string[];
  specifications?: Record<string, string>;
  featuresGrid?: Array<{ icon: string; title: string }>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'ORDER_PLACED'
  | 'STORE_ACCEPTED'
  | 'PACKAGE_PREPARING'
  | 'READY_FOR_DRONE'
  | 'DRONE_DISPATCHED'
  | 'DRONE_IN_TRANSIT'
  | 'DELIVERED_TO_STATION'
  | 'CUSTOMER_PICKUP';

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  timestamp: string;
  description: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  storeId: string;
  storeName: string;
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  totalWeightKg: number;
  status: OrderStatus;
  deliveryStationId: string;
  deliveryStationName: string;
  deliveryAddress: string;
  droneId?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryMinutes: number;
  progressPercent: number;
  currentCheckpoint?: string;
  telemetry?: {
    speedKmh: number;
    altitudeM: number;
    batteryPercent: number;
    coords: { x: number; y: number };
  };
}

export type DroneStatus = 'AVAILABLE' | 'DELIVERING' | 'CHARGING' | 'MAINTENANCE' | 'RETURNING';

export interface Drone {
  id: string;
  model: string;
  status: DroneStatus;
  battery: number;
  maxPayloadKg: number;
  currentLocationName: string;
  coords: { x: number; y: number };
  assignedOrderId?: string;
  deliveryStationId?: string;
  altitudeMeters: number;
  speedKmh: number;
  totalDeliveries: number;
  headingDeg: number;
}

export interface DeliveryStation {
  id: string;
  name: string;
  location: string;
  address: string;
  capacity: number;
  currentPackages: number;
  status: 'ONLINE' | 'BUSY' | 'MAINTENANCE';
  lockerPods: number;
  availablePods: number;
  coordinates: { x: number; y: number };
}

export interface DeliveryZone {
  id: string;
  name: string;
  type: 'active' | 'restricted' | 'hub' | 'corridor';
  status: 'OPEN' | 'CAUTION' | 'CLOSED';
  description: string;
  color: string;
  coordinates: { x: number; y: number };
  radius: number;
}
