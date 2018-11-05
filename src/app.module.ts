import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { MessagesModule } from './messages/messages.module';
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from 'nestjs-config'
import * as path from 'path';

@Module({
  imports: [UsersModule, MessagesModule, ConfigService
    ConfigModule.load(path.resolve(__dirname, 'config/**/*.{ts,js}'))],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
