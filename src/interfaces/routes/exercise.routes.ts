import express, { Router } from "express";
import {
  CreateExercise,
  GetAllExercises,
  GetExerciseById,
  DeleteExercise,
  UpdateExercise,
  MuscleGroup,
  Exercise,
} from "../../domain";
import { ExerciseController } from "../controllers/exercise.controller";
import { MongoExerciseRepository } from "../../infrastructure/database/repositories/mongodb.repository";
import { authMiddleware } from "../../middleware/auth.middleware";
import { adminMiddleware } from "../../middleware/admin.middleware";

const router = Router();

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
 *   description: Endpoints for managing gym exercises
 */

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Get all exercises
 *     tags: [Exercises]
 *     parameters:
 *       - in: query
 *         name: muscleGroup
 *         schema:
 *           type: string
 *           enum: [pectoral, biceps, triceps, hombro, espalda, piernas, abdomen, gluteos, gemelos]
 *         description: Filter exercises by muscle group
 *     responses:
 *       200:
 *         description: List of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     summary: Get exercise by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the exercise
 *     responses:
 *       200:
 *         description: Exercise found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /exercises:
 *   post:
 *     summary: Create a new exercise
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
 *         description: Exercise created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, adminMiddleware, controller.create);

/**
 * @swagger
 * /exercises/{id}:
 *   put:
 *     summary: Update an exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the exercise to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       200:
 *         description: Exercise updated
 *       404:
 *         description: Exercise not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authMiddleware, adminMiddleware, controller.update);

/**
 * @swagger
 * /exercises/{id}:
 *   delete:
 *     summary: Delete an exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the exercise to delete
 *     responses:
 *       204:
 *         description: Exercise deleted successfully
 *       404:
 *         description: Exercise not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, adminMiddleware, controller.delete);

export default router;
