import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dbUrl = process.env.DB_CONNECTION_URL;

if (!dbUrl) {
  throw new Error('Please set the DB_CONNECTION_URL environment variable');
}

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  url: dbUrl,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default databaseConfig;
