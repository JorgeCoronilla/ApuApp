#DROP DATABASE teleQuizz;
    CREATE DATABASE teleQuizz;
    USE teleQuizz;
    CREATE TABLE users(
        id INT AUTO_INCREMENT,
        user_name VARCHAR(25) UNIQUE,
        name VARCHAR(25),
		country VARCHAR(50),
        email VARCHAR(50),
        password VARCHAR(38),
        type_education VARCHAR(50),
        institution VARCHAR(50),
        role VARCHAR(50),
        logo VARCHAR(2048),
        PRIMARY KEY(id)
    ); 

  CREATE TABLE user_questions(
        id INT AUTO_INCREMENT,
        fk_user_name VARCHAR(15),
        answered_right INT,
        answered_wrong INT,
        topic VARCHAR(25),
        level VARCHAR(25),
        PRIMARY KEY(id),
         FOREIGN KEY (fk_user_name)
      REFERENCES users(user_name)
    ); 
  
 CREATE TABLE user_quizzes(
        id INT AUTO_INCREMENT,
        fk_user_name VARCHAR(15),
        name VARCHAR(100),
        topic VARCHAR(25),
        level VARCHAR(25),
        total_guests INT,
        total_successful INT,
        PRIMARY KEY(id),
         FOREIGN KEY (fk_user_name)
      REFERENCES users(user_name)
    ); 
     