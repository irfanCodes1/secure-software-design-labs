const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// 1. DATABASE CONNECTION
// ----------------------
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // <--- UPDATE THIS IF NEEDED
    database: 'lab08db'
});

db.connect(err => {
    if (err) {
        console.error("DB Connection Failed: " + err.message);
        console.log("DID YOU CREATE THE DB? See README.md");
    } else {
        console.log("Connected to MySQL Database (lab08db)");
    }
});

// 2. ROOT ROUTE - Show Comments
// -----------------------------
app.get('/', (req, res) => {
    const sql = "SELECT * FROM comments ORDER BY id DESC";
    db.query(sql, (err, results) => {
        if (err) {
            res.send("Error fetching comments. Is DB setup?");
            return;
        }

        // Render HTML
        let html = `
        <h1>Lab 08 - XSS (Cross-Site Scripting)</h1>
        
        <!-- Post Comment Form -->
        <div style="border: 1px solid #ccc; padding: 10px;">
            <h3>Post a Message</h3>
            <form action="/post" method="POST">
                <input type="text" name="username" placeholder="Name" required><br><br>
                <textarea name="message" placeholder="Message (Try <script>alert(1)</script>)" required></textarea><br><br>
                <button type="submit">Post Comment</button>
            </form>
        </div>

        <hr>

        <!-- PART A: VULNERABLE SECTION -->
        <div style="background: #ffcccc; padding: 10px; margin-bottom: 20px;">
            <h2 style="color: red;">PART A: Vulnerable (Unsafe)</h2>
            <p>If you posted a script, it WILL execute here:</p>
            <ul>
                ${results.map(c => `<li><b>${c.username}:</b> ${c.message}</li>`).join('')}
            </ul>
        </div>

        <!-- PART B: SECURE SECTION -->
        <div style="background: #ccffcc; padding: 10px;">
            <h2 style="color: green;">PART B: Secure (Sanitized)</h2>
            <p>Scripts are converted to safe text here:</p>
            <ul>
                ${results.map(c => `<li><b>${escapeHTML(c.username)}:</b> ${escapeHTML(c.message)}</li>`).join('')}
            </ul>
        </div>
        `;
        res.send(html);
    });
});

// 3. POST ROUTE - Save Comment
// ----------------------------
app.post('/post', (req, res) => {
    const { username, message } = req.body;
    
    // Store exact input in DB (Sanitization happens on Output)
    const sql = "INSERT INTO comments (username, message) VALUES (?, ?)";
    
    db.query(sql, [username, message], (err) => {
        if (err) res.send("Error saving comment");
        else res.redirect('/');
    });
});

// 4. SANITIZATION FUNCTION (The Fix)
// ----------------------------------
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});