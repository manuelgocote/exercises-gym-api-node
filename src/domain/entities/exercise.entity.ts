export interface Exercise {
    id?: string; // opcional porque Mongo lo genera
    name: string;
    description: string;
    muscleGroup: MuscleGroup[];
  }

export enum MuscleGroup {
    PECTORAL = "pectoral",
    BICEPS = "biceps",
    TRICEPS = "triceps",
    HOMBRO = "hombro",
    ESPALDA = "espalda",
    PIERNAS = "piernas",
    ABDOMEN = "abdomen",
    GLUTEOS = "gluteos",
    GEMELOS = "gemelos",
  }