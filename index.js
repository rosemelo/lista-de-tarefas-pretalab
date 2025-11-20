// ====== ESTADO GLOBAL ======
let lista = JSON.parse(localStorage.getItem("lista-tarefas")) || [];
let ultimoId = lista.length ? Math.max(...lista.map(t => t.id)) : 0;


// ====== SALVAR NO LOCALSTORAGE ======
function salvar() {
    localStorage.setItem("lista-tarefas", JSON.stringify(lista));
}


// ====== CRIAR HTML DE UMA TAREFA ======
function gerarHTML(tarefa) {
    return `
        <div>
            <p id="tarefa-${tarefa.id}">
                ${tarefa.concluida ? `<strike>${tarefa.texto}</strike>` : tarefa.texto}
            </p>

            <input type="checkbox" 
                ${tarefa.concluida ? 'checked' : ''} 
                onchange="marcarTarefa(${tarefa.id})"
            />

            <button onclick="removerTarefa(${tarefa.id})">
                Remover
            </button>
        </div>
    `;
}


// ====== EXIBIR TODAS AS TAREFAS ======
function exibirLista() {
    const div = document.getElementById("lista-tarefas");
    div.innerHTML = "";  // limpa a tela

    lista.forEach(tarefa => {
        div.innerHTML += gerarHTML(tarefa);
    });
}
exibirLista();


// ====== ADICIONAR UMA NOVA TAREFA ======
function adicionarTarefa() {
    const texto = document.getElementById("nome-tarefa").value.trim();
    if (!texto) return;

    // evitar duplicadas
    if (lista.some(t => t.texto.toLowerCase() === texto.toLowerCase())) {
        alert("Tarefa já existe!");
        return;
    }

    ultimoId++;

    const nova = {
        id: ultimoId,
        texto: texto,
        concluida: false
    };

    lista.push(nova);
    salvar();
    exibirLista();
    document.getElementById("nome-tarefa").value = "";
}


// ====== MARCAR / DESMARCAR ======
function marcarTarefa(id) {
    const tarefa = lista.find(t => t.id === id);

    tarefa.concluida = !tarefa.concluida;
    salvar();
    exibirLista();
}


// ====== REMOVER ======
function removerTarefa(id) {
    lista = lista.filter(t => t.id !== id);
    salvar();
    exibirLista();
}


