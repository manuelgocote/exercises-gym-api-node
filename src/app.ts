import express from "express";
import cors from 'cors';
import authRoutes from "./interfaces/routes/auth.routes";
import exerciseRoutes from "./interfaces/routes/exercise.routes";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swagger/swagger.config";



const app = express();
app.use(cors());
app.use(express.json());

// Swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));


app.use("/auth", authRoutes);
app.use("/exercises", exerciseRoutes); // Asegúrate de que las rutas de ejercicio estén bien integradas.

export default app;
