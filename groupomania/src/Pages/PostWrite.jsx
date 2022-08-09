import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../Components/AppContext";
import { useParams } from "react-router-dom";
import "../Styles/PostWrite.css";
import axios from "axios";
import { Comment } from "./Comment";

const PostWrite = () => {
  const user = useContext(UserContext);
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isModifying, modify] = useState(false);
  const newTextArea = useRef(null);

  function refreshPage() {
    window.location.reload();
  }

  const validText = (e) => {
    e.preventDefault();
    if (newTextArea === null) return;
    const token = user.token;
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/articles/${article.id}`,
      withCredentials: true,
      data: {
        text: newTextArea.current.value,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => {
      if (result) {
        article.text = newTextArea.current.value;
        modify(false);
      }
    });
  };

  useState(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/articles/${params.articleId}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/comments/${params.articleId}`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        setComments(res.data);
        console.debug(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addComment = (e) => {
    e.preventDefault();
    const token = user.token;

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/comments`,
      withCredentials: true,
      data: {
        articleId: params.articleId,
        comment,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => {
      if (result) refreshPage();
    });
  };

  const deleteArticle = (articleId) => {
    fetch(`${process.env.REACT_APP_API_URL}api/articles/${articleId}`, {
      method: "DELETE",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((result) => {
      if (result.ok) window.location = "/article";
    });
  };

  const deleteComment = (commentId) => {
    fetch(`${process.env.REACT_APP_API_URL}api/comments/${commentId}`, {
      method: "DELETE",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((result) => {
      if (result.ok) refreshPage();
    });
  };

  const modifyComment = (commentId) => {
    fetch(`${process.env.REACT_APP_API_URL}api/comments/${commentId}`, {
      method: "PUT",
      withCredentials: true,
      data: {
        text: comment,
      },
    })
      .then((result) => {
        result.json().then((resp) => {
          console.warn(resp);
        });
        // j'enleve le commentaire de la ui
        setComments(comments.filter((comment) => comment.id === commentId));
      })
      .error((error) => { });
  };

  if (!article) return <div></div>;
  return (
    <div className=" block-parents">
      <span className="id-write">{article.pseudo}</span>
      <div className="btn-modif">
        <button className="btn-post" type="submit" onClick={() => deleteArticle(article.id)}>
          Supprimer
        </button>
      </div>
      <div className="all-comment">
        <h3 className="title-write">{article.title}</h3>
        <div className="box-img">
          <img className="img-write" src={`${process.env.REACT_APP_API_URL}images/${article.imageUrl}`} alt='le fichier que lutilisateur à séléctionné'></img>
        </div>
        
        {isModifying ? (
          <div className="btn-modif3">
            <p className="article-write">
              <textarea className="areaTxt2" ref={newTextArea} type="text" name="article" id="article" />
            </p>
            <button className="btn-post" type="submit" onClick={validText}>
              Valider
            </button>
            <button className="btn-post" type="submit" onClick={() => modify(false)}>
              Annuler
            </button>
          </div>
        ) : (
          <p className="article-write"> {article.text}</p>
        )}

        {(user.pseudo === comment.pseudo || user.isAdmin) && (
          <button className="btn-post-modif" type="submit" onClick={() => modify(true)}>
            Modifier le texte
          </button>
        )}
        <div id="comment">
          <div className="block-comment">
            <textarea className="areaTxt" type="text" name="commentaire" id="commentaire" onChange={(e) => setComment(e.target.value)} value={comment} />
            <input className="btn-comment" type="submit" onClick={addComment} value="Poster" />
          </div>
        </div>

        <ul className="comment-write">{comments && comments.map((comment) => <Comment comment={comment} user={user} modifyComment={modifyComment} deleteComment={deleteComment} />)}</ul>
      </div>
    </div>
  );
};

export default PostWrite;
