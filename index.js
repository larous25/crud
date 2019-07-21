const express = require('express')

const cliente = require('./cliente')
const servidor = require('./servidor')

const app = express()

app.use('/', cliente)
app.use(servidor)

app.listen(8080)
