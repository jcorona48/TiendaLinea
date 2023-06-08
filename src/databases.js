import mongoose from "mongoose";
console.log("Intento de conexion")
mongoose.connect("mongodb://127.0.0.1:27017/TiendaWeb")
    .then(db => console.log("Conectado exitosamente"))
    .catch(error => console.log(error))