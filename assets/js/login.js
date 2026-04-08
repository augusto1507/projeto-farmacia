const botaoAcessar = document.getElementById("acessar");
botaoAcessar.addEventListener("click", login);

function login() {
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;

  const emailCorreto = "batatinha@gmail.com";
  const senhaCorreta = "12345";


  if (email === emailCorreto && senha === senhaCorreta) {
    window.location.href = "home.html";
  } else {
    alert("Usuário ou senha inválidos!");
  }
}