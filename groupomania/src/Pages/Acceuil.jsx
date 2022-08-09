import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Acceuil.css';


const Acceuil = () => {
    const navigate = useNavigate();
    let handleClick = () => {
      navigate("/detente");
    };
    const handleClick1 = () => {
      navigate("/article");
    };
    const handleClick2 = () => {
      navigate("/chat");
    };

    return (
        <div className='block-parent'>
            <button type='button' className='button' onClick={handleClick}>Détente</button>
            <button type='button' className='button' onClick={handleClick1}>Articles </button>
            <button type='button' className='button' onClick={handleClick2}>Chat</button>
        </div>

    );
};

export default Acceuil;