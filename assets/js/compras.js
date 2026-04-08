
const tbody = document.getElementById("tbody-compras")

function carregarCompras(){
    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/compras`)
    .then((response) => {
        return response.json()
    })
    .then((compras) => {
        tbody.innerHTML = ""
        for(let i = 0; i < compras.length; i++){
            let compra = compras[i] 

            const novaLinha = document.createElement("tr")

            novaLinha.innerHTML = `
            <td>${compra.id}</td>
            <td>${compra.dataCompra}</td>
            <td>${compra.valorTotal}</td>
            <td>${compra.fornecedorId}</td>
            <td>
                <a data-id = "${compra.id}" href="/compras-form.html?id=${compra.id}" data-action="edit">editar</a>
                <button class="botao-apagar" data-id="${compra.id}">
                <i>Deletar</i>
                </button>
            </td>`

            tbody.appendChild(novaLinha)
        }
        cliqueBotaoApagar()
    })
    .catch((erro) => {
        console.log("Algo deu errado")
    })

    
}

function cliqueBotaoApagar(){
    let botaoApagar = document.getElementsByClassName("botao-apagar")
    for(let i = 0; i < botaoApagar.length; i++){
        let botao = botaoApagar[i]

        botao.addEventListener("click", confirmarApagar)
    }
}

function confirmarApagar(event){
    let deveApagar = confirm("Você deseja apagar")
    if(deveApagar !== true){
        return
    }

    let id = event.target.getAttribute("data-id")

    if(event.target.tagName === "I"){
        id = event.target.parentNode.getAttribute("data-id")
    }

    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/compras/${id}`, {
        "method":"DELETE"
    })
    .then(() => {
        carregarCompras()
    })
    .catch((erro) => {
        alert("Algo deu errado")
    })}

carregarCompras()