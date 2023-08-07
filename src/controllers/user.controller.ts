import { Router, Response, Request } from "express";
import { UserService } from "../services/user.service";
import {
  CreateUserBody,
  DeleteUserParams,
  GetUserParams,
  UpdateUserBody,
  UpdateUserParams,
} from "../schemas/user.schema";

export class UserController {
  public router: Router;
  private userService: UserService;

  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.configureRoutes();
  }

  public createUserHandler = async (
    req: Request<CreateUserBody>,
    res: Response
  ) => {
    try {
      const { body } = req;
      const user = await this.userService.createUser(body);

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (error) {
      res.status(409).json({
        status: "failed",
        message: "Unable to create user.",
      });
    }
  };

  public getUserHandler = async (
    req: Request<GetUserParams>,
    res: Response
  ) => {
    const { params } = req;
    try {
      const user = await this.userService.getUser(params);
      if (!user) throw new Error();

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Could not get user.",
      });
    }
  };

  public updateUserHandler = async (
    req: Request<UpdateUserParams, UpdateUserBody>,
    res: Response
  ) => {
    try {
      const { params, body } = req;
      const user = await this.userService.getUser(params);
      if (!user) throw new Error();

      const updatedUser = await this.userService.updateUser(params, body);

      res.status(200).json({
        status: "success",
        data: {
          user: updatedUser,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Could not update user.",
      });
    }
  };

  public deleteUserHandler = async (
    req: Request<DeleteUserParams>,
    res: Response
  ) => {
    try {
      const { params } = req;
      const user = await this.userService.getUser(params);
      if (!user) throw new Error();

      const deletedUser = await this.userService.deleteUser(params);

      res.status(200).json({
        status: "success",
        data: {
          user: deletedUser,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Could not delete user.",
      });
    }
  };

  public configureRoutes = () => {
    this.router.post("/users", this.createUserHandler);
    this.router.get("/users/:id", this.getUserHandler);
    this.router.patch("/users/:id", this.updateUserHandler);
    this.router.delete("/users/:id", this.deleteUserHandler);
  };
}
