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
            // Save inputs in a cookie
            document.cookie = `username=${username}; password=${password}; idNumber=${idNumber}`;

            // Redirect to login page
            window.location.href = "login3.html";
        } else {
            // Display error message
            alert("אחד או יותר מהקלטים שגויים. אנא בדוק שוב את הקלטים ונסה שוב.");
        }
    });
});
