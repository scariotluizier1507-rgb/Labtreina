const API = "https://treinaccgl-backend.onrender.com/funcionarios";


// ==============================
// CARREGAR FUNCIONÁRIOS
// ==============================

async function carregarFuncionarios() {

    try {

        const resposta = await fetch(API);

        const dados = await resposta.json();


        const tabela = document.getElementById("listaFuncionarios");

        tabela.innerHTML = "";


        dados.forEach(funcionario => {


            tabela.innerHTML += `

            <tr>

                <td>${funcionario.nome}</td>

                <td>${funcionario.matricula}</td>

                <td>${funcionario.cargo}</td>

                <td>${funcionario.nome_setor || ""}</td>

                <td>${funcionario.nome_turno || ""}</td>

                <td>${funcionario.status}</td>

            </tr>

            `;


        });


    } catch (erro) {

        console.error("Erro ao carregar:", erro);

        alert("Não foi possível carregar funcionários.");

    }

}





// ==============================
// SALVAR FUNCIONÁRIO
// ==============================


async function salvarFuncionario() {


    const nome = document.getElementById("nome").value.trim();

    const matricula = document.getElementById("matricula").value.trim();

    const cargo = document.getElementById("cargo").value.trim();

    const id_setor = document.getElementById("setor").value;

    const id_turno = document.getElementById("turno").value;



    if(!nome || !matricula || !cargo || !id_setor || !id_turno){

        alert("Preencha todos os campos.");

        return;

    }



    const funcionario = {


        nome: nome,

        matricula: matricula,

        cargo: cargo,

        id_setor: Number(id_setor),

        id_turno: Number(id_turno)


    };



    console.log("Enviando para API:", funcionario);



    try {



        const resposta = await fetch(API, {


            method:"POST",


            headers:{


                "Content-Type":"application/json"

            },


            body: JSON.stringify(funcionario)


        });



        const resultado = await resposta.json();



        console.log("Resposta servidor:", resultado);



        if(resposta.ok){


            alert("Funcionário cadastrado com sucesso!");


            limparCampos();


            carregarFuncionarios();



        } else {


            alert(
                "Erro ao cadastrar: " + 
                (resultado.erro || "Erro desconhecido")
            );


        }



    } catch(erro){


        console.error("Erro POST:", erro);


        alert("Falha de comunicação com servidor.");


    }



}





// ==============================
// LIMPAR FORMULÁRIO
// ==============================


function limparCampos(){


document.getElementById("nome").value="";

document.getElementById("matricula").value="";

document.getElementById("cargo").value="";

document.getElementById("setor").value="";

document.getElementById("turno").value="";


}





// INICIALIZAÇÃO

carregarFuncionarios();
