/* eslint-disable no-undef */

// objetos Dom
let btnMostar = document.querySelector('button#mostrar')
let btnFormulario = document.querySelector('button#formulario')
let btnsEliminar = document.querySelectorAll('.idEliminar')
let btnsActualizar = document.querySelectorAll('.idActualizar')
let formCrear = document.querySelector('form#crear')
let temUsuario = document.querySelector('#nuevoUsuarioTemplate')

// eventos
btnMostar.addEventListener('click', listarUsuarios)
btnFormulario.addEventListener('click', () => {
  formCrear.classList.toggle('hide')
})
formCrear.addEventListener('submit', crearUsuario)
btnsEliminar.forEach(b => {
  b.addEventListener('click', eliminarUsuario, false)
})
btnsActualizar.forEach(b => {
  b.addEventListener('click', actualizarUsuario, false)
})

// ajax eventos

function crearUsuario (evento) {
  evento.preventDefault()

  let nuevoUsuario = {
    'nombre': evento.target[0].value
  }

  ajax('/usuarios', {
    method: 'POST',
    body: JSON.stringify(nuevoUsuario)
  })
    .then(res => {
      if (res.status !== 201) {
        return res.json().then(error)
      }

      return res.json().then(data => pintar(data))
    })
    .catch(error)
}

function eliminarUsuario (evento) {
  let _id = evento.target.getAttribute('idAttr')
  let url = `/usuarios?_id=${_id}`
  let opcion = confirm('Esta seguro que desea eliminar?')
  if (opcion) {
    ajax(url, { method: 'DELETE' })
      .then(res => {
        if (res.status !== 200) {
          return res.json().then(error)
        }

        return res.json()
          .then(data => {
            let nodo = document.querySelector(`#usuario-${cortarCadena(_id)}`)
            nodo.parentNode.removeChild(nodo)
          })
      }).catch(error)
  }
}

function actualizarUsuario (evento) {
  let _id = evento.target.getAttribute('idAttr')
  let url = `/usuarios?_id=${_id}`

  let input = document.querySelector(`#usuario-${cortarCadena(_id)} input.nombre`)

  let nuevoUsuario = {
    'nombre': input.value
  }

  if (!nuevoUsuario.nombre) {
    return alert('No puede actulizar un nomber vacio')
  }

  ajax(url, {
    method: 'PUT',
    body: JSON.stringify(nuevoUsuario)
  })
    .then(res => {
      if (res.status !== 200) {
        return res.json().then(error)
      }

      return res.json()
        .then(data => {
          alert(data.ok ? 'actualizado' : 'algo paso')
        })
    }).catch(error)
}

function listarUsuarios () {
  let url = `/usuarios`

  let usuariosDivContainer = document.querySelector('#usuarios')
  let usuariosDivs = document.querySelectorAll('.usuario')

  ajax(url, { method: 'GET' })
    .then(res => {
      if (res.status !== 200) {
        return res.json().then(error)
      }

      return res.json()
        .then(data => {
          if (usuariosDivs.length) {
            usuariosDivs.forEach(n => usuariosDivContainer.removeChild(n))
          }
          data.forEach(usuario => pintar(usuario))
        })
    }).catch(error)
}

// funciones de ayuda

function pintar (usuario) {
  let divUsuario = temUsuario.content.querySelector('.usuario')
  let divId = temUsuario.content.querySelector('.id')
  let inputNombre = temUsuario.content.querySelector('.nombre')
  let btnElimiar = temUsuario.content.querySelector('.idEliminar')
  let btnActualizar = temUsuario.content.querySelector('.idActualizar')

  divId.textContent = usuario._id
  inputNombre.value = usuario.nombre
  divUsuario.setAttribute('id', `usuario-${cortarCadena(usuario._id)}`)
  btnElimiar.setAttribute('idAttr', usuario._id)
  btnActualizar.setAttribute('idAttr', usuario._id)
  document.getElementById('usuarios').appendChild(temUsuario.content.cloneNode(true))
  document.querySelector(`.idEliminar[idAttr="${usuario._id}"]`).addEventListener('click', eliminarUsuario, false)
  document.querySelector(`.idActualizar[idAttr="${usuario._id}"]`).addEventListener('click', actualizarUsuario, false)
}

/**
 *
 *
 * @param {*} url la direcion a la cual queremo hacer peticion
 * @param {*} [options={}]
 * @returns promise
 */
function ajax (url, options = {}) {
  let optionsAjax = {
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default'
  }

  if (options) {
    Object.keys(options).forEach(option => {
      optionsAjax[option] = options[option]
    })
  }

  return fetch(url, optionsAjax)
}

/**
 * @param {*} cadena 
 * @returns otra cadena pero mas chiquitita
 */
function cortarCadena (cadena) {
  return cadena.substring((cadena.length - 5), cadena.length)
}

// solo saca un alerta con la info que pasemos
function error (data) {
  alert(data)
}

window.onerror = function (msg) {
  error(msg)
}
