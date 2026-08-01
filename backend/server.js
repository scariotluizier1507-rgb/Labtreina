const express = require("express");
const cors = require("cors");

const funcionarios = require("./routes/funcionarios");


const app = express();


app.use(cors());

app.use(express.json());


// Rota de funcionários

app.use("/funcionarios", funcionarios);



// Teste da API

app.get("/", (req, res) => {

    res.json({

        sistema: "TREINACCGL",

        status: "API funcionando"

    });

});



// Porta do servidor

const PORT = 3000;


app.listen(PORT, () => {

    console.log(
        `TREINACCGL API rodando na porta ${PORT}`
    );

});
