const API = "https://treinaccgl-backend.onrender.com/funcionarios";


// Carregar funcionários
async function carregarFuncionarios(){

    try {

        const resposta = await fetch(API);

        const funcionarios = await resposta.json();


        const tabela = document.getElementById("listaFuncionarios");

        tabela.innerHTML = "";


        funcionarios.forEach(funcionario => {


            tabela.innerHTML += `

            <tr>

            <td>${funcionario.nome}</td>

            <td>${funcionario.matricula}</td>

            <td>${funcionario.cargo}</td>

            <td>${funcionario.setor}</td>

            <td>${funcionario.turno}</td>

            <td>${funcionario.status}</td>

            </tr>

            `;


        });


    } catch(error){

        console.log("Erro ao carregar funcionários:", error);

    }

}




// Salvar funcionário

async function salvarFuncionario(){


    const funcionario = {


        nome: document.getElementById("nome").value,

        matricula: document.getElementById("matricula").value,

        cargo: document.getElementById("cargo").value,

        setor: document.getElementById("setor").value,

        turno: document.getElementById("turno").value,

        email: document.getElementById("email").value,

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



        if(resposta.ok){


            alert("Funcionário cadastrado com sucesso!");

            limparFormulario();

            carregarFuncionarios();


        }else{


            alert("Erro ao cadastrar funcionário");


        }



    }catch(error){


        console.log(error);

        alert("Falha de conexão com o servidor");


    }



}




function limparFormulario(){


document.getElementById("nome").value="";

document.getElementById("matricula").value="";

document.getElementById("cargo").value="";

document.getElementById("setor").value="";

document.getElementById("turno").value="";

document.getElementById("email").value="";

document.getElementById("status").value="Ativo";


}




// iniciar página

carregarFuncionarios();
