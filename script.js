
const materias = [
    { nombre: "Ambientación Universitaria", correlativas: [] },
    { nombre: "Física y Química", correlativas: [] },
    { nombre: "Matemática", correlativas: [] },
    { nombre: "Análisis Matemático 1", correlativas: ["Matemática"] },
    { nombre: "Introducción a la Ingeniería", correlativas: ["Ambientación Universitaria"] },
    { nombre: "Química", correlativas: ["Física y Química"] },
    { nombre: "Economía", correlativas: ["Matemática"] },
    { nombre: "Álgebra Lineal", correlativas: ["Matemática"] },
    { nombre: "Física 1", correlativas: ["Física y Química", "Matemática"] },
    { nombre: "Sistemas de Representación", correlativas: [] },
    { nombre: "Módulo de Inglés", correlativas: [] },
];

const contenedor = document.getElementById("contenedor-materias");

function estaAprobada(nombre) {
    return localStorage.getItem(nombre) === "aprobada";
}

function actualizarMalla() {
    contenedor.innerHTML = "";
    materias.forEach(materia => {
        const bloque = document.createElement("div");
        bloque.className = "materia";
        bloque.textContent = materia.nombre;

        if (estaAprobada(materia.nombre)) {
            bloque.classList.add("aprobada");
        } else if (materia.correlativas.every(estaAprobada)) {
            bloque.classList.add("desbloqueada");
            bloque.onclick = () => {
                localStorage.setItem(materia.nombre, "aprobada");
                actualizarMalla();
            };
        } else {
            bloque.classList.add("bloqueada");
        }
        contenedor.appendChild(bloque);
    });
}

function resetear() {
    localStorage.clear();
    actualizarMalla();
}

actualizarMalla();
