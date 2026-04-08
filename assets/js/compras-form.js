let selectorFornecedor = document.getElementById("fornecedor")
const API_URL_FORNECEDORES = `https://api.franciscosensaulas.com/api/v1/farmacia/fornecedores`
const API_URL_COMPRAS = `https://api.franciscosensaulas.com/api/v1/farmacia/compras`

const botaoSalvar = document.getElementById("cadastrar")
botaoSalvar.addEventListener("click" , salvar)


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

    payload = {
        "dataCompra": data,
        "valorTotal": valor,
        "fornecedorId": idFornecedor
    }

    cadastrarCompra(payload)
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




carregarForncedores()