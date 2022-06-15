import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../Components/AppContext';
import axios from 'axios';
import '../Styles/Article.css'

const Article = () => {

    const [title, setTitle] = useState('');
    const [pseudo, setPseudo] = useState('');
    const article = useContext(PostContext);

    const navigate = useNavigate();
    const handleClick1 = () => {
        navigate('/detente');
    }
    const handleClick2 = () => {
        navigate('/chat');
    }
    const handleClick4 = () => {
        navigate('/newpost');
    }

    const handleClick5 = () => {
        navigate('/post');
    }

    axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/articles`,
        withCredentials: true,
        data: {
            title,
            pseudo,
        },
    });

    return (
        <div className='all-block'>

            <div className='block-menu'>
                <button className='button-menu' onClick={handleClick1}>Détente</button>
                <button className='button-menu' onClick={handleClick2}>Chat</button>
            </div>
            <div className='block-article'>
                <h3 className='title-block'>Articles</h3>
                <button className='push-article' onClick={handleClick4}>Ajouter un article</button>
                <ul>
                    {article.map(() =>
                        <li>
                            <div className='composition-post' onClick={handleClick5}>
                                <div className='post-title' type="text" name='title' id='title' onChange={(e) => setTitle(e.target.value)} value={title} ></div>
                                <div className='post-id' type="text" name='pseudo' id='pseudo' onChange={(e) => setPseudo(e.target.value)} value={pseudo} ></div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>


        </div>
    );
};

export default Article;