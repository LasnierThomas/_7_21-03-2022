const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const userRoutes = require('./routes/user');
const articlesRoutes = require('./routes/Articles');

const connection = mysql.createConnection({
    // Get ProxySQL unix domain socket path from the environment
    socketPath: process.env["mysql_b6c35bbb-ab66-49c8-8820-a850fcdcb6fb"],
    // Get the database user from the environment
    user: process.env["ubeery0kfyx7joet"],
    // Get the database password from the environment
    password: process.env["oOAva5G6qrV9c96BStqx"],
    // Get the database name from the environment
    database: process.env["ba60kwwwfjxiptetke7u"]
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/articles', articlesRoutes);

module.exports = app;


