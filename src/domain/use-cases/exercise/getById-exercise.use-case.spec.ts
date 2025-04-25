import {
  GetExerciseById,
  Exercise,
  ExerciseRepository,
  MuscleGroup,
} from "../..";

const mockRepo: jest.Mocked<ExerciseRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByMuscleGroup: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("GetExerciseById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an exercise when it exists", async () => {
    const useCase = new GetExerciseById(mockRepo);

    const exercise: Exercise = {
      id: "1",
      name: "Sentadilla",
      description: "Ejercicio para piernas",
      muscleGroup: [MuscleGroup.PIERNAS],
    };

    mockRepo.findById.mockResolvedValue(exercise);

    const result = await useCase.execute("1");

    expect(result).toEqual(exercise);
    expect(mockRepo.findById).toHaveBeenCalledWith("1");
  });

  it("should return null when exercise does not exist", async () => {
    const useCase = new GetExerciseById(mockRepo);

    mockRepo.findById.mockResolvedValue(null);

    const result = await useCase.execute("nonexistent-id");

    expect(result).toBeNull();
    expect(mockRepo.findById).toHaveBeenCalledWith("nonexistent-id");
  });
});
