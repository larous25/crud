let mongoose = require('mongoose');
let Schema =  mongoose.Schema;


module.exports = mongoose.model('Usuarios' ,  new Schema({
	nombre:{
		type: String,
		required:true
	}
}, {  timestamps: true }));