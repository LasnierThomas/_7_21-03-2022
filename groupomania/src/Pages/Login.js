import React, { useContext } from 'react';
import Log from '../Components/log';
import { UidContext } from '../Components/AppContext';

const Login = () => {
    const uid = useContext(UidContext);
    console.log(uid);
    console.log('loginPage');
    return (
        <div className='profil-page'>
            {false ? (
                <h2>update</h2>
            ) : (
                <div className='log-container'>
                    <Log signIn={false} signUp={true} />
                </div>
            )}
        </div>
    );
};

export default Login;