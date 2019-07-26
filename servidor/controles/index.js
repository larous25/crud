
const enrutador = require('express').Router()
const usuarios = require('./usuarios')

enrutador.get('/', (req, res) => {
  res.send('api on')
})
enrutador.use('/usuarios', usuarios)

module.exports = enrutador
