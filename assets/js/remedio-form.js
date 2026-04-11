window.addEventListener('load', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
});

const API_REMEDIOS_BASE_URL = "https://api.franciscosensaulas.com/api/v1/farmacia/remedios";
const API_CATEGORIAS_BASE_URL = "https://api.franciscosensaulas.com/api/v1/farmacia/categorias-remedio";

const selectCategorias = document.getElementById("categoria");
const campoNome = document.getElementById("nome");
const campoPreco = document.getElementById("preco");

const urlParams = new URLSearchParams(window.location.search);
const idParaEditar = urlParams.get("id");


const botaoCadastrar = document.getElementById("cadastrar-remedio");
botaoCadastrar.addEventListener("click", cadastrar);

function cadastrar(event) {
    event.preventDefault();
    let preco = campoPreco.value.replace(",", ".");

    let payload = {
        nome: campoNome.value,
        preco: parseFloat(preco),
        categoriaId: Number(selectCategorias.value)
    };

    if (idParaEditar) {
        editarRemedio(payload);
    } else {
        salvarRemedio(payload);
    }
}

function editarRemedio(payload) {
    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/remedios/${idParaEditar}`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(payload)
    })
        .then(() => {
            alert("Remédio atualizado com sucesso");
        })
        .catch((erro) => {
            alert("Erro ao carregar os dados do remédio");
        });
}

function salvarRemedio(payload) {
    fetch(API_REMEDIOS_BASE_URL, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(payload)
    })
        .then(dados => dados.json())
        .then(_ => window.location.href = "remedio.html")
        .catch(erro => {
            alert("Ocorreu um erro ao cadastrar o remédio");
        })
}


function carregarCategorias() {
    return fetch(API_CATEGORIAS_BASE_URL)
        .then(dados => dados.json())
        .then(categorias => {

            selectCategorias.innerHTML = '<option value="">Selecione</option>';

            for (let i = 0; i < categorias.length; i++) {
                const categoria = categorias[i];

                const option = document.createElement("option");
                option.value = categoria.id;
                option.text = `${categoria.nome} - ${categoria.descricao}`;

                selectCategorias.appendChild(option);
            }
        });
}

function carregarRemedioParaEditar() {
    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/remedios/${idParaEditar}`)
        .then(dados => dados.json())
        .then((remedio) => {
            campoNome.value = remedio.nome;
            campoPreco.value = remedio.preco;
            selectCategorias.value = remedio.categoriaId;
        })
        .catch(erro => {
            alert("Ocorreu umerro ao carregar os dados da categoria");
        })
}

function iniciar() {
    carregarCategorias().then(() => {
        if (idParaEditar) {
            carregarRemedioParaEditar();
        }
    });
}

iniciar();

