import React, { useEffect, useState } from 'react';
import Routes from './Components/Routes/index';
import { UidContext } from './Components/AppContext';
import axios from 'axios';

const App = () => {
  const [uid, setUid] = useState(null);

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


  return (
    <UidContext.Provider value={uid}>

      <Routes />

    </UidContext.Provider>


  );
};

export default App;