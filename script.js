

// Habilidades mostradas en index.html
const habilidades = [
    "C++",
    "C#",
    "HTML & CSS",
    "JavaScript (básico)",
    "WordPress",
    "SQL",
    "Python"
];

// Proyectos mostrados en proyecto.html
const proyectos = [
    {
        id: "der",
        titulo: "Diagrama Entidad Relación",
        descripcion: "Aplicación Música",
        enlace: "documentos/Diagrama Entidad Relacion - MusicApp.pdf",
        textoBoton: "Abrir PDF MusicApp"
    },
    {
        id: "transacciones",
        titulo: "Transacciones",
        descripcion: "Prueba de transacciones",
        enlace: "documentos/Trabajo practico 2- transacciones.pdf",
        textoBoton: "Abrir PDF Transacción"
    },
    {
        id: "zoo",
        titulo: "Zoológico",
        descripcion: "Diseño de una base de datos para zoológico",
        enlace: "documentos/Trabajo practico 3- BD ZOOLOGICO.pdf",
        textoBoton: "Abrir PDF Zoológico"
    }
];


// renderizar el array "habilidades" dentro del
  // DOM (solo corre si el elemento existe, es decir, en index.html)
  
function mostrarHabilidades() {
    const contenedor = document.getElementById("lista-habilidades");
    if (!contenedor) return;

    habilidades.forEach(function (habilidad) {
        const item = document.createElement("li");   // crear elemento (DOM)
        item.textContent = habilidad;                 // modificar texto (DOM)
        contenedor.appendChild(item);
    });
}


   // dibujar en el DOM una lista de proyectos
   // parámetro (se usa tanto para mostrar todos los
 //  proyectos como para mostrar el resultado filtrado)
 
function renderizarProyectos(listaProyectos) {
    const contenedor = document.getElementById("grid-proyectos");
    if (!contenedor) return;

    contenedor.innerHTML = ""; // limpiar contenido anterior (DOM)

    if (listaProyectos.length === 0) {
        const aviso = document.createElement("p");
        aviso.className = "sin-resultados";
        aviso.textContent = "No se encontraron proyectos con ese criterio.";
        contenedor.appendChild(aviso);
        return;
    }

    listaProyectos.forEach(function (proyecto) {
        const li = document.createElement("li");
        li.className = "card";
        li.id = proyecto.id;

        const h2 = document.createElement("h2");
        h2.textContent = proyecto.titulo;

        const p = document.createElement("p");
        p.textContent = proyecto.descripcion;

        const a = document.createElement("a");
        a.href = proyecto.enlace;
        a.target = "_blank";
        a.textContent = proyecto.textoBoton;

        li.appendChild(h2);
        li.appendChild(p);
        li.appendChild(a);
        contenedor.appendChild(li);
    });
}


   
  //  filtrar el array "proyectos" según el texto
 //  ingresado por el usuario y pedirle a renderizarProyectos que
  // vuelva a dibujar el resultado.
  function filtrarProyectos(texto) {
    const textoBusqueda = texto.trim().toLowerCase();

    const resultado = proyectos.filter(function (proyecto) {
        return proyecto.titulo.toLowerCase().includes(textoBusqueda) ||
               proyecto.descripcion.toLowerCase().includes(textoBusqueda);
    });

    renderizarProyectos(resultado);
}


   
  //validar los datos del formulario de contacto.
  // Lanza errores (throw) que son atrapados por quien la invoca.
   
function validarFormulario(nombre, email, mensaje) {
    if (nombre.trim() === "" || email.trim() === "" || mensaje.trim() === "") {
        throw new Error("Todos los campos son obligatorios.");
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        throw new Error("Ingresá un email válido.");
    }

    if (mensaje.trim().length < 10) {
        throw new Error("El mensaje debe tener al menos 10 caracteres.");
    }

    return true;
}


   // se ejecuta con el evento "submit", usa
   //validarFormulario dentro de un try/catch y muestra el
   //resultado (éxito o error) en el DOM.
  
function manejarEnvioFormulario(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;
    const divMensaje = document.getElementById("mensaje-formulario");

    try {
        validarFormulario(nombre, email, mensaje);

        divMensaje.textContent = "¡Gracias " + nombre + "! Tu mensaje fue enviado correctamente.";
        divMensaje.className = "mensaje-exito";
        document.getElementById("form-contacto").reset();

    } catch (error) {
        divMensaje.textContent = "Error: " + error.message;
        divMensaje.className = "mensaje-error";
    }
}


document.addEventListener("DOMContentLoaded", function () {

    // Inicializar habilidades (index.html)
    mostrarHabilidades();

    // Inicializar grilla completa de proyectos (proyecto.html)
    renderizarProyectos(proyectos);

    // EVENTO 1: submit -> validar formulario de contacto
    const form = document.getElementById("form-contacto");
    if (form) {
        form.addEventListener("submit", manejarEnvioFormulario);
    }

    // EVENTO 2: keyup -> buscador de proyectos en tiempo real
    const buscador = document.getElementById("buscador");
    if (buscador) {
        buscador.addEventListener("keyup", function () {
            filtrarProyectos(buscador.value);
        });
    }

    // EVENTO 3: mouseover / mouseout -> efecto sobre la foto de perfil
    const foto = document.querySelector("section.hero img");
    if (foto) {
        foto.addEventListener("mouseover", function () {
            foto.style.transform = "scale(1.08)";
        });
        foto.addEventListener("mouseout", function () {
            foto.style.transform = "scale(1)";
        });
    }
});