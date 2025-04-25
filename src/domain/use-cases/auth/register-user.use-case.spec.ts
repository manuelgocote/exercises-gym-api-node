import bcrypt from "bcryptjs";
import { RegisterUser, UserRepository, User } from "../..";

const mockRepo: jest.Mocked<UserRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
};

describe("RegisterUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user when email is unique", async () => {
    const useCase = new RegisterUser(mockRepo);

    const userInput = {
      username: "lolo",
      email: "lolo@example.com",
      password: "secret",
      role: "admin" as const,
    };

    mockRepo.findByEmail.mockResolvedValue(null);

    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    const createdUser: User = {
      ...userInput,
      id: "1",
      password: hashedPassword,
    };

    mockRepo.create.mockResolvedValue(createdUser);

    const result = await useCase.execute(userInput);

    expect(result).toEqual(createdUser);
    expect(mockRepo.findByEmail).toHaveBeenCalledWith(userInput.email);
    expect(mockRepo.create).toHaveBeenCalledWith({
      ...userInput,
      password: expect.any(String),
    });
    expect(await bcrypt.compare(userInput.password, result.password)).toBe(
      true
    );
  });

  it("should throw an error if email already exists", async () => {
    const useCase = new RegisterUser(mockRepo);

    const userInput = {
      username: "lolo",
      email: "lolo@example.com",
      password: "secret",
      role: "user" as const,
    };

    mockRepo.findByEmail.mockResolvedValue({
      ...userInput,
      id: "1",
    });

    await expect(useCase.execute(userInput)).rejects.toThrow(
      "Username already exists"
    );
    expect(mockRepo.findByEmail).toHaveBeenCalledWith(userInput.email);
    expect(mockRepo.create).not.toHaveBeenCalled();
  });
});
