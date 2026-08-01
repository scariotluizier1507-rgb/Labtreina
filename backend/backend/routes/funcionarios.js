const express = require("express");
const router = express.Router();

const pool = require("../database/conexao");



// LISTAR FUNCIONÁRIOS

router.get("/", async (req,res)=>{

    try{

        const resultado = await pool.query(

        `
        SELECT 

        funcionarios.*,

        turnos.nome_turno,

        setores.nome_setor


        FROM funcionarios


        LEFT JOIN turnos

        ON funcionarios.id_turno = turnos.id_turno


        LEFT JOIN setores

        ON funcionarios.id_setor = setores.id_setor


        ORDER BY funcionarios.id_funcionario

        `

        );


        res.json(resultado.rows);


    }catch(error){


        res.status(500).json({

            erro:error.message

        });


    }


});







// CADASTRAR FUNCIONÁRIO

router.post("/", async(req,res)=>{


    const {

        nome,

        matricula,

        cargo,

        id_turno,

        id_setor


    } = req.body;



    try{


        const resultado = await pool.query(


        `

        INSERT INTO funcionarios

        (

        nome,

        matricula,

        cargo,

        id_turno,

        id_setor

        )


        VALUES

        ($1,$2,$3,$4,$5)


        RETURNING *

        `,


        [

        nome,

        matricula,

        cargo,

        id_turno,

        id_setor

        ]


        );



        res.json(resultado.rows[0]);



    }catch(error){



        if(error.code === "23505"){


            return res.status(400).json({

                erro:"Esta matrícula já está cadastrada."

            });


        }



        res.status(500).json({

            erro:error.message

        });



    }



});








// ALTERAR STATUS DO FUNCIONÁRIO

router.put("/:id", async(req,res)=>{


    const id = req.params.id;


    const {


        status,

        alterado_por,

        motivo_status


    } = req.body;



    try{


        const resultado = await pool.query(


        `

        UPDATE funcionarios


        SET


        status=$1,


        data_status=CURRENT_DATE,


        alterado_por=$2,


        motivo_status=$3



        WHERE id_funcionario=$4



        RETURNING *


        `,


        [


        status,


        alterado_por,


        motivo_status,


        id


        ]



        );



        res.json(resultado.rows[0]);



    }catch(error){


        res.status(500).json({

            erro:error.message

        });


    }


});





module.exports = router;
