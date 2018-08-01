import { Injectable, HttpStatus } from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import { UserModel } from "./models/user.model";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import DynamoDB = require("aws-sdk/clients/dynamodb");

const client = new DynamoDB({ region: "eu-west-1" });
const mapper = new DataMapper({ client });

@Injectable()
export class UsersService {
  //private readonly users: User[] = [];

  //   create(user: User) {
  //     this.users.push(user);
  //   }

  //   findAll(): User[] {
  //     return this.users;
  //   }

  async create(user: UserModel): Promise<UserModel> {
    console.log("UsersService.create");
    user.createdAt = new Date();

    await mapper
      .put({ item: user })
      .then(response => {
        // The user has been created!
        console.log(response);
        user.id = response.item.id;
      })
      .catch(err => {
        console.log(err);
      });
    return user;
  }

  
   async findOne(id: string): Promise<UserModel> {
    return `This action returns a #${id} cat`;
    }

}
