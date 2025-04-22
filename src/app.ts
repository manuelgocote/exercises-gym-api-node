import express from "express";
import { connectToMongo } from "./config/mongodb";
import exerciseRoutes from "./interfaces/routes/exercise.routes";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Rutas
app.use("/exercises", exerciseRoutes);

// Conectar a Mongo y levantar servidor
connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
