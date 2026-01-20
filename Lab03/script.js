// Lab 03 - Hashing, Role-Based Access Control (RBAC), Cookies

function registerUser() {
    const user = document.getElementById("regUser").value;
    const pass = document.getElementById("regPass").value;
    const role = document.getElementById("regRole").value;

    if (user === "" || pass === "") { alert("Fill all fields"); return; }

    // 1. HASHING (SHA-256)
    // We never save plain text passwords
    const hashedPassword = CryptoJS.SHA256(pass).toString();

    // Save to LocalStorage (Simulating DB)
    localStorage.setItem("lab03_user", user);
    localStorage.setItem("lab03_hash", hashedPassword);
    localStorage.setItem("lab03_role", role);

    alert("Registered with Hash: " + hashedPassword);
    window.location.href = "login.html";
}

function loginUser() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    const storedUser = localStorage.getItem("lab03_user");
    const storedHash = localStorage.getItem("lab03_hash");
    const storedRole = localStorage.getItem("lab03_role");

    // Hash input to compare
    const inputHash = CryptoJS.SHA256(pass).toString();

    if (user === storedUser && inputHash === storedHash) {
        
        // 2. SIMULATED SECURE COOKIE
        // Real code would be: document.cookie = "session_id=xyz; Secure; HttpOnly; SameSite=Strict";
        // Since we are on client-side, we just comment it.
        console.log("Cookie set: session=active; Secure; HttpOnly");

        alert("Login Success! Role: " + storedRole);

        // 3. RBAC (Redirect based on role)
        if (storedRole === "admin") {
            window.location.href = "admin_dashboard.html";
        } else {
            window.location.href = "user_dashboard.html";
        }

    } else {
        alert("Invalid Credentials");
    }
}