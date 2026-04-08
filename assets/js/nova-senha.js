const botaoSalvar = document.getElementById("salvar");
botaoSalvar.addEventListener("click", nova);

function nova() {
    let email = document.getElementById("email").value;
    let cpf = document.getElementById("cpf").value;
    let senha = document.getElementById("nova-senha").value;
    let confirmar = document.getElementById("confirmar-senha").value;

    cpf = formatarCPF(cpf);

    const emailCorreto = "batatinha@gmail.com";
    const cpfCorreto = "123.456.789-10";
    const senhaProibida = "12345";

    if (email !== emailCorreto || cpf !== cpfCorreto) {
        alert("Email ou CPF incorreto");
        return;
    }

    if (senha === senhaProibida) {
        alert("Senha não pode ser igual às 3 últimas");
        return;
    }

    if (senha !== confirmar) {
        alert("As senhas não coincidem!");
        return;
    }

    alert("Cadastro validado com sucesso!");
    window.location.href = "login.html";
}

function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");

    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return cpf;
}