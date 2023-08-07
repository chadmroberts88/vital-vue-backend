import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Database } from "../utilities/database";
import {
  CreateUserBody,
  DeleteUserParams,
  GetUserParams,
  UpdateUserBody,
  UpdateUserParams,
} from "../schemas/user.schema";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = Database.getRepository(User);
  }

  public createUser = async (body: CreateUserBody) => {
    const newUser = this.userRepository.create(body);
    return await this.userRepository.save(newUser);
  };

  public getUser = async (params: GetUserParams) => {
    return await this.userRepository.findOneBy({ id: params.id });
  };

  public updateUser = async (
    params: UpdateUserParams,
    body: UpdateUserBody
  ) => {
    return await this.userRepository.update(params.id, body);
  };

  public deleteUser = async (params: DeleteUserParams) => {
    return await this.userRepository.delete(params.id);
  };
}
