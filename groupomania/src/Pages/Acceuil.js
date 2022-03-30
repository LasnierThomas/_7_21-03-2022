import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Acceuil.css';

const Acceuil = () => {

    let navigate = useNavigate();
    return (
        <div className='block-parent'>
            <button className='button' onClick={() => { navigate.push('/Detente') }}>Détente</button>
            <button className='button' onClick={() => { navigate.push('/Artcile') }}>Articles </button>
            <button className='button' onClick={() => { navigate.push('/Chat') }}>Chat</button>
        </div>
    );
};

export default Acceuil;