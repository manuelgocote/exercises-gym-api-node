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
