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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registra un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos o usuario ya existente
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesión de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", authController.login);

export default router;
