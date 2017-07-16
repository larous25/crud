const usuarios = [];  

// eventos

// eliminar

function pintar() {
	let html;

	if(usuarios.length > 0){
		html = usuarios.map(function(usuario) {
			return `
			<div class="usuario">
				<div>
					${usuario._id}
				</div>
				<div>
					${usuario.nombre}
				</div>
			</div>
		`;
		}); 

	} else {
		html = 'no hay usuarios';
	}

	document.querySelector('#usuarios').innerHTML = html.join('');
}

function error(data) {
	alert(data);
}

document.querySelector('a[href="#crear"]')
.addEventListener('click', function () {
	console.log('eee');
	document.querySelector('#crear').classList.toggle('hide');
})


document.querySelector('a[href="#eliminar"]')
.addEventListener('click', function () {

	if(!tieneBotones()) {
		document
		.querySelectorAll('.usuario')
		.forEach(Element => {
			Element.appendChild(crearBoton('eliminar', eliminaEste, 'X'));
		});
	} else {
		document
		.querySelectorAll('.eliminar, .actualizar')
		.forEach((e) => { 
			e.remove();
		});

		document
		.querySelectorAll('.usuario')
		.forEach(Element => {
			Element.appendChild(crearBoton('eliminar', eliminaEste, 'X'));
		});
	}
});

document.querySelector('a[href="#actualizar"]')
.addEventListener('click', function () {

	if(!tieneBotones()) {
		document
		.querySelectorAll('.usuario')
		.forEach(Element => {
			Element.appendChild(crearBoton('actualizar', actualizaEste, 'Actualiza'));
		});
	} else {
		document
		.querySelectorAll('.eliminar, .actualizar')
		.forEach((e) => { 
			e.remove();
		});

		document
		.querySelectorAll('.usuario')
		.forEach(Element => {
			Element.appendChild(crearBoton('actualizar', actualizaEste, 'Actualiza'));
		});
	}
});


function tieneBotones() {
	return (document.querySelectorAll('.eliminar, .actualizar').length > 0);
}

function crearBoton (clase, evento, texto) {
	let div = document.createElement('div');
	div.className = clase;
	div.onclick = evento;
	div.innerText = texto;
	return div;
}


// peticiones
document.querySelector('a[href="#listar"]')
.addEventListener('click' ,() => {
	fetch('/usuarios', { 
		method: 'GET',
		headers: { 'Content-Type':'application/json' },
		mode: 'cors',
		cache: 'default'
	})
	.then(res => {
	
		if(res.status === 500) return res.json().then(error);

		return res.json()
		.then(data => {
			console.log(data);
			usuarios.length = 0;
			console.log(usuarios);
			data.forEach(u => {
				usuarios.push(u);
			});
			pintar();
		});
	}).catch(error);
		
});



document.querySelector('#crear')
.addEventListener('submit', (e) => {
	e.preventDefault();

	fetch('/usuarios', { 
		method: 'POST',
		headers: { 'Content-Type':'application/json' },
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify({
			nombre: e.target[0].value
		})  
	})
  .then((res) => {
		if(res.status === 500) 		return res.json().then(error);
		

		return res.json()
		.then((data) => {
			console.log(data);
			usuarios.push(data);
			pintar();
		});
	}).catch(error);
});


function eliminaEste(elemento) {
	
	let hijosDelPapa = elemento.target.parentNode.childNodes;
	
	let nombre = Array.prototype.find.call(hijosDelPapa,e => { 
		return (e.className == 'nombre');
	}).innerText;

	let url = `/usuarios?nombre=${nombre}`;
	
	fetch(url, { 
		method: 'DELETE',
		headers: { 'Content-Type':'application/json' },
		mode: 'cors',
		cache: 'default'
	})
  .then((res) => {
	if(res.status === 500) {
			return res.json()
			.then(error);
		}

	return res.json()
		.then((data) => {
			console.log(data);
			pintar();
		});
	}).catch(error);

}

function actualizaEste() {
	console.log('hay jueputa x2');
}

