import React, { useState } from 'react';
import axios from 'axios';
import SignIn from './SignIn';

const SignUp = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const controlPasswordError = document.querySelector('.controlPassword.error');

        controlPasswordError.innerHTML = '';

        if (password !== controlPassword) {
            controlPasswordError.innerHTML = 'le mot de passe ne correspond pas';
        } else {
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email,
                    password,
                }
            })
                .then((res) => {
                    if (res.data.errors) {
                        pseudoError.innerHTML = res.data.errors.pseudo;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setFormSubmit(true);
                    }

                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <SignIn />
                    <span></span>
                    <h4 className='success'> Enregistrement réussi, veuillez-vous connecter</h4>
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id='sign-up-form'>
                    <div className='form'>
                        <label htmlfor='pseudo'>Pseudo</label>
                        <input className='inputTxt' type='text' name='pseudo' id='pseudo' onChange={(e) => setPseudo(e.target.value)} value={pseudo}></input>
                        <div className="pseudo error"></div>
                    </div>

                    <div className='form'>
                        <label htmlfor='email'>Email</label>
                        <input className='inputTxt' type='text' name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email}></input>
                        <div className="email error"></div>
                    </div>

                    <div className='form'>
                        <label htmlfor='password'>Mot de passe</label>
                        <input className='inputTxt' type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password}></input>
                        <div className="password error"></div>
                    </div>

                    <div className='form'>
                        <label htmlfor='control-password'>Confirmation Mot de passe</label>
                        <input className='inputTxt' type='password' name='controlPassword' id='controlPassword' onChange={(e) => setControlPassword(e.target.value)} value={controlPassword}></input>
                        <div className="controlPassword error"></div>
                    </div>


                    <input className='submit' type='submit' value='Valider inscription'></input>
                </form>
            )}
        </>

    );
};

export default SignUp;