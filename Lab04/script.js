// Lab 04 - Safe Error Handling & Caps Lock

function registerUser() {
    const user = document.getElementById("regUser").value;
    const pass = document.getElementById("regPass").value;
    localStorage.setItem("lab04_user", user);
    localStorage.setItem("lab04_pass", pass);
    alert("Registered.");
    window.location.href = "login.html";
}

// 1. Caps Lock Detection
function checkCaps(event) {
    const warning = document.getElementById("capsWarning");
    if (event.getModifierState("CapsLock")) {
        warning.style.display = "block";
    } else {
        warning.style.display = "none";
    }
}

function loginUser() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;
    
    const storedUser = localStorage.getItem("lab04_user");
    const storedPass = localStorage.getItem("lab04_pass");

    // 2. Safe Error Messages
    // BAD: "User not found" (Reveals username exists)
    // BAD: "Wrong password" (Reveals username is correct)
    // GOOD: "Invalid username or password" (Generic)

    if (user === storedUser && pass === storedPass) {
        alert("Login Success");
    } else {
        // Generic error message for security
        alert("Error: Invalid username or password.");
    }
}