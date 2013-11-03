var mongoose = require("mongoose");
exports.conexion = function () {
	var conexion = mongoose.connect('mongodb://localhost/nueva');
	var Schema   = mongoose.Schema();
	
}