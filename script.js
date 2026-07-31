const botao = document.querySelector(“button”);

botao.addEventListener(“click”, function () {

const usuario = document.querySelector('input[type="text"]').value;
const senha = document.querySelector('input[type="password"]').value;
if (usuario === "admin" && senha === "1234") {
    alert("Bem-vindo ao TREINACCGL!");
    // abre a tela do administrador
    window.location.href = "admin.html";
} else {
    alert("Usuário ou senha incorretos.");
}

});
