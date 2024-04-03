document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("addStudentForm");
    const errorMessage = document.getElementById("errorMessage");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // מונע את שליחת הטופס באופן דיפולטיבי

        const idNumber = document.getElementById("idNumber").value.trim();

        // וולידציה של תעודת הזהות לפי אורך ותווים
        if (/^\d{9}$/.test(idNumber)) {
            addStudentToList(idNumber);
            form.reset(); // איפוס הטופס לאחר הוספה תקינה
            errorMessage.style.display = "none"; // הסתרת ההודעה כאשר הכנסה תקינה
        } else {
            errorMessage.style.display = "block"; // הצגת ההודעה כאשר יש שגיאה
        }
    });
});

function addStudentToList(idNumber) {
    const list = document.getElementById("studentsList");
    const studentElement = document.createElement('div');
    studentElement.textContent = תעודת זהות: ${idNumber};
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'מחק';
    deleteButton.onclick = function() {
        studentElement.remove();
    };
    studentElement.appendChild(deleteButton);
    list.appendChild(studentElement);
}