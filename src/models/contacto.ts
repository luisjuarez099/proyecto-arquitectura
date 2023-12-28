import mongoose, { Schema, model, models } from "mongoose";

//conexion a la base de datos
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}
mongoose.Promise = global.Promise; //usar promesas en mongoose 

//creacion del esquema
const contactoSchema = new Schema({
    Nombre: { type: String, required: true, trim: true, maxlength: 25, minlength: 5 },
    Correo: { type: String, required:[true, "El email es obligatorio"], trim: true, maxlength: 35, minlength: 10, match:[/.+\@.+\..+/, "Por favor ingresa un email valido"] },
    Telefono:{ type: String, required: true, trim: true, max:10},
    Mensaje: { type: String, required: true, trim: true, maxlength: 500, minlength: 5 },
});
// operaciones que se guarda por defecto el usuario
const Contacto = models.Contacto || model('Contacto', contactoSchema); //si ya existe el modelo lo usa, si no lo crea
export default Contacto;