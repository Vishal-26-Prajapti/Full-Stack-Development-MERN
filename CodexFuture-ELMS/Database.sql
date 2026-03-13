CREATE DATABASE codexfuture;

USE codexfuture;

CREATE TABLE users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    useremail VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE students (
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE subadmins (
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE purchased_courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    useremail VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    progress INT DEFAULT 0,
    purchaseDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, useremail, password)
VALUES ('Admin', 'admin@example.com', '$2b$10$wLfulShWEp47Q.f2J2KIw.O2PVdPudY.//bz40h83spIDBOuydadi');

SELECT * FROM users;
SELECT * FROM students;
SELECT * FROM subadmins;
SELECT * FROM purchases;