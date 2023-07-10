// Importación de módulos necesarios
import mongoose from "mongoose"; // Módulo para conectarse y trabajar con MongoDB

// Definición del esquema de usuario utilizando el módulo mongoose
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true, // El campo es obligatorio
        trim: true // Se eliminan los espacios en blanco al principio y al final del valor
    },
    email:{
        type: String,
        require: true, // El campo es obligatorio
        trim: true, // Se eliminan los espacios en blanco al principio y al final del valor
        unique: true // El valor debe ser único en la colección
    },
    password:{
        type: String,
        require: true, // El campo es obligatorio
    }
}, {
    timestamps:true // Se agregan campos de fecha de creación y actualización automáticos
})

// Creación del modelo de usuario utilizando el esquema definido anteriormente
export default mongoose.model("User", userSchema);
