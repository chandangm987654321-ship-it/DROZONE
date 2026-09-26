import { Store, Product, Drone, DeliveryStation, DeliveryZone, User, Order } from '../types';

export const DEMO_USERS: Record<string, User> = {
  customer: {
    id: 'usr_c_01',
    name: 'Alex Chen',
    email: 'customer@drozone.demo',
    phone: '+1 (555) 382-9011',
    role: 'customer',
    address: '452 Pinecrest Ave, Apt 4B, Metro District',
    savedAddresses: [
      '452 Pinecrest Ave, Apt 4B, Metro District',
      '800 Innovation Blvd, Drozone SkyHub Beta',
      '12 Seaside Plaza, West Coast'
    ],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  seller: {
    id: 'usr_s_01',
    name: 'Marcus Vance',
    email: 'seller@drozone.demo',
    phone: '+1 (555) 749-3320',
    role: 'seller',
    storeId: 'store_01',
    address: 'SkyGrocers Fresh Mart, 102 Market St, Central',
    savedAddresses: ['102 Market St, Central'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  admin: {
    id: 'usr_a_01',
    name: 'Elena Rostova (Fleet Ops)',
    email: 'admin@drozone.demo',
    phone: '+1 (555) 901-7788',
    role: 'admin',
    address: 'DROZONE Flight Operations Control, Sector 4',
    savedAddresses: ['DROZONE Control Center Hangar A'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  }
};

export const INITIAL_STORES: Store[] = [
  {
    id: 'store_01',
    storeName: 'SkyGrocers Fresh Mart',
    owner: 'Marcus Vance',
    email: 'seller@drozone.demo',
    phone: '+1 (555) 749-3320',
    location: 'Central District',
    address: '102 Market St, Central',
    category: 'Groceries',
    rating: 4.9,
    deliveryTimeEst: '12-15 min',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    totalOrders: 342,
    revenue: 12480,
    coordinates: { x: 28, y: 35 }
  },
  {
    id: 'store_02',
    storeName: 'AeroBake Artisan Bakery',
    owner: 'Sarah Jenkins',
    email: 'sarah@aerobake.demo',
    phone: '+1 (555) 234-8899',
    location: 'North Quarter',
    address: '44 Bakery Lane, North District',
    category: 'Food',
    rating: 4.8,
    deliveryTimeEst: '10-14 min',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80',
    totalOrders: 218,
    revenue: 6940,
    coordinates: { x: 45, y: 22 }
  },
  {
    id: 'store_03',
    storeName: 'Metro Tech & Micro-Lab',
    owner: 'Kenji Sato',
    email: 'kenji@metrotech.demo',
    phone: '+1 (555) 671-4402',
    location: 'Silicon Pier',
    address: '88 Innovation Way, Pier 9',
    category: 'Electronics',
    rating: 4.95,
    deliveryTimeEst: '15-18 min',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=80',
    totalOrders: 189,
    revenue: 28350,
    coordinates: { x: 72, y: 40 }
  },
  {
    id: 'store_04',
    storeName: 'GreenLeaf Organic Orchard',
    owner: 'David Miller',
    email: 'david@greenleaf.demo',
    phone: '+1 (555) 344-9911',
    location: 'Garden District',
    address: '15 Orchard Road, South Haven',
    category: 'Fruits & Vegetables',
    rating: 4.7,
    deliveryTimeEst: '12-16 min',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
    totalOrders: 145,
    revenue: 4120,
    coordinates: { x: 34, y: 70 }
  },
  {
    id: 'store_05',
    storeName: 'CyberStationery & Swift Print',
    owner: 'Chloe Bennett',
    email: 'chloe@cyberstationery.demo',
    phone: '+1 (555) 812-3344',
    location: 'University Avenue',
    address: '302 Campus Walk',
    category: 'Stationery',
    rating: 4.6,
    deliveryTimeEst: '10-12 min',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=1200&q=80',
    totalOrders: 98,
    revenue: 2890,
    coordinates: { x: 60, y: 65 }
  },
  {
    id: 'store_06',
    storeName: 'Nova Health & Bio-Care',
    owner: 'Dr. Aris Thorne',
    email: 'aris@novahealth.demo',
    phone: '+1 (555) 490-6677',
    location: 'Medical Hub Plaza',
    address: '500 Clinic Boulevard',
    category: 'Personal Care',
    rating: 4.9,
    deliveryTimeEst: '8-12 min',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1200&q=80',
    totalOrders: 275,
    revenue: 9850,
    coordinates: { x: 80, y: 25 }
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // SkyGrocers
  {
    id: 'prod_01',
    storeId: 'store_01',
    storeName: 'SkyGrocers Fresh Mart',
    name: 'Artisan Cold Brew Coffee (4-Pack)',
    category: 'Groceries',
    price: 13.99,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    description: 'Slow-steeped organic arabica cold brew in nitrogen sealed lightweight cans. Specially balanced for maximum energy.',
    weightKg: 1.2,
    rating: 4.9,
    isPopular: true,
    droneDeliveryEligible: true
  },
  {
    id: 'prod_02',
    storeId: 'store_01',
    storeName: 'SkyGrocers Fresh Mart',
    name: 'Organic Almond Milk (1L)',
    category: 'Groceries',
    price: 4.89,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    description: 'Unsweetened plant-based almond milk with natural vanilla hint. Pure non-GMO certified.',
    weightKg: 1.05,
    rating: 4.7,
    isPopular: false,
    droneDeliveryEligible: true
  },
  {
    id: 'prod_03',
    storeId: 'store_01',
    storeName: 'SkyGrocers Fresh Mart',
    name: 'Gourmet Sourdough Loaf',
    category: 'Food',
    price: 6.50,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
    description: 'Freshly baked naturally fermented sourdough loaf with crisp golden crust and soft airy crumb.',
    weightKg: 0.65,
    rating: 4.8,
    isPopular: true,
    droneDeliveryEligible: true
  },
  {
    id: 'prod_04',
    storeId: 'store_01',
    storeName: 'SkyGrocers Fresh Mart',
    name: 'Eco Dish Soap & Bamboo Sponge Kit',
    category: 'Household Essentials',
    price: 9.25,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80',
    description: 'Plant-derived grease-cutting formula with 2 biodegradable zero-plastic sponges.',
    weightKg: 0.8,
    rating: 4.6,
    isPopular: false,
    droneDeliveryEligible: true
  },

  // AeroBake
  {
    id: 'prod_05',
    storeId: 'store_02',
    storeName: 'AeroBake Artisan Bakery',
    name: 'Warm Butter Croissant Box (3-Pack)',
    category: 'Food',
    price: 11.50,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    description: 'French Normandy butter flaky croissants packaged in thermal insulated drone delivery pod.',
    weightKg: 0.45,
    rating: 4.95,
    isPopular: true,
    droneDeliveryEligible: true
  },
  {
    id: 'prod_06',
    storeId: 'store_02',
    storeName: 'AeroBake Artisan Bakery',
    name: 'Cinnamon Swirl Cruffins (2-Pack)',
    category: 'Food',
    price: 8.75,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: 'Croissant muffin hybrid dusted with Vietnamese cinnamon and vanilla bean sugar glaze.',
    weightKg: 0.38,
    rating: 4.85,
    isPopular: false,
    droneDeliveryEligible: true
  },

  // Metro Tech
  {
    id: 'prod_07',
    storeId: 'store_03',
    storeName: 'Metro Tech & Micro-Lab',
    name: 'Anker PowerCore 65W GaN Charger & Cable',
    category: 'Electronics',
    price: 38.99,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-compact high-speed USB-C laptop and smartphone charger with braided 2-meter cable.',
    weightKg: 0.35,
    rating: 4.9,
    isPopular: true,
    droneDeliveryEligible: true
  },
  {
    id: 'prod_08',
    storeId: 'store_03',
    storeName: 'Metro Tech & Micro-Lab',
    name: 'True Wireless Noise-Cancelling Earbuds',
    category: 'Electronics',
    price: 69.00,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    description: 'Hybrid active noise cancellation, transparency mode, water-resistant IPX5 and 32h playback.',
    weightKg: 0.22,
    rating: 4.8,
    isPopular: true,
    droneDeliveryEligible: true
  },
  {
    id: 'prod_09',
    storeId: 'store_03',
    storeName: 'Metro Tech & Micro-Lab',
    name: 'Braided Lightning to USB-C Fast Cable',
    category: 'Electronics',
    price: 14.50,
    stock: 55,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    description: 'Kevlar reinforced heavy duty cable capable of 30W PD transfer speeds.',
    weightKg: 0.12,
    rating: 4.7,
    isPopular: false,
    droneDeliveryEligible: true
  },

  // GreenLeaf Organic Orchard
  {
    id: 'prod_10',
    storeId: 'store_04',
    storeName: 'GreenLeaf Organic Orchard',
    name: 'Fresh Strawberries (500g Clamshell)',
    category: 'Fruits & Vegetables',
    price: 5.99,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    description: 'Sweet, sun-ripened organic strawberries picked this morning at peak sweetness.',
    weightKg: 0.55,
    rating: 4.9,
    isPopular: true,
    droneDeliveryEligible: true
  },
  {
    id: 'prod_11',
    storeId: 'store_04',
    storeName: 'GreenLeaf Organic Orchard',
    name: 'Hass Avocados (Pack of 3)',
    category: 'Fruits & Vegetables',
    price: 6.49,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    description: 'Perfect for guacamole or morning toast, rich creamy texture and ready to enjoy.',
    weightKg: 0.6,
    rating: 4.75,
    isPopular: true,
    droneDeliveryEligible: true
  },
  {
    id: 'prod_12',
    storeId: 'store_04',
    storeName: 'GreenLeaf Organic Orchard',
    name: 'Crisp Hydroponic Butterhead Lettuce',
    category: 'Fruits & Vegetables',
    price: 3.80,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?auto=format&fit=crop&w=600&q=80',
    description: 'Pesticide-free living lettuce with roots attached in aerated protective pod.',
    weightKg: 0.3,
    rating: 4.6,
    isPopular: false,
    droneDeliveryEligible: true
  },

  // CyberStationery
  {
    id: 'prod_13',
    storeId: 'store_05',
    storeName: 'CyberStationery & Swift Print',
    name: 'Bullet Journal Dot-Grid Hardcover',
    category: 'Stationery',
    price: 16.99,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: '160gsm bleed-proof bamboo paper notebook with lay-flat thread binding and dual ribbons.',
    weightKg: 0.42,
    rating: 4.85,
    isPopular: false,
    droneDeliveryEligible: true
  },
  {
    id: 'prod_14',
    storeId: 'store_05',
    storeName: 'CyberStationery & Swift Print',
    name: 'Japanese Gel Ink Pens (Set of 6)',
    category: 'Stationery',
    price: 12.50,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1585336261026-77cc7c444158?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-smooth 0.5mm quick-dry pigment ink pens in minimalist matte casing.',
    weightKg: 0.15,
    rating: 4.9,
    isPopular: true,
    droneDeliveryEligible: true
  },

  // Nova Health
  {
    id: 'prod_15',
    storeId: 'store_06',
    storeName: 'Nova Health & Bio-Care',
    name: 'Rapid Electrolyte & Vitamin C Drops',
    category: 'Personal Care',
    price: 15.00,
    stock: 75,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    description: 'Sugar-free hydration enhancer with magnesium, potassium, zinc and natural citrus extract.',
    weightKg: 0.18,
    rating: 4.9,
    isPopular: true,
    droneDeliveryEligible: true
  },
  {
    id: 'prod_16',
    storeId: 'store_06',
    storeName: 'Nova Health & Bio-Care',
    name: 'Hydrating Botanical Facial Mist',
    category: 'Personal Care',
    price: 18.50,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1608248597359-543154817a0d?auto=format&fit=crop&w=600&q=80',
    description: 'Rosewater and hyaluronic cooling fine mist to restore skin moisture in high-density air.',
    weightKg: 0.25,
    rating: 4.75,
    isPopular: false,
    droneDeliveryEligible: true
  },
  {
    id: 'prod_17',
    storeId: 'store_06',
    storeName: 'Nova Health & Bio-Care',
    name: 'First Aid Emergency Travel Pouch',
    category: 'Household Essentials',
    price: 21.00,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80',
    description: 'Sterile bandages, antiseptic wipes, burn gel, burn pads, and medical tape in water-sealed pouch.',
    weightKg: 0.35,
    rating: 4.95,
    isPopular: true,
    droneDeliveryEligible: true
  }
];

export const INITIAL_DELIVERY_STATIONS: DeliveryStation[] = [
  {
    id: 'station_01',
    name: 'Station Alpha - Downtown SkyPort Hub',
    location: 'Downtown Center',
    address: '250 Metro Plaza Rooftop Hub, Sector 1',
    capacity: 24,
    currentPackages: 11,
    status: 'ONLINE',
    lockerPods: 24,
    availablePods: 13,
    coordinates: { x: 38, y: 45 }
  },
  {
    id: 'station_02',
    name: 'Station Beta - Westside Innovation Pod',
    location: 'Westside Residential',
    address: '800 Innovation Blvd, Drozone SkyHub Beta',
    capacity: 20,
    currentPackages: 6,
    status: 'ONLINE',
    lockerPods: 20,
    availablePods: 14,
    coordinates: { x: 20, y: 62 }
  },
  {
    id: 'station_03',
    name: 'Station Gamma - Tech Park Rooftop Locker',
    location: 'Silicon Pier',
    address: '150 Cybernetic Way, Tower C',
    capacity: 32,
    currentPackages: 18,
    status: 'ONLINE',
    lockerPods: 32,
    availablePods: 14,
    coordinates: { x: 78, y: 52 }
  },
  {
    id: 'station_04',
    name: 'Station Delta - Riverside Community Point',
    location: 'River Promenade',
    address: '12 Seaside Plaza, West Coast Hub',
    capacity: 16,
    currentPackages: 4,
    status: 'ONLINE',
    lockerPods: 16,
    availablePods: 12,
    coordinates: { x: 52, y: 80 }
  },
  {
    id: 'station_05',
    name: 'Station Epsilon - Medical & North District',
    location: 'North Hillside',
    address: '410 Heights Summit Terrace',
    capacity: 20,
    currentPackages: 14,
    status: 'BUSY',
    lockerPods: 20,
    availablePods: 6,
    coordinates: { x: 55, y: 18 }
  }
];

export const INITIAL_DRONES: Drone[] = [
  {
    id: 'DZ-001',
    model: 'AeroGlide V4 Heavy Lift',
    status: 'AVAILABLE',
    battery: 94,
    maxPayloadKg: 3.5,
    currentLocationName: 'Downtown SkyPort Hangar',
    coords: { x: 38, y: 45 },
    altitudeMeters: 0,
    speedKmh: 0,
    totalDeliveries: 412,
    headingDeg: 120
  },
  {
    id: 'DZ-002',
    model: 'AeroGlide V4 Express',
    status: 'DELIVERING',
    battery: 78,
    maxPayloadKg: 2.8,
    currentLocationName: 'Corridor Alpha-North [En Route]',
    coords: { x: 34, y: 38 },
    assignedOrderId: 'ord_101',
    deliveryStationId: 'station_01',
    altitudeMeters: 75,
    speedKmh: 52,
    totalDeliveries: 628,
    headingDeg: 165
  },
  {
    id: 'DZ-003',
    model: 'SkyCourier Hexa-X',
    status: 'CHARGING',
    battery: 42,
    maxPayloadKg: 4.0,
    currentLocationName: 'Westside Station Pod Pad 2',
    coords: { x: 20, y: 62 },
    altitudeMeters: 0,
    speedKmh: 0,
    totalDeliveries: 389,
    headingDeg: 0
  },
  {
    id: 'DZ-004',
    model: 'AeroGlide V4 Express',
    status: 'AVAILABLE',
    battery: 88,
    maxPayloadKg: 2.8,
    currentLocationName: 'Tech Park Station Locker Pad 1',
    coords: { x: 78, y: 52 },
    altitudeMeters: 0,
    speedKmh: 0,
    totalDeliveries: 504,
    headingDeg: 280
  },
  {
    id: 'DZ-005',
    model: 'SkyCourier Hexa-X',
    status: 'AVAILABLE',
    battery: 91,
    maxPayloadKg: 4.0,
    currentLocationName: 'Station Epsilon Hangar',
    coords: { x: 55, y: 18 },
    altitudeMeters: 0,
    speedKmh: 0,
    totalDeliveries: 295,
    headingDeg: 45
  },
  {
    id: 'DZ-006',
    model: 'AeroGlide V3 Scout',
    status: 'MAINTENANCE',
    battery: 31,
    maxPayloadKg: 2.5,
    currentLocationName: 'Central Hangar Diagnostics Bay',
    coords: { x: 42, y: 48 },
    altitudeMeters: 0,
    speedKmh: 0,
    totalDeliveries: 840,
    headingDeg: 0
  }
];

export const INITIAL_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'zone_01',
    name: 'Corridor 1 - Central Commercial Airway',
    type: 'corridor',
    status: 'OPEN',
    description: 'Main automated transit corridor connecting Downtown stores with SkyPort Hub Alpha.',
    color: '#0ea5e9',
    coordinates: { x: 38, y: 42 },
    radius: 22
  },
  {
    id: 'zone_02',
    name: 'Sector 2 - Westside Urban Green Corridor',
    type: 'active',
    status: 'OPEN',
    description: 'Residential low-noise aerial route strictly regulated for 65m - 90m altitude.',
    color: '#10b981',
    coordinates: { x: 26, y: 60 },
    radius: 18
  },
  {
    id: 'zone_03',
    name: 'Restricted Airspace - Metro Heliport & Hospital',
    type: 'restricted',
    status: 'CLOSED',
    description: 'No drone fly-zone. Emergency medical aircraft priority zone.',
    color: '#ef4444',
    coordinates: { x: 62, y: 32 },
    radius: 14
  },
  {
    id: 'zone_04',
    name: 'Tech Bay High-Speed Airway',
    type: 'active',
    status: 'OPEN',
    description: 'Over-water coastal transit corridor enabling up to 65 km/h cruise velocities.',
    color: '#06b6d4',
    coordinates: { x: 74, y: 46 },
    radius: 20
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_101',
    customerId: 'usr_c_01',
    customerName: 'Alex Chen',
    customerPhone: '+1 (555) 382-9011',
    customerEmail: 'customer@drozone.demo',
    storeId: 'store_01',
    storeName: 'SkyGrocers Fresh Mart',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        price: 13.99
      },
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        price: 6.50
      }
    ],
    subtotal: 20.49,
    deliveryFee: 2.50,
    tax: 1.84,
    total: 24.83,
    totalWeightKg: 1.85,
    status: 'DRONE_IN_TRANSIT',
    deliveryStationId: 'station_01',
    deliveryStationName: 'Station Alpha - Downtown SkyPort Hub',
    deliveryAddress: '452 Pinecrest Ave, Apt 4B, Metro District',
    droneId: 'DZ-002',
    createdAt: '2026-09-26T09:12:00Z',
    updatedAt: '2026-09-26T09:22:00Z',
    estimatedDeliveryMinutes: 4,
    progressPercent: 70,
    currentCheckpoint: 'Checkpoint 2 (Approaching Station Alpha)',
    telemetry: {
      speedKmh: 52,
      altitudeM: 75,
      batteryPercent: 78,
      coords: { x: 34, y: 38 }
    }
  },
  {
    id: 'ord_102',
    customerId: 'usr_c_01',
    customerName: 'Alex Chen',
    customerPhone: '+1 (555) 382-9011',
    customerEmail: 'customer@drozone.demo',
    storeId: 'store_02',
    storeName: 'AeroBake Artisan Bakery',
    items: [
      {
        product: INITIAL_PRODUCTS[4],
        quantity: 2,
        price: 11.50
      }
    ],
    subtotal: 23.00,
    deliveryFee: 2.50,
    tax: 2.07,
    total: 27.57,
    totalWeightKg: 0.9,
    status: 'READY_FOR_DRONE',
    deliveryStationId: 'station_02',
    deliveryStationName: 'Station Beta - Westside Innovation Pod',
    deliveryAddress: '800 Innovation Blvd, Drozone SkyHub Beta',
    droneId: 'DZ-001',
    createdAt: '2026-09-26T09:25:00Z',
    updatedAt: '2026-09-26T09:30:00Z',
    estimatedDeliveryMinutes: 9,
    progressPercent: 45,
    currentCheckpoint: 'Awaiting Drone Dispatch at Store Hangar'
  },
  {
    id: 'ord_100',
    customerId: 'usr_c_01',
    customerName: 'Alex Chen',
    customerPhone: '+1 (555) 382-9011',
    customerEmail: 'customer@drozone.demo',
    storeId: 'store_03',
    storeName: 'Metro Tech & Micro-Lab',
    items: [
      {
        product: INITIAL_PRODUCTS[6],
        quantity: 1,
        price: 38.99
      }
    ],
    subtotal: 38.99,
    deliveryFee: 2.50,
    tax: 3.51,
    total: 45.00,
    totalWeightKg: 0.35,
    status: 'CUSTOMER_PICKUP',
    deliveryStationId: 'station_01',
    deliveryStationName: 'Station Alpha - Downtown SkyPort Hub',
    deliveryAddress: '452 Pinecrest Ave, Apt 4B, Metro District',
    droneId: 'DZ-004',
    createdAt: '2026-09-25T16:20:00Z',
    updatedAt: '2026-09-25T16:38:00Z',
    estimatedDeliveryMinutes: 0,
    progressPercent: 100,
    currentCheckpoint: 'Collected at Station Locker Pod #7'
  }
];
