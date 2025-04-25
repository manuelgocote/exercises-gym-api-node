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

// Rutas públicas
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// Rutas protegidas (solo usuarios autenticados con rol admin)
router.post("/", authMiddleware, adminMiddleware, controller.create);
router.put("/:id", authMiddleware, adminMiddleware, controller.update);
router.delete("/:id", authMiddleware, adminMiddleware, controller.delete);

const exercises: Exercise[] = [
  {
    name: "Push Up",
    description: "A bodyweight exercise targeting the chest.",
    muscleGroup: [MuscleGroup.PECTORAL, MuscleGroup.TRICEPS],
  },
  {
    name: "Squat",
    description: "A lower-body exercise that targets the quads and glutes.",
    muscleGroup: [MuscleGroup.PIERNAS, MuscleGroup.GLUTEOS],
  },
  {
    name: "Deadlift",
    description: "A full-body exercise focusing on posterior chain muscles.",
    muscleGroup: [MuscleGroup.ESPALDA, MuscleGroup.PIERNAS],
  },
  // Añadir más datos aquí...
];

async function insertExercises() {
  try {
    for (let exercise of exercises) {
      await repository.create(exercise);
    }
    console.log("Datos insertados correctamente");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
}

//insertExercises();
// console.log(typeof controller.create); //

export default router;
