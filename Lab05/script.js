// Lab 05 - Encryption (AES) - Admin Only

function login() {
    const user = document.getElementById("user").value;
    
    // Simple RBAC check for demo
    if (user === "admin") {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("adminSection").style.display = "block";
        alert("Welcome Admin. Encryption tools unlocked.");
    } else {
        alert("Access Denied. Only 'admin' can encrypt data.");
    }
}

function encryptMsg() {
    const msg = document.getElementById("msg").value;
    const key = document.getElementById("key").value;

    if (!msg || !key) { alert("Enter message and key"); return; }

    // AES Encryption
    const encrypted = CryptoJS.AES.encrypt(msg, key).toString();
    
    document.getElementById("output").innerText = "Encrypted: " + encrypted;
}

function decryptMsg() {
    const cipher = document.getElementById("msg").value; // User pastes cipher here
    const key = document.getElementById("key").value;

    if (!cipher || !key) { alert("Enter ciphertext and key"); return; }

    try {
        // AES Decryption
        const bytes = CryptoJS.AES.decrypt(cipher, key);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        
        if (originalText) {
            document.getElementById("output").innerText = "Decrypted: " + originalText;
        } else {
            document.getElementById("output").innerText = "Error: Wrong Key or Invalid Cipher";
        }
    } catch (e) {
        alert("Decryption Failed");
    }
}