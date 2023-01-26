const { Pool } = require('pg')

const client = new Pool({
    user: 'benrichardson',
    host: 'localhost',
    database: 'pets',
    password: '',
    port: 5432,
})

module.exports = client;