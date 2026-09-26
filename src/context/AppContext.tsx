import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  UserRole,
  Store,
  Product,
  CartItem,
  Order,
  OrderStatus,
  Drone,
  DeliveryStation,
  DeliveryZone,
} from '../types';
import {
  DEMO_USERS,
  INITIAL_STORES,
  INITIAL_PRODUCTS,
  INITIAL_DRONES,
  INITIAL_DELIVERY_STATIONS,
  INITIAL_DELIVERY_ZONES,
  INITIAL_ORDERS,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'drone';
}

interface AppContextType {
  // Navigation & Role
  currentRole: UserRole | 'public';
  setRole: (role: UserRole | 'public') => void;
  currentUser: User;
  activeCustomerTab: string;
  setActiveCustomerTab: (tab: string) => void;
  activeSellerTab: string;
  setActiveSellerTab: (tab: string) => void;
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Stores & Products
  stores: Store[];
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (p: Product | null) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  approveSeller: (storeId: string) => void;
  suspendSeller: (storeId: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartWeight: number;

  // Orders
  orders: Order[];
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (id: string | null) => void;
  placeOrder: (deliveryStationId: string, deliveryAddress: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  requestDronePickup: (orderId: string) => void;
  dispatchDroneSimulation: (orderId: string, droneId?: string) => void;
  completeCustomerPickup: (orderId: string) => void;
  advanceOrderSimulationStep: (orderId: string) => void;

  // Drones & Infrastructure
  drones: Drone[];
  deliveryStations: DeliveryStation[];
  deliveryZones: DeliveryZone[];
  updateDroneStatus: (droneId: string, status: Drone['status']) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'drozone_app_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole | 'public'>('customer');
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.customer);
  const [activeCustomerTab, setActiveCustomerTab] = useState<string>('home');
  const [activeSellerTab, setActiveSellerTab] = useState<string>('dashboard');
  const [activeAdminTab, setActiveAdminTab] = useState<string>('overview');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [stores, setStores] = useState<Store[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_stores`);
    return saved ? JSON.parse(saved) : INITIAL_STORES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_products`);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [drones, setDrones] = useState<Drone[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_drones`);
    return saved ? JSON.parse(saved) : INITIAL_DRONES;
  });

  const [deliveryStations, setDeliveryStations] = useState<DeliveryStation[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_stations`);
    return saved ? JSON.parse(saved) : INITIAL_DELIVERY_STATIONS;
  });

  const [deliveryZones] = useState<DeliveryZone[]>(INITIAL_DELIVERY_ZONES);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_cart`);
    return saved ? JSON.parse(saved) : [
      { product: INITIAL_PRODUCTS[0], quantity: 1 }
    ];
  });

  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>('ord_101');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_stores`, JSON.stringify(stores));
  }, [stores]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_products`, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_drones`, JSON.stringify(drones));
  }, [drones]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_stations`, JSON.stringify(deliveryStations));
  }, [deliveryStations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_cart`, JSON.stringify(cart));
  }, [cart]);

  // Sync theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToast = useCallback((title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev.slice(-3), { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const setRole = (role: UserRole | 'public') => {
    setCurrentRole(role);
    if (role === 'customer') {
      setCurrentUser(DEMO_USERS.customer);
    } else if (role === 'seller') {
      setCurrentUser(DEMO_USERS.seller);
    } else if (role === 'admin') {
      setCurrentUser(DEMO_USERS.admin);
    }
    addToast('Role Switched', `Now operating as ${role.toUpperCase()}`, 'info');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast('Added to Cart', `${product.name} (x${quantity}) added.`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addToast('Item Removed', 'Product removed from delivery bag.', 'info');
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartWeight = parseFloat(
    cart.reduce((sum, item) => sum + (item.product.weightKg || 0.4) * item.quantity, 0).toFixed(2)
  );

  // Orders operations
  const placeOrder = (deliveryStationId: string, deliveryAddress: string): Order => {
    const station = deliveryStations.find(s => s.id === deliveryStationId) || deliveryStations[0];
    const firstStoreId = cart[0]?.product.storeId || stores[0].id;
    const store = stores.find(s => s.id === firstStoreId) || stores[0];

    const subtotal = cartTotal;
    const deliveryFee = 2.50;
    const tax = parseFloat((subtotal * 0.09).toFixed(2));
    const total = parseFloat((subtotal + deliveryFee + tax).toFixed(2));

    const newOrder: Order = {
      id: `ord_${Date.now().toString().slice(-4)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      customerEmail: currentUser.email,
      storeId: store.id,
      storeName: store.storeName,
      items: cart.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal,
      deliveryFee,
      tax,
      total,
      totalWeightKg: cartWeight,
      status: 'ORDER_PLACED',
      deliveryStationId: station.id,
      deliveryStationName: station.name,
      deliveryAddress: deliveryAddress || currentUser.address,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDeliveryMinutes: 14,
      progressPercent: 10,
      currentCheckpoint: 'Awaiting Merchant Confirmation',
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setActiveTrackingOrderId(newOrder.id);
    setActiveCustomerTab('tracking');

    addToast('Order Placed Successfully!', `Order #${newOrder.id} sent to ${store.storeName}.`, 'drone');

    // Automatically transition to STORE_ACCEPTED after 4 seconds if untouched
    setTimeout(() => {
      setOrders(current =>
        current.map(o =>
          o.id === newOrder.id && o.status === 'ORDER_PLACED'
            ? {
                ...o,
                status: 'STORE_ACCEPTED',
                progressPercent: 25,
                currentCheckpoint: 'Merchant accepted order. Preparing packing.',
                updatedAt: new Date().toISOString(),
              }
            : o
        )
      );
    }, 4000);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    let progress = 10;
    let checkpoint = '';

    switch (status) {
      case 'ORDER_PLACED':
        progress = 10;
        checkpoint = 'Order placed by customer.';
        break;
      case 'STORE_ACCEPTED':
        progress = 25;
        checkpoint = 'Store acknowledged and accepted order.';
        break;
      case 'PACKAGE_PREPARING':
        progress = 40;
        checkpoint = 'Package being packed into lightweight aeropod.';
        break;
      case 'READY_FOR_DRONE':
        progress = 50;
        checkpoint = 'Package staged at Rooftop Launchpad. Awaiting Drone Dispatch.';
        break;
      case 'DRONE_DISPATCHED':
        progress = 65;
        checkpoint = 'Drone dispatched. Lifting off from store pad (75m AGL).';
        break;
      case 'DRONE_IN_TRANSIT':
        progress = 85;
        checkpoint = 'Drone cruising along designated sky corridor.';
        break;
      case 'DELIVERED_TO_STATION':
        progress = 95;
        checkpoint = 'Landed safely. Deposited into automated locker pod.';
        break;
      case 'CUSTOMER_PICKUP':
        progress = 100;
        checkpoint = 'Collected by customer from Station locker.';
        break;
    }

    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? {
              ...o,
              status,
              progressPercent: progress,
              currentCheckpoint: checkpoint,
              updatedAt: new Date().toISOString(),
            }
          : o
      )
    );

    addToast('Status Updated', `Order #${orderId} is now ${status.replace(/_/g, ' ')}`, 'info');
  };

  const requestDronePickup = (orderId: string) => {
    // Finds available drone
    const availableDrone = drones.find(d => d.status === 'AVAILABLE') || drones[0];
    
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? {
              ...o,
              status: 'READY_FOR_DRONE',
              droneId: availableDrone.id,
              progressPercent: 50,
              currentCheckpoint: `Assigned to Drone ${availableDrone.id}. Awaiting dispatch command.`,
              updatedAt: new Date().toISOString(),
            }
          : o
      )
    );

    addToast('Drone Requested', `Drone ${availableDrone.id} assigned to Order #${orderId}`, 'drone');
  };

  // Full simulated flight automation
  const dispatchDroneSimulation = (orderId: string, droneId?: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const assignedDroneId = droneId || targetOrder.droneId || 'DZ-002';

    // Step 1: Dispatched
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? {
              ...o,
              status: 'DRONE_DISPATCHED',
              droneId: assignedDroneId,
              progressPercent: 60,
              currentCheckpoint: `Drone ${assignedDroneId} taking off from ${targetOrder.storeName} pad.`,
              telemetry: {
                speedKmh: 35,
                altitudeM: 50,
                batteryPercent: 88,
                coords: { x: 30, y: 35 },
              },
              updatedAt: new Date().toISOString(),
            }
          : o
      )
    );

    setDrones(prev =>
      prev.map(d =>
        d.id === assignedDroneId
          ? {
              ...d,
              status: 'DELIVERING',
              assignedOrderId: orderId,
              speedKmh: 45,
              altitudeMeters: 65,
            }
          : d
      )
    );

    addToast('Drone Dispatched', `Drone ${assignedDroneId} airborne en route to ${targetOrder.deliveryStationName}`, 'drone');

    // Step 2: Transit checkpoint (3.5s later)
    setTimeout(() => {
      setOrders(prev =>
        prev.map(o =>
          o.id === orderId
            ? {
                ...o,
                status: 'DRONE_IN_TRANSIT',
                progressPercent: 80,
                currentCheckpoint: 'Cruising via Skyline Corridor Alpha at 58 km/h.',
                telemetry: {
                  speedKmh: 58,
                  altitudeM: 75,
                  batteryPercent: 84,
                  coords: { x: 42, y: 44 },
                },
                updatedAt: new Date().toISOString(),
              }
            : o
        )
      );
    }, 3500);

    // Step 3: Arrived & Delivered to Station (7.5s later)
    setTimeout(() => {
      setOrders(prev =>
        prev.map(o =>
          o.id === orderId
            ? {
                ...o,
                status: 'DELIVERED_TO_STATION',
                progressPercent: 95,
                currentCheckpoint: `Package locked safely in Station Pod #${Math.floor(Math.random() * 12 + 1)}. Ready for PIN pickup.`,
                telemetry: {
                  speedKmh: 0,
                  altitudeM: 0,
                  batteryPercent: 81,
                  coords: { x: 48, y: 50 },
                },
                updatedAt: new Date().toISOString(),
              }
            : o
        )
      );

      setDrones(prev =>
        prev.map(d =>
          d.id === assignedDroneId
            ? {
                ...d,
                status: 'AVAILABLE',
                assignedOrderId: undefined,
                speedKmh: 0,
                altitudeMeters: 0,
                battery: d.battery - 7,
                totalDeliveries: d.totalDeliveries + 1,
              }
            : d
        )
      );

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#0284c7', '#38bdf8', '#ffffff'],
        });
      } catch {
        // no-op if in headless environment
      }

      addToast('Delivered to Station!', `Order #${orderId} is waiting at ${targetOrder.deliveryStationName}`, 'success');
    }, 7500);
  };

  const advanceOrderSimulationStep = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const sequence: OrderStatus[] = [
      'ORDER_PLACED',
      'STORE_ACCEPTED',
      'PACKAGE_PREPARING',
      'READY_FOR_DRONE',
      'DRONE_DISPATCHED',
      'DRONE_IN_TRANSIT',
      'DELIVERED_TO_STATION',
      'CUSTOMER_PICKUP',
    ];

    const currentIndex = sequence.indexOf(order.status);
    if (currentIndex < sequence.length - 1) {
      const nextStatus = sequence[currentIndex + 1];
      if (nextStatus === 'DRONE_DISPATCHED') {
        dispatchDroneSimulation(orderId);
      } else {
        updateOrderStatus(orderId, nextStatus);
      }
    }
  };

  const completeCustomerPickup = (orderId: string) => {
    updateOrderStatus(orderId, 'CUSTOMER_PICKUP');
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch {
      // no-op
    }
    addToast('Package Picked Up!', 'Thank you for choosing DROZONE sky delivery.', 'success');
  };

  // Product CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod_${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts(prev => [product, ...prev]);
    addToast('Product Added', `${product.name} is now listed.`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    addToast('Product Updated', `${updated.name} updated successfully.`, 'info');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product Deleted', 'Product removed from catalog.', 'warning');
  };

  const approveSeller = (storeId: string) => {
    setStores(prev => prev.map(s => s.id === storeId ? { ...s, status: 'active' } : s));
    addToast('Seller Approved', 'Store granted sky corridor merchant license.', 'success');
  };

  const suspendSeller = (storeId: string) => {
    setStores(prev => prev.map(s => s.id === storeId ? { ...s, status: 'suspended' } : s));
    addToast('Seller Suspended', 'Store access temporarily placed on hold.', 'warning');
  };

  const updateDroneStatus = (droneId: string, status: Drone['status']) => {
    setDrones(prev => prev.map(d => d.id === droneId ? { ...d, status } : d));
    addToast('Drone Status', `Drone ${droneId} marked as ${status}`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setRole,
        currentUser,
        activeCustomerTab,
        setActiveCustomerTab,
        activeSellerTab,
        setActiveSellerTab,
        activeAdminTab,
        setActiveAdminTab,
        theme,
        toggleTheme,

        stores,
        products,
        selectedCategory,
        setSelectedCategory,
        selectedProductModal,
        setSelectedProductModal,
        addProduct,
        updateProduct,
        deleteProduct,
        approveSeller,
        suspendSeller,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartWeight,

        orders,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        placeOrder,
        updateOrderStatus,
        requestDronePickup,
        dispatchDroneSimulation,
        completeCustomerPickup,
        advanceOrderSimulationStep,

        drones,
        deliveryStations,
        deliveryZones,
        updateDroneStatus,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
