import { Module } from '@nestjs/common';
import { DrizzleAsyncProvider, drizzleProvider } from './drizzle.provider';
import repositories from './repositories';

@Module({
  providers: [...drizzleProvider, ...repositories],
  exports: [DrizzleAsyncProvider, ...repositories],
})
export default class DrizzleModule {}
