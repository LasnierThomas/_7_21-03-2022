import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import '../Styles/NewPost.css'
import axios from 'axios';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handlePost = (e) => {
        e.preventDefault();
        const titleError = document.querySelector('.title.error');
        const descriptionError = document.querySelector('.description.error');

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/articles`,
            withCredentials: true,
            data: {
                title,
                description,
            },
        })
            .then((res) => {
                if (res.data.errors) {
                    titleError.innerHTML = res.data.errors.title;
                    descriptionError.innerHTML = res.data.errors.description;
                } else {
                    window.location = '/article';
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form action='' onSubmit={handlePost} id='post'>
            <div className='block-parent'>
                <div className='new'>
                    <h3 className='new-post'>Poster votre article</h3>
                    <div className='block-img'>
                        <FaPlusCircle className='new-btn' size='30px' ></FaPlusCircle>
                    </div>
                    <div className='new-title'>
                        <label htmlFor='title'>Titre</label>
                        <input className='inputTxt' type="text" name='title' id='title' onChange={(e) => setTitle(e.target.value)} value={title} />
                    </div>
                    <textarea className='new-description' type='text' name='new-description' id='new-description' onChange={(e) => setDescription(e.target.value)} value={description} >
                    </textarea>
                    <input className='button-push' type='submit' value='Poster' />

                </div>
            </div >

        </form >
    );
};

export default NewPost;