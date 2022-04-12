import { createContext } from 'react';

export const UidContext = createContext();

export const UserContext = createContext({
    pseudo: 'Toto',
    email: 'toto@gmail.com'
});

export const PostContext = createContext({
    title: 'title article',
    id: 'toto',
    article: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet vitae illo ipsa, itaque dicta, illum quo consectetur pariatur perspiciatis eveniet voluptatibus veritatis ex sint totam, ipsum necessitatibus nostrum quas? Odit.',
    img: 'image choisi'
});