import { Exercise } from "../entities/exercise.entity";
import { ExerciseRepository } from "../repositories/exercise.repository";

export class GetExerciseById {
    constructor(private readonly repository: ExerciseRepository) {}
  
    async execute(id: string): Promise<Exercise | null> {
      return await this.repository.findById(id);
    }
  }