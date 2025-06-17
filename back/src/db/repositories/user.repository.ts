// import { DrizzleAsyncProvider, DrizzleDB } from '@/db/drizzle.provider';
// import { age, users } from '@/db/schemas/public';
// import { CreateUserT } from '@/types/models/user';
// import { Inject, Injectable } from '@nestjs/common';
// import { sql } from 'drizzle-orm';

// @Injectable()
// export default class UserRepository {
//   constructor(@Inject(DrizzleAsyncProvider) private db: DrizzleDB) {}

//   async findByIdForSession(userId: bigint) {
//     const prepareGetSession = this.db.query.users
//       .findFirst({
//         columns: {
//           password: false,
//           idUserType: false,
//         },
//         extras: {
//           age: age,
//         },
//         with: {
//           userType: true,
//           addresses: {
//             columns: {
//               idAddressType: false,
//               idLocation: false,
//               idUser: false,
//             },
//             with: {
//               addressType: true,
//               location: true,
//             },
//           },
//           usersRoles: {
//             columns: {
//               idRole: false,
//               idUser: false,
//             },
//             with: {
//               role: {
//                 with: {
//                   rolesPermissions: {
//                     columns: {
//                       idPermission: false,
//                       idRole: false,
//                     },
//                     with: {
//                       permission: true,
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//         where: (users, { eq }) => eq(users.id, sql.placeholder('idUser')),
//       })
//       .prepare('prepare_get_session');

//     return await prepareGetSession.execute({ idUser: userId });
//   }

//   async findByEmailForLogin(email: string) {
//     const prepareFindByEmailForLogin = this.db.query.users
//       .findFirst({
//         columns: {
//           id: true,
//           password: true,
//         },
//         with: {
//           usersRoles: {
//             columns: {
//               idRole: false,
//               idUser: false,
//             },
//             with: {
//               role: true,
//             },
//           },
//         },
//         where: (users, { eq }) => eq(users.email, sql.placeholder('email')),
//       })
//       .prepare('prepare_login');

//     return prepareFindByEmailForLogin.execute({ email });
//   }

//   async createUser(data: CreateUserT) {
//     await this.db.insert(users).values({
//       name: data.name,
//       birthdate: data.birthdate,
//       phone: data.phone,
//       idUserType: data.typeUser,
//       email: data.email,
//       password: data.password,
//     });
//   }
// }
