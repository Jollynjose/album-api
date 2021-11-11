import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Configuration } from '../config/config.keys';
import { ConfigService } from '../config/config.service';

const config: ConfigService = new ConfigService();
export const databaseProviders: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.get(Configuration.HOST),
  port: +config.get(Configuration.DB_PORT),
  username: config.get(Configuration.USERNAME),
  password: config.get(Configuration.PASSWORD),
  database: config.get(Configuration.DB),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js'],
};
