import React from 'react';
import { CommentPost } from '../Components/AppContext';
import '../Styles/PostWrite.css';


const PostWrite = () => {



    return (
        <div className=' block-parents'>
            <span className='id-write'>poster par id</span>
            <div className='all-comment'>
                <h3 className='title-write'>title</h3>
                <img className='img-write' src='img' alt={`img`}></img>
                <p className='article-write'>article</p>
                <div className='block-comment'>
                    <label className='commentaire-txt' htmlFor='commentaire-txt'>commenter par id</label>
                    <textarea className='areaTxt' type="text" name='commentaire' id='commentaire' />
                    <button className='btn-comment'>poster</button>
                </div>

                <ul className='comment-write'>
                    {CommentPost.map(comment =>
                        <li>
                            <p className='id-txt'>{comment.id}</p>
                            <p className='comment'> {comment.comment}</p>
                        </li>
                    )}
                </ul>
            </div>



        </div>
    );
};

export default PostWrite;
