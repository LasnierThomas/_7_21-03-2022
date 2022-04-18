const mysql = require('mysql');


const articlesSchema = mysql.Schema({

    userId: { type: String, required: true },
    title: { type: String, required: true },
    imageURL: { type: String, required: true },
    description: { type: String, required: true },

});

module.exports = mysql.model('Article', articlesSchema);