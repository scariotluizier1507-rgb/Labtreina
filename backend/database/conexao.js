const { Pool } = require("pg");


const pool = new Pool({

    user: "usuario_do_banco",

    host: "localhost",

    database: "treinaccgl",

    password: "senha_do_banco",

    port: 5432

});


module.exports = pool;
