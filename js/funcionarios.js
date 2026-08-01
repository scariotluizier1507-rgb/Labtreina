const API = "http://localhost:3000/funcionarios";



// Carregar funcionários ao abrir a página

window.onload = function(){

    listarFuncionarios();

};





// CADASTRAR FUNCIONÁRIO

async function cadastrarFuncionario(){


    const funcionario = {


        nome: document.getElementById("nome").value,

        matricula: document.getElementById("matricula").value,

        cargo: document.getElementById("cargo").value,

        id_turno: document.getElementById("turno").value


    };



    try{


        await fetch(API, {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body: JSON.stringify(funcionario)

        });



        alert(
            "Funcionário cadastrado com sucesso!"
        );


        listarFuncionarios();



    }catch(error){


        alert(
            "Erro ao cadastrar funcionário"
        );


    }


}







// LISTAR FUNCIONÁRIOS


async function listarFuncionarios(){


    try{


        const resposta = await fetch(API);


        const funcionarios = await resposta.json();



        let tabela = 
        document.getElementById("listaFuncionarios");



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
            "API ainda não conectada"
        );


    }


}
