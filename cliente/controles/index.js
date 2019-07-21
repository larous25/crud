
const enrutador = require('express').Router()
const { usuarios: Usuarios } = require('basededatos')

enrutador.get('/', async function raiz (req, res, next) {
  try {
    let data = await Usuarios.find()
    let usuarios = data.map(u => u.toObject())
    res.render('index', { usuarios })
  } catch (error) {
    next(error)
  }
})

module.exports = enrutador
