import { integer, pgSchema, unique, varchar } from 'drizzle-orm/pg-core';
import { users } from './public';
import { relations } from 'drizzle-orm';

export const addressSchema = pgSchema('address');

export const addresses = addressSchema.table(
  'addresses',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    street: varchar({ length: 100 }).notNull(),
    noExt: varchar('no_ext', { length: 50 }).notNull(),
    noInt: varchar('no_int', { length: 50 }),
    idUser: integer('id_user')
      .notNull()
      .references(() => users.id),
    idAddressType: integer('id_address_type')
      .notNull()
      .references(() => addressTypes.id),
    idLocation: integer('id_location')
      .notNull()
      .references(() => locations.id),
  },
  (t) => [unique().on(t.idUser, t.idAddressType)],
);

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, { fields: [addresses.idUser], references: [users.id] }),
  addressType: one(addressTypes, {
    fields: [addresses.idAddressType],
    references: [addressTypes.id],
  }),
  location: one(locations, {
    fields: [addresses.idAddressType],
    references: [locations.id],
  }),
}));

export const addressTypes = addressSchema.table('address_types', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  addressType: varchar('address_type', { length: 50 }).notNull().unique(),
});

export const addressTypesRelations = relations(addressTypes, ({ many }) => ({
  addresses: many(addresses),
}));

export const locations = addressSchema.table(
  'locations',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    colony: varchar({ length: 70 }).notNull(),
    postalCode: varchar({ length: 10 }).notNull(),
    city: varchar({ length: 70 }).notNull(),
    municipality: varchar({ length: 70 }).notNull(),
    state: varchar({ length: 50 }).notNull(),
    country: varchar({ length: 50 }).notNull(),
  },
  (t) => [
    unique().on(
      t.colony,
      t.postalCode,
      t.country,
      t.municipality,
      t.state,
      t.city,
    ),
  ],
);

export const locationsRelations = relations(locations, ({ many }) => ({
  addresses: many(addresses),
}));
