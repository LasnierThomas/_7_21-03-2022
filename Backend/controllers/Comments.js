// const { stringify } = require('querystring');
const connection = require('../sql/dbconnection');



exports.getAllComments = (req, res, next) => {
  connection.query(
    `SELECT * FROM Comment WHERE articleId=${req.params.articleId}`,
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      return res.status(200).json(result);
    }
  );
};

exports.createComments = (req, res, next) => {
  const user = req.auth;
  if (!user) {
    return res.status(401).json({ error: "Utilisateur non authentifié" });
  }
  connection.query(
    `INSERT INTO Comment (articleId, text, pseudo) VALUES ("${req.body.articleId}", "${connection.escape(req.body.comment)}","${user.pseudo}")`,
    function (error, results, fields) {
      if (!results) {
        console.log(error);
        return res.status(400).json({ error: "Commentaire non crée" });
      }
      return res.status(201).json(JSON.stringify(results));
    }
  );
};
  
  
exports.modifyComments = (res, req, next) => {
  // TODO: vérifier que l'utilisateur est bien le bon
  connection.query(`UPDATE Comment WHERE id=${req.params.id} SET text=${connection.escape(req.body.text)}`, function (error, results, fields) {
    console.log(error)
    if (!results) {
      return res.status(400).json({ error: "commentaire non modifiable" });
    }
    return res.status(200).json({ message: "Commentaire modifié" });
  });
};

exports.deleteComments = (req, res, next) => {
  // TODO: vérifier que l'utilisateur est bien le bon
  // 1/ Je récupère le commentaire => je peux savoir quel est l'id user
  // 2/ Je regarde si mon utilisateur actuel est admin
    connection.query(`DELETE FROM Comment WHERE id=${connection.escape(req.params.id)} LIMIT 1;`,
        function (error, results, fields) {
            console.log(error)
            if (results) {
                return res.status(200).json({ message: 'Commentaire supprimé' });
            } else {
                res.status(400).json({ error: 'Impossible de supprimer' });
            }
        });
};