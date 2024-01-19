let lista_categorias = document.getElementById("lista_categorias");




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
	

	Swal.fire({
		title: 'Selecciona un color',
		html: '<div style="width:-webkit-fill-available; height:80px;"><input style="width:-webkit-fill-available; height:80px;" type="color" id="swal-input-color" class=""></div>',
		focusConfirm: false,
		preConfirm: () => {
		  const color = document.getElementById('swal-input-color').value;
		  return color;
		}
	  }).then((result) => {
		if (result.isConfirmed && result.value) {
		  const colorSeleccionado = result.value;
		  // Lógica para actualizar en Firebase
		  fetch(`https://bdtest-5ff29-default-rtdb.firebaseio.com/nombre_de_tu_coleccion/${id_nota}.json`, {
			method: 'PATCH',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({ color: colorSeleccionado })
		  })
		  .then(response => response.json())
		  .then(data => {
			Swal.fire(`Color actualizado a: ${colorSeleccionado}`);
			document.getElementById(id_nota.toString()).childNodes[3].style.borderBottom = `2px solid ${colorSeleccionado}`
		  })
		  .catch(error => {
			Swal.fire('Error', 'No se pudo actualizar el color', 'error');
		  });
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




