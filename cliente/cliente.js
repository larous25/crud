
process.env.ENTORNO = process.env.ENTORNO || 'desarrollo'

/* ------------- muy sexi barra separadora --------------- */

const path = require('path')
const favicon = require('serve-favicon')
const express = require('express')
const http = require('http')

const configuracion = require('../configuracion')('cliente', process.env.ENTORNO)

const controles = require('./controles')

/* ------------- muy sexi barra separadora --------------- */

const app = module.exports = express()
const server = http.createServer(app)

/* ------------- muy sexi barra separadora --------------- */

/*
directorio de archivos estaticso
motor de renderizacion de vistas
favicon
*/
app.locals.title = configuracion.nombre
app.use('/publicos', express.static(path.join(__dirname, '/estaticos')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/vistas'))
app.use(favicon(path.join(__dirname, '/estaticos/favicon.ico')))

app.use(controles)

/* eventos del servidor */
server.on('listening', () => {
  console.log(`server is runing port:\t ${configuracion.puerto}`)
  console.log(`http://127.0.0.1:${configuracion.puerto}`)
})

server.on('request', (req) => {
  console.log(` - request:\t ${req.method} \t ${req.url} `)
})

/* ------------- muy sexi barra separadora --------------- */

//  Manejos de errores
app.use(function manejadorDeErrores (err, req, res, next) {
  console.error('este es de la aplicacion Express', err)
  res.status(err.statusCode || 400).json({
    message: err.message
  })
})

// si no encuentra la url 404
app.use(function respuestaNoEncontrada (req, res) {
  res.status(404)
  if (req.accepts('html')) {
    if (process.env.ENTORNO === 'production') {
      return res.render('404', { url: req.url })
    } else {
      return res.send(`posiblemente no exite la ruta ${req.url} asi que estas apuntando mal`)
    }
  }
})

// por si todo falla
process
  .on('uncaughtException', err => {
    console.error('fatal error en:  ', err)
    process.exit(1)
  })
  .on('unhandledRejection', (err, p) => {
    console.error(`a ocurrido en la funcion ${p} el siguiente error: `, err.message)
    process.exit(1)
  })

// inicio
if (!module.parent) {
  server.listen(configuracion.puerto)
}
