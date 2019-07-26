const express = require('express')

const cliente = require('cliente')
const servidor = require('servidor')

const app = express()

app.use('/api', servidor)
app.use('/', cliente)


app.listen(8080)
