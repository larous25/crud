const variablesConfiguracion = require('./variables')

module.exports = (que, entorno) => {
  let elQue = variablesConfiguracion[que]
  if (!elQue) {
    console.log('no existe configuracion para lo que esta buscando')
    // eslint-disable-next-line no-undef
    proccess.exit(1)
  } else {
    return elQue[entorno]
  }
}
