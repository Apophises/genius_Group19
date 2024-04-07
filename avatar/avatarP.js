// Open or create IndexedDB database
const openRequest = indexedDB.open("avatarDatabase", 1);

openRequest.onerror = function(event) {
    console.error("Failed to open database:", event.target.error);
};

openRequest.onupgradeneeded = function(event) {
    const db = event.target.result;

    // Create a new object store for avatars
    const avatarStore = db.createObjectStore("avatars", { keyPath: "username", autoIncrement: true });

    // Define index for username
    avatarStore.createIndex("username", "username", { unique: false });
};

openRequest.onsuccess = function(event) {
    const db = event.target.result;

    function selectAvatar(avatarSrc) {
        alert("איזה כיף שבחרתם");
        // מסיר הדגשה מכל האווטארים
        document.querySelectorAll('.avatar').forEach(avatar => {
            avatar.classList.remove('avatar-selected');
        });

        // מוצא את האווטאר שנבחר ומוסיף לו הדגשה
        const selectedAvatar = Array.from(document.querySelectorAll('.avatar')).find(avatar => avatar.src.includes(avatarSrc));
        if (selectedAvatar) {
            selectedAvatar.classList.add('avatar-selected');
        }

        // Get the username from session storage
        const username = sessionStorage.getItem("username");

        // Open a transaction to access the database
        const transaction = db.transaction(["avatars"], "readwrite");

        // Get the object store
        const avatarStore = transaction.objectStore("avatars");

        // Check if an avatar selection already exists for the user
        const getUserRequest = avatarStore.index("username").get(username);

        getUserRequest.onsuccess = function(event) {
            const userData = event.target.result;

            if (userData) {
                // If an avatar selection exists, update it
                userData.avatarSrc = avatarSrc;
                const updateRequest = avatarStore.put(userData);

                updateRequest.onsuccess = function(event) {
                    console.log("Avatar selection updated successfully.");
                };

                updateRequest.onerror = function(event) {
                    console.error("Failed to update avatar selection:", event.target.error);
                };
            } else {
                // If no avatar selection exists, add a new row
                const addRequest = avatarStore.add({ username: username, avatarSrc: avatarSrc });

                addRequest.onsuccess = function(event) {
                    console.log("Avatar selection saved successfully.");
                };

                addRequest.onerror = function(event) {
                    console.error("Failed to save avatar selection:", event.target.error);
                };
            }
        };
    }

    // Attach the selectAvatar function to the window object
    window.selectAvatar = selectAvatar;
};
