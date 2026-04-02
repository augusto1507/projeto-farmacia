const body = document.getElementById("body");
const botaoTema = document.getElementById("mudar-tema");

const temaSalvo = localStorage.getItem("theme");

if (temaSalvo === "dark") {
    body.classList.add("dark-mode"); 
}else{
    body.classList.remove("dark-mode")
}

botaoTema.addEventListener("click", mudarTema);

function mudarTema() {
    body.classList.toggle("dark-mode");

    const dark = body.classList.contains("dark-mode");

    localStorage.setItem("theme", dark ? "dark" : "light");
}