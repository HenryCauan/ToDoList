const input = document.getElementById("input");
const camp = document.getElementById("camp");
const content = document.getElementById("conteudo");
const modal = document.getElementById("modal");
const close = document.getElementById("close");
const campoTarefa = document.getElementById("campo-tarefa");
const iconList1 = document.getElementById("icon-list-1");
const checkList1 = document.getElementById("icon-calendar-1");
const iconList2 = document.getElementById("icon-list-2");
const checkList2 = document.getElementById("icon-calendar-2");


// Carregar tarefas salvas ao abrir a página
window.onload = function () {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.forEach((tarefa) => {
        criarItemNaLista(tarefa);
    });

    tarefasConcluidas = JSON.parse(localStorage.getItem("tarefasConcluidas")) || [];
    imprimirTarefasConcluidas();
};


const closeModal = () => {
    console.log("foi clicado");
    const conteudo = document.querySelector(".conteudo");
    const modal = document.getElementById("modal");

    // Definir visibilidade inicial se não estiver definida
    if (conteudo.style.visibility === "") {
        conteudo.style.visibility = "visible";
    }
    if (modal.style.visibility === "") {
        modal.style.visibility = "hidden";
    }

    // Alternar visibilidade
    if (
        conteudo.style.visibility === "visible" &&
        modal.style.visibility === "hidden"
    ) {
        conteudo.style.visibility = "hidden";
        modal.style.visibility = "visible";
    } else {
        conteudo.style.visibility = "visible";
        modal.style.visibility = "hidden";
    }
};

const showModal = () => {
    console.log("foi clicado");
    const conteudo = document.querySelector(".conteudo");
    const modal = document.getElementById("modal");

    // Definir visibilidade inicial se não estiver definida
    if (conteudo.style.visibility === "") {
        conteudo.style.visibility = "visible";
    }
    if (modal.style.visibility === "") {
        modal.style.visibility = "hidden";
    }

    // Alternar visibilidade
    if (
        conteudo.style.visibility === "visible" &&
        modal.style.visibility === "hidden"
    ) {
        conteudo.style.visibility = "hidden";
        modal.style.visibility = "visible";
    } else {
        conteudo.style.visibility = "visible";
        modal.style.visibility = "hidden";
    }
};

function addList() {
    if (input.value.trim() !== "") {
        criarItemNaLista(input.value);
        salvarTarefa(input.value);
        input.value = "";
    }
}

// Array para armazenar tarefas concluídas (checked)
let tarefasConcluidas = [];

// Função para criar um item na lista principal
function criarItemNaLista(texto) {
    if (tarefasConcluidas.includes(texto)) return; // Evita recriar item já concluído
    const content = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("custom-checkbox");

    checkbox.onclick = function () {
        if (this.checked) {
            content.style.textDecoration = "line-through";
            setTimeout(() => {
                adicionarTarefaConcluida(texto); // Adiciona ao array tarefasConcluidas
                imprimirTarefasConcluidas(); // Atualiza o DOM com as tarefas concluídas
                camp.removeChild(content);
            }, 5000)
        } else {
            content.style.textDecoration = "none";
            removerTarefaConcluida(texto); // Remove do array tarefasConcluidas
            imprimirTarefasConcluidas(); // Atualiza o DOM com as tarefas concluídas
        }
    };

    content.appendChild(checkbox);
    content.appendChild(document.createTextNode(" " + texto));
    camp.appendChild(content);
}

// Função para adicionar tarefa marcada ao array
function adicionarTarefaConcluida(tarefa) {
    if (!tarefasConcluidas.includes(tarefa)) {
        tarefasConcluidas.push(tarefa);
        localStorage.setItem("tarefasConcluidas", JSON.stringify(tarefasConcluidas));
    }
    removerTarefa(tarefa); // remove da lista principal
}

// Função para remover tarefa desmarcada do array
function removerTarefaConcluida(tarefa) {
    tarefasConcluidas = tarefasConcluidas.filter(item => item !== tarefa);
    localStorage.setItem("tarefasConcluidas", JSON.stringify(tarefasConcluidas));
    salvarTarefa(tarefa); // reenvia para lista principal
}

// Função para imprimir as tarefas concluídas no campoTarefa
function imprimirTarefasConcluidas() {
    campoTarefa.innerHTML = ""; // Limpa o campo antes de adicionar novamente
    tarefasConcluidas.forEach((tarefa) => {
        const li = document.createElement("li");
        li.textContent = `• ${tarefa}`;
        li.style.textDecoration = "line-through";
        campoTarefa.appendChild(li);
    });
}

function salvarTarefa(tarefa) {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function removerTarefa(tarefa) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas = tarefas.filter((item) => item !== tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
// Seleciona as divs de conteúdo
const conteudo = document.querySelector(".conteudo");
const conteudo2 = document.querySelector(".conteudo2");

// Estado inicial: só o conteudo visível
conteudo.style.visibility = "visible";
conteudo2.style.visibility = "hidden";


// Alterna para a lista principal ao clicar no iconList
iconList1.addEventListener("click", () => {
    conteudo.style.visibility = "visible";
    conteudo2.style.visibility = "hidden";
});

// Alterna para a lista de tarefas concluídas ao clicar no checkList
checkList1.addEventListener("click", () => {
    conteudo.style.visibility = "hidden";
    conteudo2.style.visibility = "visible";
});

iconList2.addEventListener("click", () => {
    conteudo.style.visibility = "visible";
    conteudo2.style.visibility = "hidden";
});

// Alterna para a lista de tarefas concluídas ao clicar no checkList
checkList2.addEventListener("click", () => {
    conteudo.style.visibility = "hidden";
    conteudo2.style.visibility = "visible";
});
