// Importación de módulos necesarios
import { Router } from "express"; // Módulo para crear un objeto router de Express
import { 
    login,
    register,
    logout,
    profile 
} from "../controllers/auth.controller.js"; // Controladores de autenticación
import { authRequired } from "../middlewares/validateToken.js"; // Middleware para validar tokens JWT
const router = Router();

// Definición de las rutas de autenticación
router.post('/register', register) // Ruta para registrar un nuevo usuario
router.post('/login',login) // Ruta para iniciar sesión en un usuario existente
router.post('/logout',logout) // Ruta para cerrar sesión en un usuario autenticado
router.get('/profile',authRequired,profile ) // Ruta para obtener el perfil de un usuario autenticado

// Exportación del objeto router con las rutas definidas
export default router;
