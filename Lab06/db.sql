-- Database Creation Commands for Lab 06

CREATE DATABASE lab06db;
USE lab06db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insert dummy user
INSERT INTO users (username, password) VALUES ('admin', 'secret123');
INSERT INTO users (username, password) VALUES ('alice', 'password');
