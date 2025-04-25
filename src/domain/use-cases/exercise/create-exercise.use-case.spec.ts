import { CreateExercise, ExerciseRepository, MuscleGroup } from "../..";

const mockRepo: jest.Mocked<ExerciseRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByMuscleGroup: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("CreateExercise", () => {
  it("should create an exercise when valid muscle groups are provided", async () => {
    const useCase = new CreateExercise(mockRepo);

    const exercise = {
      name: "Press Banca",
      description: "Ejercicio de pecho",
      muscleGroup: [MuscleGroup.PECTORAL],
    };

    mockRepo.create.mockResolvedValue({ ...exercise, id: "1" });

    const result = await useCase.execute(exercise);

    expect(result).toEqual({ ...exercise, id: "1" });
    expect(mockRepo.create).toHaveBeenCalledWith(exercise);
  });

  it("should throw an error for invalid muscle groups", async () => {
    const useCase = new CreateExercise(mockRepo);

    const invalidExercise = {
      name: "Ejercicio raro",
      description: "No existe",
      muscleGroup: ["nalgas"] as any, // esto fuerza un tipo incorrecto
    };

    await expect(useCase.execute(invalidExercise)).rejects.toThrow(
      "Invalid muscle group(s) provided."
    );
  });

  it("should throw an error for empty muscle groups", async () => {
    const useCase = new CreateExercise(mockRepo);

    const invalidExercise = {
      name: "Ejercicio sin musculos",
      description: "No tiene musculos",
      muscleGroup: [],
    };

    await expect(useCase.execute(invalidExercise)).rejects.toThrow(
      "Muscle group is required."
    );
  });
});