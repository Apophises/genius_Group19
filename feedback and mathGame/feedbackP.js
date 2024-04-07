/*document.getElementById('feedbackForm').onsubmit = function(event) {
    event.preventDefault(); // מונע את ברירת המחדל של שליחת הטופס
    const feedback = document.getElementById('feedback').value.replace(/\s/g, ''); // מסיר רווחים מהקלט
    // תיקון התנאי: הוספת סוגריים והפיכתו לתקין
    if (!(feedback.length >= 1 && feedback.length <= 500)) {
        alert('המשוב צריך להכיל בין תו אחת ל-500 תווים לא כולל רווחים.');
    } else {
        // כאן תוכל להוסיף קוד לטיפול במשוב תקין, למשל שליחתו לשרת או שמירתו ב-localStorage
        console.log('משוב תקין:', feedback);
        alert('המשוב התקבל')
    }
    
};*/

// Open or create IndexedDB database
const openRequest = indexedDB.open("feedbackDatabase", 1);

openRequest.onerror = function(event) {
    console.error("Failed to open database:", event.target.error);
};

openRequest.onupgradeneeded = function(event) {
    const db = event.target.result;

    // Create a new object store for feedback
    const feedbackStore = db.createObjectStore("feedbacks", { keyPath: "username", autoIncrement: true });

    // Define index for username
    feedbackStore.createIndex("username", "username", { unique: false });
};

openRequest.onsuccess = function(event) {
    const db = event.target.result;

    // Attach submitFeedback function to the form submit event
    document.getElementById('feedbackForm').onsubmit = function(event) {
        event.preventDefault(); // Prevent the default form submission

        const feedback = document.getElementById('feedback').value.trim(); // Trim whitespace from input
        const username = sessionStorage.getItem("username");

        // Open a transaction to access the database
        const transaction = db.transaction(["feedbacks"], "readwrite");

        // Get the object store
        const feedbackStore = transaction.objectStore("feedbacks");

        // Add the feedback along with username to the object store
        const addRequest = feedbackStore.add({ username: username, feedback: feedback });

        addRequest.onsuccess = function(event) {
            console.log("Feedback saved successfully.");
            alert("המשוב התקבל");
            document.getElementById('feedback').value = ''; // Clear the input field after submission
        };

        addRequest.onerror = function(event) {
            alert("משוב התקבל");
            console.error("Failed to save feedback:", event.target.error);
        };
    };
};
