import { createContext, useContext } from 'react';

export const UidContext = createContext();

export const UserContext = createContext({

    pseudo: 'Toto3',
    email: 'toto3@gmail.com',
    token: 'token',
    userID: 'userID',

    setUser: (user) => { }

});

export const PostContext = [
    {
        title: 'title article',
        pseudo: 'toto3',
        article: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet vitae illo ipsa, itaque dicta, illum quo consectetur pariatur perspiciatis eveniet voluptatibus veritatis ex sint totam, ipsum necessitatibus nostrum quas? Odit.',

        // setArticle: (article) => { }
    },

];

export const CommentPost = [
    {
        id: 'titi',
        comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'

    },

    {
        id: 'tata',
        comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'

    },
]