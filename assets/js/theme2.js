const temaSalvo = localStorage.getItem("theme");
const body = document.getElementById("body")

if (temaSalvo === "dark") {
    body.classList.add("dark-mode"); 
}else{
    body.classList.remove("dark-mode")
}