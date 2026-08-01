const { Pool } = require("pg");


const pool = new Pool({

    host: "SEU_HOST_DO_BANCO",

    user: "SEU_USUARIO",

    password: "SUA_SENHA",

    database: "treinaccgl",

    port: 5432

});


module.exports = pool;
