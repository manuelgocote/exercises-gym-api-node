// import { Exercise, ExerciseRepository, MuscleGroup  } from "../..";
import { MuscleGroup, Exercise } from "../../entities/exercise.entity";
import { ExerciseRepository } from "../../repositories/exercise.repository";

export class GetAllExercises {
  constructor(private readonly repository: ExerciseRepository) {}

  async execute(muscleGroup?: MuscleGroup): Promise<Exercise[]> {
    if (muscleGroup !== undefined) {
      return await this.repository.findByMuscleGroup(muscleGroup);
    }

    return await this.repository.findAll();
  }
}
