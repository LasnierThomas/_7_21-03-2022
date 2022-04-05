import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from '../../Pages/Login';
import Chat from '../../Pages/Chat';
import Acceuil from '../../Pages/Acceuil';
import Profil from '../../Pages/Profil';
import Detente from '../../Pages/Detente';
import Article from '../../Pages/Article';
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
                    <Link to='/profil'><FaUserAlt className='profil' size='30px' /></Link>
                </Banner>

                <Routes>

                    <Route path='/' element={<Login />} />
                    <Route path='/acceuil' element={<Acceuil />} />
                    <Route path='/profil' element={<Profil />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/detente' element={<Detente />} />
                    <Route path='/article' element={<Article />} />

                </Routes>
            </BrowserRouter>
        </div>

    );
};

export default index;