import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../..";

export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<{ token: string, user: any }> {
  const user = await this.userRepository.findByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  // Devolver el token y los datos del usuario (sin contraseña)
  const { id, username, role } = user;
  return {
    token,
    user: { id, username, email, role }
  };
}
}
