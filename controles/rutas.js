
const enrutador = require('express').Router();
const Usuarios = require('../modelos/Usuarios');

enrutador.get('/', (req, res, next) => {
	Usuarios.find((err, datos) => {
		if (err) return next(err);

		res.render('index', {usuarios: datos});
		
	});
});

enrutador.get('/usuarios', (req, res, next) => {

	Usuarios.find({ $or :	[
		{},
		{_id: req.query.id }, 
		{nombre: req.query.nombre }
	]}, (err, datos) => {
		if (err) return next(err);

		res.json(datos);
	});
});


enrutador.delete('/usuarios', (req, res, next) => {
	Usuarios.remove({ $or :	[
		{_id: req.query.id }, 
		{nombre: req.query.nombre }
	]}, err => {  
		if (err) return next(err);
		res.status(200).json('ok');
	});
});

enrutador.post('/usuarios', (req, res, next) => { 
	new Usuarios({ nombre: req.body.nombre })
		.save((err, usuario) => { 
			if (err) return next(err);

			res.status(201).json(usuario);
		});
});

module.exports = enrutador;
