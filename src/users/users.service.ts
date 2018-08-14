import { Injectable, HttpStatus, Get, Query } from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import { UserModel } from "./models/user.model";
import { DataMapper, QueryParameters, QueryOptions } from "@aws/dynamodb-data-mapper";
import {between, equals, SimpleConditionExpression, ConditionExpressionSubject, ConditionExpressionPredicate, EqualityExpressionPredicate, InequalityExpressionPredicate} from '@aws/dynamodb-expressions';
import DynamoDB = require("aws-sdk/clients/dynamodb");
import { ScanIterator } from "@aws/dynamodb-query-iterator";
import { ListUser } from "./dto/list-user.dto";
import { ListItemDto } from "./../common/response/list-items.dto";
import { attribute } from "@aws/dynamodb-data-mapper-annotations";



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
    //user.id = "uyphu";

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

    // let condition: DynamoDB.ConditionExpression = {}
    
    // let queryOptions:QueryOptions = {limit:limit, filter:{"email" =>}};

    // QueryI
    
    // let quey: KeyParame
    
    for await (const item of mapper.query(UserModel, {'id': email})) {
      result.items.push(item);
      id = item.id;
    }    
    result.nextPageToken = id;
    return result;
  }

  async search(email: string, limit: number, cursor: string): Promise<ListItemDto<UserModel>> {
    console.log('UsersService.findAll');     
    let result: ListItemDto<UserModel> = new ListItemDto<UserModel>();
    let id: string = undefined;

    // const keyCondition = {
    //   partitionKey: 'id',
    //   rangeKey: equals('1131cbc7-68af-4d5a-8fb6-33873c9f63ce'),
    // };

    //let subject: ConditionExpressionSubject = {subject: 'email'};
    let express: InequalityExpressionPredicate = {type:'NotEquals', object:email};


    let condition:SimpleConditionExpression = {subject: 'id', type:'Equals', object:email};    

    
    for await (const item of mapper.query(UserModel, {filter:condition})) {
      result.items.push(item);
      id = item.id;
    }    
    result.nextPageToken = id;
    return result;
  }

}

