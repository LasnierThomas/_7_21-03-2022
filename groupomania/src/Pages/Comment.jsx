import React, { useState, useRef } from "react";
import axios from "axios";

export const Comment = ({ user, comment, modifyComment, deleteComment }) => {
  const [isModifying, modify] = useState(false);
  const newCommentArea = useRef(null);

  const validComment = (e) => {
    e.preventDefault();
    if (newCommentArea === null) return;
    const token = user.token;
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/comments/${comment.id}`,
      withCredentials: true,
      data: {
        text: newCommentArea.current.value,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => {
      if (result) {
        comment.text = newCommentArea.current.value;
        modify(false);
      }
    });
  };

  return (
    <li className="li-post">
      <p className="id-txt">Commentaire créé par {comment.pseudo}</p>
      {isModifying ? (
        <div className="btn-modif2">
          <div className="block-comment">
            <textarea className="areaTxt" ref={newCommentArea} type="text" name="commentaire" id="commentaire" />
          </div>
          <button className="btn-post" type="submit" onClick={validComment}>
            Valider
          </button>
          <button className="btn-post" type="submit" onClick={() => modify(false)}>
            Annuler
          </button>
        </div>
      ) : (
        <p className="comment">{comment.text}</p>
      )}

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
