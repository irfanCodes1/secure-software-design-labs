# LAB 10 – Secure API + JWT

This lab demonstrates how to secure an API using JSON Web Tokens (JWT).

**NOTE:** This lab uses a **hardcoded user** (`admin` / `password`) for simplicity in the exam. It does NOT connect to a real MySQL database to keep the code focused on JWT logic.

## 1. IF YOU WANTED TO ADD A DATABASE (Optional / Theory)

In a real production app, you would replace the hardcoded check in `server.js`:

```javascript
// REAL WORLD EXAMPLE (Not implemented here to keep it simple)
db.query("SELECT * FROM users WHERE username = ?", [user], (err, results) => {
    // Check password hash...
    // Issue JWT...
});
```

For this exam lab, we just check:
`if(username === "admin" && password === "password")`

## 2. PROJECT SETUP

1. Open terminal in `Lab10` folder.
2. Install dependencies:
   ```bash
   npm install express jsonwebtoken body-parser
   ```
3. Run the server:
   ```bash
   node server.js
   ```

## 3. HOW TO TEST

1. Open browser: `http://localhost:3000`
2. Open **Developer Tools (F12) -> Console**.

### Step 1: Login
- Click **"1. Login (Get Token)"**
- This sends a POST request to `/login`.
- Server validates credentials and returns a **JWT (JSON Web Token)**.
- The browser saves this token in `localStorage`.

### Step 2: Access Protected API
- Click **"2. Access Protected API"**
- The browser sends a GET request to `/api/secret-data`.
- It includes the header: `Authorization: Bearer <token>`
- The server verifies the token.
  - **Valid Token:** Returns secret data.
  - **No Token:** Returns 401 Unauthorized.

### Step 3: Logout
- Click **"3. Logout"**
- Removes token from storage.
- Try clicking "Access Protected API" again -> It will fail.
