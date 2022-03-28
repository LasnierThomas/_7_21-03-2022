import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Banner from '../Banner';
import '../../Styles/Login.css';
import logo2 from '../../Assets/logo2.png';

const Log = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.SignUp);
    const [signInModal, setSignInModal] = useState(props.SignIn);

    const handleModals = (e) => {
        if (e.target.id === 'register') {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === 'login') {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }

    return (
        <div >
            <Banner>
                <img src={logo2} alt='logo-groupomania' className='g-logo'></img>
            </Banner>
            <div className="connection-form">
                <div className="form-container">
                    <ul>
                        <li onClick={handleModals} id='register' className={signUpModal ? 'active-btn' : null}>S'inscrire</li>
                        <li onClick={handleModals} id='login' className={signInModal ? 'active-btn' : null}>Se connecter</li>
                    </ul>
                    {signUpModal && <SignUp />}
                    {signInModal && <SignIn />}
                </div>
            </div>
        </div>
    );
};

export default Log;