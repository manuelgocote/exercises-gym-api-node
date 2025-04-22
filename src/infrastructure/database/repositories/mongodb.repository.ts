import { Exercise, MuscleGroup } from "../../../domain/entities/exercise.entity";
import { ExerciseRepository } from "../../../domain/repositories/exercise.repository";
import { ExerciseModel } from "../models/exercise.model";

export class MongoExerciseRepository implements ExerciseRepository {
    async create(exercise: Exercise): Promise<Exercise> {
      const created = await ExerciseModel.create(exercise);
      return {
        id: created._id.toString(),
        name: created.name,
        description: created.description,
        muscleGroup: created.muscleGroup.map(muscle => muscle as MuscleGroup),
      };
    }
  
    async findAll(): Promise<Exercise[]> {
      const docs = await ExerciseModel.find();
      return docs.map(doc => ({
        id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        muscleGroup: doc.muscleGroup.map(muscle => muscle as MuscleGroup),
      }));
    }
  
    async findById(id: string): Promise<Exercise | null> {
      const doc = await ExerciseModel.findById(id);
      if (!doc) return null;
      return {
        id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        muscleGroup: doc.muscleGroup.map(muscle => muscle as MuscleGroup),
      };
    }

    async findByMuscleGroup(muscleGroup: MuscleGroup): Promise<Exercise[]> {
      const docs = await ExerciseModel.find({ muscleGroup: { $in: [muscleGroup] } });
      return docs.map(doc => ({
        id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        muscleGroup: doc.muscleGroup.map(muscle => muscle as MuscleGroup),
      }));
    }

    async update(id: string, exercise: Exercise): Promise<Exercise> {
      const updated = await ExerciseModel.findByIdAndUpdate(id, exercise, { new: true });
      if (!updated) throw new Error("Exercise not found");
      return {
        id: updated._id.toString(),
        name: updated.name,
        description: updated.description,
        muscleGroup: updated.muscleGroup.map(muscle => muscle as MuscleGroup),
      };
    }

    async delete(id: string): Promise<void> {
      const deleted = await ExerciseModel.findByIdAndDelete(id);
      if (!deleted) throw new Error("Exercise not found");
    
    }
  }
  