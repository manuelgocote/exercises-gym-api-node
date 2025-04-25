// import {
//   GetAllExercises,
//   ExerciseRepository,
//   MuscleGroup,
//   Exercise,
// } from "../..";
import { GetAllExercises } from "../../use-cases/exercise/getAll-exercise.use-case";
import { MuscleGroup, Exercise } from "../../entities/exercise.entity";
import { ExerciseRepository } from "../../repositories/exercise.repository";

const mockRepo: jest.Mocked<ExerciseRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByMuscleGroup: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("GetAllExercises", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // limpiamos entre pruebas
  });
  it("should return all exercises when no muscle group is provided", async () => {
    const useCase = new GetAllExercises(mockRepo);

    const mockExercises: Exercise[] = [
      {
        id: "1",
        name: "Press Banca",
        description: "Ejercicio de pecho",
        muscleGroup: [MuscleGroup.PECTORAL],
      },
      {
        id: "2",
        name: "Sentadillas",
        description: "Ejercicio de piernas",
        muscleGroup: [MuscleGroup.PIERNAS],
      },
    ];

    mockRepo.findAll.mockResolvedValue(mockExercises);

    const result = await useCase.execute();

    expect(result).toEqual(mockExercises);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
    expect(mockRepo.findByMuscleGroup).not.toHaveBeenCalled();
  });

  it("should return filtered exercises when a muscle group is provided", async () => {
    const useCase = new GetAllExercises(mockRepo);

    const filteredExercises: Exercise[] = [
      {
        id: "1",
        name: "Press Banca",
        description: "Ejercicio de pecho",
        muscleGroup: [MuscleGroup.PECTORAL],
      },
    ];

    mockRepo.findByMuscleGroup.mockResolvedValue(filteredExercises);

    const result = await useCase.execute(MuscleGroup.PECTORAL);

    // console.log("Resultado:", result);
    // console.log("Esperado:", filteredExercises);
    // console.log("Mock llamado con:", mockRepo.findByMuscleGroup.mock.calls);

    expect(result).toEqual(filteredExercises);
    expect(mockRepo.findByMuscleGroup).toHaveBeenCalledWith(
      MuscleGroup.PECTORAL
    );
    expect(mockRepo.findAll).not.toHaveBeenCalled();
  });
});
