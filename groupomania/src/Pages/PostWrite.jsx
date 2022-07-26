import React, { useContext, useState } from "react";
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
  const [articles, setArticles] = useState([]);
  // const [article, setArticle] = useState("");

  function refreshPage() {
    window.location.reload();
  }

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
    }).then((res) => {
      if (res.ok) refreshPage();
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
      if (result.ok) {
        setArticles(articles.filter((article) => article.id !== articleId));
      }
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

  // const modifyArticle = (articleId) => {
  // fetch(`${process.env.REACT_APP_API_URL}api/articles/${articleId}`, {
  //     method: 'put',
  //     withCredentials: true,
  //     data: {
  //         title,
  //         text,
  //         imageUrl,
  //     },
  // })
  // .then((result) => {
  //       result.json().then((resp) => {
  //         console.warn(resp);
  //       });
  //       // j'enleve les objet a modifier de la ui
  //       setArticles(articles.filter((title, text, imageUrl) => article.id === articleId));
  //     })
  //     .error((error) => {});
  // };

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
      .error((error) => {});
  };

  if (!article) return <div></div>;
  return (
    <div className=" block-parents">
      <span className="id-write">{article.pseudo}</span>
      <div className="btn-modif">
        <button className="btn-post" type="submit" /*</div>onClick={() => modifyArticle(user.email)}*/>
          Modifier
        </button>
        <button className="btn-post" type="submit" onClick={() => deleteArticle(article.id)}>
          Supprimer
        </button>
      </div>
      <div className="all-comment">
        <h3 className="title-write">{article.title}</h3>
        <img className="img-write" src={`${process.env.REACT_APP_API_URL}images/${article.imageUrl}`} alt={`img`}></img>

        <p className="article-write"> {article.text}</p>
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
