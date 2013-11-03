var mongoose = require("mongoose");
var Schema =  mongoose.Schema;

// creamos el esquema 
var esqueletoUsuarios = new Schema({
								nombre:String
							});
// creamos un modelo con el nombre y el esquema 
exports.usuarios = mongoose.model("usuarios",esqueletoUsuarios);