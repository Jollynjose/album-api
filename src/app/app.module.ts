import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from '../database/database.options';
import { Configuration } from '../config/config.keys';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { UserModule } from '../modules/user/user.module';
import { RoleModule } from 'src/modules/role/role.module';
@Module({
  imports: [
    ConfigModule,
    RoleModule,
    TypeOrmModule.forRoot(databaseProviders),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
