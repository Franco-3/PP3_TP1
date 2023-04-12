const mysql = require('mysql');
const { promisify } = require('util');

const connection = {
    host : 'localhost',
    database : 'pp3tp1bd',
    user : 'root1',
    password : '123root123'
};

const pool = mysql.createPool(connection);

pool.getConnection((err, connection) => {
    /*
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Database connection closed')
    }
   
    if (err.code === 'ER_CON_COUNT_ERROR') {
        console.log('Database has to many connections')
    }
    if (err.code === 'ECONNREFUSED') {
        console.log('Database connection was refused')
    }
     */
    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

pool.query = promisify(pool.query);
/*
connection.connect(function(error) {
    if (error) {
        throw error;
    }
    else{
        console.log('MySQL database is connected Successfully');
    }
});
*/
module.exports = pool;