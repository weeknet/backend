import { MessageModel } from './models/message.model';
import { Injectable, HttpStatus, Get, Query } from "@nestjs/common";
import { DataMapper, QueryParameters, QueryOptions } from "@aws/dynamodb-data-mapper";
import {between, equals, SimpleConditionExpression, ConditionExpressionSubject, ConditionExpressionPredicate, EqualityExpressionPredicate, InequalityExpressionPredicate} from '@aws/dynamodb-expressions';
import DynamoDB = require("aws-sdk/clients/dynamodb");
import { ScanIterator } from "@aws/dynamodb-query-iterator";
import { ListItemDto } from "./../common/response/list-items.dto";
import { attribute } from "@aws/dynamodb-data-mapper-annotations";

const client = new DynamoDB({ region: "eu-west-1" });
const mapper = new DataMapper({ client });

@Injectable()
export class MessagesService {

    /**
   * Creates new message.
   * @param message 
   */
  async create(message: MessageModel): Promise<MessageModel> {
    console.log("messagesService.create");
    message.createdAt = new Date();
    //message.id = "uyphu";

    await mapper.put({ item: message }).then((response) => {
      // The message has been created!
      message = Object.assign(new MessageModel, response);
      console.log(message);
    })
      .catch(err => {
        console.log(err);
      });
    return message;
  }
}

