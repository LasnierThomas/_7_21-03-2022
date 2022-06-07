import React from 'react';
import { CommentPost } from '../Components/AppContext';
import '../Styles/PostWrite.css';
import axios from 'axios';


const PostWrite = () => {

    // const [title, setTitle] = useState('');
    // const [text, setText] = useState('');
    // const [comment, setComent] = useState('');

    const deleteArticle = (userId) => {
        fetch(`${process.env.REACT_APP_API_URL}api/auth/${userId}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    const deleteComment = (userId) => {
        fetch(`${process.env.REACT_APP_API_URL}api/auth/${userId}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    // axios({
    //     method: 'put',
    //     url: `${process.env.REACT_APP_API_URL}api/articles`,
    //     withCredentials: true,
    //     data: {
    //         title,
    //         text,
    //     },
    // })

    // axios({
    //     method: 'put',
    //     url: `${process.env.REACT_APP_API_URL}api/articles`,
    //     withCredentials: true,
    //     data: {
    //         comment,
    //     },
    // })


    return (
        <div className=' block-parents'>
            <span className='id-write'>poster par id</span>
            <div className='btn-modif'>
                <input className='btn-post' type='submit' /*</div>onClick={() => modifyArticle(user.email)}*/ value='Modifier'></input>
                <input className='btn-post' type='submit' /*onClick={() => deleteArticle(user.email)}*/ value='Supprimer'></input>
            </div>
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
                            <input className='btn-post' type='submit' /*</div>onClick={() => modifyComment(user.email)}*/ value='Modifier'></input>
                            <input className='btn-post' type='submit' /*onClick={() => deleteComment(user.email)}*/ value='Supprimer'></input>
                        </li>
                    )}
                </ul>
            </div>



        </div>
    );
};

export default PostWrite;
