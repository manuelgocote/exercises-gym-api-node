import express, { Router, Request, Response } from "express";

import {
  CreateExercise,
  GetAllExercises,
  GetExerciseById,
  DeleteExercise,
  UpdateExercise,
  Exercise,
  MuscleGroup,
} from "../../domain";
import { ExerciseController } from "../controllers/exercise.controller";

import { MongoExerciseRepository } from "../../infrastructure/database/repositories/mongodb.repository";

import { authMiddleware } from "../../middleware/auth.middleware";
import { adminMiddleware } from "../../middleware/admin.middleware";

const router = Router();

// Inyección de dependencias
const repository = new MongoExerciseRepository();
const createExercise = new CreateExercise(repository);
const getAllExercises = new GetAllExercises(repository);
const getExerciseById = new GetExerciseById(repository);
const updateExercise = new UpdateExercise(repository);
const deleteExercise = new DeleteExercise(repository);
const controller = new ExerciseController(
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise
);

/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: API para gestión de ejercicios
 */

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Obtener todos los ejercicios
 *     tags: [Exercises]
 *     parameters:
 *       - in: query
 *         name: muscleGroup
 *         schema:
 *           type: string
 *           enum: [pectoral, biceps, triceps, hombro, espalda, piernas, abdomen, gluteos, gemelos]
 *         description: Grupo muscular para filtrar los ejercicios
 *     responses:
 *       200:
 *         description: Lista de ejercicios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     summary: Obtener un ejercicio por ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del ejercicio
 *     responses:
 *       200:
 *         description: Ejercicio encontrado
 *       404:
 *         description: Ejercicio no encontrado
 */

/**
 * @swagger
 * /exercises:
 *   post:
 *     summary: Crear un nuevo ejercicio
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       201:
 *         description: Ejercicio creado
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /exercises/{id}:
 *   put:
 *     summary: Actualizar un ejercicio existente
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del ejercicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       200:
 *         description: Ejercicio actualizado
 *       404:
 *         description: Ejercicio no encontrado
 */

/**
 * @swagger
 * /exercises/{id}:
 *   delete:
 *     summary: Eliminar un ejercicio
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del ejercicio
 *     responses:
 *       204:
 *         description: Ejercicio eliminado
 *       404:
 *         description: Ejercicio no encontrado
 */

// Rutas públicas
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// Rutas protegidas (solo usuarios autenticados con rol admin)
router.post("/", authMiddleware, adminMiddleware, controller.create);
router.put("/:id", authMiddleware, adminMiddleware, controller.update);
router.delete("/:id", authMiddleware, adminMiddleware, controller.delete);

// const exercises: Exercise[] = [
//   {
//     name: "Push Up",
//     description: "A bodyweight exercise targeting the chest.",
//     muscleGroup: [MuscleGroup.PECTORAL, MuscleGroup.TRICEPS],
//   },
//   {
//     name: "Squat",
//     description: "A lower-body exercise that targets the quads and glutes.",
//     muscleGroup: [MuscleGroup.PIERNAS, MuscleGroup.GLUTEOS],
//   },
//   {
//     name: "Deadlift",
//     description: "A full-body exercise focusing on posterior chain muscles.",
//     muscleGroup: [MuscleGroup.ESPALDA, MuscleGroup.PIERNAS],
//   },
//   // Añadir más datos aquí...
// ];

// async function insertExercises() {
//   try {
//     for (let exercise of exercises) {
//       await repository.create(exercise);
//     }
//     console.log("Datos insertados correctamente");
//   } catch (error) {
//     console.error("Error al insertar datos:", error);
//   }
// }

// //insertExercises();
// // console.log(typeof controller.create); //

export default router;
