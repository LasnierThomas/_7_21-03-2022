import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../Pages/Login';
import Chat from '../../Pages/Chat';
import Acceuil from '../../Pages/Acceuil';
import Banner from '../Banner';
import logo2 from '../../Assets/logo2.png';
import { FaPowerOff } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';



const index = () => {

    return (
        <div>
            <BrowserRouter>
                <Banner>
                    <img src={logo2} alt='logo-groupomania' className='g-logo'></img>
                    <FaPowerOff className='power' size='30px' />
                    <FaUserAlt className='profil' size='30px' />

                </Banner>
                <Routes>

                    <Route path='/' element={<Login />} />
                    <Route path='/acceuil' element={<Acceuil />} />
                    <Route path='/chat' element={<Chat />} />

                </Routes>
            </BrowserRouter>
        </div>

    );
};

export default index;