
// objetos Dom
let btnFormulario = document.querySelector('button#formulario')
let btnsEliminar = document.querySelectorAll('.idEliminar')
let formCrear = document.querySelector('form#crear')
let temUsuario = document.querySelector('#nuevoUsuarioTemplate')

// eventos
btnFormulario.addEventListener('click', () => {
  formCrear.classList.toggle('hide')
})
formCrear.addEventListener('submit', crearUsuario)
btnsEliminar.forEach(b => {
  b.addEventListener('click', eliminarUsuario, false)
})

function pintar (usuario) {
  let divUsuario = temUsuario.content.querySelector('.usuario')
  let divId = temUsuario.content.querySelector('.id')
  let divNombre = temUsuario.content.querySelector('.nombre')
  let btnElimiar = temUsuario.content.querySelector('.idEliminar')
  let btnActualizar = temUsuario.content.querySelector('.idActualizar')

  divId.textContent = usuario._id
  divNombre.value = usuario.nombre
  divUsuario.setAttribute('id', `usuario-${cortarCadena(usuario._id)}`)
  btnElimiar.setAttribute('idAttr', usuario._id)
  btnActualizar.setAttribute('idAttr', usuario._id)
  document.getElementById('usuarios').appendChild(temUsuario.content.cloneNode(true))
  document.querySelector(`.idEliminar[idAttr="${usuario._id}"]`).addEventListener('click', eliminarUsuario, false)
}

function error (data) {
  alert(data)
}

function crearUsuario (evento) {
  evento.preventDefault()

  let nuevoUsuario = {
    'nombre': evento.target[0].value
  }

  fetch('/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default',
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
  let opcion = confirm("Esta seguro que desea eliminar?")
  if (opcion) {
    fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      cache: 'default'
    })
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

function cortarCadena (cadena) {
  return cadena.substring((cadena.length - 5), cadena.length)
}
