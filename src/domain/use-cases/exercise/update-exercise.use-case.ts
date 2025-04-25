import { Exercise, ExerciseRepository, MuscleGroup } from "../..";

export class UpdateExercise {
  constructor(private readonly repository: ExerciseRepository) {}

  async execute(id: string, data: Partial<Exercise>): Promise<Exercise> {
    // Validar que los músculos enviados existen en el enum
    if (data.muscleGroup) {
      const allMuscleValues = Object.values(MuscleGroup);

      const hasInvalidMuscle = data.muscleGroup.some(
        (muscle) => !allMuscleValues.includes(muscle)
      );

      if (hasInvalidMuscle) {
        throw new Error("Invalid muscle group(s) provided.");
      }
    }

    const exercise = await this.repository.findById(id);
    if (!exercise) {
      throw new Error("Exercise not found");
    }

    // Actualizamos los datos del ejercicio
    const updatedExercise = { ...exercise, ...data };

    // Guardamos los cambios en la base de datos
    return await this.repository.update(id, updatedExercise);
  }
}
