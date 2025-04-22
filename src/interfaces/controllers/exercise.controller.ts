import { RequestHandler } from "express";
import {
  CreateExercise,
  DeleteExercise,
  GetAllExercises,
  GetExerciseById,
  MuscleGroup,
  UpdateExercise,
} from "../../domain";

export class ExerciseController {
  constructor(
    private readonly createExercise: CreateExercise,
    private readonly getAllExercises: GetAllExercises,
    private readonly getExerciseById: GetExerciseById,
    private readonly updateExercise: UpdateExercise,
    private readonly deleteExercise: DeleteExercise
  ) {}

  create: RequestHandler = async (req, res) => {
    try {
      const newExercise = await this.createExercise.execute(req.body);
      res.status(201).json(newExercise);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };

  getAll: RequestHandler = async (req, res) => {
    try {
      const { muscleGroup } = req.query;
      const exercises = await this.getAllExercises.execute(
        muscleGroup as MuscleGroup
      );
      res.json(exercises);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error fetching exercises", error: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const exercise = await this.getExerciseById.execute(req.params.id);
      if (!exercise) {
        res.status(404).json({ message: "Exercise not found" });
        return;
      }
      res.json(exercise);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error fetching exercise", error: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };

  update: RequestHandler = async (req, res) => {
    try {
      const updatedExercise = await this.updateExercise.execute(
        req.params.id,
        req.body
      );
      res.json(updatedExercise);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };

  delete: RequestHandler = async (req, res) => {
    try {
      await this.deleteExercise.execute(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
}
