window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});

const tbody = document.getElementById("body-fornecedores")

function carregarFornecedores() {
    fetch("https://api.franciscosensaulas.com/api/v1/farmacia/fornecedores")
        .then((response) => {
            return response.json()
        })
        .then((fornecedores) => {
            tbody.innerHTML = ""
            for (let i = 0; i < fornecedores.length; i++) {
                let fornecedor = fornecedores[i]

                const novaLinha = document.createElement("tr")
                novaLinha.innerHTML = `
            <td>${fornecedor.id}</td>
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.cnpj}</td>
            <td>
                <a data-id = "${fornecedor.id}" href="/fornecedores-form.html?id=${fornecedor.id}" data-action="edit">editar</a>
                <button class="botao-apagar" data-id="${fornecedor.id}">
                <i>Deletar</i>
                </button>
            </td>
                                    `

                tbody.appendChild(novaLinha)
            }
            cliqueBotaoApagar()


        })
        .catch((erro) => {
            alert("Algo deu errado")
        })
}

function cliqueBotaoApagar() {
    let botaoApagar = document.getElementsByClassName("botao-apagar")

    for (let i = 0; i < botaoApagar.length; i++) {

        let botao = botaoApagar[i]

        botao.addEventListener("click", confirmarApagar)
    }

}

function confirmarApagar(event) {
    let deveApagar = confirm("Realmente deseja apagar?")

    if (deveApagar !== true) {
        return
    }

    let id = event.target.getAttribute("data-id")

    if (event.target.tagName === "I") {
        id = event.target.parentNode.getAttribute("data-id")
    }

    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/fornecedores/${id}`, {
        "method": "DELETE"
    })
        .then(() => {
            carregarFornecedores()
        })
        .catch((erro) => {
            alert("Algo deu errado")
        })
}









carregarFornecedores()