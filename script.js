const botao = document.querySelector("button");

botao.addEventListener("click", function () {

    const usuario = document.querySelector('input[type="text"]').value;
    const senha = document.querySelector('input[type="password"]').value;

    if (usuario === "admin" && senha === "1234") {
        alert("Bem-vindo ao TREINACCGL!");
    } else {
        alert("Usuário ou senha incorretos.");
    }

});
