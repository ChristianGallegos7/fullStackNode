// Importación de módulos necesarios
import User from "../models/user.model.js"; // Modelo de usuario
import bcrypt from "bcryptjs"; // Módulo para encriptar contraseñas
import { createAccessToken } from "../libs/jwt.js"; // Función para crear tokens JWT

// Controlador para registrar un nuevo usuario
export const register = async (req, res) => {
  {
    const { email, password, username } = req.body;

    try {
      // Encriptación de la contraseña
      const passwordHash = await bcrypt.hash(password, 10);

      // Creación de un nuevo usuario con los datos proporcionados
      const newUser = new User({
        username,
        email,
        password: passwordHash,
      });

      // Guardado del nuevo usuario en la base de datos
      const userSaved = await newUser.save();

      // Creación de un token JWT para el nuevo usuario
      const token = await createAccessToken({
        id: userSaved._id,
      });

      // Almacenamiento del token en una cookie de respuesta HTTP
      res.cookie("token", token);

      // Envío de la información del nuevo usuario como respuesta HTTP
      res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: newUser.createdAt,
        updateAt: userSaved.updatedAt,
      });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({
        message: error.message,
      });
    }
  }
};

// Controlador para iniciar sesión en un usuario existente
export const login = async (req, res) => {
  {
    const { email, password } = req.body;

    try {
      // Búsqueda del usuario en la base de datos por su correo electrónico
      const userFound = await User.findOne({ email });

      // Verificación de que el usuario existe
      if (!userFound)
        return res.status(400).json({
          message: "User not found",
        });

      // Verificación de que la contraseña es correcta
      const isMatch = await bcrypt.compare(password, userFound.password);

      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect credentials",
        });

      // Creación de un token JWT para el usuario encontrado
      const token = await createAccessToken({
        id: userFound._id,
      });

      // Almacenamiento del token en una cookie de respuesta HTTP
      res.cookie("token", token);

      // Envío de la información del usuario encontrado como respuesta HTTP
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: newUser.createdAt,
        updateAt: userFound.updatedAt,
      });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({
        message: error.message,
      });
    }
  }
};

// Controlador para cerrar sesión en un usuario existente
export const logout = (req, res) => {
  // Eliminación del token almacenado en la cookie de respuesta HTTP
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.status(200);
};

// Controlador para obtener el perfil de un usuario existente
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({
      message: "User not found",
    });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
