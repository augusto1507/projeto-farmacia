window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});

const API_REMEDIO_BASE_URL = "https://api.franciscosensaulas.com/api/v1/farmacia/remedios";

const tbodyRemedios = document.getElementById("tabela");

function carregarRemedios() {
    tbodyRemedios.innerHTML = "";

    fetch(API_REMEDIO_BASE_URL)
        .then(response => response.json())
        .then(remedios => {
            for (let i = 0; i < remedios.length; i++) {
                const remedio = remedios[i];
                criarLinha(remedio);
            }
            registarCliquesBotaoApagar();
        })
        .catch(error => {
           alert("Erro ao carregar os remédios");
        });

}

function criarLinha(remedio) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${remedio.id}</td>
        <td>${remedio.nome}</td>
        <td>${remedio.preco}</td>
        <td>${remedio.categoria?.nome}</td>
        <td>
        <a href="remedio-form.html?id=${remedio.id}">Editar</a>
        <button class="botao-apagar" data-id="${remedio.id}">Excluir</button>
        </td>
    `;

    tbodyRemedios.appendChild(tr);

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

    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/remedios/${id}`, {
        "method": "DELETE"
    })

    .then(() => {
        carregarRemedios();;
    })
    .catch((erro) => {
        alert("Erro ao apagar o remédio");
    });
}



carregarRemedios();
