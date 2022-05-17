import React, { useEffect, useState } from 'react';
import Routes from './Components/Routes/index';
import { UidContext, UserContext } from './Components/AppContext';
import axios from 'axios';

const App = () => {
  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);


  useState(() => {
    const updateUser = () => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/auth/login`,
        withCredentials: true,
      })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          // TODO: deconnecter l'utilisateur et supprimer cookie
          console.log(err);
          setUser();
        });
    };
    updateUser();
  }, []);


  return (
    <UidContext.Provider value={uid}>
      <UserContext.Provider value={{
        ...user,
        setUser,
      }}>

        <Routes />
      </UserContext.Provider>
    </UidContext.Provider>


  );
};

export default App;