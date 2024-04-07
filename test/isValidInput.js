function feedback(){
    document.getElementById('feedbackForm').onsubmit = function(event) {
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
 } // צריך לטפל בהכנסה לשרת!!!!!!!
};

module.exports = feedback