document.addEventListener("DOMContentLoaded", () => {
    const tareaInput = document.getElementById("tareaInput");
    const agregarTaButton = document.getElementById("agregarTa");
    const listaT = document.getElementById("listaT");
    const prioridadInput = document.getElementById("prioridad");
    const botonRegresar = document.getElementById("botonRegresar");

    botonRegresar.addEventListener("click", () => {
        window.location.href = "";
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const prioridadValor = prioridadInput.value;
        const tareaValor = tareaInput.value.trim();

        if (tareaValor !== "" && prioridadValor !== "" && prioridadValor !== "0") {
            agregarTarea(tareaValor, prioridadValor);
            tareaInput.value = ""; 
            prioridadInput.value = "";
            form.classList.remove("was-validated");
        } else {
            form.classList.add("was-validated"); 
        }
    });

    const agregarTarea = (tarea, prioridad) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        listItem.dataset.prioridad = prioridad;

        const prioridadTexto = prioridad === "1" ? "Alta" : prioridad === "2" ? "Media" : "Baja";

        listItem.innerHTML = `
            <div>
                <strong class="tarea-text">${tarea}</strong> <span class="badge bg-secondary ms-2">${prioridadTexto}</span>
            </div>
            <div>
                <button class="btn btn-warning btn-sm editar-btn me-2">Editar</button>
                <button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button>
            </div>
        `;

        listaT.appendChild(listItem);
        ordenarTareas();
        listItem.querySelector(".eliminar-btn").addEventListener("click", () => eliminarTarea(listItem));
        listItem.querySelector(".editar-btn").addEventListener("click", () => editarTarea(listItem));
    };

    const ordenarTareas = () => {
        const tareas = Array.from(listaT.children);
        tareas.sort((a, b) => a.dataset.prioridad - b.dataset.prioridad);
        listaT.innerHTML = "";
        tareas.forEach((tarea) => listaT.appendChild(tarea));
    };

    const eliminarTarea = (listItem) => {
        listItem.remove();
    };

    const editarTarea = (listItem) => {
        const tareaTexto = listItem.querySelector(".tarea-text");
        const tareaEdit = document.createElement("input");
        tareaEdit.type = "text";
        tareaEdit.value = tareaTexto.textContent;
        tareaTexto.replaceWith(tareaEdit);

        const guardarBtn = document.createElement("button");
        guardarBtn.textContent = "Guardar";
        guardarBtn.classList.add("btn", "btn-sm", "btn-success");

        listItem.querySelector(".editar-btn").replaceWith(guardarBtn);

        guardarBtn.addEventListener("click", () => {
            const nuevaTarea = tareaEdit.value.trim();
            if (nuevaTarea) {
                tareaTexto.textContent = nuevaTarea;
                tareaEdit.replaceWith(tareaTexto);
                guardarBtn.replaceWith(listItem.querySelector(".editar-btn"));
            } else {
                alert("Por favor, ingresa una tarea válida.");
            }
        });
    };
});