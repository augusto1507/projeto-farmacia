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
        
    `;

    tbodyRemedios.appendChild(tr);

}

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
            
                                    `

                tbody.appendChild(novaLinha)
            }
            


        })
        .catch((erro) => {
            alert("Algo deu errado")
        })

    }

carregarRemedios()
carregarFornecedores()
