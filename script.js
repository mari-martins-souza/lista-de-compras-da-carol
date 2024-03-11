function alterarPlaceholder() {
    let textoPlaceholder = document.getElementById("nova-atividade");
    let qntdTarefas = document.getElementById("lista-tarefas");
    if (qntdTarefas.children.length > 0) {
        textoPlaceholder.placeholder = "+ Carolaineee"
    } else {
        textoPlaceholder.placeholder = "digite um item"
    };
};

let botaoNovaTarefa = document.getElementById("botao-nova-tarefa");
let listaTarefas = document.getElementById("lista-tarefas");
let novaAtividade = document.getElementById("nova-atividade");

botaoNovaTarefa.addEventListener("click",  function() {
    if (novaAtividade.value !== "") {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        let li = document.createElement("li");
        let botaoExcluir = document.createElement("img");
        botaoExcluir.src = "img/simbolo-x.png"
        let span = document.createElement("span");
        
        span.appendChild(document.createTextNode(novaAtividade.value));
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(botaoExcluir);
      
        botaoExcluir.addEventListener("click", function() {
            let confirmacao = confirm("Tem certeza Carolidine? Excluiu, morreu, não tem volta");
            if (confirmacao) {
                this.parentElement.remove()   
                atualizarContador();  
                salvarTarefasLocalStorage();
                alterarPlaceholder();   
            }
        });
           
        checkbox.addEventListener("change", function() {
            if(this.checked) {
                this.nextSibling.style.textDecoration = "line-through";
            } else {
                this.nextSibling.style.textDecoration = "none";
            }
            setTimeout(salvarTarefasLocalStorage,0);
        });

        listaTarefas.appendChild(li);
        novaAtividade.value = "";
        atualizarContador();
        alterarPlaceholder();

        botaoExcluir.className ="botao-excluir";
        checkbox.className = "checkbox";

        salvarTarefasLocalStorage();
    }
});


function salvarTarefasLocalStorage() {
    let li = listaTarefas.children;
    let tarefas = [];

    for (let i = 0; i < li.length; i++) {
        let tarefa = {
            nomeDaTarefa: li[i].querySelector("span").innerText,
            tarefaConcluida: li[i].querySelector('input[type="checkbox"]').checked
        };
        tarefas.push(tarefa);
    }

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefasLocalStorage() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas"));

    if (tarefas) {
        for (let i = 0; i < tarefas.length; i++) {
            /*recria os elementos a partir do localStorage
            recria a função da lixeira*/
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = tarefas[i].tarefaConcluida;
            let li = document.createElement("li");
            let botaoExcluir = document.createElement("img");
            botaoExcluir.src = "img/simbolo-x.png"
            let span = document.createElement("span");

            span.appendChild(document.createTextNode(tarefas[i].nomeDaTarefa));
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(botaoExcluir);

            if(checkbox.checked) {
                span.style.textDecoration = "line-through";
            } else {
                span.style.textDecoration = "none";
            }

            botaoExcluir.addEventListener("click", function() {
                let confirmacao = confirm("Tem certeza Carolidine? Excluiu, morreu, não tem volta");
                if (confirmacao) {
                    this.parentElement.remove();
                    atualizarContador();
                    salvarTarefasLocalStorage();
                    alterarPlaceholder();
                }
            });

            checkbox.addEventListener("change", function() {
                if(this.checked) {
                    this.nextSibling.style.textDecoration = "line-through";
                } else {
                    this.nextSibling.style.textDecoration = "none";
                }
                setTimeout(salvarTarefasLocalStorage,0);
            });

            listaTarefas.appendChild(li);
            
            botaoExcluir.className ="botao-excluir";
            checkbox.className = "checkbox";
        }
    }
    atualizarContador();
    alterarPlaceholder();
}

window.onload = carregarTarefasLocalStorage;

function atualizarContador() {
    let contador = document.getElementById("contador-texto");
    let listaTarefas = document.getElementById("lista-tarefas");
    contador.innerText = "quantidade de itens: " + listaTarefas.children.length;
};
