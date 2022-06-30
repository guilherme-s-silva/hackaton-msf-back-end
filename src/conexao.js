const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.PG_CONNECTION_STRING,
        ssl: { rejectUnauthorized: false}} 
});

module.exports = knex;