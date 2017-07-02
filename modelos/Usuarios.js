let mongoose = require('mongoose');
let Schema =  mongoose.Schema;


let Usuarios = new Schema({
	nombre:{
		type: String,
		required:true
	}
}, {  timestamps: true });

module.exports = mongoose.model('Usuarios' , Usuarios);