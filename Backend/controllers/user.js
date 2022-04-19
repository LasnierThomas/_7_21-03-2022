const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../sql/dbconnection');

// TODO: supprimer le code ci dessous
// const userSchema = {
//     email: { type: String, require: true, unique: true },
//     password: { type: String, require: true },
// };

exports.signup = (req, res, next) => {
    // bcrypt.hash(req.body.password, 10)
    //     .then(hash => {
    //         // TODO: Envoyer une requete en SQL (Créer un nouvel utilisateur)
    //         const user = new User({
    //             email: req.body.email,
    //             pseudo: req.body.pseudo,
    //             password: hash,
    //             controlPassword: hash
    //         });
    //         // TODO: Vérifier que le traitement est correct et renvoyer le résultat
    //         user.save()
    //             .then(() => res.status(201).json({ message: 'Utilisateur crée' }))
    //             .catch(error => res.status(400).json({ error }));
    //     })
    //     .catch(error => res.status(400).json({ error }));
};

exports.testLogin = (req, res, next) => {
    connection.query(`SELECT * FROM User WHERE email="aurelien@aurelien.aurelien" LIMIT 1;`,
        function (error, results, fields) {
            if (error) {
                return res.status(400).json({ error });
            }
            if (!results || results.length == 0) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            user = results[0];
            return res.status(200).json(user);
        })
};

exports.login = (req, res, next) => {
    connection.query(`SELECT * FROM User LIMIT 1 WHERE email=${req.body.email}`,
        function (error, results, fields) {
            if (error) {
                return res.status(400).json({ error });
            }
            if (!results) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            user = results[0];
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expriresIN: '24h' }
                        )
                    });
                })
                .catch(error => res.status(400).json({ error }));
        })
};

// exports.deleteUser = (req, res, next) => {
//     User.findOne({ _id: req.params.id })

//         .then(() => res.status(200).json({ message: 'User Supprimé' }))
//         .catch(error => res.status(400).json({ error }))
//         .catch(error => res.status(500).json({ error }));
// };