
const enrutador = require('express').Router()
const Usuarios = require('../modelos/Usuarios')

enrutador.get('/', async function buscarUsuarios (req, res, next) {
  try {
    let data = await Usuarios.find()
    let usuarios = data.map(u => u.toObject())
    res.render('index', { usuarios })
  } catch (error) {
    next(error)
  }
})

enrutador.get('/usuarios', async function llamarUsuarios (req, res, next) {
  let { id, nombre } = req.query
  let query = {
    $or: [
      {},
      { id },
      { nombre }
    ]
  }

  try {
    let datos = await Usuarios.find(query).exec()
    res.json(datos)
  } catch (error) {
    next(error)
  }
})

enrutador.delete('/usuarios', async function borrarUsuario (req, res, next) {
  let { _id, nombre } = req.query
  try {
    let query = {
      $or: [{ _id }, { nombre }]
    }

    await Usuarios.remove(query)
    res.status(200).json('ok')
  } catch (error) {

  }
})

enrutador.post('/usuarios', async function nuevoUuario (req, res, next) {
  let { nombre } = req.body
  try {
    let usuario = await new Usuarios({ nombre }).save()
    res.status(201).json(usuario)
  } catch (error) {
    next(error)
  }
})

module.exports = enrutador
