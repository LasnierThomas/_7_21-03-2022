const mysql = require('mysql');

const userSchema = mysql.Schema({

    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },

});

module.exports = mysql.model('user', userSchema);