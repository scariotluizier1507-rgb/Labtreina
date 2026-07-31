function verificarLogin(){
let perfil = localStorage.getItem("perfil");
if(!perfil){
location.href="login.html";
}
}
function somenteGestor(){
let perfil = localStorage.getItem("perfil");
if(perfil !== "gestor"){
alert("Acesso permitido somente para gestores.");
location.href="index.html";
}
}
function somenteAuxiliar(){
let perfil = localStorage.getItem("perfil");
if(perfil !== "auxiliar"){
alert("Acesso permitido somente para auxiliares.");
location.href="index.html";
}
}
function sair(){
localStorage.removeItem("perfil");
location.href="login.html";
}
