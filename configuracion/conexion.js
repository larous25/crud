const mongoose = require('mongoose')
const configuracion = require('./montarEntorno')

/**
 * crea la conexion a mongo
 * @param  { String }   entorno
 * @param  { Function } llamadaDeRegreso
 *  */
module.exports = (entorno = '', llamadaDeRegreso) => {
  mongoose.Promise = global.Promise
  let varMongo = configuracion('mongo', entorno)
  let url = `mongodb://${varMongo.dominio}/${varMongo.nombre}`

  let p = mongoose.connect(url, { useMongoClient: true })

  p.then(() => {
    console.log('\nconexion a mongo fue abierta correctamente')
    llamadaDeRegreso()
  })
    .catch(error => {
      console.error('error en mongo: ', error)
      process.exit(1)
    })
}
