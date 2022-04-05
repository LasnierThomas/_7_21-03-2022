import React from 'react';
import '../Styles/Profil.css';
import { useNavigate } from 'react-router-dom';


const Profil = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Acceuil');

    }

    return (
        <div className='block-parent'>
            <h3>Information du profil</h3>
            <div className='block-child'>
                <div className='informations'>
                    <p>Pseudo: <span id='pseudo'></span></p>
                    <p>Email: <span id='email'></span></p>
                </div>
                <button className='button-profil' onClick={handleClick}>Retour acceuil</button>
                <button className='button-profil'>Supprimer votre compte</button>
            </div>
        </div>
    );
};


export default Profil;