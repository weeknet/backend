import { Injectable, HttpStatus, Get, Query } from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import { UserModel } from "./models/user.model";
import { DataMapper, QueryParameters } from "@aws/dynamodb-data-mapper";
import DynamoDB = require("aws-sdk/clients/dynamodb");
import { ScanIterator } from "@aws/dynamodb-query-iterator";
import { ListUser } from "./dto/list-user.dto";
import { ListItemDto } from "common/response/list-items.dto";
import { attribute } from "@aws/dynamodb-data-mapper-annotations";
import { QueryOptions } from "aws-sdk/clients/cloudsearchdomain";

const client = new DynamoDB({ region: "eu-west-1" });
const mapper = new DataMapper({ client });

@Injectable()
export class UsersService {

  /**
   * Creates new user.
   * @param user 
   */
  async create(user: UserModel): Promise<UserModel> {
    console.log("UsersService.create");
    user.createdAt = new Date();

    await mapper.put({ item: user }).then((response) => {
      // The user has been created!
      user = Object.assign(new UserModel, response);
      console.log(user);
    })
      .catch(err => {
        console.log(err);
      });
    return user;
  }
  
  /**
   * Finds all items 
   * @param limit 
   * @param cursor 
   */
  async findAll(limit: number, cursor: string): Promise<ListItemDto<UserModel>> {
    console.log('UsersService.findAll');     
    let result: ListItemDto<UserModel> = new ListItemDto<UserModel>();
    let id: string = undefined;

    let scanOptions = {};
    if (cursor !== undefined && cursor !== '') {
      scanOptions = {limit: limit, startKey: {id:cursor}};
    } else {
      scanOptions ={limit: limit};
    }
    
    for await (const item of mapper.scan(UserModel, scanOptions)) {
      result.items.push(item);
      id = item.id;
    }    
    result.nextPageToken = id;
    return result;
  }

  /**
   * Gets user by id.
   * @param id 
   */
  async findOne(id: string): Promise<UserModel> {
    let item = null;
    await mapper.get(Object.assign(new UserModel, {id:id}))
      .then(response => {
        item = Object.assign(new UserModel, response);
      })
      .catch(err => {
        console.log(err);
      });
    return item;
  }

  async findByEmail(email: string, limit: number, cursor: string): Promise<ListItemDto<UserModel>> {
    console.log('UsersService.findAll');     
    let result: ListItemDto<UserModel> = new ListItemDto<UserModel>();
    let id: string = undefined;

    let scanOptions = {};
    if (cursor !== undefined && cursor !== '') {
      scanOptions = {limit: limit, startKey: {id:cursor}};
    } else {
      scanOptions ={limit: limit};
    }
    let queryOptions: QueryOptions = {limit:limit};
    
    for await (const item of mapper.query({limit:limit, attributes_to_get: 'email'})) {
      result.items.push(item);
      id = item.id;
    }    
    result.nextPageToken = id;
    return result;
  }

}
