import { UserRepository } from "../../../domain/repositories/user.repository";
import { User } from "../../../domain/entities/user.entity";
import { UserModel } from "../models/user.model";

export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await UserModel.create(user);
    return createdUser.toObject();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }
}
