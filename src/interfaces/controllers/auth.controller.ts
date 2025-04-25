import { Request, Response } from "express";
import { RegisterUser } from "../../domain/use-cases/auth/register-user.use-case";
import { LoginUser } from "../../domain/use-cases/auth/login-user.use-case";

export class AuthController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginUser: LoginUser
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.registerUser.execute(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await this.loginUser.execute(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
