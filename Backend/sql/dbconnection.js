const mysql = require('mysql');

const connection = mysql.createConnection({
    // Get ProxySQL unix domain socket path from the environment
    host: "ba60kwwwfjxiptetke7u-mysql.services.clever-cloud.com",
    // Get the database user from the environment
    user: "ubeery0kfyx7joet",
    // Get the database password from the environment
    password: "oOAva5G6qrV9c96BStqx",
    // Get the database name from the environment
    database: "ba60kwwwfjxiptetke7u",
    port: 3306,
});

module.exports = connection; 
