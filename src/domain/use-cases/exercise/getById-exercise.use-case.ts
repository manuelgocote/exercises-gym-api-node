import { Exercise, ExerciseRepository } from "../..";


export class GetExerciseById {
    constructor(private readonly repository: ExerciseRepository) {}
  
    async execute(id: string): Promise<Exercise | null> {
      return await this.repository.findById(id);
    }
  }