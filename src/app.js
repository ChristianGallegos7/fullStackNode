// Importación de módulos necesarios
import express from "express"; // Framework para aplicaciones web en Node.js
import morgan from "morgan"; // Middleware para registrar solicitudes HTTP en la consola
import cookieParser from "cookie-parser"; // Middleware para analizar cookies
import authRoutes from "./routes/auth.routes.js"; // Rutas de autenticación

// Creación de la instancia de la aplicación express
const app = express();

// Middleware para registrar solicitudes HTTP en la consola en modo de desarrollo
app.use(morgan("dev"));

// Middleware para analizar datos enviados en solicitudes HTTP con formato JSON
app.use(express.json());

// Middleware para analizar cookies
app.use(cookieParser());

// Definición de las rutas de autenticación bajo la ruta '/api'
app.use('/api', authRoutes);

// Exportación de la aplicación express
export default app;
