window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});

const tbodyCategorias = document.getElementById("categoria");

function carregarCategorias(){

    fetch("https://api.franciscosensaulas.com/api/v1/farmacia/categorias-remedio")

    .then((response) => {
        return response.json()
    })
    .then((categorias) => {
        tbodyCategorias.innerHTML = "";

        for (let i = 0; i < categorias.length; i = i + 1) {
            let categoria = categorias[i];

            const novaLinha = document.createElement("tr");
            
            novaLinha.innerHTML = `
                <td>${categoria.id}</td>
                <td>${categoria.nome}</td>
                <td>${categoria.descricao}</td>
                <td>
                    <a href="categorias-form.html?id=${categoria.id}">Editar</a>
                    <button class="botao-apagar" data-id="${categoria.id}">Excluir</button>
                </td>`

                tbodyCategorias.appendChild(novaLinha);

            }
            registarCliquesBotaoApagar();
    })
    .catch((erro) => {
        alert("Não foi possível carregar as categorias");
    })
}

function registarCliquesBotaoApagar(){

    let botoesApagar = document.getElementsByClassName("botao-apagar")
    for (let i = 0; i < botoesApagar.length; i += 1) {
        let botao = botoesApagar[i];

        botao.addEventListener("click", confirmarApagar);
    }
}

function confirmarApagar(event) {

    let deveApagar = confirm("Deseja apagar?");

    if (deveApagar !== true) {
        return;
    }

    let id = event.target.getAttribute("data-id");

    if (event.target.tagName === "I"){
        id = event.target.parentNode.getAttribute("data-id");
    }

    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/categorias-remedio/${id}`, {
        "method": "DELETE"
    })

    .then(() => {
        carregarCategorias();
    })
    .catch((erro) => {
        alert("ocorreu um erro ao apagar a categoria");
    });
}

carregarCategorias();

    

