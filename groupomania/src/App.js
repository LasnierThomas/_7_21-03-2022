import React, { useEffect, useState } from 'react';
import Routes from './Components/Routes/index';
import { UidContext, UserContext } from './Components/AppContext';
import axios from 'axios';

const App = () => {
  const [uid, setUid] = useState(null);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => {
          console.log(err);
          setUid(12345);
        });
    };
    fetchToken();
  }, [setUid]);

  // useState(() => {
  //   const updateUser = () => {
  //     axios({
  //       method: "get",
  //       url: `${process.env.REACT_APP_API_URL}api/auth/login`,
  //       withCredentials: true,
  //     })
  //       .then((res) => {
  //         setUser(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setUser();
  //       });
  //   };
  //   updateUser();
  // }, [setUser]);


  return (
    <UidContext.Provider value={uid}>
      {/* <UserContext.Provider value={user}> */}

      <Routes />
      {/* </UserContext.Provider> */}
    </UidContext.Provider>


  );
};

export default App;