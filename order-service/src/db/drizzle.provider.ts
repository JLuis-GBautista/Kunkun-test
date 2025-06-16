import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as publicSchema from './schemas/order';

import { ConfigService } from '@nestjs/config';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectionToken } from '@nestjs/common';

const schema = { ...publicSchema };

export const DrizzleAsyncProvider = Symbol(
  'DrizzleAsyncProvider',
) as InjectionToken;

export type DrizzleDB = NodePgDatabase<typeof schema>;

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const connectionString = configService.get<string>('DATABASE_URL');
      const pool = new Pool({
        connectionString,
      });

      return drizzle(pool, { schema }) as DrizzleDB;
    },
  },
];
