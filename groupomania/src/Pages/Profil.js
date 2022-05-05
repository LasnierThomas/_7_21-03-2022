import React, { useContext } from 'react';
import '../Styles/Profil.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Components/AppContext';




const Profil = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Acceuil');
    }


    const deleteUser = () => {
        fetch(`${process.env.REACT_APP_API_URL}api/auth/deleteUser`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    return (
        <div className='block-parent'>
            <h3>Information du profil</h3>
            <div className='block-child'>
                <div className='informations'>
                    <p>Pseudo: {user.pseudo}</p>
                    <p>Email: {user.email}</p>
                </div>
                <button className='button-profil' onClick={handleClick}>Retour acceuil</button>
                <input className='button-profil' type='submit' onClick={() => deleteUser(user.id)} value='Supprimer votre compte'></input>
            </div>
        </div>
    );
};


export default Profil;