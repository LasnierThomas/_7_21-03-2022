import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArticlesContext, UserContext } from "../Components/AppContext";
import axios from "axios";
import "../Styles/Article.css";

const Article = () => {
  const articleContext = useContext(ArticlesContext);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const token = user.token;
  const handleClick1 = () => {
    navigate("/detente");
  };
  const handleClick2 = () => {
    navigate("/chat");
  };
  const handleClick4 = () => {
    navigate("/newpost");
  };

  const handleClick5 = (articleId) => {
    navigate(`/post/${articleId}`);
  };
  useState(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/articles`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data)
        articleContext.setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
        articleContext.setArticles([]);
      });
  }, []);
  return (
    <div className="all-block">
      <div className="block-menu">
        <button className="button-menu" onClick={handleClick1}>
          Détente
        </button>
        <button className="button-menu" onClick={handleClick2}>
          Chat
        </button>
      </div>
      <div className="block-article">
        <h3 className="title-block">Articles</h3>
        <button className="push-article" onClick={handleClick4}>
          Ajouter un article
        </button>

        <ul>
          {articleContext.items.map((article) => (
            <li>
              <div className="composition-post" onClick={() => handleClick5(article.id)}>
                <div className="post-title">{article.title}</div>
                <div className="post-id">{article.pseudo}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Article;
