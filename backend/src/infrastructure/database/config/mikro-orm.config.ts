import { defineConfig } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { ConfigService } from '@nestjs/config';
import { configDotenv } from 'dotenv';

configDotenv();

const getConfig = (): Options => {
  const configService = new ConfigService();

  return defineConfig({
    driver: PostgreSqlDriver,
    name: 'default_db',
    schema: configService.get<string>('DB_SCHEMA'),
    dbName: configService.get<string>('DB_NAME'),
    entities: ['dist/domain/**/*.entity.js'],
    user: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    port: configService.get<number>('DB_PORT'),
    host: configService.get<string>('DB_HOST'),
    migrations: {
      path: 'dist/infrastructure/database/migrations',
      pathTs: 'src/infrastructure/database/migrations',
    },
    seeder: {
      path: 'dist/infrastructure/database/seeders',
    },
    extensions: [SeedManager, Migrator],
    forceUtcTimezone: true,
    ensureDatabase: true,
    debug: true,
  });
};

const mikroormConfig: Options = getConfig();

export default mikroormConfig;