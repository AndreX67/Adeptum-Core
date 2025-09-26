/*============== Server ==============*/
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path"); // Make sure this is imported

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Use path.join for robustness

// route pro formulář
app.post("/subscribe", (req, res) => {
    const email = req.body.email;

    // --- ADD THIS VALIDATION CHECK ---
    if (email && email.trim() !== '') { // Check if email exists and is not just whitespace
        fs.appendFileSync("emails.txt", email + "\n"); // uloží email do souboru
        console.log('Email saved:', email); // Log for debugging
        res.redirect("/?status=success"); // Redirect to home page with success status
    } else {
        console.log('Attempted submission with empty or invalid email.'); // Log for debugging
        // Redirect back to the home page with an error status for empty email
        res.redirect("/?status=noemail");
    }
});

app.listen(3000, () => {
    console.log("Server běží na http://localhost:3000");
});
