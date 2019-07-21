
const enrutador = require('express').Router()
const usuarios = require('./usuarios')

enrutador.use('/usuarios', usuarios)

module.exports = enrutador
