const fs = require('fs');
const { stringify } = require('querystring');


// exports.Articles = {
//     userId: String,
//     title: String,
//     imageURL: String,
//     description: String,
// }

<<<<<<< HEAD
var Articles = {
    pseudo: String,
    title: String,
    text: String,
    imageURL: String
=======
var Articles = {};


exports.getAllArticles = (req, res, next) => {
    Articles.find() // TODO: créer une requête SQL
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({ error }));
>>>>>>> d22be14868a04b92213e3a4c0e5d2935c0c2c8e3
};


exports.getAllArticles = (req, res, next) => {
    connection.query(`SELECT * FROM Article WHERE idArticle= ?`,
        req.params.id,
        (error, result) => {
            if (error) {
                return res.status(400).json({ error });
            }

            return res.status(200).json(result);
        },
    );
};


exports.getOneArticles = (req, res, next) => {
<<<<<<< HEAD
    connection.query(`SELECT * FROM Article WHERE title=${req.body.title} LIMIT 1;`,
        function (error, results, fields) {
            if (error) {
                return res.status(400).json({ error });
            }
            if (!results || results.length == 0) {
                return res.status(401).json({ error: 'Artcile trouvé' });
            }
            Articles = results[0];
            return res.status(200).json(Articles);
        });
=======
    Articles.find({ _id: req.params.id }) // TODO: créer une requête SQL
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({ error }));
>>>>>>> d22be14868a04b92213e3a4c0e5d2935c0c2c8e3
};

exports.createArticles = (res, req, next) => {
    const ArticlesObject = JSON.parse(req.body.article);
    delete ArticlesObject._id;
<<<<<<< HEAD
    const newArticle = new Articles({

=======
    const newArticle = new Articles({  // TODO: créer une requête SQL
>>>>>>> d22be14868a04b92213e3a4c0e5d2935c0c2c8e3
        ...ArticlesObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    newArticle.save()
        .then(() => res.status(200).json({ message: 'arcticle enregistré' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyArtciles = (res, req, next) => {
    const ArtcilesObject = req.file ?
        {
            ...JSON.parse(req.body.article),
            imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Articles.updateOne({ _id: req.params.id }, { ...ArtcilesObject, _id: req.params.id }) // TODO: créer une requête SQL
        .then(() => res.status(200).json({ message: 'Artcile modifié' }))
        .catch(error => res.status(400).json({ error }));

};

exports.deleteArticles = (req, res, next) => {
    Articles.findOne({ _id: req.params.id })  // TODO: créer une requête SQL
        .then(newArticle => {
            const filename = newArticle.imageURL.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Articles.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Article Supprimé' }))
                    .catch(error => res.status(400).json({ error }))
            });
        })
        .catch(error => res.status(500).json({ error }));

    Articles.findOne({ _id: req.paramas.id })  // TODO: créer une requête SQL
        .then((newArticle) => {
            if (!newArticle) {
                return res.status(404).json({ error: new error('article non trouvé') });
            }
            if (newArticle.userId !== req.auth.userId) {
                return res.status(401).json({ error: new error('Requête non autorisé') });
            }

        })
};