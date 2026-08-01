const API = "https://treinaccgl-backend.onrender.com/funcionarios";


// Carregar funcionários do banco

async function carregarFuncionarios(){

    try {

        const resposta = await fetch(API);

        const funcionarios = await resposta.json();


        const tabela = document.getElementById("listaFuncionarios");

        tabela.innerHTML = "";


        funcionarios.forEach(f => {

            tabela.innerHTML += `

            <tr>

            <td>${f.nome}</td>

            <td>${f.matricula}</td>

            <td>${f.cargo}</td>

            <td>${f.id_setor}</td>

            <td>${f.nome_turno || f.id_turno}</td>

            <td>${f.status}</td>

            </tr>

            `;

        });


    } catch(error){

        console.log("Erro ao buscar funcionários:", error);

    }

}



// Criar funcionário

async function salvarFuncionario(){


const funcionario = {


nome: document.getElementById("nome").value,

matricula: document.getElementById("matricula").value,

cargo: document.getElementById("cargo").value,

id_setor: document.getElementById("setor").value,

id_turno: document.getElementById("turno").value,

status: document.getElementById("status").value


};



try{


const resposta = await fetch(API, {


method:"POST",


headers:{

"Content-Type":"application/json"

},


body: JSON.stringify(funcionario)


});



const resultado = await resposta.text();


console.log(resultado);



if(resposta.ok){


alert("Funcionário cadastrado com sucesso!");

carregarFuncionarios();


}else{


alert("Erro ao cadastrar: " + resultado);


}



}catch(error){


console.log(error);

alert("Erro de conexão com o servidor");


}


}




carregarFuncionarios();
