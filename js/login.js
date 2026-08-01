function login(){

    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;
    let mensagem = document.getElementById("mensagem");


    let usuarios = [
        {
            nome: "Gerência",
            usuario: "gerencia",
            senha: "1234",
            perfil: "gerencia"
        },

        {
            nome: "Encarregado",
            usuario: "encarregado",
            senha: "1234",
            perfil: "encarregado"
        },

        {
            nome: "Laboratorista Líder",
            usuario: "liderA",
            senha: "1234",
            perfil: "lider"
        },

        {
            nome: "Auxiliar de Laboratório",
            usuario: "auxiliarA",
            senha: "1234",
            perfil: "auxiliar"
        }
    ];


    let encontrado = usuarios.find(
        u => u.usuario === usuario && u.senha === senha
    );


    if(encontrado){

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(encontrado)
        );


        window.location.href = "dashboard.html";

    }else{

        mensagem.innerHTML = 
        "Usuário ou senha incorretos";

    }

}
