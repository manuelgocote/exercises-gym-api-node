import { Exercise, MuscleGroup } from "../entities/exercise.entity";
import { ExerciseRepository } from "../repositories/exercise.repository";

export class GetAllExercises {
    constructor(private readonly repository: ExerciseRepository) {}
  
    // async execute(): Promise<Exercise[]> {
    //   return await this.repository.findAll();
    // }
    async execute(muscleGroup?: MuscleGroup): Promise<Exercise[]> {
      if (muscleGroup) {
        return await this.repository.findByMuscleGroup(muscleGroup);
      }
      return await this.repository.findAll();
    }
  }