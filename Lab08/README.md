# LAB 08 – Cross-Site Scripting (XSS)

This lab demonstrates how XSS vulnerabilities occur and how to fix them using Output Encoding (Sanitization).

## 1. DATABASE SETUP (IMPORTANT)

Before running the server, you must set up the MySQL database.

1. Open your MySQL Client (e.g., XAMPP phpMyAdmin or Workbench).
2. Run the following SQL commands:

```sql
-- Create Database
CREATE DATABASE lab08db;
USE lab08db;

-- Create Table
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    message TEXT
);

-- Insert Sample Data
INSERT INTO comments (username, message) VALUES ('Alice', 'Hello World!');
INSERT INTO comments (username, message) VALUES ('Bob', '<b>Bold Text</b>');
```

## 2. PROJECT SETUP

1. Open terminal in `Lab08` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```

## 3. HOW TO TEST

1. Open browser: `http://localhost:3000`
2. **Vulnerable Test:**
   - Name: `Hacker`
   - Message: `<script>alert('XSS ATTACK!')</script>`
   - Click **Post Comment**.
   - Result: You should see a popup alert in the RED "Vulnerable" section.

3. **Secure Test:**
   - Look at the GREEN "Secure" section.
   - Result: The script code is displayed as text (`&lt;script&gt;...`) and does NOT execute.

## 4. HOW IT WORKS

- **Vulnerable:** `res.send(...)` inserts the string directly into HTML. The browser treats `<script>` tags as code.
- **Secure:** `escapeHTML()` function converts special characters:
  - `<` becomes `&lt;`
  - `>` becomes `&gt;`
  - This tells the browser "Display this symbol, don't run it."
