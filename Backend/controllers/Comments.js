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
  
  
// exports.modifyComments = (res, req, next) => {
//     connection.query(`UPDATE Comment SET (${req.body.text}),`)
//     Comments.updateOne({ _id: req.params.id }, { ...CommentsObject, _id: req.params.id }) // TODO: créer une requête SQL
//         .then(() => res.status(200).json({ message: 'Commentaire modifié' }))
//         .catch(error => res.status(400).json({ error }));

// };

// exports.deleteComments = (req, res, next) => {

//     connection.query(`DELETE FROM Comment WHERE pseudo="${req.params.userId}" LIMIT 1;`,
//         function (error, results, fields) {
//             console.log(error)
//             if (results) {
//                 return res.status(200).json({ message: 'Commentaire supprimé' });
//             } else {
//                 res.status(400).json({ error: 'Impossible de supprimer' });
//             }
//         });
// };