const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'register.html')));

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Update with your MySQL password
    database: 'lab06db'
});

db.connect(err => {
    if (err) console.error("DB Connection Error: " + err.message);
    else console.log("Connected to MySQL DB");
});

// 1. REGISTER
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, password], (err, result) => {
        if (err) res.send("Error registering");
        else res.send("Registered! <a href='/'>Login</a>");
    });
});

// 2. VULNERABLE LOGIN (SQL Injection)
app.post('/login-vulnerable', (req, res) => {
    const { username, password } = req.body;
    
    // DANGEROUS: Concatenating strings directly!
    // User input: ' OR '1'='1
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    console.log("Executing SQL: " + sql); // For demo purposes

    db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send(`<h1>Logged in as ${results[0].username} (VULNERABLE)</h1>`);
        } else {
            res.send("<h1>Login Failed</h1>");
        }
    });
});

// 3. SECURE LOGIN (Prepared Statements)
app.post('/login-secure', (req, res) => {
    const { username, password } = req.body;
    
    // SAFE: Using ? placeholders
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(sql, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send(`<h1>Logged in as ${results[0].username} (SECURE)</h1>`);
        } else {
            res.send("<h1>Login Failed</h1>");
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});