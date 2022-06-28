import { createContext } from 'react';

export const UserContext = createContext({
    pseudo: 'Toto3',
    email: 'toto3@gmail.com',
    token: 'token',
    userID: 'userID',
    setUser: (user) => { }
});

export const ArticlesContext = createContext({
  items: [
    {
      title: "title article",
      pseudo: "toto",
      article:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet vitae illo ipsa, itaque dicta, illum quo consectetur pariatur perspiciatis eveniet voluptatibus veritatis ex sint totam, ipsum necessitatibus nostrum quas? Odit.",
    },
    {
      title: "title article 2",
      pseudo: "toto",
      article:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet vitae illo ipsa, itaque dicta, illum quo consectetur pariatur perspiciatis eveniet voluptatibus veritatis ex sint totam, ipsum necessitatibus nostrum quas? Odit.",
    },
  ],
  setArticles: (articles) => {},
});






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