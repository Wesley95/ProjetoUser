//Define a string de conexão ao banco de dados.
module.exports = { 

    development: { 
        database: { 
            host: 'localhost', 
            port: 3306, 
            name: 'db_usuario', 
            dialect: 'mysql', 
            user: 'root', 
            password: null
        } 
    }, 
    production:{ 
        database: { 
            host: process.env.DB_HOST, 
            host: process.env.DB_PORT 
        } 
    } 
} 