const temaSalvo = localStorage.getItem("theme");
const body = document.getElementById("body")

if (temaSalvo === "dark") {
    body.classList.toggle("dark-mode"); 
}else{
    body.classList.toggle("dark-mode")
}