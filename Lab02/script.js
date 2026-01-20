// Lab 02 - Validation + Sanitization
// Prevents XSS by removing dangerous characters

// Sanitization function
function sanitizeInput(input) {
    // Replace < > ' " / with empty string or safe equivalents
    // Simple regex to remove dangerous chars
    return input.replace(/[<>'"]/g, "");
}

function registerUser() {
    let user = document.getElementById("regUser").value;
    let pass = document.getElementById("regPass").value;

    // 1. Sanitize Input
    const safeUser = sanitizeInput(user);
    
    if (user !== safeUser) {
        alert("Warning: Illegal characters detected and removed from username!");
        user = safeUser; // Use the sanitized version
    }

    // 2. Basic Validation
    if (user === "" || pass === "") {
        alert("Error: Fields cannot be empty.");
        return;
    }

    localStorage.setItem("lab02_user", user);
    localStorage.setItem("lab02_pass", pass);

    alert("Registered successfully as: " + user);
    window.location.href = "login.html";
}

function loginUser() {
    let user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    // 1. Sanitize Input
    user = sanitizeInput(user);

    const storedUser = localStorage.getItem("lab02_user");
    const storedPass = localStorage.getItem("lab02_pass");

    if (user === storedUser && pass === storedPass) {
        alert("Login Validated & Sanitized! Welcome.");
    } else {
        alert("Invalid Credentials.");
    }
}