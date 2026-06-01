// objetos DOM
const btnMostar = document.querySelector("#mostrar");
const btnFormulario = document.querySelector("#formulario");
const formCrear = document.querySelector("#crear");
const temUsuario = document.querySelector("#nuevoUsuarioTemplate");
const usuariosContainer = document.querySelector("#usuarios");

// eventos
btnMostar.addEventListener("click", listarUsuarios);

btnFormulario.addEventListener("click", () => {
  formCrear.classList.toggle("hide");
});

formCrear.addEventListener("submit", crearUsuario);

// delegación de eventos
usuariosContainer.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("idEliminar")) {
    eliminarUsuario(evento);
  }

  if (evento.target.classList.contains("idActualizar")) {
    actualizarUsuario(evento);
  }
});

async function crearUsuario(evento) {
  evento.preventDefault();

  const nuevoUsuario = {
    nombre: evento.target.usuario.value.trim(),
  };

  if (!nuevoUsuario.nombre) {
    return alert("Debe ingresar un nombre");
  }

  try {
    const res = await ajax("/usuarios", {
      method: "POST",
      body: JSON.stringify(nuevoUsuario),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const usuario = await res.json();

    pintar(usuario);

    formCrear.reset();
    formCrear.classList.add("hide");
  } catch (err) {
    error(err.message);
  }
}

async function eliminarUsuario(evento) {
  const id = evento.target.dataset.id;

  if (!confirm("¿Está seguro que desea eliminar?")) {
    return;
  }

  try {
    const res = await ajax(`/usuarios/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    document.querySelector(`#usuario-${id}`)?.remove();
  } catch (err) {
    error(err.message);
  }
}

async function actualizarUsuario(evento) {
  const id = evento.target.dataset.id;

  const input = document.querySelector(`#usuario-${id} .nombre`);

  const nuevoUsuario = {
    nombre: input.value.trim(),
  };

  if (!nuevoUsuario.nombre) {
    return alert("No puede actualizar un nombre vacío");
  }

  try {
    const res = await ajax(`/usuarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(nuevoUsuario),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const usuario = await res.json();

    input.value = usuario.nombre;

    alert("Actualizado");
  } catch (err) {
    error(err.message);
  }
}

async function listarUsuarios() {
  try {
    const res = await ajax("/usuarios");

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const usuarios = await res.json();

    usuariosContainer.innerHTML = "";

    usuarios.forEach(pintar);
  } catch (err) {
    error(err.message);
  }
}

function pintar(usuario) {
  const fragment = temUsuario.content.cloneNode(true);

  const divUsuario = fragment.querySelector(".usuario");
  const divId = fragment.querySelector(".id");
  const inputNombre = fragment.querySelector(".nombre");
  const btnEliminar = fragment.querySelector(".idEliminar");
  const btnActualizar = fragment.querySelector(".idActualizar");

  divUsuario.id = `usuario-${usuario._id}`;

  divId.textContent = usuario._id;
  inputNombre.value = usuario.nombre;

  btnEliminar.dataset.id = usuario._id;
  btnActualizar.dataset.id = usuario._id;

  usuariosContainer.appendChild(fragment);
}

function ajax(url, options = {}) {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
}

function error(mensaje) {
  alert(mensaje);
}

window.onerror = (msg) => {
  error(msg);
};
