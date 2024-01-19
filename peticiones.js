var BaseUrl = document.querySelector("body").getAttribute("url");
var datos = "";
var btn_guardar = document.querySelector("#agregar");
var btn_nueva_nota = document.querySelector("#btn_nueva_nota");
var Lista = document.querySelector("#lista");
var titulo = document.querySelector("#titulo");
var descripcion = document.querySelector("#descripcion");
var hora = document.querySelector("#hora");
var fecha = document.querySelector("#fecha");
var btn_expan = document.querySelector("#expandir_descripcion");
var btn_expan_lista = document.querySelector("#expandir_lista");
var x = document.getElementById("contenedor_notas");
var x3 = btn_expan.querySelector("i");
var contenedor_descipcion = document.getElementById("contenedor_descripcion");
var x4 = btn_expan_lista.querySelector("i");

const dias_semana = [
	"domingo",
	"lunes",
	"martes",
	"miércoles",
	"jueves",
	"viernes",
	"sábado",
];
const meses = [
	"enero",
	"febrero",
	"marzo",
	"abril",
	"mayo",
	"junio",
	"julio",
	"agosto",
	"septiembre",
	"octubre",
	"noviembre",
	"diciembre",
];

var elemento_lista = (titulo, fecha, descripcion, id_nota, color_cat,efecto="nada") => {
	return ` <div href="#" id="${id_nota}" class="list-group-item list-group-item-action ${efecto}" aria-current="true">
  <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1">${titulo}</h5>
    <small>${fecha}</small>
  </div>
  <div id="bar_cat" style="background-color:${color_cat}"></div>
  <p class="mb-1 desc">${descripcion}</p>
  <div id="cont_herramientas" class="d-flex flex-wrap ">
  <button id="" type="button" class="btn btn-danger " onclick="borrar_nota('${id_nota}')"><i class="fas fa-trash-alt"></i> Eliminar</button>
  <button id="btn_mostrar" type="button" class="btn redondear_btn_mostrar" onclick="animar('${id_nota}')"><i id="icogirar" class="fa fa-plus des iconogirar${id_nota}"></i> </button>
  <div id="cont_boto" class="d-flex flex-nowrap justify-content-around d-none des contboto${id_nota}">
  <button id="btn_categorias" type="button" class="btn redondear_btn" onclick="categorizar_nota('${id_nota}')" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar a una categoria"><i class="bi bi-list-nested"></i></button>
  <button id="btn_pdf" type="button" class="btn redondear_btn" onclick="descargar_pdf('${id_nota}')" data-bs-toggle="tooltip" data-bs-placement="top" title="Exportar a pdf"><i class="bi bi-filetype-pdf"></i></button>
  <button id="btn_txt" type="button" class="btn redondear_btn" onclick="descargar_nota_txt('${id_nota}')" data-bs-toggle="tooltip" data-bs-placement="top" title="Exportar a TXT"><i class="bi bi-filetype-txt"></i></button>
  
   </button></div>
  </div>
  
 
</div>`;
};

let actulist=async()=>{

	const respuesta = await fetch("https://bdtest-5ff29-default-rtdb.firebaseio.com/nombre_de_tu_coleccion.json");
	if (respuesta.status === 200) {
		let datoss = await respuesta.json();
		console.log(datoss);
		json_notas = datoss;
		if (Object.keys(datoss).length == 0) {
			//console.log("vacio");
			Lista.insertAdjacentHTML(
				"beforeend",
				`<div class="fs-1" id="nohay">No hay notas</div>`
			);
		}
		//console.log(datoss);
	}
}



var json_notas = "";
const hacer_peticion = async () => {
	while (Lista.firstChild) {
		Lista.removeChild(Lista.firstChild);
	}
	try {
		const respuesta = await fetch("https://bdtest-5ff29-default-rtdb.firebaseio.com/nombre_de_tu_coleccion.json");
		if (respuesta.status === 200) {
			let datoss = await respuesta.json();
            console.log(datoss);
			json_notas = datoss;
			if (Object.keys(json_notas).length == 0 || datoss==undefined) {
				console.log("vacio");
				Lista.insertAdjacentHTML(
					"beforeend",
					`<div class="fs-1" id="nohay">No hay notas</div>`
				);
			}
			//console.log(datoss);

            for(let hg of Object.keys(json_notas)){
                console.log(json_notas[hg].hora)
            }
			for (elemento of Object.keys(datoss)) {
					console.log(elemento.descripcion);
				Lista.insertAdjacentHTML(
					"beforeend",
					elemento_lista(
						datoss[elemento].titulo,
                        datoss[elemento].fecha,
                        datoss[elemento].descripcion.length > 200
						 	? datoss[elemento].descripcion.substr(0, 200) + ". . ."
						 	: datoss[elemento].descripcion,
						elemento,
						datoss[elemento].color
						// elemento.dia_nota +
						// 	" " +
						// 	elemento.numero_dia_nota +
						// 	" de " +
						// 	elemento.mes_nota +
						// 	" del " +
						// 	elemento.anyo_nota,
						// elemento.descripcion_nota.length > 200
						// 	? elemento.descripcion_nota.substr(0, 200) + ". . ."
						// 	: elemento.descripcion_nota,
						// elemento.id_nota,
						// elemento.color_cat
					)
				);
			}
		} else {
			console.log("hay un problema en la url");
		}
	} catch (error) {
		console.log(error);
	}
};
const hacer_peticion_borradas = async () => {
	let elemento_borrado_lista = (titulo, fecha, descripcion, id_nota) => {
		return ` <div href="#" id="${id_nota}" class="list-group-item list-group-item-action" aria-current="true">
	  <div class="d-flex w-100 justify-content-between">
		<h5 class="mb-1">${titulo}</h5>
		<small>${fecha}</small>
	  </div>
	  <p class="mb-1">${descripcion}</p>
	  
	  
	</div>`;
	};

	while (Lista.firstChild) {
		Lista.removeChild(Lista.firstChild);
	}
	try {
		const respuesta = await fetch(BaseUrl + "inicio/mis_notas_borradas");
		if (respuesta.status === 200) {
			let datoss = await respuesta.json();

			json_notas = datoss;
			if (datoss.length == 0) {
				//	console.log('vacio');
				Lista.insertAdjacentHTML(
					"beforeend",
					`<div class="fs-1" id="nohay">No hay notas</div>`
				);
			}
			//	console.log(datoss);
			for (elemento of datoss) {
				//console.log(elemento.descripcion_nota);
				Lista.insertAdjacentHTML(
					"beforeend",
					elemento_borrado_lista(
						elemento.titulo_nota,
						elemento.dia_nota +
							" " +
							elemento.numero_dia_nota +
							" de " +
							elemento.mes_nota +
							" del " +
							elemento.anyo_nota,
						elemento.descripcion_nota.length > 200
							? elemento.descripcion_nota.substr(0, 200) + ". . ."
							: elemento.descripcion_nota,
						elemento.id_nota
					)
				);
			}
		} else {
			console.log("hay un problema en la url");
		}
	} catch (error) {
		console.log(error);
	}
};

var funcion_borrar = async (id_nota) => {
	let post_id = new FormData();
	post_id.append("id_nota", id_nota);
	try {
		const respuesta = await fetch(`https://bdtest-5ff29-default-rtdb.firebaseio.com/nombre_de_tu_coleccion/${id_nota}.json`, {
			method: "DELETE", // or 'PUT'
			// body: post_id, // data can be `string` or {object}!
			//mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (respuesta.status === 200) {

			document.getElementById(id_nota.toString()).animate(
				[
					{ transform: "scale(0)", opacity: 0, transform: "translateX(-20px)" },
					
				],
				{
					// opciones de sincronización
					duration: 700,
					iterations: 1,
					easing: "cubic-bezier(.11,.8,1,1.36)",
				}
			).onfinish = () => {
				Lista.removeChild(document.getElementById(id_nota));
			};
		
			// hacer_peticion();
		}
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Hubo un problema",
			text: error,
		});
	}
};


function obtenerFechaHora() {
    const ahora = new Date();
  
    const dia = ahora.getDate().toString().padStart(2, '0');
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0'); // Enero es 0
    const año = ahora.getFullYear().toString().slice(-2); // Obtiene los últimos 2 dígitos del año
  
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
  
    return `${horas}:${minutos}:${segundos}`;
  }

  var unot="";
let guardar_nota = async () => {
	

	let descripcion = document.querySelector("#descripcion").value;
	let titulo = document.querySelector("#titulo").value;

    
      
      console.log(obtenerFechaHora());

	

	try {
		Swal.showLoading();
		const respuesta = await fetch("https://bdtest-5ff29-default-rtdb.firebaseio.com/nombre_de_tu_coleccion.json", {
			method: "POST", // or 'PUT'
			body:JSON.stringify({
                  fecha:fechactual,
                  hora: obtenerFechaHora(),
                  titulo: titulo,
                  descripcion:descripcion
                 
                
            }) , // data can be `string` or {object}!
			//mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (respuesta.status === 200) {
			Swal.close();
			tata.info("Nota agregada", "Se agrego una nueva nota", {
				position: "tr",
				animate: "slide",
				duration: 2000,
			});
				
			 let ultimanota = await respuesta.json();
			 unot=ultimanota;
			// console.log(ultimanota.);
			// json_notas.push(ultimanota);
			Lista.insertAdjacentHTML(
				"afterbegin",
				elemento_lista(
					titulo,
					fechactual,
					descripcion,
					ultimanota.name,
					null,
					"efecto"
				)
			);
			actulist();
			borrar_formulario();
		}
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Hubo un problema",
			text: error,
		});
	}
};

let actualizar_nota = async (id_nota_actual) => {
	

	let descripcion = document.querySelector("#descripcion").value;
	let titulo = document.querySelector("#titulo").value;
	
	try {
		const respuesta = await fetch(`https://bdtest-5ff29-default-rtdb.firebaseio.com/nombre_de_tu_coleccion/${id_nota_actual}.json`, {
			method: "PUT", // or 'PUT'
			body:JSON.stringify({
				fecha:fechactual,
				hora: obtenerFechaHora(),
				titulo: titulo,
				descripcion:descripcion
			   
			  
		  }) , // data can be `string` or {object}!
		  //mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (respuesta.status === 200) {
			actulist();
			tata.info("Actualizada", "Nota actualizada", {
				position: "tr",
				animate: "slide",
				duration: 2000,
			});
			let elemento_actualizar=document.getElementById(id_nota_actual.toString());
			elemento_actualizar.childNodes[1].childNodes[1].textContent=titulo;
			elemento_actualizar.childNodes[5].childNodes[0].textContent=descripcion;
			elemento_actualizar.animate(
				[
					{},
					{ color:"green",transform:"rotate(3deg)"},
					{transform:"rotate(-3deg)"}
					
				],
				{
					// opciones de sincronización
					duration: 1000,
					iterations: 1,
					easing: "ease",
				}
			);

		}
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Hubo un problema",
			text: error,
		});
	}
};

btn_guardar.addEventListener("click", function () {
	if (btn_guardar.querySelector("i").classList.contains("fa-pencil-alt")) {
		actualizar_nota(id_nota_seleccionada);
	} else {
		guardar_nota();
	}
	//guardar_nota();
});

btn_nueva_nota.addEventListener("click", function () {
	btn_guardar.querySelector("i").classList.replace("fa-pencil-alt", "fa-save");
	borrar_formulario();
	titulo.style.borderBottom = `2px solid goldenrod`;
	//!Revisar error al seleccionar nueva nota
	nota_anterior.classList.contains("nota_activa")
		? nota_anterior.classList.remove("nota_activa")
		: null;
	nota_anterior = "";
});

let borrar_nota = (id_nota) => {
	const swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: "btn btn-success mx-2",
			cancelButton: "btn btn-danger",
		},
		buttonsStyling: false,
	});

	swalWithBootstrapButtons
		.fire({
			title: "¿Estas seguro?",
			text: "¡Esto no se puede revertir!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Si borrar",
			cancelButtonText: "No borrar",
			reverseButtons: true,
		})
		.then((result) => {
			if (result.isConfirmed) {
				funcion_borrar(id_nota);

				
			tata.text("Realizado", "Nota eliminada", {
				position: "tr",
				animate: "slide",
				duration: 2000,
			});
				borrar_formulario();
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				swalWithBootstrapButtons.fire(
					"Cancelado",
					"Operacion cancelada",
					"error"
				);
			}
		});
};

// let mostrar_nota= async(id_nota)=>{
// 	for (elemento of datoss){
// 		if(elemento.)
// 	}
// }
let observar = "";
let nota_anterior = "";
let id_nota_seleccionada = "";
Lista.addEventListener("click", (e) => {
	// console.log(e.target)
	// console.log(e.target.getAttribute('id'))
	if (
		e.target &&
		e.target.tagName != "BUTTON" &&
		e.target.classList.contains("des") == false
	) {
		let ele = e.target;
		 
		while (
			ele.getAttribute("id") == undefined ||
			ele.getAttribute("id") == "bar_cat" ||
			ele.getAttribute("id") == "cont_herramientas"
		) {
			ele = ele.parentNode;
			//console.log(ele.id);
		}

		let nota = Object.keys(json_notas).find((obj) => obj == ele.getAttribute("id"));
        console.log(json_notas[nota]);
		id_nota_seleccionada = nota;
		titulo.value = json_notas[nota].titulo;
		titulo.style.borderBottom = `2px solid ${
			nota.color_cat == null ? "goldenrod" : nota.color_cat
		}`;
		descripcion.value = json_notas[nota].descripcion;
		fecha.innerHTML = `<div id='dfecha'>${json_notas[nota].fecha}</div>`;
		btn_guardar
			.querySelector("i")
			.classList.replace("fa-save", "fa-pencil-alt");
		if (nota_anterior != ele) {
			ele.classList.add("nota_activa");

			if (
				window.innerWidth <= 768 &&
				contenedor_descipcion.style.display == "none"
			) {
				contenedor_descipcion.style.display = "block";
				x.style.display = "none";
				x3.classList.replace("fa-expand-arrows-alt", "fa-compress-arrows-alt");
				contenedor_descipcion.style.height = "92vh";
				observar = 1;
			}

			if (nota_anterior != "") {
				nota_anterior.classList.remove("nota_activa");
			}
		} else {
			//nota_anterior.classList.remove('nota_activa');
		}
		nota_anterior = ele;
		//console.log(nota_anterior);

		// }else if(e.target && e.target.tagName!='A'){
		// 	if(nota_anterior!=e.target){
		// let miac= e.target.parentNode;
		// miac.classList.add('nota_activa');

		// 	if(nota_anterior!=''){
		// 		nota_anterior.classList.remove('nota_activa');
		// 	}
		// 	nota_anterior=miac;
		// }
	}
});

let fechactual="";
let obtener_fecha_actual = () => {
	const fechas = new Date();
    
	let fechajson = {
		dia: dias_semana[fechas.getDay()],
		numero: fechas.getDate(),
		mes: meses[fechas.getMonth()],
		año: fechas.getUTCFullYear(),
        
	};
	fecha.innerHTML = `<div id='dfecha'>${fechajson.dia},${fechajson.numero} de ${fechajson.mes} del ${fechajson.año}</div>`;
    fechactual=`${fechajson.dia},${fechajson.numero} de ${fechajson.mes} del ${fechajson.año}`;
};

let borrar_formulario = () => {
	descripcion.value = "";
	titulo.value = "";
	obtener_fecha_actual();
};

let intercalar_lista_tareas = () => {
	if (x.style.display === "none") {
		x.style.display = "block";
		x.style.height = "calc(92vh/2)";
		contenedor_descipcion.style.height = "calc(92vh/2)";
		x3.classList.replace("fa-compress-arrows-alt", "fa-expand-arrows-alt");
		x4.classList.replace("fa-compress-arrows-alt", "fa-expand-arrows-alt");
	} else {
		x.style.display = "none";

		contenedor_descipcion.style.height = "92vh";
		x3.classList.replace("fa-expand-arrows-alt", "fa-compress-arrows-alt");
	}
};

let intercalar_descripcion = () => {
	if (contenedor_descipcion.style.display === "none") {
		contenedor_descipcion.style.display = "block";
		x.style.height = "calc(92vh/2)";
		x4.classList.replace("fa-compress-arrows-alt", "fa-expand-arrows-alt");
	} else {
		contenedor_descipcion.style.display = "none";

		x.style.height = "92vh";
		x4.classList.replace("fa-expand-arrows-alt", "fa-compress-arrows-alt");
		nota_anterior.classList.contains("nota_activa")
			? nota_anterior.classList.remove("nota_activa")
			: null;
		nota_anterior = "";
	}
};

btn_expan.addEventListener("click", function () {
	if (observar == 1) {
		contenedor_descipcion.style.display = "none";
		x.style.display = "block";
		x.style.height = "92vh";
		x4.classList.replace("fa-expand-arrows-alt", "fa-compress-arrows-alt");
		x3.classList.replace("fa-compress-arrows-alt", "fa-expand-arrows-alt");
		observar = 0;
	} else {
		intercalar_lista_tareas();
	}
});
btn_expan_lista.addEventListener("click", function () {
	intercalar_descripcion();
});

let buscar = (texto) => {
	while (Lista.firstChild) {
		Lista.removeChild(Lista.firstChild);
	}

	for (let nota in json_notas) {
		console.log(json_notas[nota.toString()].fecha);

		
		if (
			json_notas[nota.toString()].descripcion.match(new RegExp(texto, "i")) ||
			json_notas[nota.toString()].titulo.match(new RegExp(texto, "i"))
		)

		Lista.insertAdjacentHTML(
			"beforeend",
			elemento_lista(
				json_notas[nota.toString()].titulo,
				json_notas[nota.toString()].fecha,
				json_notas[nota.toString()].descripcion.length > 200
					 ? json_notas[nota.toString()].descripcion.substr(0, 200) + ". . ."
					 : json_notas[nota.toString()].descripcion,
				nota,
				json_notas[nota.toString()].color,
				// elemento.dia_nota +
				// 	" " +
				// 	elemento.numero_dia_nota +
				// 	" de " +
				// 	elemento.mes_nota +
				// 	" del " +
				// 	elemento.anyo_nota,
				// elemento.descripcion_nota.length > 200
				// 	? elemento.descripcion_nota.substr(0, 200) + ". . ."
				// 	: elemento.descripcion_nota,
				// elemento.id_nota,
				// elemento.color_cat
			)
		);
	}


	//console.log(Lista.hasChildNodes());
	Lista.hasChildNodes() == false
		? Lista.insertAdjacentHTML(
				"beforeend",
				`<div class="fs-1" id="nohay">No se encontraron coincidencias</div>`
		  )
		: null;
};

let bus = document.getElementById("bus");

bus.addEventListener("keyup", function (e) {
	if (bus.value.length != 0) {
		buscar(bus.value);
	} else {
		while (Lista.firstChild) {
			Lista.removeChild(Lista.firstChild);
		}
		for (let nota in json_notas) {
		console.log(json_notas[nota.toString()].fecha);

		
		// if (
		// 	json_notas[nota.toString()].descripcion.match(new RegExp(texto, "i")) ||
		// 	json_notas[nota.toString()].titulo.match(new RegExp(texto, "i"))
		// )

		Lista.insertAdjacentHTML(
			"beforeend",
			elemento_lista(
				json_notas[nota.toString()].titulo,
				json_notas[nota.toString()].fecha,
				json_notas[nota.toString()].descripcion.length > 200
					 ? json_notas[nota.toString()].descripcion.substr(0, 200) + ". . ."
					 : json_notas[nota.toString()].descripcion,
				nota,
				json_notas[nota.toString()].color,
				// elemento.dia_nota +
				// 	" " +
				// 	elemento.numero_dia_nota +
				// 	" de " +
				// 	elemento.mes_nota +
				// 	" del " +
				// 	elemento.anyo_nota,
				// elemento.descripcion_nota.length > 200
				// 	? elemento.descripcion_nota.substr(0, 200) + ". . ."
				// 	: elemento.descripcion_nota,
				// elemento.id_nota,
				// elemento.color_cat
			)
		);
	}
	}
});

let copiar = () => {
	descripcion.select();
	document.execCommand("copy");

	alert("Copied!");
};

descripcion.addEventListener("dblclick", function () {
	copiar();
});

//bloquear click derecho
// document.oncontextmenu = function () {
// 	return false;
// };





function sabritas() {
	if (window.matchMedia("(min-width: 768px)").matches) {
		contenedor_descipcion.style.display = "block";
		x.style.height = "92vh";
		contenedor_descipcion.style.height = "92vh";
		x.style.display = "block";
	} else {
		x.style.height = "calc(92vh/2)";
		contenedor_descipcion.style.height = "calc(92vh/2)";
	}
}
window.addEventListener("resize", sabritas);
document.addEventListener(
	"DOMContentLoaded",
	function () {
		hacer_peticion();
		obtener_fecha_actual();
	},
	false
);

let animar = (clase) => {
	let cont_boto = "contboto" + clase;
	let icogirar = "iconogirar" + clase;

	document.getElementsByClassName(cont_boto)[0].classList.toggle("d-none");
	document.getElementsByClassName(cont_boto)[0].animate(
		[
			{ transform: "scale(0)", opacity: 0, transform: "translateX(-20px)" },
			{ transform: "scale(1)", opacity: 1 },
		],
		{
			// opciones de sincronización
			duration: 500,
			iterations: 1,
			easing: "cubic-bezier(.11,.8,1,1.36)",
		}
	);

	document
		.getElementsByClassName(icogirar)[0]
		.animate([{ transform: "rotate(360deg)" }], {
			// opciones de sincronización
			duration: 500,
			iterations: 1,
			easing: "cubic-bezier(.11,.8,1,1.36)",
		});
};

var tooltipTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
});

const descargar_nota_txt = (id) => {
	//let nota = json_notas.find((obj) => obj.id_nota == id);
	let nota = Object.keys(json_notas).find((obj) => obj == id);
	console.log(json_notas[nota]);
	let texto =
		"Fecha: " +
		json_notas[nota].fecha +
		"\n" +
		"Titulo: " +
		json_notas[nota].titulo +
		"\n" +
		"\n" +
		json_notas[nota].descripcion;
	const a = document.createElement("a");
	const archivo = new Blob([texto], { type: "text/plain" });
	const url = URL.createObjectURL(archivo);
	a.href = url;
	a.download = json_notas[nota].titulo + ".txt";
	a.click();
	URL.revokeObjectURL(url);
};

const descargar_pdf = (id) => {
    // Encuentra la nota por ID
    let nota = Object.keys(json_notas).find((obj) => obj == id);
    console.log(json_notas[nota]);

    // Crea el contenido del PDF
    let contenido = 
        "Fecha: " + json_notas[nota].fecha + "\n" +
        "Titulo: " + json_notas[nota].titulo + "\n\n" +
        json_notas[nota].descripcion;

    // Inicializa jsPDF
	const doc = new jsPDF.jsPDF();

    // Añade texto al documento
    doc.text(contenido, 10, 10);

    // Guarda el documento
    doc.save(json_notas[nota].titulo + '.pdf');
};


