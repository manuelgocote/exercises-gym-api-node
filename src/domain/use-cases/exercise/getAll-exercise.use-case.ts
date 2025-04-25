// import { Exercise, ExerciseRepository, MuscleGroup  } from "../..";
import { MuscleGroup, Exercise } from "../../entities/exercise.entity";
import { ExerciseRepository } from "../../repositories/exercise.repository";

export class GetAllExercises {
  constructor(private readonly repository: ExerciseRepository) {}

  async execute(muscleGroup?: MuscleGroup): Promise<Exercise[]> {
    console.log("MUSCLE GROUP:", muscleGroup);
    console.log("typeof muscleGroup:", typeof muscleGroup);

    if (muscleGroup !== undefined) {
      console.log("Filtrando por músculo...");
      return await this.repository.findByMuscleGroup(muscleGroup);
    }

    console.log("Trayendo todos los ejercicios...");
    return await this.repository.findAll();
  }
}