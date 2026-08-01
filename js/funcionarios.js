const API = "https://treinaccgl-backend.onrender.com/funcionarios";


// Teste de carregamento

console.log("Funcionarios.js carregado");


// Carregar funcionários ao abrir a página

window.onload = function(){

    listarFuncionarios();

};



// CADASTRAR FUNCIONÁRIO

async function cadastrarFuncionario(){


    console.log("Botão cadastrar acionado");


    const funcionario = {


        nome: document.getElementById("nome").value,

        matricula: document.getElementById("matricula").value,

        cargo: document.getElementById("cargo").value,

        id_turno: Number(document.getElementById("turno").value)


    };


    console.log(funcionario);



    if(!funcionario.nome){

        alert("Digite o nome do funcionário");

        return;

    }



    try{


        const resposta = await fetch(API, {


            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body: JSON.stringify(funcionario)


        });



        const dados = await resposta.json();


        console.log(dados);



        if(!resposta.ok){


            throw new Error(dados.erro || "Erro na API");


        }



        alert(
            "Funcionário cadastrado com sucesso!"
        );


        listarFuncionarios();



    }catch(error){


        console.log("ERRO:", error);


        alert(
            "Erro ao cadastrar: " + error.message
        );


    }


}






// LISTAR FUNCIONÁRIOS


async function listarFuncionarios(){


    try{


        const resposta = await fetch(API);


        const funcionarios = await resposta.json();



        let tabela = document.getElementById("listaFuncionarios");



        tabela.innerHTML = "";



        funcionarios.forEach(f => {



            tabela.innerHTML += `

            <tr>

            <td>${f.nome}</td>

            <td>${f.cargo}</td>

            <td>${f.id_turno}</td>

            </tr>

            `;



        });



    }catch(error){


        console.log(
            "Erro ao buscar funcionários",
            error
        );


    }


}
