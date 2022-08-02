const fs = require('fs');
// const { stringify } = require('querystring');
const connection = require('../sql/dbconnection');



exports.getAllArticles = (req, res, next) => {
  connection.query(
    `SELECT id, title, pseudo FROM Article `,
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
  connection.query(`SELECT * FROM Article WHERE id=${connection.escape(req.params.id)} LIMIT 1;`, function (error, results, fields) {
    if (error) {
      return res.status(400).json({ error });
    }
    if (!results || results.length == 0) {
      return res.status(401).json({ error: "Article trouvé" });
    }
    const article = results[0];
    console.debug(article);
    return res.status(200).json(article);
  });
};

exports.createArticles = (req, res, next) => {
  const articleObject = JSON.parse(req.body.json);
  delete articleObject._id;
  delete articleObject._userId;
  // 1/ Verify
  // Vérifier l'authentification
  const user = req.auth;
  if (!user) {
    return res.status(401).json({ error: "Utilisateur non authentifié" });
  }
  // Vérifier que je respecte les conditions de création d'un article
  if (!articleObject.title || articleObject.title.length > 128) {
    return res.status(400).json({ error: "Titre incorrect" });
  }
  const imageUrl = req.file.filename;
  // 2/ Act => je crée mon article
  connection.query(
    `INSERT INTO Article (title, text, pseudo, imageUrl) VALUES (${connection.escape(articleObject.title)}, ${connection.escape(articleObject.description)}, ${connection.escape(
      user.pseudo
    )}, ${connection.escape(imageUrl)})`,
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

exports.deleteArticles = (req, res, next) => {
  const connectedUser = req.auth;
  if (!connectedUser) {
    return res.status(401).json({ error: "Utilisateur non authentifié" });
  }
  connection.query(`SELECT * FROM Article WHERE id=${connection.escape(req.params.id)} LIMIT 1;`, function (error, results, fields) {
    if (!results) {
      console.log(error);
      return res.status(404).json({ error: "cette article n'existe pas" });
    }
    const article = results[0];
    const createdBy = article.pseudo;

    let canDeleteArticle = false;
    if (connectedUser.isAdmin) {
      canDeleteArticle = true;
    }
    else if (connectedUser.pseudo === createdBy) {
      canDeleteArticle = true;
    }

    if (canDeleteArticle) {
      // const imageUrl = req.file.filename;
      connection.query(`DELETE FROM Article WHERE id=${connection.escape(req.params.id)} ;`, function (error, results, fields) {
        console.log(error);
        // const filename = imageUrl.split("/images/")[1];
        // fs.unlink(`images/${filename}`, () => {
          if (results) {
              res.status(200).json({ message: "Article supprimé" });
            } else {
              res.status(500).json({ error: "l'article n'a pas pu être supprimé" });
            }
      });
    } else {
      // c'est pas ok !
      res.status(400).json({ error: "Utilisateur non autoriser" });
    }
  });
};
  // });

  // Articles.findOne({ _id: req.params.id })  // TODO: créer une requête SQL
  //     .then(newArticle => {
  //         const filename = newArticle.imageURL.split('/images/')[1];
  //         fs.unlink(`images/${filename}`, () => {
  //             Articles.deleteOne({ _id: req.params.id })
  //                 .then(() => res.status(200).json({ message: 'Article Supprimé' }))
  //                 .catch(error => res.status(400).json({ error }))
  //         });
  //     })
  //     .catch(error => res.status(500).json({ error }));

  // Articles.findOne({ _id: req.paramas.id })  // TODO: créer une requête SQL
  //     .then((newArticle) => {
  //         if (!newArticle) {
  //             return res.status(404).json({ error: new error('article non trouvé') });
  //         }
  //         if (newArticle.userId !== req.auth.userId) {
  //             return res.status(401).json({ error: new error('Requête non autorisé') });
  //         }

  //     })
