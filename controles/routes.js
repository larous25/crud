var ingresar = require("../modelos/ingresarUsuario");
var conec = require("../modelos/conec");
conec.conexion();

exports.index = function(req,res){
	res.render("index");
}

exports.crear = function(req,res){
	res.render("crear");
}

exports.leer = function(req,res,next){
	ingresar.usuarios.find({},function(err,data){
		if(err){
			return next(err);
		}
		res.render("leer",{datos:data});
	});
}

exports.actualizar = function(req,res){
	res.render("actualizar");
}

exports.eliminar = function(req,res){
	res.render("eliminar");
	ingresar.usuarios.find({nombre:req.params.nombre}).remove(function(err){
		if(err){res.send(err);}else{res.send("ok");}
	});
}

exports.ingrese = function(req,res){
	var UsuarioNuevo = new ingresar.usuarios({nombre:req.body.nombre});
	UsuarioNuevo.save(function(err){
		if(err){
			console.log(err);
		}
	});
}