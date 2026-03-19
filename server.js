// server.js

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api", authRoutes);
app.use("/api/auth", authRoutes);

/**
 * Ruta de prueba
 */
app.get("/", (req, res) => {
  res.send("API de pacientes funcionando");
});

/**
 * Middleware de errores global
 */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Error interno del servidor"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});