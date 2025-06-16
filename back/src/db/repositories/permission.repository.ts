import { DrizzleAsyncProvider, DrizzleDB } from '@/db/drizzle.provider';
import { Inject, Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';
import { permissions, roles, rolesPermissions } from '../schemas/authorization';

@Injectable()
export default class PermissionRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: DrizzleDB) {}

  async findDistinctByRoles(rolesList: string[]) {
    return await this.db
      .selectDistinct({
        id: permissions.id,
        permission: permissions.permission,
      })
      .from(permissions)
      .innerJoin(
        rolesPermissions,
        eq(permissions.id, rolesPermissions.idPermission),
      )
      .innerJoin(roles, eq(roles.id, rolesPermissions.idRole))
      .where(inArray(roles, rolesList));
  }
}
