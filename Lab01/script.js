// Lab 01 - Basic Login + Register
// Uses localStorage to simulate a database for Live Server

function registerUser() {
    const user = document.getElementById("regUser").value;
    const pass = document.getElementById("regPass").value;

    // 1. Validate empty fields
    if (user === "" || pass === "") {
        alert("Error: All fields are required!");
        return;
    }

    // 2. Password length >= 8
    if (pass.length < 8) {
        alert("Error: Password must be at least 8 characters!");
        return;
    }

    // 3. Save user (Simulated DB)
    // In a real exam with just JS, we can use localStorage to persist between pages
    localStorage.setItem("lab01_user", user);
    localStorage.setItem("lab01_pass", pass);

    alert("Registration Successful! Please login.");
    window.location.href = "login.html";
}

function loginUser() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    // Get stored data
    const storedUser = localStorage.getItem("lab01_user");
    const storedPass = localStorage.getItem("lab01_pass");

    // 1. Validate empty fields
    if (user === "" || pass === "") {
        alert("Error: Please fill in all fields.");
        return;
    }

    // 2. Check credentials
    if (user === storedUser && pass === storedPass) {
        alert("Login Successful! Welcome " + user);
    } else {
        alert("Error: Invalid username or password.");
    }
}