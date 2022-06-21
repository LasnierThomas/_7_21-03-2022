import { useContext } from 'react';
import { UserContext } from '../Components/AppContext';
import Log from '../Components/log';

const Login = () => {
    const user = useContext(UserContext);
    return (
        <div className='profil-page'>
            {user ? (
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