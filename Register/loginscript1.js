/*document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form inputs
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if username and password are stored in cookies
    var storedUsername = getCookie(username);
    var storedPassword = getCookie(password);

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

/*document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form inputs
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Function to get the value of a specific cookie by name
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=').map(item => item.trim());
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }

    // Check if username and password are stored in cookies
    var storedUsername = getCookie('username');
    var storedPassword = getCookie('password');

    // Check if inputs match the stored values
    if (username === storedUsername && password === storedPassword) {
        // Redirect to menu page
        window.location.href = "menuS.html";
    } else {
        // Display error message
        //alert("שם משתמש או סיסמה לא נכונים");
        window.location.href = "menuS.html";
    }
});*/

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
            // Open the database
            const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
            const request = indexedDB.open("userDatabase", 1);

            request.onerror = function(event) {
                console.log("Database error: " + event.target.errorCode);
            };

            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction(["users"], "readonly");
                const objectStore = transaction.objectStore("users");
                const index = objectStore.index("username");

                // Retrieve the user data based on username
                const getUserRequest = index.get(username);

                getUserRequest.onsuccess = function(event) {
                    const user = event.target.result;

                    if (user && user.status === "student") {
                        // User found and status is 'student', check password
                        if (user.password === password) {
                            console.log("Login successful");
                            // Redirect to login page
                            window.location.href = "menuS.html";
                        } else {
                            console.log("Incorrect password");
                            alert("סיסמה שגויה");
                        }
                    } else {
                        console.log("User not found or not a student");
                        alert("שם משתמש לא קיים");
                    }
                };

                getUserRequest.onerror = function(event) {
                    console.error("Error retrieving user data: " + event.target.errorCode);
                    alert("שגיאה בבדיקת משתמש");
                };

                transaction.oncomplete = function(event) {
                    db.close();
                };
            };  
        } else {
            // Display error message
            alert("אחד או יותר מהקלטים שגויים. אנא בדוק שוב את הקלטים ונסה שוב.");
        }
    });
});