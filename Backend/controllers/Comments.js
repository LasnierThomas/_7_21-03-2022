// const { stringify } = require('querystring');
const connection = require('../sql/dbconnection');



exports.getAllComments = (req, res, next) => {
  connection.query(`SELECT * FROM Comment WHERE articleId=${connection.escape(req.params.articleId)}`, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    return res.status(200).json(result);
  });
};

exports.createComments = (req, res, next) => {
  const user = req.auth;
  if (!user) {
    return res.status(401).json({ error: "Utilisateur non authentifié" });
  }
  connection.query(
    `INSERT INTO Comment (articleId, text, pseudo) VALUES (${connection.escape(req.body.articleId)}, ${connection.escape(req.body.comment)},${connection.escape(user.pseudo)})`,
    function (error, results, fields) {
      if (!results) {
        console.log(error);
        return res.status(400).json({ error: "Commentaire non crée" });
      }
      return res.status(201).json(JSON.stringify(results));
    }
  );
};

exports.deleteComments = (req, res, next) => {
  // TODO: vérifier que l'utilisateur est bien le bon
  const connectedUser = req.auth;
  if (!connectedUser) {
    return res.status(401).json({ error: "Utilisateur non authentifié" });
  }
  
  // 1/ Je récupère le commentaire => je peux savoir quel est l'id user
  connection.query(`SELECT * FROM Comment WHERE id=${connection.escape(req.params.id)};`, function (error, results, fields) {
    console.log(error);
    if (!results) {
      return res.status(404).json({ error: "ce commentaire n'existe pas" });
    }
    const comment = results[0];
    const createdBy = comment.pseudo;

    // 2/ Je regarde si mon utilisateur actuel est admin OU si c'est le créateur du commentaire
    let canDeleteComment = false;
    console.debug(connectedUser);
    if (connectedUser.isAdmin) {
      canDeleteComment = true;
    }
    else if (connectedUser.pseudo === createdBy) {
      canDeleteComment = true;
    }

    // 3/ Si c'est ok, je supprime le commentaire, sinon je refuse la suppression
    
      if (canDeleteComment) {
        // c'est ok!
      connection.query(`DELETE FROM Comment WHERE id=${connection.escape(req.params.id)};`, function (error, results, fields) {
        console.log(error);
        if (results) {
          res.status(200).json({ message: "Commentaire supprimé" });
        } else {
          res.status(500).json({ error: "le commentaire n'a pas pu être supprimé" });
        }
      });
      } else {
        // c'est pas ok !
        res.status(400).json({ error: "Utilisateur non autoriser" });
    }

  });
};

exports.editComments = (req, res, next) => {
  const connectedUser = req.auth;
  if (!connectedUser) {
    return res.status(401).json({ error: "Utilisateur non authentifié" });
  }

  connection.query(`SELECT * FROM Comment WHERE id=${connection.escape(req.params.id)};`, function (error, results, fields) {
    if (!results) {
      console.log(error);
      return res.status(404).json({ error: "ce commentaire n'existe pas" });
    }
    const comment = results[0];
    const createdBy = comment.pseudo;

    // 2/ Je regarde si mon utilisateur actuel est admin OU si c'est le créateur du commentaire
    let canModifyComment = false;
    if (connectedUser.isAdmin) {
      canModifyComment = true;
    }
    else if (connectedUser.pseudo === createdBy) {
      canModifyComment = true;
    }

    if (canModifyComment) {
      // c'est ok!
      connection.query(`UPDATE Comment SET text=${connection.escape(req.body.text)} WHERE id=${connection.escape(req.params.id)};`, function (error, results, fields) {
        console.log(error);
        if (results) {
          res.status(200).json({ message: "Commentaire modifié" });
        } else {
          res.status(500).json({ error: "le commentaire n'a pas pu être modifié" });
        }
      });
    } else {
      // c'est pas ok !
      res.status(400).json({ error: "Utilisateur non autoriser" });
    }

  });
}