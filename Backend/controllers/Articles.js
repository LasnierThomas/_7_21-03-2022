const Articles = require('../models/Article');
const fs = require('fs');

exports.getAllArticles = (req, res, next) => {
    Articles.find()
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneArticles = (req, res, next) => {
    Articles.find({ _id: req.params.id })
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({ error }));
};

exports.createArticles = (res, req, next) => {
    const ArticlesObject = JSON.parse(req.body.article);
    delete ArticlesObject._id;
    const newArticle = new Articles({
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
    Articles.updateOne({ _id: req.params.id }, { ...ArtcilesObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Artcile modifié' }))
        .catch(error => res.status(400).json({ error }));

};

exports.deleteArticles = (req, res, next) => {
    Articles.findOne({ _id: req.params.id })
        .then(newArticle => {
            const filename = newArticle.imageURL.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Articles.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Article Supprimé' }))
                    .catch(error => res.status(400).json({ error }))
            });
        })
        .catch(error => res.status(500).json({ error }));

    Articles.findOne({ _id: req.paramas.id })
        .then((newArticle) => {
            if (!newArticle) {
                return res.status(404).json({ error: new error('article non trouvé') });
            }
            if (newArticle.userId !== req.auth.userId) {
                return res.status(401).json({ error: new error('Requête non autorisé') });
            }

        })
};