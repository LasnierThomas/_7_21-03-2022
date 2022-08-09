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

exports.editArticles = (req, res, next) => {
  const connectedUser = req.auth;
  if (!connectedUser) {
    return res.status(401).json({ error: "Utilisateur non authentifié" });
  }

  connection.query(`SELECT * FROM Article WHERE id=${connection.escape(req.params.id)};`, function (error, results, fields) {
    if (!results) {
      console.log(error);
      return res.status(404).json({ error: "cette article n'existe pas" });
    }
    const article = results[0];
    const createdBy = article.pseudo;

    let canModifyArticle = false;
    if (connectedUser.isAdmin) {
      canModifyArticle = true;
    } else if (connectedUser.pseudo === createdBy) {
      canModifyArticle = true;
    }
    if (canModifyArticle) {
      connection.query(`UPDATE Article SET text=${connection.escape(req.body.text)} WHERE id=${connection.escape(req.params.id)};`, function (error, results, fields) {
        console.log(error);
        if (results) {
          res.status(200).json({ message: "article modifié" });
        } else {
          res.status(500).json({ error: "le texte n'a pas pu être modifié" });
        }
      });
    } else {
      res.status(400).json({ error: "Utilisateur non autoriser" });
    }
  });
};

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
    } else if (connectedUser.pseudo === createdBy) {
      canDeleteArticle = true;
    }

    if (canDeleteArticle) {
      connection.query(`DELETE FROM Article WHERE id=${connection.escape(req.params.id)} ;`, function (error, results, fields) {
        if (results) {
          const imageUrl = article.imageUrl;
          const imagePath = `images/${imageUrl}`;
          fs.unlink(imagePath, () => {});
          res.status(200).json({ message: "Article supprimé" });
        } else {
          console.log(error);
          res.status(500).json({ error: "l'article n'a pas pu être supprimé" });
        }
      });
    } else {
      // c'est pas ok !
      res.status(400).json({ error: "Utilisateur non autoriser" });
    }
  });
};
  
