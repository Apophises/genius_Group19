/*document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form inputs
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if username and password are stored in cookies
    var storedUsername = getCookie('username');
    var storedPassword = getCookie('password');

    // Check if inputs match the stored values
    if (username === storedUsername && password === storedPassword) {
        // Redirect to menu page
        window.location.href = "menu.html";
    } else {
        // Display error message
        alert("שם משתמש או סיסמה לא נכונים");
    }
});

// Function to get cookie value by name
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}*/

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values from the form inputs
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        
        
        // Check if all conditions are met
        const isUsernameValid = /^[a-zA-Z0-9]{1,20}$/.test(username);
        const isPasswordValid = /^[a-zA-Z0-9]{1,18}$/.test(password);
        

        if (isUsernameValid && isPasswordValid) {
            // Log the values to see what is being stored
            console.log("username:", username);
            console.log("password:", password);
            

            
            // Redirect to login page
            window.location.href = "menuP.html";
        } else {
            // Display error message
            alert("אחד או יותר מהקלטים שגויים. אנא בדוק שוב את הקלטים ונסה שוב.");
        }
    });
});