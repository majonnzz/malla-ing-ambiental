
const materias = [
    { nombre: "Ambientación Universitaria", correlativas: [], cuatrimestre: 1 },
    { nombre: "Física y Química", correlativas: [], cuatrimestre: 1 },
    { nombre: "Matemática", correlativas: [], cuatrimestre: 1 },
    { nombre: "Análisis Matemático 1", correlativas: ["Matemática"], cuatrimestre: 1 },
    { nombre: "Introducción a la Ingeniería", correlativas: ["Ambientación Universitaria"], cuatrimestre: 1 },
    { nombre: "Química", correlativas: ["Física y Química"], cuatrimestre: 1 },
    { nombre: "Economía", correlativas: ["Matemática"], cuatrimestre: 1 },
];

function agruparPorCuatrimestre(materias) {
    const grupos = {};
    materias.forEach(mat => {
        if (!grupos[mat.cuatrimestre]) grupos[mat.cuatrimestre] = [];
        grupos[mat.cuatrimestre].push(mat);
    });
    return grupos;
}

function estaAprobada(nombre) {
    return localStorage.getItem(nombre) === "aprobada";
}

function actualizarMalla() {
    const contenedor = document.getElementById("contenedor-general");
    contenedor.innerHTML = "";
    const grupos = agruparPorCuatrimestre(materias);

    for (const cuatri in grupos) {
        const col = document.createElement("div");
        col.className = "cuatrimestre";
        col.innerHTML = `<h2>${cuatri}º Cuatrimestre</h2>`;

        grupos[cuatri].forEach(materia => {
            const div = document.createElement("div");
            div.className = "materia";
            div.textContent = materia.nombre;

            if (estaAprobada(materia.nombre)) {
                div.classList.add("aprobada");
            } else if (materia.correlativas.every(estaAprobada)) {
                div.classList.add("desbloqueada");
                div.onclick = () => {
                    localStorage.setItem(materia.nombre, "aprobada");
                    actualizarMalla();
                };
            } else {
                div.classList.add("bloqueada");
            }

            col.appendChild(div);
        });

        contenedor.appendChild(col);
    }
}

function resetear() {
    localStorage.clear();
    actualizarMalla();
}

actualizarMalla();
