
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
  let query = {
    $or: [{}]
  }
  query.$or.concat(Object.keys(req.query).filter(element => {
    if (element) return { element }
  }))

  try {
    res.json(await Usuarios.find(query).exec())
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

enrutador.put('/usuarios', async function borrarUsuario (req, res, next) {
  let { _id } = req.query
  let { nombre } = req.body
  try {
    let usuario = await Usuarios.updateOne({ _id }, { nombre })
    res.status(200).json(usuario)
  } catch (error) {
    next(error)
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
