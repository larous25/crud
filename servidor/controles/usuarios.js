
const enrutador = require('express').Router()
const { usuarios: Usuarios } = require('basededatos')

enrutador.get('/', async function llamarUsuarios (req, res, next) {
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

enrutador.delete('/', async function borrarUsuario (req, res, next) {
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

enrutador.put('/', async function borrarUsuario (req, res, next) {
  let { _id } = req.query
  let { nombre } = req.body
  try {
    let usuario = await Usuarios.updateOne({ _id }, { nombre })
    res.status(200).json(usuario)
  } catch (error) {
    next(error)
  }
})

enrutador.post('/', async function nuevoUuario (req, res, next) {
  let { nombre } = req.body
  try {
    let usuario = await new Usuarios({ nombre }).save()
    res.status(201).json(usuario)
  } catch (error) {
    next(error)
  }
})

module.exports = enrutador
