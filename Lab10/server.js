const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

const SECRET_KEY = "mysecretkey";

// Login Route -> Returns JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Hardcoded check
    if(username === "admin" && password === "password") {
        const token = jwt.sign({ username: username, role: "admin" }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token: token });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Protected API Route
app.get('/api/secret-data', authenticateToken, (req, res) => {
    res.json({ message: "This is secret data!", user: req.user });
});

app.listen(3000, () => console.log("Server at http://localhost:3000"));