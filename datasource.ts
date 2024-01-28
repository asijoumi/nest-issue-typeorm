import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'sqlite',
  database: path.join(__dirname, 'test.db'),
  entities: [
    path.join(__dirname, './libs/database/src/models/entities/*.{ts,js}'),
  ],
  migrations: [
    path.join(__dirname, './libs/database/src/migrations/*.{ts,js}'),
  ],
  logging: true,
} as DataSourceOptions);
