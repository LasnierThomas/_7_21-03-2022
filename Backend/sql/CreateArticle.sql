-- SQLBook: Code
CREATE TABLE Article(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pseudo VARCHAR(255),
    title VARCHAR(255),
    text VARCHAR(10000),
) DEFAULT CHARSET UTF8;