import { ExerciseRepository } from "../..";

export class DeleteExercise {
  constructor(private readonly repository: ExerciseRepository) {}

  async execute(id: string): Promise<void> {
    const exercise = await this.repository.findById(id);
    if (!exercise) {
      throw new Error("Exercise not found");
    }
    await this.repository.delete(id);
  }
}
