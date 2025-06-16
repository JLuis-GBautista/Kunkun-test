import { relations } from 'drizzle-orm';
import { integer, pgSchema, varchar, primaryKey } from 'drizzle-orm/pg-core';
import { usersRoles } from './public';

export const authorizationSchema = pgSchema('authorization');

export const roles = authorizationSchema.table('roles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  role: varchar({ length: 50 }).unique().notNull(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  rolesPermissions: many(rolesPermissions),
  usersRoles: many(usersRoles),
}));

export const rolesPermissions = authorizationSchema.table(
  'roles_permissions',
  {
    idRole: integer('id_role')
      .references(() => roles.id)
      .notNull(),
    idPermission: integer('id_permission')
      .references(() => permissions.id)
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.idRole, t.idPermission] })],
);

export const rolesPermissionsRelations = relations(
  rolesPermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolesPermissions.idRole],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolesPermissions.idPermission],
      references: [permissions.id],
    }),
  }),
);

export const permissions = authorizationSchema.table('permissions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  permission: varchar({ length: 50 }).unique().notNull(),
});

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolesPermissions: many(rolesPermissions),
}));
