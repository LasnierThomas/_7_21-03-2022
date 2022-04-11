import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../Components/AppContext';
import '../Styles/Article.css'

const Article = () => {
    const navigate = useNavigate();
    const post = useContext(PostContext);
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
                    <div className='composition-post' onClick={handleClick5}>
                        <div className='post-title'>{post.title}</div>
                        <div className='post-id'>{post.id}</div>
                    </div>
                </ul>
            </div>


        </div>
    );
};

export default Article;