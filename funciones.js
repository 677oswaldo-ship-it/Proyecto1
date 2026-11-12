
class Paciente {
    constructor(nombre, ritmoCardiaco, oxigenacion) {
        this.nombre = nombre;
        this.ritmoCardiaco = ritmoCardiaco;
        this.oxigenacion = oxigenacion;
        this.nivelRiesgo = this.calcularRiesgo();
    }

    calcularRiesgo() {
        if (this.oxigenacion < 90 || this.ritmoCardiaco > 130) {
            return "Rojo (Crítico)";
        } else if (this.oxigenacion >= 90 && this.oxigenacion <= 94) {
            return "Amarillo (Urgente)";
        } else {
            return "Verde (Estable)";
        }
    }
}


let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];


document.getElementById("btnRegistrar").addEventListener("click", function() {

    let nombre = document.getElementById("nombreP").value.trim();
    let oxigenoTexto = document.getElementById("oxigenoP").value;
    let ritmoTexto = document.getElementById("ritmoP").value;

    if (nombre === "" || oxigenoTexto === "" || ritmoTexto === "") {
        alert("Por favor, completa todos los campos");
        return;
    }

    let oxigenacion = Number(oxigenoTexto);
    let ritmoCardiaco = Number(ritmoTexto);

    if (oxigenacion < 0 || oxigenacion > 100 || ritmoCardiaco <= 0) {
        alert("Ingresa signos vitales válidos");
        return;
    }

    let paciente = new Paciente(nombre, ritmoCardiaco, oxigenacion);

    pacientes.push(paciente);

    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    mostrarPacientes();

    document.getElementById("nombreP").value = "";
    document.getElementById("oxigenoP").value = "";
    document.getElementById("ritmoP").value = "";
});

// Mostrar pacientes en la tabla
function mostrarPacientes() {

    let lista = document.getElementById("listaPacientes");

    lista.innerHTML = "";

    for (let i = 0; i < pacientes.length; i++) {

        let paciente = pacientes[i];
        let color = "";

        if (paciente.nivelRiesgo === "Rojo (Crítico)") {
            color = "table-danger";
        } else if (paciente.nivelRiesgo === "Amarillo (Urgente)") {
            color = "table-warning";
        } else {
            color = "table-success";
        }

        let fila = document.createElement("tr");
        fila.className = color;

        let nombre = document.createElement("td");
        nombre.textContent = paciente.nombre;

        let oxigeno = document.createElement("td");
        oxigeno.textContent = paciente.oxigenacion + "%";

        let ritmo = document.createElement("td");
        ritmo.textContent = paciente.ritmoCardiaco;

        let riesgo = document.createElement("td");
        riesgo.textContent = paciente.nivelRiesgo;

        fila.appendChild(nombre);
        fila.appendChild(oxigeno);
        fila.appendChild(ritmo);
        fila.appendChild(riesgo);

        lista.appendChild(fila);
    }
}


mostrarPacientes();
