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
  
  @Controller("tests")
  export class TestsController {
    
  
    @Get()
    findAll(): string {
      return "This action returns";
    }
  
    @Get(":id")
    findOne(@Param("id") id) {
      return `This action returns a #${id} cat`;
    }    
  
    @Delete(":id")
    remove(@Param("id") id) {
      return `This action removes a #${id} cat`;
    }
  }
  