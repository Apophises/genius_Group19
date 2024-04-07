document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("addStudentForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const idNumber = document.getElementById("studentId").value;
        const isIdNumberValid = /^[0-9]{9}$/.test(idNumber);
        const username = sessionStorage.getItem("username");
        if (isIdNumberValid) {
            const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

            const request = indexedDB.open("userDatabase", 1);

            request.onerror = function(event) {
                console.error("Database error: ", event.target.error);
            };

            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction(["users"], "readonly");
                const objectStore = transaction.objectStore("users");

                // Check if the ID exists in the "users" table
                const getUserRequest = objectStore.get(idNumber);

                getUserRequest.onsuccess = function(event) {
                    const user = event.target.result;
                    if (user && user.status === "student") {
                        const affiliationDB = indexedDB.open("affiliationDatabase", 1);

                        affiliationDB.onerror = function(event) {
                            console.error("Database error: ", event.target.error);
                        };

                        affiliationDB.onsuccess = function(event) {
                            const db = event.target.result;
                            const transaction = db.transaction(["affiliation"], "readwrite");
                            const objectStore = transaction.objectStore("affiliation");

                            // Check if the user already has an affiliation record
                            const getAffiliationRequest = objectStore.get(username);

                            getAffiliationRequest.onsuccess = function(event) {
                                const affiliationData = event.target.result;

                                if (affiliationData) {
                                    // Check if the student is already affiliated
                                    if (affiliationData.data.includes(idNumber)) {
                                        alert("התלמיד כבר משוייך לך.");
                                    } else {
                                        // If the user already has an affiliation record, update it
                                        const updatedData = affiliationData.data.concat(idNumber);
                                        const updateRequest = objectStore.put({ username: username, data: updatedData });

                                        updateRequest.onsuccess = function(event) {
                                            console.log("Affiliation record updated successfully.");
                                            displayAffiliationData(updatedData); // Display updated affiliation data
                                        };

                                        updateRequest.onerror = function(event) {
                                            console.error("Error updating affiliation record: ", event.target.error);
                                        };
                                    }
                                } else {
                                    // If the user does not have an affiliation record, create a new one
                                    const addRequest = objectStore.add({ username: username, data: [idNumber] });

                                    addRequest.onsuccess = function(event) {
                                        console.log("Affiliation record added successfully.");
                                        displayAffiliationData([idNumber]); // Display updated affiliation data
                                    };

                                    addRequest.onerror = function(event) {
                                        console.error("Error adding affiliation record: ", event.target.error);
                                    };
                                }
                            };

                            getAffiliationRequest.onerror = function(event) {
                                console.error("Error getting affiliation record: ", event.target.error);
                            };
                        };
                    } else {
                        alert("המשתמש לא נמצא או אינו סטודנט.");
                    }
                };
            };
        } else {
            alert("תעודת הזהות חייבת להיות מספר בעל 9 ספרות.");
        }
        
    });
});

function displayAffiliationData(affiliationData) {
    const affiliationList = document.getElementById("affiliationList");
    affiliationList.innerHTML = ""; // Clear previous data

    if (affiliationData && affiliationData.length > 0) {
        affiliationData.forEach(id => {
            const listItem = document.createElement("li");
            listItem.textContent = id;
            affiliationList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement("li");
        listItem.textContent = "לא נמצאו תלמידים משויכים";
        affiliationList.appendChild(listItem);
    }
}
