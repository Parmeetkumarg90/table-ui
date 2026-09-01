import { Migration } from '@mikro-orm/migrations';
import { ConfigService } from '@nestjs/config';

export class CreateReservation extends Migration {
  up(): Promise<void> | void {
    const configService = new ConfigService();
    const schema = configService.get<string>('DB_SCHEMA') ?? 'public';

    this.addSql(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);
    this.addSql(`CREATE TYPE "${schema}"."user_category" AS ENUM ('adult', 'children');`);
    this.addSql(`
      CREATE TABLE IF NOT EXISTS "${schema}"."reservation"(
        id BIGSERIAL PRIMARY KEY,
        uuid UUID NOT NULL UNIQUE,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NULL,
        age INT NOT NULL,
        category "${schema}"."user_category" NOT NULL DEFAULT 'adult',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);
  }

  down(): Promise<void> | void {
    const configService = new ConfigService();
    const schema = configService.get<string>('DB_SCHEMA') ?? 'public';

    this.addSql(`DROP TABLE IF EXISTS "${schema}"."reservation";`);
    this.addSql(`DROP TYPE IF EXISTS "${schema}"."user_category";`);
  }
}