import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../users/users.controller";
import { AppService } from "../app.service";
import { CreateUserDto } from "../users/dto/create-user.dto";

describe("UserController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [AppService]
    }).compile();
  });

  describe("create", () => {
    it('should return "This action adds a new cat"', () => {
      const result: CreateUserDto = new CreateUserDto();
      const controller = app.get<UsersController>(UsersController);
      expect(controller.create(result)).toBe("This action adds a new cat");
    });
  });

  describe("findAll", () => {
    it('should return "This action returns"', () => {
      const controller = app.get<UsersController>(UsersController);
      expect(controller.findAll()).toBe("This action returns");
    });
  });

  describe("findOne", () => {
    it('should return "This action returns a #1 cat"', () => {
      const controller = app.get<UsersController>(UsersController);
      expect(controller.findOne(1)).toBe("This action returns a #1 cat");
    });
  });
});
