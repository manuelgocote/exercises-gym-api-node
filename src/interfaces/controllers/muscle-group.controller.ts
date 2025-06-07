import { Request, Response } from 'express';
import { MuscleGroup } from '../../domain/entities/exercise.entity';

export const getMuscleGroups = (_req: Request, res: Response) => {
  const muscleGroups = Object.values(MuscleGroup);
  res.status(200).json({ muscleGroups });
};
