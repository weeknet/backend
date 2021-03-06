import { ConfigService } from './../config/config.service';
import { MessagesService } from './messages.service';
import { MessageModel } from './models/message.model';
import { HttpStatus, HttpCode } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { Get, Param, Query, Put, Delete, Body } from '@nestjs/common';
import { InjectConfig } from 'nestjs-config';
import { ConfigParam, Configurable } from 'nestjs-config';


@Controller('messages')
export class MessagesController {

  constructor(private readonly messagesService: MessagesService, @InjectConfig() private readonly config,
  private readonly configService:ConfigService ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMessageDto) {
    let message: MessageModel = new MessageModel();
    message.title = createMessageDto.title;
    message.description = createMessageDto.description;
    message.link = createMessageDto.link;
    message.to = createMessageDto.to;
    message.saidBy = createMessageDto.saidBy;
    message.createdAt = createMessageDto.createdAt;
    message.keywords = createMessageDto.keywords; 
    return 'This action adds a new Message' ;
  }

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
  findAll(@Query() query) {
    return `This action returns all Messages (limit: ${query.limit} ${process.env.PORT}items)`;
  }

  @Get(':id')
  @Configurable()
  findOne(@Param('id') id, @ConfigParam('express.port', '8080') port) {
    const live = this.config.has('app.development');
    console.log(live);
    console.log(port);
    console.log(this.configService.getPort());
    return `This action returns a #${id} Message`;
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateMessageDto) {
    return `This action updates a #${id} Message`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return `This action removes a #${id} Message`;
  }
}