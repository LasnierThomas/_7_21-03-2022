const fs = require('fs');
// const { stringify } = require('querystring');
const connection = require('../sql/dbconnection');


// var Articles = {
//     pseudo: String,
//     title: String,
//     text: String,
//     imageURL: String
// };


exports.getAllArticles = (req, res, next) => {
  connection.query(
    `SELECT title, pseudo FROM Article `,
    req.params.id,
    (error, result) => {
      if (error) {
        return res.status(400).json({ error });
      }

      return res.status(200).json(result);
    }
  );
};

exports.getOneArticles = (req, res, next) => {
  connection.query(
    `SELECT * FROM Article WHERE title=${req.body.title} LIMIT 1;`,
    function (error, results, fields) {
      if (error) {
        return res.status(400).json({ error });
      }
      if (!results || results.length == 0) {
        return res.status(401).json({ error: "Artcile trouvé" });
      }
      Articles = results[0];
      return res.status(200).json(Articles);
    }
  );
};

exports.createArticles = (req, res, next) => {
  // 1/ Verify
  // Vérifier l'authentification
  const user = req.auth;
  if (!user) {
    return res.status(401).json({ error: "Utilisateur non authentifié" });
  }
  // Vérifier que je respecte les conditions de création d'un article
  if (!req.body.title || req.body.title.length > 128) {
    return res.status(400).json({ error: "Titre incorrect" });
  }

  // 2/ Act => je crée mon article
  connection.query(
    `INSERT INTO Article (title, text, pseudo) VALUES ('${req.body.title}', '${req.body.description}','${user.pseudo}')`,
    function (error, results, fields) {
      if (!results) {
        return res.status(400).json({ error: "Post non crée" });
      }

      // 3/ Je renvoie ce qu'il faut

      return res.status(201).json(JSON.stringify(results[0]));
    }
  );
};

// exports.modifyArticles = (res, req, next) => {
//     const ArtcilesObject = req.file ?
//         {
//             ...JSON.parse(req.body.article),
//             imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//         } : { ...req.body };

//     connection.query(`UPDATE Article SET (${req.body.title}, ${req.body.text}),`)
//     Articles.updateOne({ _id: req.params.id }, { ...ArtcilesObject, _id: req.params.id }) // TODO: créer une requête SQL
//         .then(() => res.status(200).json({ message: 'Artcile modifié' }))
//         .catch(error => res.status(400).json({ error }));

// };

// exports.deleteArticles = (req, res, next) => {

//     connection.query(`DELETE FROM Article WHERE id=${req.body.id} LIMITE 1;`,)
//     Articles.findOne({ _id: req.params.id })  // TODO: créer une requête SQL
//         .then(newArticle => {
//             const filename = newArticle.imageURL.split('/images/')[1];
//             fs.unlink(`images/${filename}`, () => {
//                 Articles.deleteOne({ _id: req.params.id })
//                     .then(() => res.status(200).json({ message: 'Article Supprimé' }))
//                     .catch(error => res.status(400).json({ error }))
//             });
//         })
//         .catch(error => res.status(500).json({ error }));

//     Articles.findOne({ _id: req.paramas.id })  // TODO: créer une requête SQL
//         .then((newArticle) => {
//             if (!newArticle) {
//                 return res.status(404).json({ error: new error('article non trouvé') });
//             }
//             if (newArticle.userId !== req.auth.userId) {
//                 return res.status(401).json({ error: new error('Requête non autorisé') });
//             }

//         })
// };