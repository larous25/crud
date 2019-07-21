// configuraciones principales

process.env.ENTORNO = process.env.ENTORNO || 'desarrollo'

/* ------------- muy sexi barra separadora --------------- */

const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')

const controles = require('./controles')

const configuracion = require('../configuracion')('servidor', process.env.ENTORNO)

/* ------------- muy sexi barra separadora --------------- */

const app = module.exports = express()
const server = http.createServer(app)

/* ------------- muy sexi barra separadora --------------- */

// Cross-origin resource sharing
app.use(helmet())
app.use(cors())

// Parse json a una 1mb =S
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))
app.use(bodyParser.json({ limit: '1mb' }))

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
app.use(function errorHandler (err, req, res, next) {
  console.error('este es de la aplicacion Express', err)
  res.status(err.statusCode || 400).json({
    message: err.message
  })
})

// si no encuentra la url 404
app.use(function (req, res) {
  res.status(404)
  let msn = 'Not found'

  if (req.accepts('json')) {
    return res.json({ 'error': msn })
  }

  res.send(msn)
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
