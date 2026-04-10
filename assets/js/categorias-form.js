window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});

const botaoCadastrar = document.getElementById("cadastrar");
botaoCadastrar.addEventListener("click", salvar);

const urlParmas = new URLSearchParams(window.location.search);
const idParaEditar = urlParmas.get("id");

function salvar() {
    let campoCategoria = document.getElementById("categoria");
    let campoDescricao = document.getElementById("descricao");
    let nome = campoCategoria.value;
    let descricao = campoDescricao.value;

    let payload = {
        "nome": nome,
        "descricao": descricao
    }

    if (idParaEditar === null) {
        cadastar(payload);
    } else {
        editar(payload);
    }
}

function editar(payload) {
    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/categorias-remedio/${idParaEditar}`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(payload)
    })
        .then(() => {
            alert("Categoria alterado com sucesso");
        })
        .catch((erro) => {
            alert("Não foi possivel alterar a categoria");
        });
}

function cadastar(payload) {
    fetch("https://api.franciscosensaulas.com/api/v1/farmacia/categorias-remedio", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(payload)
    })
        .then((data) => {
            return data.json();
        })
        .then(() => {
            alert("Categoria cadastrada com sucesso");
        })
        .catch((erro) => {
            alert("Não foi possivel cadastrar a categoria");
        });
}

function carregarCategoriaParaEditar() {
    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/categorias-remedio/${idParaEditar}`)
        .then(dados => dados.json())
        .then((categoria) => {
            const campoCategoria = document.getElementById("categoria");
            campoCategoria.value = categoria.nome;
        })
        .catch(erro => {
            alert("Ocorreu umerro ao carregar os dados da categoria");
        })
}

if (idParaEditar !== null) {
    carregarCategoriaParaEditar();
}

