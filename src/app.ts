import express from "express";
import authRoutes from "./interfaces/routes/auth.routes";
import exerciseRoutes from "./interfaces/routes/exercise.routes";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/exercises", exerciseRoutes); // Asegúrate de que las rutas de ejercicio estén bien integradas.

export default app;
