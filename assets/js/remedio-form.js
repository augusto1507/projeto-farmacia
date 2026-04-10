const API_REMEDIOS_BASE_URL = "https://api.franciscosensaulas.com/api/v1/farmacia/remedios";
const API_CATEGORIAS_BASE_URL = "https://api.franciscosensaulas.com/api/v1/farmacia/categorias-remedio";

const selectCategorias = document.getElementById("categoria");
const campoNome = document.getElementById("nome");
const campoPreco = document.getElementById("preco");


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
    salvarRemedio(payload);
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
        .then(_ => window.location.href = "/remedio.html")
        .catch(erro => {
            alert("Ocorreu um erro ao cadastrar o remédio");
        })
}

function carregarCategorias() {
    fetch(API_CATEGORIAS_BASE_URL)
        .then(dados => {
            return dados.json()
        })
        .then(categorias => {
            for (let i = 0; i < categorias.length; i += 1) {
                const categoria = categorias[i];

                const optionSelect = `
                <option value="${categoria.id}">${categoria.nome} - ${categoria.descricao}</option>`;

                selectCategorias.innerHTML += optionSelect;
            }
        })
}

carregarCategorias()
