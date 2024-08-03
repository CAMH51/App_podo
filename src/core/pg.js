const pg = require('pg');

const connectionDB = {
    user: 'postgres',
    host:'localhost',
    database:'DB_PODO',
    password:'ca850822',
    port:5432
}

const  client = new pg.Pool(connectionDB);

module.exports = client;