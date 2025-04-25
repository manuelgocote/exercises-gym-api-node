import { DeleteExercise, ExerciseRepository, MuscleGroup } from "../..";

const mockRepo: jest.Mocked<ExerciseRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByMuscleGroup: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("DeleteExercise", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the exercise if it exists", async () => {
    const useCase = new DeleteExercise(mockRepo);

    const mockId = "123";
    const mockExercise = {
      id: mockId,
      name: "Press Banca",
      description: "Ejercicio de pecho",
      muscleGroup: [MuscleGroup.PECTORAL],
    };

    mockRepo.findById.mockResolvedValue(mockExercise);
    mockRepo.delete.mockResolvedValue();

    await useCase.execute(mockId);

    expect(mockRepo.findById).toHaveBeenCalledWith(mockId);
    expect(mockRepo.delete).toHaveBeenCalledWith(mockId);
  });

  it("should throw an error if the exercise does not exist", async () => {
    const useCase = new DeleteExercise(mockRepo);

    const mockId = "456";
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(mockId)).rejects.toThrow("Exercise not found");
    expect(mockRepo.findById).toHaveBeenCalledWith(mockId);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });

  
});
