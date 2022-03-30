import React, { useContext } from 'react';
import Log from '../Components/log';
import { UidContext } from '../Components/AppContext';

const Login = () => {
    const uid = useContext(UidContext);
    console.log(uid);
    return (
        <div className='profil-page'>
            {uid ? (
                <Log />
            ) : (
                <div className='log-container'>
                    <Log signIn={false} signUp={true} />
                </div>
            )}
        </div>
    );
};

export default Login;