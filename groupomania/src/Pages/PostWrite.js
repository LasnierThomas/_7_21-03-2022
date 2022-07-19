import React, { useContext, useState } from "react";
import { UserContext } from "../Components/AppContext";
import { useParams } from "react-router-dom";

import "../Styles/PostWrite.css";
import axios from "axios";

const PostWrite = () => {
  const user = useContext(UserContext);
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

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
    });
  };

  // const deleteArticle = (userId) => {
  //   fetch(`${process.env.REACT_APP_API_URL}api/auth/${userId}`, {
  //     method: "DELETE",
  //   }).then((result) => {
  //     result.json().then((resp) => {
  //       console.warn(resp);
  //     });
  //   });
  // };

  const deleteComment = (commentId) => {
    fetch(`${process.env.REACT_APP_API_URL}api/comments/${commentId}`, {
      method: "DELETE",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((result) => {
      // j'enleve le commentaire de la ui
      if (result.ok()) {
        setComments(
          comments.filter(comment => comment.id !== commentId)
        );
      }
    })
  };

  // axios({
  //     method: 'put',
  //     url: `${process.env.REACT_APP_API_URL}api/articles`,
  //     withCredentials: true,
  //     data: {
  //         title,
  //         text,
  //     },
  // })


  const modifyComment = (commentId) => {
    fetch(`${process.env.REACT_APP_API_URL}api/comments/${commentId}`, {
      method: "PUT",
      withCredentials: true,
      data: {
          text: comment,
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
      });
      // j'enleve le commentaire de la ui
      setComments(
        comments.filter(comment => comment.id === commentId)
      );
    }).error((error) => {

    });
  };
  if (!article) return <div></div>;
  return (
    <div className=" block-parents">
      <span className="id-write">{article.pseudo}</span>
      <div className="btn-modif">
        <span className="btn-post" type="submit" /*</div>onClick={() => modifyArticle(user.email)}*/>
          {" "}
          Modifier
        </span>
        <span className="btn-post" type="submit" /*onClick={() => deleteArticle(user.email)}*/>
          {" "}
          Supprimer
        </span>
      </div>
      <div className="all-comment">
        <h3 className="title-write">{article.title}</h3>
        <img className="img-write" src={`${process.env.REACT_APP_API_URL}images/${article.imageUrl}`} alt={`img`}></img>
        
        <p className="article-write"> {article.text}</p>
        <form action="" onSubmit={addComment} id="comment">
          <div className="block-comment">
            <textarea className="areaTxt" type="text" name="commentaire" id="commentaire" onChange={(e) => setComment(e.target.value)} value={comment} />
            <input className="btn-comment" type="submit" onClick={refreshPage} value="Poster" />
          </div>
        </form>

        <ul className="comment-write">
          {comments &&
            comments.map((comment) => (
              <li className="li-post">
                <p className="id-txt">{comment.pseudo}</p>
                <p className="comment"> {comment.text}</p>
                <div className="btn-modif">
                  <span className="btn-post" type="submit" onClick={() => modifyComment(comment.id)} > Modifier </span>
                  <span className="btn-post" type="submit" onClick={() => deleteComment(comment.id)}> Supprimer </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PostWrite;



