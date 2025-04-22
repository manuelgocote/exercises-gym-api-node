import mongoose, { Schema } from "mongoose";
import { MuscleGroup } from "../../../domain/entities/exercise.entity";

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  muscleGroup: {
    type: [String],
    enum: Object.values(MuscleGroup),
    required: true
  },
});

export const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);