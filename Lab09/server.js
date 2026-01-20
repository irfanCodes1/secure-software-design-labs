const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Simulate logged in user
app.use((req, res, next) => {
    if (!req.session.user) {
        req.session.user = "Alice";
        req.session.balance = 1000;
    }
    next();
});

// Generate CSRF Token
app.get('/token', (req, res) => {
    // In real app, generate random string
    if (!req.session.csrfToken) {
        req.session.csrfToken = "12345-SECRET-TOKEN";
    }
    res.json({ token: req.session.csrfToken });
});

app.get('/', (req, res) => {
    res.send(`
        <h1>CSRF Demo</h1>
        <p>User: ${req.session.user}</p>
        <p>Balance: $${req.session.balance}</p>
        <a href="/vulnerable.html">Vulnerable Transfer Form</a><br>
        <a href="/secure.html">Secure Transfer Form</a>
    `);
});

// Serve HTML
app.use(express.static(__dirname));

// Vulnerable Endpoint (No Check)
app.post('/transfer-vulnerable', (req, res) => {
    const amount = parseInt(req.body.amount);
    req.session.balance -= amount;
    res.send(`Transferred $${amount}! New Balance: $${req.session.balance}`);
});

// Secure Endpoint (Checks Token)
app.post('/transfer-secure', (req, res) => {
    const token = req.body.csrf_token;
    if (!token || token !== req.session.csrfToken) {
        return res.status(403).send("CSRF Attack Detected! Invalid Token.");
    }
    
    const amount = parseInt(req.body.amount);
    req.session.balance -= amount;
    res.send(`SECURE Transfer $${amount} successful!`);
});

app.listen(3000, () => console.log("Server at http://localhost:3000"));