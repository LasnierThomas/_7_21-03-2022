import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Routes from './Components/Routes/index';
import { UidContext, UserContext } from './Components/AppContext';
import axios from 'axios';
// import cookie from 'js-cookie';

const App = () => {
  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();


  useState(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    // const updateUser = () => {
    //   axios({
    //     method: "get",
    //     url: `${process.env.REACT_APP_API_URL}api/auth/login`,
    //     withCredentials: true,
    //   })
    //     .then((res) => {
    //       setUser(res.data);
    //     })
    //     .catch((err) => {
    //       // cookie.remove('jwt', {
    //       //   expires: 1
    //       // })
    //       // navigate('/');
    //       // TODO: delete le cookie
    //       console.log(err);
    //       setUser();
    //     });
    // };
    // updateUser();
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