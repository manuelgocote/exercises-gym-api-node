import app from "./app";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI || "mongodb://localhost:27017/gymdb")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });


