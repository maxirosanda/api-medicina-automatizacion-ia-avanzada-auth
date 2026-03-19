// patientRoutes.js

import express from "express";
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from "../controllers/patientController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/patients", protect, createPatient);
router.get("/patients", protect, getPatients);
router.get("/patients/:id", protect, getPatientById);
router.put("/patients/:id", protect, updatePatient);
router.delete("/patients/:id", protect, deletePatient);

export default router;