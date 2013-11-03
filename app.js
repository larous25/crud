var express = require('express');
var app = express();
var rutas = require("./controles/routes");

/*-------------muy sexi barra separadora---------------*/
app.configure(function(){
	app.set('view engine', 'ejs');
	app.set('views', __dirname+'/vistas');
	app.use(express.bodyParser());
	app.use('/static', express.static(__dirname+'/publico'));
});
	
/*-------------muy sexi barra separadora---------------*/

app.get('/', rutas.index);
app.get('/crear',  rutas.crear);
app.get('/leer',rutas.leer);
app.get('/actualizar',  rutas.actualizar);
app.get('/eliminar/:nombre?',rutas.eliminar);

app.post('/crear',rutas.ingrese);

/*-------------muy sexi barra separadora---------------*/
app.listen(process.env.port || 3000);