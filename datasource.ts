import * as dotenv from 'dotenv';
import * as path from 'path';
import * as process from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: path.resolve('.env') });

export const connectionSource = new DataSource({
  type: 'mysql',
  host: process.env['DB__HOST'],
  port: Number(process.env['DB__PORT']),
  username: process.env['DB__USERNAME'],
  password: process.env['DB__PASSWORD'],
  database: process.env['DB__DATABASE'],
  entities: ['./libs/database/src/models/entities/*.{ts,js}'],
  migrations: ['./libs/database/src/migrations/*.{ts,js}'],
  logging: true,
  synchronize: true,
} as DataSourceOptions);
