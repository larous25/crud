import { Router } from "express";
import mongoose from "mongoose";

import Usuarios from "../modelos/Usuarios.js";

const enrutador = Router();

// Vista principal
enrutador.get("/", async (req, res) => {
  const usuarios = await Usuarios.find();

  res.render("index", {
    usuarios: usuarios.map((u) => u.toObject()),
  });
});

// Obtener todos
enrutador.get("/usuarios", async (req, res) => {
  const usuarios = await Usuarios.find();

  res.json(usuarios);
});

// Obtener uno
enrutador.get("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "ID inválido",
    });
  }

  const usuario = await Usuarios.findById(id);

  if (!usuario) {
    return res.status(404).json({
      error: "Usuario no encontrado",
    });
  }

  res.json(usuario);
});

// Crear
enrutador.post("/usuarios", async (req, res) => {
  const { nombre } = req.body;

  if (!nombre?.trim()) {
    return res.status(400).json({
      error: "El nombre es obligatorio",
    });
  }

  const usuario = await Usuarios.create({
    nombre: nombre.trim(),
  });

  res.status(201).json(usuario);
});

// Actualizar
enrutador.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "ID inválido",
    });
  }

  if (!nombre?.trim()) {
    return res.status(400).json({
      error: "El nombre es obligatorio",
    });
  }

  const usuario = await Usuarios.findByIdAndUpdate(
    id,
    {
      nombre: nombre.trim(),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!usuario) {
    return res.status(404).json({
      error: "Usuario no encontrado",
    });
  }

  res.json(usuario);
});

// Eliminar
enrutador.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "ID inválido",
    });
  }

  const usuario = await Usuarios.findByIdAndDelete(id);

  if (!usuario) {
    return res.status(404).json({
      error: "Usuario no encontrado",
    });
  }

  res.status(204).send();
});

export default enrutador;
