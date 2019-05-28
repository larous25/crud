let mongoose = require('mongoose')
let Schema = mongoose.Schema

let usuarios = new Schema({
  nombre: {
    type: String,
    required: true
  }
}, { timestamps: true })

if (!usuarios.options.toObject) {
  usuarios.options.toObject = {}
}

usuarios.options.toObject.transform = (doc, usuario, options) => {
  let idString = usuario._id.toString()
  let longitud = idString.length
  usuario.idShort = idString.substring((longitud - 5), longitud)
  return usuario
}


module.exports = mongoose.model('Usuarios', usuarios)