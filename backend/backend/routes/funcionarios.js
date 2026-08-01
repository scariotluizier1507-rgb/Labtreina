const express = require("express");
const router = express.Router();

const pool = require("../database/conexao");


// LISTAR FUNCIONÁRIOS

router.get("/", async (req, res) => {

    try {

        const resultado = await pool.query(`
            SELECT 
                funcionarios.*,
                turnos.nome_turno
            FROM funcionarios
            LEFT JOIN turnos
            ON funcionarios.id_turno = turnos.id_turno
            ORDER BY funcionarios.nome
        `);

        res.json(resultado.rows);


    } catch(error) {

        res.status(500).json({
            erro: error.message
        });

    }

});



// CADASTRAR FUNCIONÁRIO

router.post("/", async (req, res) => {


    const {
        nome,
        matricula,
        cargo,
        id_turno
    } = req.body;


    if(!nome || !cargo){

        return res.status(400).json({

            erro:"Nome e cargo são obrigatórios"

        });

    }


    try {


        const resultado = await pool.query(

        `
        INSERT INTO funcionarios
        (
            nome,
            matricula,
            cargo,
            id_turno
        )

        VALUES
        ($1,$2,$3,$4)

        RETURNING *
        `,

        [
            nome,
            matricula,
            cargo,
            id_turno
        ]

        );


        res.json({

            mensagem:"Funcionário cadastrado com sucesso",

            funcionario: resultado.rows[0]

        });


    } catch(error) {


        res.status(500).json({

            erro:error.message

        });

    }


});



module.exports = router;
