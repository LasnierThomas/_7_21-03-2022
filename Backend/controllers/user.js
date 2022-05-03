const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../sql/dbconnection');


exports.signup = (req, res, next) => {

    // bcrypt.hash(req.body.password, 10)
    //     .then(hash => {
    connection.query(`INSERT INTO User (email, pseudo, password) VALUES ('${req.body.email}', '${req.body.pseudo}', '${req.body.password}')`,
        function (error, results, fields) {
            console.debug(error);
            console.debug(results);
            console.debug(fields);
            if (!results || results.length == 0) {
                return res.status(401).json({ error: "L'utilisateur n'a pas pu être créé" });
            }
            res.status(201).json(JSON.stringify(results))
        });


    //         // TODO: Vérifier que le traitement est correct et renvoyer le résultat
    //     user.save()
    //         .then(() => res.status(201).json({ message: 'Utilisateur crée' }))
    //         .catch(error => res.status(400).json({ error }));
    // })
    // .catch(error => res.status(400).json({ error }));
};



// exports.testLogin = (req, res, next) => {
//     connection.query(`SELECT * FROM User WHERE email="aurelien@aurelien.aurelien" LIMIT 1;`,
//         function (error, results, fields) {
//             if (!results || results.length == 0) {
//                 return res.status(401).json({ error: 'Utilisateur non trouvé' });
//             }
//             user = results[0];
//             return res.status(200).json(user);
//         });
// };

exports.login = (req, res, next) => {

    const user = JSON.parse(req.body.pseudo);

    connection.query(`SELECT * FROM User WHERE email="${req.body.email}" LIMIT 1;`,
        function (error, results, fields) {
            console.debug(error);
            console.debug(results);
            console.debug(fields);
            if (!results) {
                return res.status(400).json({ error });
            }
            if (!results || results.length == 0) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            user = results[0];
            return res.status(200).json(user);
        });
    bcrypt.compare(req.body.password, user.password)
    connection.query(`SELECT * FROM User WHERE pseudo="${req.body.pseudo}" LIMIT 1;`,
        function (error, results, fields) {
            console.debug(error);
            console.debug(results);
            console.debug(fields);
            if (!results) {
                return res.status(401).json({ error: 'Mot de pass incorrect' });
            }
            res.status(200).json({
                pseudoId: user._id,
                token: jwt.sign(
                    { pseudoId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(400).json({ error }));
};






// exports.deleteUser = (req, res, next) => {
//     User.findOne({ _id: req.params.id })
//         .then(() => res.status(200).json({ message: 'User Supprimé' }))
//         .catch(error => res.status(400).json({ error }))
//         .catch(error => res.status(500).json({ error }));
// };