import { DrizzleAsyncProvider, DrizzleDB } from '@/db/drizzle.provider';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export default class OrderRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: DrizzleDB) {}
}
