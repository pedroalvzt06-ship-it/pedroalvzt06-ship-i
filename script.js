
// ==========================================
// 1. SISTEMA DEL FORO DE DISCUSIÓN
// ==========================================

const formulario = document.querySelector("form");

if (formulario) {

    const contenedor = document.createElement("div");
    contenedor.id = "nuevas-discusiones";

    const discusiones = document.querySelector("h2");

    if (discusiones && discusiones.parentNode) {
        discusiones.parentNode.insertBefore(contenedor, discusiones);
    } else {
        formulario.parentNode.appendChild(contenedor);
    }

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const nombre = formulario.elements["nombre"]?.value.trim();
        const titulo = formulario.elements["titulo"]?.value.trim();
        const opinion = formulario.elements["opinion"]?.value.trim();

        if (!nombre || !titulo || !opinion) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const articulo = document.createElement("article");

        const encabezado = document.createElement("h3");
        encabezado.textContent = titulo;

        const autor = document.createElement("p");
        autor.textContent = "Publicado por: " + nombre;

        const contenido = document.createElement("p");
        contenido.textContent = opinion;

        articulo.appendChild(encabezado);
        articulo.appendChild(autor);
        articulo.appendChild(contenido);

        contenedor.prepend(document.createElement("hr"));
        contenedor.prepend(articulo);

        formulario.reset();

        alert("¡Tu discusión filosófica ha sido publicada!");
    });
}


// ==========================================
// 2. BANCO DE PREGUNTAS DEL CUESTIONARIO
// ==========================================

const preguntas = [

    {
        pregunta: "1. ¿Qué es la filosofía?",
        respuestas: [
            "El estudio del pensamiento y la existencia",
            "El estudio exclusivo de los animales",
            "Una rama de las matemáticas",
            "El estudio de los planetas"
        ],
        correcta: 0,
        feedback: "La filosofía reflexiona sobre la existencia, el conocimiento y la realidad."
    },

    {
        pregunta: "2. ¿Quién fue Sócrates?",
        respuestas: [
            "Un científico moderno",
            "Un filósofo griego",
            "Un matemático romano",
            "Un escritor medieval"
        ],
        correcta: 1,
        feedback: "Sócrates fue un filósofo griego conocido por su método de diálogo y cuestionamiento."
    },

    {
        pregunta: "3. ¿Qué estudia la ética?",
        respuestas: [
            "Los números",
            "Los fenómenos naturales",
            "La conducta moral humana",
            "Los idiomas"
        ],
        correcta: 2,
        feedback: "La ética estudia la moral, los valores y las acciones humanas."
    },

    {
        pregunta: "4. ¿Qué significa epistemología?",
        respuestas: [
            "Estudio del conocimiento",
            "Estudio del arte",
            "Estudio de la naturaleza",
            "Estudio de la política"
        ],
        correcta: 0,
        feedback: "La epistemología analiza el conocimiento, sus fundamentos y sus límites."
    },

    {
        pregunta: "5. ¿Quién escribió La República?",
        respuestas: [
            "Aristóteles",
            "Platón",
            "Sócrates",
            "Descartes"
        ],
        correcta: 1,
        feedback: "Platón escribió La República, obra que aborda la justicia y la organización política."
    },

    {
        pregunta: "6. ¿Qué estudia la metafísica?",
        respuestas: [
            "Los idiomas antiguos",
            "Los movimientos sociales",
            "La realidad y el ser",
            "Las operaciones matemáticas"
        ],
        correcta: 2,
        feedback: "La metafísica estudia cuestiones fundamentales sobre el ser y la realidad."
    },

    {
        pregunta: "7. ¿Qué filósofo es conocido por la frase 'Pienso, luego existo'?",
        respuestas: [
            "René Descartes",
            "Platón",
            "Aristóteles",
            "Sócrates"
        ],
        correcta: 0,
        feedback: "Descartes utilizó esta idea como fundamento de su reflexión filosófica."
    },

    {
        pregunta: "8. ¿Qué es el conocimiento?",
        respuestas: [
            "Una opinión sin fundamento",
            "La comprensión de información y hechos",
            "Una emoción",
            "Una creencia obligatoria"
        ],
        correcta: 1,
        feedback: "El conocimiento implica comprender información y contar con fundamentos para sostener afirmaciones."
    },

    {
        pregunta: "9. ¿Qué estudia la lógica?",
        respuestas: [
            "Las emociones",
            "La historia antigua",
            "Los argumentos y razonamientos",
            "Las expresiones artísticas"
        ],
        correcta: 2,
        feedback: "La lógica estudia las reglas que permiten evaluar la validez de los razonamientos."
    },

    {
        pregunta: "10. ¿Qué significa para ti vivir una buena vida?",
        abierta: true,
        feedback: "¡Gracias por compartir tu reflexión filosófica!"
    }

];

let preguntaActual = 0;
let puntuacion = 0;
let respondida = false;
let respuestaAbiertaRegistrada = false;

const preguntaTexto = document.getElementById("pregunta");
const respuestasDiv = document.getElementById("respuestas");
const feedbackDiv = document.getElementById("feedback");
const botonSiguiente = document.getElementById("siguiente");
const numeroPregunta = document.getElementById("numero-pregunta");

const preguntaAbierta = document.getElementById("pregunta-abierta");
const respuestaAbierta = document.getElementById("respuesta-abierta");

const resultado = document.getElementById("resultado");
const calificacion = document.getElementById("calificacion");
const botonReiniciar = document.getElementById("reiniciar");

function mostrarPregunta() {

    respondida = false;
    respuestaAbiertaRegistrada = false;

    const pregunta = preguntas[preguntaActual];

    numeroPregunta.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    preguntaTexto.textContent = pregunta.pregunta;

    feedbackDiv.textContent = "";
    respuestasDiv.innerHTML = "";

    botonSiguiente.disabled = true;
    botonSiguiente.textContent = "Siguiente pregunta";

    if (pregunta.abierta) {

        respuestasDiv.style.display = "none";
        preguntaAbierta.style.display = "block";

        respuestaAbierta.value = "";

        respuestaAbierta.oninput = function() {
            botonSiguiente.disabled =
                respuestaAbierta.value.trim() === "";
        };

    } else {

        preguntaAbierta.style.display = "none";
        respuestasDiv.style.display = "flex";

        pregunta.respuestas.forEach((respuesta, indice) => {

            const boton = document.createElement("button");

            boton.textContent = respuesta;
            boton.className = "respuesta";
            boton.type = "button";

            boton.addEventListener("click", function() {
                verificarRespuesta(indice);
            });

            respuestasDiv.appendChild(boton);

        });

    }
}


function verificarRespuesta(indice) {

    if (respondida) return;

    respondida = true;

    const pregunta = preguntas[preguntaActual];
    const botones = respuestasDiv.querySelectorAll("button");

    botones.forEach((boton, i) => {

        boton.disabled = true;

        if (i === pregunta.correcta) {
            boton.style.backgroundColor = "#198754";
            boton.style.color = "white";
        }

        if (i === indice && i !== pregunta.correcta) {
            boton.style.backgroundColor = "#dc3545";
            boton.style.color = "white";
        }

    });

    if (indice === pregunta.correcta) {

        puntuacion++;

        feedbackDiv.textContent =
            "¡Correcto! " + pregunta.feedback;

    } else {

        feedbackDiv.textContent =
            "Respuesta incorrecta. " + pregunta.feedback;

    }

    botonSiguiente.disabled = false;
}


botonSiguiente.addEventListener("click", function() {

    const pregunta = preguntas[preguntaActual];

    // Procesar pregunta abierta
    if (pregunta.abierta) {

        if (!respuestaAbiertaRegistrada) {

            if (respuestaAbierta.value.trim() === "") {
                alert("Escribe tu respuesta antes de continuar.");
                return;
            }

            respuestaAbiertaRegistrada = true;

            preguntaAbierta.style.display = "none";

            preguntaTexto.textContent =
                "Tu respuesta ha sido registrada.";

            feedbackDiv.textContent = pregunta.feedback;

            botonSiguiente.textContent = "Ver resultados";
            botonSiguiente.disabled = false;

            return;
        }

        mostrarResultados();
        return;
    }

    if (!respondida) return;

    preguntaActual++;

    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    }

});

function mostrarResultados() {

    preguntaTexto.style.display = "none";
    numeroPregunta.style.display = "none";
    respuestasDiv.style.display = "none";
    preguntaAbierta.style.display = "none";
    feedbackDiv.style.display = "none";
    botonSiguiente.style.display = "none";

    resultado.style.display = "block";

    calificacion.textContent =
        "Obtuviste " + puntuacion + " de 9 respuestas correctas.";

}


botonReiniciar.addEventListener("click", function() {

    preguntaActual = 0;
    puntuacion = 0;
    respondida = false;
    respuestaAbiertaRegistrada = false;

    preguntaTexto.style.display = "block";
    numeroPregunta.style.display = "block";
    feedbackDiv.style.display = "block";
    respuestasDiv.style.display = "flex";
    botonSiguiente.style.display = "block";

    resultado.style.display = "none";

    mostrarPregunta();

});
mostrarPregunta();
