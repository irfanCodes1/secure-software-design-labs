// Lab 07 - Secure Password Storage (Hash + Salt)

// Helper to generate a random salt
function generateSalt(length = 16) {
    return CryptoJS.lib.WordArray.random(length).toString();
}

function registerUser() {
    const user = document.getElementById("regUser").value;
    const pass = document.getElementById("regPass").value;

    if (user === "" || pass === "") { alert("Fill all fields"); return; }

    // 1. Generate a unique random salt for this user
    const salt = generateSalt();

    // 2. Create Plain Hash (Unsafe - Vulnerable to Rainbow Tables)
    const plainHash = CryptoJS.SHA256(pass).toString();

    // 3. Create Salted Hash (Secure)
    // Combine password + salt, then hash
    const saltedHash = CryptoJS.SHA256(pass + salt).toString();

    // Show debug info for exam marks
    document.getElementById("debugSalt").innerText = salt;
    document.getElementById("debugPlain").innerText = plainHash;
    document.getElementById("debugSalted").innerText = saltedHash;

    // 4. Store User + Salt + SaltedHash
    // NEVER store the plain password or plain hash!
    localStorage.setItem("lab07_user", user);
    localStorage.setItem("lab07_salt", salt);
    localStorage.setItem("lab07_hash", saltedHash);

    alert("Registered Successfully with Salt!");
}

function loginUser() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    // Retrieve stored data
    const storedUser = localStorage.getItem("lab07_user");
    const storedSalt = localStorage.getItem("lab07_salt");
    const storedHash = localStorage.getItem("lab07_hash");

    if (user !== storedUser) {
        alert("User not found");
        return;
    }

    // 1. Re-create the hash using the stored salt
    // Must use the SAME salt used during registration
    const attemptHash = CryptoJS.SHA256(pass + storedSalt).toString();

    // 2. Compare calculated hash with stored hash
    if (attemptHash === storedHash) {
        alert("Login Successful! Hashes Match.");
    } else {
        alert("Invalid Password. Hashes do not match.");
    }
}