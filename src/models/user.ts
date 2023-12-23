import mongoose, { Schema, model, models } from "mongoose";

//conexion a la base de datos
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}
mongoose.Promise = global.Promise; //usar promesas en mongoose 

//creacion del esquema
const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:[true, "El username es obligatorio"],
        minLength:[4, "El username debe tener al menos 4 caracteres"],
        maxLength:[30, "El username debe tener menos de 16 caracteres"]
    },
    email:{
        type:String,
        unique:true,
        required:[true, "El email es obligatorio"],
        match:[/.+\@.+\..+/, "Por favor ingresa un email valido"]
    },


    password:{
        type:String,
        required:[true, "El password es obligatorio"],
        select:false
    },

});
// operaciones que se guarda por defecto el usuario
const User = mongoose.models.user || mongoose.model('User', userSchema); //si ya existe el modelo lo usa, si no lo crea
export default User;