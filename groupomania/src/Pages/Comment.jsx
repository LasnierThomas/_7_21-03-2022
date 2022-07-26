import React, { useContext, useState } from "react";

export const Comment = ({ user, comment, modifyComment, deleteComment }) => {
  const [isModifying, modify] = useState(false);
  return (
    <li className="li-post">
      <p className="id-txt">Commentaire créé par {comment.pseudo}</p>
      {isModifying ? (<p className="comment"> {comment.text} BLABLA</p>)
      : (<p className="comment"> {comment.text}</p>)}

      {(user.pseudo === comment.pseudo || user.isAdmin) && (
        <div className="btn-modif">
          <button className="btn-post" type="submit" onClick={() => modify(true)}>
            Modifier
          </button>
          <button className="btn-post" type="submit" onClick={() => deleteComment(comment.id)}>
            Supprimer
          </button>
        </div>
      )}
    </li>
  );
};
