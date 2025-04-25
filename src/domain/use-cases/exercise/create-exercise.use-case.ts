import { Exercise, ExerciseRepository, MuscleGroup } from "../..";

export class CreateExercise {
  constructor(private readonly repository: ExerciseRepository) {}

  async execute(data: Exercise): Promise<Exercise> {
    // Validar que el muscleGroup esté presente y no esté vacío
    if (!data.muscleGroup || data.muscleGroup.length === 0) {
      throw new Error("Muscle group is required.");
    }
    // Validar que todos los músculos enviados existen en el enum
    const allMuscleValues = Object.values(MuscleGroup);

    const hasInvalidMuscle = data.muscleGroup.some(
      (muscle) => !allMuscleValues.includes(muscle)
    );

    if (hasInvalidMuscle) {
      throw new Error("Invalid muscle group(s) provided.");
    }

    // Guardar en base de datos
    return await this.repository.create(data);
  }
}
