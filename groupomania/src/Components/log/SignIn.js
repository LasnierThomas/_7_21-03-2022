import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../AppContext';
import { useNavigate } from "react-router-dom";


const SignIn = () => {
    let navigate = useNavigate();
    const user = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    const { token, userID } = res.data;
                    user.setUser(res.data);



                    // modifier variable utilisateur
                    navigate("/acceuil", { replace: true });;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form action='' onSubmit={handleLogin} id='sign-up-form'>
            <div className='form'>
                <label htmlFor='email'>Email</label>
                <input className='inputTxt' type="text" name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <div className="email error"></div>
            </div>

            <div className='form'>
                <label htmlFor='password'>Mot de passe</label>
                <input className='inputTxt' type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                <div className="password error"></div>
            </div>

            <input className='submit' type='submit' value='Se Connecter'></input>
        </form>
    );
};

export default SignIn;