// Patient.js

import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"]
    },
    age: {
      type: Number,
      required: [true, "La edad es obligatoria"],
      min: 0
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true
    },
    diagnosis: {
      type: String,
      default: "Sin diagnóstico"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Patient", patientSchema);