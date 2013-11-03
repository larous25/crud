var button = document.querySelector("button");

button.addEventListener("click",function(e){
	e.preventDefault();

	var nombre = document.querySelector("#nombre");
	var apellido = document.querySelector("#apellido");
	var genero = document.querySelector('[name=genero]:checked');

	/*	es con tilde	*/
	var informacion = new FormData();
	/*	en javascript es value y en jquery es val	*/
	informacion.append("nombre",nombre.value);
	informacion.append("apellido",apellido.value);
	informacion.append("genero",genero.value);

	var	xhr =new XMLHttpRequest();
	xhr.addEventListener('load',resultados,false);
	xhr.open("post","/hola",false);
	xhr.send(informacion);
	
});

function resultados(data){
	alert(data.target.responseText);
}