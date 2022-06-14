const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../sql/dbconnection');


exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            connection.query(`INSERT INTO User (email, pseudo, password) VALUES ('${req.body.email}', '${req.body.pseudo}', '${hash}')`,
                function (error, results, fields) {
                    if (!results || results.length == 0) {
                        return res.status(401).json({ error: "L'utilisateur n'a pas pu être créé" });
                    }
                    res.status(201).json(JSON.stringify(results))
                });
        })
        .catch(error => res.status(400).json({ error }));
};


exports.login = (req, res, next) => {
    connection.query(`SELECT * FROM User WHERE email="${req.body.email}" LIMIT 1;`,
        function (error, results, fields) {
            if (!results) {
                return res.status(401).json({ error: 'email incorrect' });
            }
            const user = results[0]
            const token = jwt.sign(
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )

            const response = {
                pseudo: user.pseudo,
                email: user.email,
                userId: user.id,
                token: token
            }

            console.log(response);
            bcrypt.compare(req.body.password, user.password, function (error, results, fields) {
                if (results) {
                    console.log(results);
                    res.status(200).json(response);
                } else {
                    console.log(error);
                    res.status(400).json({ error: 'Mot de passe incorrect' });
                }
            });
        });
};

exports.userInfo = (req, res, next) => {
    connection.query(`SELECT * FROM User WHERE email="${req.params.userId}" LIMIT 1;`,

        function (error, results, fields) {

            if (results) {
                return res.status(200).json({ message: 'Utilisateur connecter' });
            } else {
                res.status(400).json({ error: 'Impossible de trouvé l' / 'utilisateur' });
            }
        });
}

exports.deleteUser = (req, res, next) => {

    connection.query(`DELETE FROM User WHERE email="${req.params.userId}" LIMIT 1;`,
        function (error, results, fields) {
            console.log(error)
            if (results) {
                return res.status(200).json({ message: 'Utilisateur supprimé' });
            } else {
                res.status(400).json({ error: 'Impossible de supprimer' });
            }
        });
};