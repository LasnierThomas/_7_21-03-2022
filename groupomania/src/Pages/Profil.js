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



    return (
        <div className='block-parent'>
            <h3>Information du profil</h3>
            <div className='block-child'>
                <div className='informations'>
                    <p>Pseudo: {user.pseudo}</p>
                    <p>Email: {user.email}</p>
                </div>
                <button className='button-profil' onClick={handleClick}>Retour acceuil</button>
                <input className='button-profil' type='submit' value='Supprimer votre compte'></input>
            </div>
        </div>
    );
};


export default Profil;