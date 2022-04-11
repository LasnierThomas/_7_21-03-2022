import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import '../Styles/NewPost.css'

const NewPost = () => {



    return (
        <div className='block-parent'>
            <div className='new'>
                <h3 className='new-post'>Poster votre article</h3>
                <div className='block-img'>
                    <FaPlusCircle className='new-btn' size='30px' ></FaPlusCircle>
                </div>
                <div className='new-title'>
                    <label htmlFor='title'>Titre</label>
                    <input className='inputTxt' type="text" name='title' id='title' />
                </div>
                <textarea className='new-description'>
                </textarea>
                <button className='button-push'>Poster</button>

            </div>
        </div >
    );
};

export default NewPost;