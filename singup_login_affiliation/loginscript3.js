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
            const request = indexedDB.open("userDatabase");

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

                    if (user && user.status === "teacher") {
                        // User found and status is 'teacher', check password
                        if (user.password === password) {
                            console.log("Login successful");
                            // Save username and user type to session storage
                            sessionStorage.setItem("username", username);
                            sessionStorage.setItem("status", user.status);
                            // Redirect to login page
                            window.location.href = "menuT.html";
                        } else {
                            console.log("Incorrect password");
                            alert("סיסמה שגויה");
                        }
                    } else {
                        console.log("User not found");
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