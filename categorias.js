var BaseUrl = document.querySelector("body").getAttribute("url");
let lista_categorias = document.getElementById("lista_categorias");

let obtener_categorias = async () => {
	let respuesta = await fetch(BaseUrl + "inicio/obtener_categorias");
	let categorias = await respuesta.json();
	//console.log(categorias);
	return categorias;
};

let llenar_categorias = async () => {
	let ele_cat = document.querySelectorAll(".catele");
	for (const iterator of ele_cat) {
		lista_categorias.removeChild(iterator);
	}

	let categorias = await obtener_categorias();
	for (const categoria of categorias) {
		lista_categorias.insertAdjacentHTML(
			"afterbegin",
			`<li id="${categoria.id_cat}" class='catele'><a style="border-right: 20px solid ${categoria.color_cat};" class="dropdown-item" href="#" onclick="ver_categoria(${categoria.id_cat})"> ${categoria.nombre_cat}</a></li>`
		);

		///?agregar aqui la eliminacion de las categorias ya registradas en el DOM
	}

	
};

llenar_categorias();

let ver_categoria = async (id_categoria) => {
	let elemento_lista = (titulo, fecha, descripcion, id_nota, color_cat) => {
		return ` <div href="#" id="${id_nota}" class="list-group-item list-group-item-action" aria-current="true">
  <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1">${titulo}</h5>
    <small>${fecha}</small>
  </div>
  <div id="bar_cat" style="background-color:${color_cat}"></div>
  <p class="mb-1">${descripcion}</p>
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

	while (Lista.firstChild) {
		Lista.removeChild(Lista.firstChild);
	}

	try {
		let data = new FormData();
		data.append("id_cat", id_categoria);

		const respuesta = await fetch(BaseUrl + "inicio/mis_notas", {
			method: "POST", // or 'PUT'
			body: data, // data can be `string` or {object}!
			mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
			},
		});
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
				//	console.log(elemento.descripcion_nota);
				Lista.insertAdjacentHTML(
					"beforeend",
					elemento_lista(
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
						elemento.id_nota,
						elemento.color_cat
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

let categorizar_nota = async (id_nota) => {
	let categorias = await obtener_categorias();
	let options =
		'<option style="text-align:center;" value="0">Seleccione una categoria</option>';
	for (const iterator of categorias) {
		options += `<option value="${iterator.id_cat}" style="color:${iterator.color_cat}; font-weight:bold; text-align:center;" >${iterator.nombre_cat} </option>`;
	}

	Swal.fire({
		title: "Categorizar nota",
		html: `<select id="categoria" class="form-control">
    ${options}
    </select>`,
		focusConfirm: false,
		confirmButtonText: 'Agregar a categoria <i class="fa fa-thumbs-up"></i> ',
		confirmButtonAriaLabel: "Thumbs up, great!",
		preConfirm: () => {
			return [document.getElementById("categoria").value];
		},
	}).then((result) => {
		if (result.value && result.value != 0) {
			let data = new FormData();
			data.append("id_nota", id_nota);
			data.append("id_categoria", result.value);

			let respuesta = fetch(BaseUrl + "inicio/asignar_categoria", {
				method: "POST", // or 'PUT'
				body: data, // data can be `string` or {object}!
				mode: "no-cors",
				headers: {
					"Content-Type": "application/json",
				},
			});

			tata.success("Realizado", "Nota categorizada", {
				position: "tm",
				animate: "slide",
				duration: 2000,
			});

			for (const it of categorias) {
				if (it.id_cat == result.value) {
					document.getElementById(
						id_nota
					).childNodes[3].style.borderBottom = `2px solid ${it.color_cat}`;
				}
			}
		}
	});
};

let = contenedor_colores = document.getElementById("contenedor_colores");
contenedor_colores.addEventListener("click", (e) => {
	if (e.target.id != "contenedor_colores") {
		const lista = contenedor_colores.childNodes;
		for (const iterator of lista) {
			try {
				if (iterator.classList.contains("color_seleccionado")) {
					iterator.classList.remove("color_seleccionado");
				}
			} catch (error) {}
		}
		e.target.classList.add("color_seleccionado");
	}
});

document.getElementById("guardar_cat").addEventListener("click", async () => {
	let nombre_cat = document.getElementById("nombre_cat").value;
	let color_cat =
		document.getElementsByClassName("color_seleccionado")[0].style
			.backgroundColor;
	if (nombre_cat !== "") {
		let data = new FormData();
		data.append("nombre_cat", nombre_cat);
		data.append("color_cat", color_cat);

		let respuesta = await fetch(BaseUrl + "inicio/agregar_categoria", {
			method: "POST", // or 'PUT'
			body: data, // data can be `string` or {object}!
			mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (respuesta.status === 200) {
			tata.success("Realizado", "Se agrego la categoria", {
				position: "tm",
				animate: "slide",
				duration: 2000,
			});

			llenar_categorias();
			document.getElementById("cancelar_cat").click();
		} else {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Algo salio mal",
			});
		}
	}
	else{
		tata.error("Error", "No se puede dejar el nombre vacio", {
			position: "tm",
			animate: "slide",
			duration: 2000,
		});
	}
});

document.getElementById("eliminar_cat").addEventListener("click", async () => {
	let categorias = await obtener_categorias();
	let options =
		'<option style="text-align:center;" value="0">Seleccione una categoria</option>';
	for (const iterator of categorias) {
		options += `<option value="${iterator.id_cat}" style="color:${iterator.color_cat}; font-weight:bold; text-align:center;" >${iterator.nombre_cat} </option>`;
	}

	Swal.fire({
		title: "Eliminar categoria",
		html: `<select id="categoria" class="form-control">
    ${options}
    </select> 
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">Eliminar notas de la categoria</label>`,
		focusConfirm: false,
		confirmButtonText: "Eliminar",
		confirmButtonColor: "#d33",
		confirmButtonAriaLabel: "Thumbs up, great!",
		preConfirm: () => {
			return [
				document.getElementById("categoria").value,
				document.getElementById("flexSwitchCheckDefault").checked,
			];
		},
	}).then((result) => {
		//console.log(result.value);
		if (result.value && result.value != 0) {
			let data = new FormData();
			data.append("id_categoria", result.value[0]);
			data.append("eliminar_notas_cat", result.value[1]);

			let respuesta = fetch(BaseUrl + "inicio/eliminar_categoria", {
				method: "POST", // or 'PUT'
				body: data, // data can be `string` or {object}!
				mode: "no-cors",
				headers: {
					"Content-Type": "application/json",
				},
			});

			tata.success("Realizado", "Se elimino la nota", {
				position: "tm",
				animate: "slide",
				duration: 2000,
			});

			llenar_categorias();
		}
	});
});
