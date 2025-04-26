const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Ejercicios de Gimnasio",
    version: "1.0.0",
    description:
      "Documentación de la API para la gestión de ejercicios y usuarios.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  components: {
    schemas: {
      Exercise: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          muscleGroup: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "pectoral",
                "biceps",
                "triceps",
                "hombro",
                "espalda",
                "piernas",
                "abdomen",
                "gluteos",
                "gemelos",
              ],
            },
          },
        },
        required: ["name", "description", "muscleGroup"],
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          username: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" },
          role: {
            type: "string",
            enum: ["user", "admin"],
          },
        },
        required: ["username", "email", "password", "role"],
      },
      LoginRequest: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" },
        },
        required: ["email", "password"],
      },
      LoginResponse: {
        type: "object",
        properties: {
          token: { type: "string" },
        },
      },
    
  },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

export const swaggerOptions = {
  swaggerDefinition,
  apis: ["src/interfaces/routes/**/*.ts"], // <- donde están tus JSDoc (puede cambiar según estructura)
};
