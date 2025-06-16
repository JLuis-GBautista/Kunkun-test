import { defineConfig, Config } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.dev' });

const configDrizzle: Config = {
  dialect: 'postgresql',
  schema: './src/db/schemas/*.ts',
  out: 'src/db/drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};

export default defineConfig(configDrizzle) satisfies Config;
