CREATE TABLE User(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
<<<<<<< HEAD
  pseudo VARCHAR(255) UNIQUE,
=======
  pseudo VARCHAR(255),
>>>>>>> d22be14868a04b92213e3a4c0e5d2935c0c2c8e3
  password VARCHAR(32)
) DEFAULT CHARSET UTF8;