// configuraciones principales

global._Proyecto = __dirname;
process.env.ENTORNO = process.env.ENTORNO || 'desarrollo';

/*------------- muy sexi barra separadora ---------------*/

const cors       = require('cors');
const bodyParser = require('body-parser');
const path       = require('path');
const favicon    = require('serve-favicon');
const express    = require('express');
const http       = require('http');

const rutas       = require('./controles/rutas');
const conexion    = require('./configuracion/conexion');
const varServidor = require('./configuracion/montarEntorno')('servidor', process.env.ENTORNO);

const PORT = process.env.PUERTO ? process.env.PUERTO : varServidor.puerto;

/*------------- muy sexi barra separadora ---------------*/

const app        = module.exports = express();
const server = http.createServer(app);

/*------------- muy sexi barra separadora ---------------*/

  /**
   *  directorio de archivos estaticso
   *  motor de renderizacion de vistas
   *  favico 
  **/
app.use('/publicos',express.static(path.join(__dirname , '/estaticos')));  
app.set('view engine', 'ejs');
app.set('views', path.join( __dirname , '/vistas'));
app.use(favicon('./estaticos/favicon.ico'));


  /**
   * Cross-origin resource sharing
   */
app.use(cors({
	origin: '*',
	methods: 'GET, HEAD, PUT, OPTIONS, POST, DELETE',
	preflightContinue: false,
}));

/**
 * Parse json
 */
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(bodyParser.json({limit:'1mb'}));

app.use(rutas);

/*------------- muy sexi barra separadora ---------------*/



/* eventos del servidor */

server.on('listening', () => {
	console.log('\n-----------------------------');
	console.log(`server is runing port:\t ${PORT}`);
	console.log('-----------------------------\n');
});

server.on('request', (req) => {
	console.log(`\n- request:\t ${req.method} \t ${req.url} `);
});


/*------------- muy sexi barra separadora ---------------*/

  /**
   *  Manejos de errores
   */
app.use(function(err, req, res, next) {
	
	if (!err) return next(); 

	if(err.errors)	return res.status(err.status || 500).json(err.message);

	// if(err.code == 11000)		return res.status(500).json('repetido');
	// error de ajax
	if(err.xhr)		return res.status(err.status || 500).json(`error en el ajax ${err.xhr}`);

	res.status(err.status || 500).json(`error en el servidor ${err}`);
	
});


  /**
   *  For No find
   */
app.use(function(req, res){
	res.status(404);
	let msn = 'Not found';

	if (req.accepts('html')) {
		if(app.get('env') === 'production')
			return res.render('404', { url: req.url });
		else 	
			return res.send(`posiblemente no exite la ruta ${req.url} asi que estas apuntando mal`);
	}

	if (req.accepts('json'))	return res.json({'error': msn});

	res.send(msn);
});



/*------------- muy sexi barra separadora ---------------*/

/* comprueba si esta en test o no */
if(!app.parent){

	conexion(process.env.ENTORNO, () => {
		server.listen(PORT);
	});

}

