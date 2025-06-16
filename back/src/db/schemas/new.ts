// Archivo: db/schema/orders.ts
import { pgTable, uuid, text, decimal, timestamp, integer, foreignKey } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  status: text('status').notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id),
  productId: uuid('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
});

// Archivo: db/schema/inventory.ts
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const stockMovements = pgTable('stock_movements', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id),
  type: text('type').notNull(),
  quantity: integer('quantity').notNull(),
  reference: text('reference'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Archivo: db/schema/payments.ts
export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id),
  userId: uuid('user_id').notNull(),
  status: text('status').notNull(),
  method: text('method').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  paymentId: uuid('payment_id').notNull().references(() => payments.id),
  gateway: text('gateway').notNull(),
  gatewayId: text('gateway_id').notNull(),
  status: text('status').notNull(),
  responseData: text('response_data'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Archivo: db/schema/shipping.ts
export const shippingMethods = pgTable('shipping_methods', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  estimatedDays: integer('estimated_days').notNull(),
});

export const shipments = pgTable('shipments', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id),
  shippingMethodId: uuid('shipping_method_id').notNull().references(() => shippingMethods.id),
  address: text('address').notNull(),
  status: text('status').notNull(),
  trackingCode: text('tracking_code'),
  shippedAt: timestamp('shipped_at', { withTimezone: true }),
});

// Archivo: db/schema/notifications.ts
export const templates = pgTable('templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventType: text('event_type').notNull(),
  channel: text('channel').notNull(),
  content: text('content').notNull(),
});

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  eventType: text('event_type').notNull(),
  channel: text('channel').notNull(),
  status: text('status').notNull(),
  content: text('content').notNull(),
  sentAt: timestamp('sent_at', { withTimezone: true }),
  templateId: uuid('template_id').references(() => templates.id),
});
