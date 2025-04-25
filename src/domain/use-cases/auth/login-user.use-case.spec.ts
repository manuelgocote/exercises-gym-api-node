
import { LoginUser, User, UserRepository } from "../..";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mocks
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const mockRepo: jest.Mocked<UserRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
};

describe("LoginUser", () => {
  const user: User = {
    id: "123",
    username: "lolo",
    email: "lolo@example.com",
    password: "hashedPassword",
    role: "admin",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a JWT when credentials are valid", async () => {
    const useCase = new LoginUser(mockRepo);

    mockRepo.findByEmail.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mocked-jwt");

    const result = await useCase.execute(user.email, "plainPassword");

    expect(mockRepo.findByEmail).toHaveBeenCalledWith(user.email);
    expect(bcrypt.compare).toHaveBeenCalledWith("plainPassword", user.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    expect(result).toBe("mocked-jwt");
  });

  it("should throw an error when email is not found", async () => {
    const useCase = new LoginUser(mockRepo);

    mockRepo.findByEmail.mockResolvedValue(null);

    await expect(useCase.execute("notfound@example.com", "pass")).rejects.toThrow("Invalid credentials");
  });

  it("should throw an error when password is incorrect", async () => {
    const useCase = new LoginUser(mockRepo);

    mockRepo.findByEmail.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(useCase.execute(user.email, "wrongpass")).rejects.toThrow("Invalid credentials");
  });
});
