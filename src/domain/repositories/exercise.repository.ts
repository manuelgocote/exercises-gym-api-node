import { Exercise, MuscleGroup } from "../entities/exercise.entity";

export interface ExerciseRepository {
    create(exercise: Exercise): Promise<Exercise>;
    findAll(): Promise<Exercise[]>;
    findById(id: string): Promise<Exercise | null>;
    findByMuscleGroup(muscleGroup: MuscleGroup): Promise<Exercise[]>;
    update(id: string, exercise: Exercise): Promise<Exercise>;
    delete(id: string): Promise<void>;
  }