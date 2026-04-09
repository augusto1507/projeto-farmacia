window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});

let selectorFornecedor = document.getElementById("fornecedor")
const API_URL_FORNECEDORES = `https://api.franciscosensaulas.com/api/v1/farmacia/fornecedores`
const API_URL_COMPRAS = `https://api.franciscosensaulas.com/api/v1/farmacia/compras`

const botaoSalvar = document.getElementById("cadastrar")
botaoSalvar.addEventListener("click" , salvar)

const urlParms = new URLSearchParams(window.location.search)
const idParaEditar = urlParms.get("id")


function carregarForncedores() {
    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/fornecedores`)
        .then((dados) => {
            return dados.json()
        })
        .then((fornecedores) => {
            console.log(fornecedores)
            for (let i = 0; i < fornecedores.length; i++) {
                let fornecedor = fornecedores[i]

                let optionSelecte = `<option value="${fornecedor.id}">${fornecedor.nome}</option>`

                selectorFornecedor.innerHTML += optionSelecte
            }
        })
}

function salvar(){
    let data = document.getElementById("data-hora").value
    let valor = document.getElementById("valor").value
    let idFornecedor = document.getElementById("fornecedor").value

    let payload = {
        "dataCompra": data,
        "valorTotal": valor,
        "fornecedorId": idFornecedor
    }

    if(idParaEditar === null){
        cadastrarCompra(payload)
    }
    else{
        editar(payload)
    }

    
}


function cadastrarCompra(payload){

    fetch(API_URL_COMPRAS, {
        "method":"POST",
        "headers": {
            "Content-type": "application/json"
        },
        "body": JSON.stringify(payload)
    })
    .then((data) => {
        return data.json()
    })
    .then(()=> {
        alert("Compra cadastrada com sucesso")
    })
}

function editar(payload){
    fetch(API_URL_COMPRAS, {
        "method":"PUT",
        "headers": {
            "Content-Type":"application/json"
        },
        "body": JSON.stringify(payload)

    })
    .then(() => {
        alert("Compra editada com sucesso")
    })
    .catch((erro) => {
        alert("Algo deu errado")
    })
}

function carregarCompraParaEditar(){
    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/compras/${idParaEditar}`)
    .then(dados => dados.json())
    .then((compras) => {
        const campoData = document.getElementById("data-hora")
        campoData.value = compras.dataCompra
        const campoValor = document.getElementById("valor")
        campoValor.value = compras.valorTotal
        const campoFornecedor = document.getElementById("fornecedor")
        campoFornecedor.value = compras.fornecedorId
    })
    .catch((erro) => {
        alert("algo deu errado")
    })
}



if(idParaEditar !== null){
    carregarCompraParaEditar()
}
carregarForncedores()