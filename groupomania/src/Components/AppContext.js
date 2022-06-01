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
        id: 'toto',
        article: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet vitae illo ipsa, itaque dicta, illum quo consectetur pariatur perspiciatis eveniet voluptatibus veritatis ex sint totam, ipsum necessitatibus nostrum quas? Odit.',

        // setArticle: (article) => { }
    },

    {
        title: 'title article 2',
        id: 'toti',
        article: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet vitae illo ipsa, itaque dicta, illum quo consectetur pariatur perspiciatis eveniet voluptatibus veritatis ex sint totam, ipsum necessitatibus nostrum quas? Odit.',

    }

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