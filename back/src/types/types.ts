// Order states
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

// User roles
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  WAREHOUSE_MANAGER = 'warehouse_manager',
}

// Product
export interface Product {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  sku: string;
}

// Product inventory
export interface ProductInventory {
  product: Product;
  location: string;
  availableStock: number;
  reservedStock: number;
}

// Order item
export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

// Order
export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
}

// User
export interface User {
  id: string;
  role: UserRole;
  email: string;
  name: string;
}

// Event payloads for order state transitions
export interface OrderStateChangeEvent {
  orderId: string;
  previousStatus: OrderStatus;
  newStatus: OrderStatus;
  timestamp: Date;
  triggeredBy: User;
}

export interface OrderProcessingEvent extends OrderStateChangeEvent {
  warehouseId: string;
  estimatedShipDate: Date;
}

export interface OrderShippedEvent extends OrderStateChangeEvent {
  trackingNumber: string;
  carrier: string;
  shippedDate: Date;
}

export interface OrderDeliveredEvent extends OrderStateChangeEvent {
  deliveryDate: Date;
  signedBy?: string;
}

export interface OrderCancelledEvent extends OrderStateChangeEvent {
  reason: string;
  refundRequired: boolean;
}

// Type guard for checking valid state transitions
export const isValidStateTransition = (
  currentState: OrderStatus,
  newState: OrderStatus,
): boolean => {
  const validTransitions = new Map<OrderStatus, OrderStatus[]>([
    [OrderStatus.PENDING, [OrderStatus.PROCESSING, OrderStatus.CANCELLED]],
    [OrderStatus.PROCESSING, [OrderStatus.SHIPPED, OrderStatus.CANCELLED]],
    [OrderStatus.SHIPPED, [OrderStatus.DELIVERED]],
    [OrderStatus.DELIVERED, []],
    [OrderStatus.CANCELLED, []],
  ]);

  return validTransitions.get(currentState)?.includes(newState) ?? false;
};
