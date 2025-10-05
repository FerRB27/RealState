const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const login = async (req, res) => {
  try {
    const { nombre, contraseña } = req.body;
    const usuario = await Usuario.findOne({ nombre });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) {
      return res.status(400).json({ mensaje: "Credenciales incorrectas" });
    }
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      "claveSecreta",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al iniciar sesión",
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { nombre, contraseña, rol } = req.body;
    const usuarioExistente = await Usuario.findOne({ nombre });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }
    const nuevoUsuario = new Usuario({ nombre, contraseña, rol });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al registrar usuario",
      error: error.message,
    });
  }
};

module.exports = { login, register };
