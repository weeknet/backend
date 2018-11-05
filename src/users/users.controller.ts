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
  Delete,
  Bind
} from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UserModel } from "./models/user.model";
import { InjectConfig } from 'nestjs-config';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService, @InjectConfig() config) {}
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    let user: UserModel = new UserModel();
    user.displayName = dto.displayName;
    user.email = dto.email;
    user.password = dto.password;
    user.imageUrl = dto.imageUrl;
    user.type = dto.type;
    return await this.usersService.create(user);
  }

  @Get()
  async findAll(@Query() query) {
    console.log(query.limit);
    console.log(query.cursor);
    return this.usersService.findAll(query.limit, query.cursor);
  }

  @Get(":id")  
  @Bind(Param('id'))
  async findOne(@Param("id") id) {
    return await this.usersService.findOne(id);
  }

  @Get('search/query')  
  async search(@Query() query) {
    console.log('search calling...')
    return await this.usersService.search(query.email, query.limit, query.cursor);
  }

  // //@Get("/search/:email")
  // asyn findByEmail(@Param("email") email) {
  //   return `This action updates  cat`;
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
