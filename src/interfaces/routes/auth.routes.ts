import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { RegisterUser } from "../../domain/use-cases/auth/register-user.use-case";
import { LoginUser } from "../../domain/use-cases/auth/login-user.use-case";
import { MongoUserRepository } from "../../infrastructure/database/repositories/user.repository";

const router = Router();

const userRepository = new MongoUserRepository();
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);
const authController = new AuthController(registerUser, loginUser);

router.post("/register", authController.register);
router.post("/login", authController.login);


export default router;
