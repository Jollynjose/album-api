import { Module } from '@nestjs/common';
import { Configuration } from 'src/config/config.keys';

import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
