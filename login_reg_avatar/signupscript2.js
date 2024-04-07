document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("signupForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values from the form inputs
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const idNumber = document.getElementById("idNumber").value;
        
        // Check if all conditions are met
        const isUsernameValid = /^[a-zA-Z0-9]{1,20}$/.test(username);
        const isPasswordValid = /^[a-zA-Z0-9]{1,18}$/.test(password);
        const isIdNumberValid = /^[0-9]{9}$/.test(idNumber);

        if (isUsernameValid && isPasswordValid && isIdNumberValid) {
            // Open (or create) the database
            const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

            const request = indexedDB.open("userDatabase", 1);

            request.onerror = function(event) {
                console.log("Database error: " + event.target.errorCode);
            };

            request.onupgradeneeded = function(event) {
                const db = event.target.result;
                const objectStore = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
                objectStore.createIndex("username", "username", { unique: true });
                objectStore.createIndex("id", "id", { unique: true });
            };

            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction(["users"], "readwrite");
                const objectStore = transaction.objectStore("users");

                const newUser = { username: username, password: password, id: idNumber, status: "parent" };
                const addUserRequest = objectStore.add(newUser);

                addUserRequest.onsuccess = function(event) {
                    console.log("User inserted into the database");
                    // Redirect to the login page
                    window.location.href = 'login2.html';
                };

                addUserRequest.onerror = function(event) {
                    console.error("Error adding user to database: " + event.target.errorCode);
                    alert("משתמש קיים");
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
