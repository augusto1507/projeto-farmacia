const API_REMEDIO_BASE_URL = "https://api.franciscosensaulas.com/api/v1/farmacia/remedios";

const tbodyRemedios = document.getElementById("tabela");

function carregarRemedios() {
    tbodyRemedios.innerHTML = "";

    fetch(API_REMEDIO_BASE_URL)
        .then(reponse => reponse.json())
        .then(remedios => {
            for (let i = 0; i < remedios.length; i++) {
                const remedio = remedios[i];
                criarLinha(remedio);
            }
        })
        .catch(error => {
            alert("Erro ao carregar os remédios".error);
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
        <a href="/remedio-form.html?id=${remedio.id}">Editar</a>
        <button class="botao-apagar" data-id="${remedio.id}">Excluir</button>
        </td>
    `;

    tbodyRemedios.appendChild(tr);

}



carregarRemedios();
