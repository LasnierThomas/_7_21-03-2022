import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "../../Pages/Login";
import Chat from "../../Pages/Chat";
import Acceuil from "../../Pages/Acceuil";
import Profil from "../../Pages/Profil";
import Detente from "../../Pages/Detente";
import Article from "../../Pages/Article";
import NewPost from "../../Pages/NewPost";
import PostWrite from "../../Pages/PostWrite";
import Banner from "../Banner";
import cookie from "js-cookie";
import logo2 from "../../Assets/logo2.png";
import { FaPowerOff } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

const Logout = () => {
  const navigate = useNavigate();
  function refreshPage() {
    window.location.reload();
  };

  let handleClick = () => {
    cookie.remove("jwt", {
      expires: 1,
    });
    localStorage.setItem("user", "");
    refreshPage(navigate("/"));
  };
  return (
    <div>
      <Banner>
        <img src={logo2} alt="logo-groupomania" className="g-logo"></img>
        <FaPowerOff className="power" name="power" id="power" size="30px" onClick={handleClick} />
        <Link to="/profil">
          <FaUserAlt className="profil" size="30px" />
        </Link>
      </Banner>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/acceuil" element={<Acceuil />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/detente" element={<Detente />} />
        <Route path="/article" element={<Article />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/post/:articleId" element={<PostWrite />} />
      </Routes>
    </div>
  );
};

const index = () => {
  return (
    <div>
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    </div>
  );
};

export default index;
