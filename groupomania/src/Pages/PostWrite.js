import React, { useContext } from 'react';
import { PostContext } from '../Components/AppContext';
import '../Styles/PostWrite.css';

const PostWrite = () => {

    const post = useContext(PostContext);

    return (
        <div className=' block-parents'>
            <span className='id-write'>poster par {post.id}</span>
            <div className='all-comment'>
                <h3 className='title-write'>{post.title}</h3>
                <img className='img-write' src={post.img} alt={`${post.img} `}></img>
                <p className='article-write'>{post.article}</p>
                <div className='block-comment'>
                    <label className='commentaire-txt' htmlFor='commentaire-txt'>commenter par {post.id}</label>
                    <textarea className='areaTxt' type="text" name='commentaire' id='commentaire' />
                    <button className='btn-comment'>poster</button>
                </div>

                <ul className='comment-write'>
                    <p className='id-txt'>{post.id}</p>
                    <p className='comment'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus nobis esse illo necessitatibus</p>
                </ul>
            </div>



        </div>
    );
};

export default PostWrite;
