const mongoose = require('mongoose');
const configuracion = require('./montarEntorno');


/**
 * crea la conexion a mongo
 * @param  { string }   entorno   
 * @param  { Function } llamadaDeRegreso 
 *  */
module.exports = (entorno, llamadaDeRegreso) => {
	mongoose.Promise = global.Promise;
	let varMongo = configuracion('mongo' ,entorno);
	let url = `mongodb://${varMongo.dominio}/${varMongo.nombre}`;
	mongoose.connect(url, (err) => {
		if (err) {
			console.error('MONGODB connection error:');
			proccess.exit(1);
		}

		console.log('conexion a mongo fue abierta correctamente');
		llamadaDeRegreso();
	});



};



