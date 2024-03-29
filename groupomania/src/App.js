import axios from 'axios';
import { useState } from 'react';
import { ArticlesContext, UserContext } from "./Components/AppContext";
import Routes from "./Components/Routes/index";


const App = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useState(() => {
    const u = localStorage.getItem("user");
    if (u) {
      try {
        const storedUser = JSON.parse(u);
        const updateUser = () => {
          axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          })
            .then((res) => {
              setUser(res.data);
              localStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch((err) => {
              console.log(err);
              setUser("");
              localStorage.setItem("user", "undefined");
              window.href = "/login";
            });
        };
        if (storedUser) {
          setUser(storedUser);
          updateUser();
        } else {
          window.href = "/login";
        }
      } catch (SyntaxError) {
        setUser(undefined);
        localStorage.setItem("user", "");
      }
    } else {
      window.href = "/login";
      setUser(undefined);
      localStorage.setItem("user", "");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...user,
        setUser,
      }}
    >
      <ArticlesContext.Provider
        value={{
          items,
          setArticles: setItems,
        }}
      >
        <Routes />
      </ArticlesContext.Provider>
    </UserContext.Provider>
  );
};

export default App;