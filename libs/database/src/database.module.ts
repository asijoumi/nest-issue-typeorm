import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'sqlite',
          database: './test.db',
          entities: ['./models/entities/*'],
          migrations: ['./migrations/*'],
        });

        await dataSource.initialize();
        await dataSource.runMigrations();

        return dataSource.options;
      },
    }),
  ],
})
export class DatabaseModule {}
