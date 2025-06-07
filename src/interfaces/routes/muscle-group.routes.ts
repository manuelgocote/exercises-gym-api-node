import { Router } from "express";
import { getMuscleGroups } from "../controllers/muscle-group.controller";

const router = Router();


/**
 * @swagger
 * /muscle-groups:
 *   get:
 *     tags:
 *       - Muscle Groups
 *     summary: Obtener todos los grupos musculares disponibles
 *     description: Devuelve todos los grupos musculares definidos en el enum MuscleGroup.
 *     responses:
 *       200:
 *         description: Lista de grupos musculares
 *         schema:
 *           type: object
 *           properties:
 *             muscleGroups:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["chest", "back", "legs", "biceps", "triceps", "shoulders", "abs"]
 */
router.get("/", getMuscleGroups);

export default router;
