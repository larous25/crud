const mongoose = require('mongoose')
const configuracion = require('../configuracion')

const usuarios = require('./usuarios')

mongoose.Promise = global.Promise
let entorno = configuracion('mongo', process.env.ENTORNO)
let url = `mongodb://${entorno.dominio}/${entorno.nombre}`

mongoose.connect(url, { useNewUrlParser: true })

mongoose.connection
  .on('error', error => {
    console.error('error en mongo: ', error)
    process.exit(1)
  })
  .on('open', () => {
    console.log('\nconexion a mongo fue abierta correctamente')
  })

module.exports = {
  usuarios
}
