import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "users/users.controller";
import { TestsController } from "tests/tests.controller";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";

@Module({
  imports: [],
  controllers: [AppController, TestsController],
  providers: [AppService]
})
export class AppModule {}
