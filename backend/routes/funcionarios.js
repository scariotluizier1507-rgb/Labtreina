const express = require("express");
const router = express.Router();

const pool = require("../database/conexao");



// LISTAR FUNCIONÁRIOS

router.get("/", async (req,res)=>{

    try{

        const resultado = await pool.query(
            "SELECT * FROM funcionarios"
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
        id_turno

    } = req.body;



    try{


        const resultado = await pool.query(

        `INSERT INTO funcionarios
        (nome, matricula, cargo, id_turno)
        VALUES ($1,$2,$3,$4)
        RETURNING *`,

        [
            nome,
            matricula,
            cargo,
            id_turno
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
