import { createContext } from 'react';

export const UidContext = createContext();

export const UserContext = createContext({
    pseudo: 'Toto',
    email: 'toto@gmail.com'
});

export const PostContext = createContext({
    title: 'title article',
    id: 'toto'
});