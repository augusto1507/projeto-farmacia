const botaoSalvar = document.getElementById("salvar")
botaoSalvar.addEventListener("click", salvar)

const urlParms = new URLSearchParams(window.location.search)
const idParaEditar = urlParms.get("id")

function salvar(){
    let nome = document.getElementById("nome").value
    let cnpj = document.getElementById("cnpj").value

    let payload = {
        "nome": nome ,
        "cnpj": cnpj
    }

    if(idParaEditar !== null){
        editar(payload)
    }else{
        cadastrar(payload)
    }
}

function cadastrar(payload){
    fetch("https://api.franciscosensaulas.com/api/v1/farmacia/fornecedores",{
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(payload)
    })

    .then((data) => {
        return data.json()
    })
    .then(() => {
        alert("Fornecedor cadastrado com sucesso")
    })
    .catch((erro) =>{
        alert("Algo deu errado")
    })
}   

function editar(payload){

    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/fornecedores/${idParaEditar}`, {
        "method":"PUT",
        "headers": {
            "Content-Type":"application/json"
        },
        "body":JSON.stringify.json(payload)
    })
    .then(()=> {
        alert("Alterado com sucesso")
    })
    .catch((erro)=> {
        alert("Algo deu errado")
    })
}


function carregarCategoriaParaEditar() {
    fetch(`https://api.franciscosensaulas.com/api/v1/farmacia/fornecedores/${idParaEditar}`)
        .then(dados => dados.json())
        .then((categoria) => {
            const campoNome = document.getElementById("nome");
            campoNome.value = categoria.nome;
        })
        .catch(erro => {
            alert("Ocorreu um erro ao carregar os dados da categoria");
        })
}

if (idParaEditar !== null) {
    carregarCategoriaParaEditar();
}