import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Query,
  Param,
  Put,
  Delete
} from "@nestjs/common";
// import { UpdateUserDto } from "./dto/update-user.dto";
// import { CreateUserDto } from "./dto/create-user.dto";
// import { UsersService } from "./users.service";
// import { UserModel } from "./models/user.model";

@Controller("users")
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // async create(@Body() dto: CreateUserDto) {
  //   let user: UserModel = new UserModel();
  //   user.displayName = dto.displayName;
  //   user.email = dto.email;
  //   user.password = dto.password;
  //   user.imageUrl = dto.imageUrl;
  //   user.type = dto.type;
  //   return await this.usersService.create(user);
  // }

  @Get()
  findAll(): string {
    return "This action returns";
  }

  // @Get(":id")
  // findOne(@Param("id") id) {
  //   return `This action returns a #${id} cat`;
  // }

  // @Put(":id")
  // update(@Param("id") id, @Body() dto: UpdateUserDto) {
  //   return `This action updates a #${id} cat`;
  // }

  // @Delete(":id")
  // remove(@Param("id") id) {
  //   return `This action removes a #${id} cat`;
  // }
}
