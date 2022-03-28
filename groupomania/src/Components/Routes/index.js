import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../Pages/Login';
import Chat from '../../Pages/Chat';


const index = () => {

    return (
        <div>
            <Login />
            <BrowserRouter>
                <Routes>

                    <Route path='/' component={<Login />} />
                    <Route path='/chat' component={<Chat />} />

                </Routes>
            </BrowserRouter>
        </div>

    );
};

export default index;