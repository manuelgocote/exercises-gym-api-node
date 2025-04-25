import { UpdateExercise, Exercise, ExerciseRepository, MuscleGroup } from "../..";

const mockRepo: jest.Mocked<ExerciseRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByMuscleGroup: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("UpdateExercise", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the exercise if it exists and muscleGroup is valid", async () => {
    const useCase = new UpdateExercise(mockRepo);

    const id = "1";
    const existingExercise: Exercise = {
      id,
      name: "Curl Biceps",
      description: "Ejercicio de brazo",
      muscleGroup: [MuscleGroup.BICEPS],
    };

    const updateData = {
      name: "Curl de Bíceps Alternado",
      muscleGroup: [MuscleGroup.BICEPS],
    };

    const updatedExercise = {
      ...existingExercise,
      ...updateData,
    };

    mockRepo.findById.mockResolvedValue(existingExercise);
    mockRepo.update.mockResolvedValue(updatedExercise);

    const result = await useCase.execute(id, updateData);

    expect(result).toEqual(updatedExercise);
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.update).toHaveBeenCalledWith(id, updatedExercise);
  });

  it("should throw an error if exercise does not exist", async () => {
    const useCase = new UpdateExercise(mockRepo);
    const id = "nonexistent";
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(id, { name: "Nuevo nombre" })).rejects.toThrow(
      "Exercise not found"
    );

    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.update).not.toHaveBeenCalled();
  });

  it("should throw an error if muscleGroup is invalid", async () => {
    const useCase = new UpdateExercise(mockRepo);
    const id = "1";
    const existingExercise: Exercise = {
      id,
      name: "Press Hombro",
      description: "Ejercicio de hombro",
      muscleGroup: [MuscleGroup.HOMBRO],
    };

    mockRepo.findById.mockResolvedValue(existingExercise);

    const invalidUpdate = {
      muscleGroup: ["nariz"] as any,
    };

    await expect(useCase.execute(id, invalidUpdate)).rejects.toThrow(
      "Invalid muscle group(s) provided."
    );

    expect(mockRepo.findById).not.toHaveBeenCalled();
    expect(mockRepo.update).not.toHaveBeenCalled();
  });
});
