import { relations, sql } from 'drizzle-orm';
import { pgTable, integer, varchar, primaryKey } from 'drizzle-orm/pg-core';
import { date } from 'drizzle-orm/pg-core';
import { addresses } from './address';
import { roles } from './authorization';

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  birthdate: date().notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 15 }).notNull(),
  idUserType: integer('id_user_type')
    .notNull()
    .references(() => userTypes.id),
});

export const age = sql<number>`EXTRACT(YEAR FROM AGE(${users.birthdate}))`.as(
  'age',
);
export const usersRelations = relations(users, ({ one, many }) => ({
  userType: one(userTypes, {
    fields: [users.idUserType],
    references: [userTypes.id],
  }),
  addresses: many(addresses),
  usersRoles: many(usersRoles),
}));

export const userTypes = pgTable('user_types', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userType: varchar('user_type', { length: 50 }).notNull().unique(),
});

export const userTypesRelations = relations(userTypes, ({ many }) => ({
  users: many(users),
}));

export const usersRoles = pgTable(
  'users_roles',
  {
    idUser: integer('id_user')
      .references(() => users.id)
      .notNull(),
    idRole: integer('id_role')
      .references(() => roles.id)
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.idUser, t.idRole] })],
);

export const usersRolesRelations = relations(usersRoles, ({ one }) => ({
  user: one(users, {
    fields: [usersRoles.idUser],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [usersRoles.idRole],
    references: [roles.id],
  }),
}));
