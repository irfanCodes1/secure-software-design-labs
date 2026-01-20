# LAB 06 – SQL Injection

This lab demonstrates a SQL Injection vulnerability and how to fix it using Prepared Statements.

## 1. DATABASE SETUP (IMPORTANT)

You MUST set up the database for this lab to work.

1. Open MySQL Client (XAMPP / Workbench / Command Line).
2. Execute these commands:

```sql
-- 1. Create Database
CREATE DATABASE lab06db;
USE lab06db;

-- 2. Create Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 3. Insert Dummy Users
INSERT INTO users (username, password) VALUES ('admin', 'secret123');
INSERT INTO users (username, password) VALUES ('alice', 'password');
```

## 2. PROJECT SETUP

1. Open terminal in `Lab06` folder.
2. Install dependencies:
   ```bash
   npm install express mysql2 body-parser
   ```
3. Run the server:
   ```bash
   node server.js
   ```

## 3. HOW TO TEST

Go to: `http://localhost:3000`

### A. Test Vulnerable Login
The vulnerable login concatenates strings: `SELECT ... WHERE user = '` + input + `'`

1. **Enter Username:** `admin' OR '1'='1`
2. **Enter Password:** (Any random text)
3. **Click:** Login (Vulnerable)
4. **Result:** You will be logged in as 'admin' because `'1'='1'` is always true.

### B. Test Secure Login
The secure login uses Prepared Statements: `SELECT ... WHERE user = ?`

1. **Enter Username:** `admin' OR '1'='1`
2. **Enter Password:** (Any random text)
3. **Click:** Login (Secure)
4. **Result:** Login Failed. The database treats the input as a literal string, not code.

## 4. TROUBLESHOOTING
- **"Connection Refused"**: Check if MySQL is running (XAMPP/WAMP).
- **"Access Denied"**: Open `server.js` and update the `password: ''` field to match your MySQL root password.
