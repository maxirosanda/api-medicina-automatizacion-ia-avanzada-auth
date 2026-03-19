// patientController.js

import Patient from "../models/Patient.js";
import mongoose from "mongoose";

/**
 * Validar email
 */
const isValidEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

/**
 * Crear paciente
 */
export const createPatient = async (req, res) => {
  const { name, age, email, diagnosis } = req.body;

  // Validaciones
  if (!name || !age || !email) {
    return res.status(400).json({
      message: "Faltan campos obligatorios",
      requiredFields: ["name", "age", "email"]
    });
  }

  if (typeof name !== "string") {
    return res.status(400).json({
      message: "El nombre debe ser un string"
    });
  }

  if (typeof age !== "number" || age < 0) {
    return res.status(400).json({
      message: "La edad debe ser un número positivo"
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: "Formato de email inválido"
    });
  }

  try {
    const patient = new Patient({
      name,
      age,
      email,
      diagnosis
    });

    const savedPatient = await patient.save();

    res.status(201).json(savedPatient);

  } catch (error) {

    if (error.code === 11000) {
      return res.status(409).json({
        message: "El email ya existe"
      });
    }

    res.status(500).json({
      message: "Error interno al crear paciente",
      error: error.message
    });
  }
};

/**
 * Obtener todos los pacientes
 */
export const getPatients = async (req, res) => {
  try {

    const patients = await Patient.find();

    res.status(200).json({
      count: patients.length,
      data: patients
    });

  } catch (error) {

    res.status(500).json({
      message: "Error obteniendo pacientes",
      error: error.message
    });

  }
};

/**
 * Obtener paciente por ID
 */
export const getPatientById = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "ID de paciente inválido"
    });
  }

  try {

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({
        message: "Paciente no encontrado"
      });
    }

    res.status(200).json(patient);

  } catch (error) {

    res.status(500).json({
      message: "Error buscando paciente",
      error: error.message
    });

  }
};

/**
 * Actualizar paciente
 */
export const updatePatient = async (req, res) => {

  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "ID de paciente inválido"
    });
  }

  const allowedFields = ["name", "age", "email", "diagnosis"];

  const receivedFields = Object.keys(updates);

  const invalidFields = receivedFields.filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      message: "Campos no permitidos para actualizar",
      invalidFields
    });
  }

  if (updates.email && !isValidEmail(updates.email)) {
    return res.status(400).json({
      message: "Formato de email inválido"
    });
  }

  if (updates.age && (typeof updates.age !== "number" || updates.age < 0)) {
    return res.status(400).json({
      message: "Edad inválida"
    });
  }

  try {

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({
        message: "Paciente no encontrado"
      });
    }

    res.status(200).json(updatedPatient);

  } catch (error) {

    res.status(500).json({
      message: "Error actualizando paciente",
      error: error.message
    });

  }
};

/**
 * Eliminar paciente
 */
export const deletePatient = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "ID de paciente inválido"
    });
  }

  try {

    const deleted = await Patient.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Paciente no encontrado"
      });
    }

    res.status(200).json({
      message: "Paciente eliminado correctamente",
      patientId: id
    });

  } catch (error) {

    res.status(500).json({
      message: "Error eliminando paciente",
      error: error.message
    });

  }
};