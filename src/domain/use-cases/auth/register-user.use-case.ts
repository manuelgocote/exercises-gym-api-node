
import bcrypt from "bcryptjs";
import { User, UserRepository } from "../..";

export class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: Omit<User, "id">): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Hash del password antes de guardarlo
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = { ...data, password: hashedPassword };

    return await this.userRepository.create(newUser);
  }
}
