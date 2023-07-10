// Importación de módulos necesarios
import { TOKEN_SECRET } from "../config.js"; // Clave secreta para firmar el token JWT
import jwt from 'jsonwebtoken'; // Módulo para crear y verificar tokens JWT

// Función para crear un token JWT con un objeto payload
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    // Creación del token JWT con el objeto payload proporcionado y la clave secreta
    jwt.sign(
      {
        payload,
      },
      TOKEN_SECRET,
      {
        expiresIn: "1d", // Duración del token JWT (1 día)
      },
      (err, token) => {
        // Manejo de errores y resolución de la promesa con el token JWT generado
        if (err) reject(err)
        resolve(token)
      }
    );
  });
}
