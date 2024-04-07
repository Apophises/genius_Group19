function isPasswordValid(password) {
    return /^[a-zA-Z0-9]{1,18}$/.test(password);
    }
    
    module.exports = isPasswordValid


function isValidIDNumber(idNumber) {
        return /^[0-9]{9}$/.test(idNumber);
}
    
module.exports = isValidIDNumber


function isValidUsername(username) {
    return /^[a-zA-Z0-9]{1,20}$/.test(username);
}

module.exports = isValidUsername


function login(username1, username2, password1, password2) {
    return (username1===username2 && password1 === password2);
}

module.exports = login

function playSound(soundSrc) {
    const soundElement = document.getElementById('wordSound');
    soundElement.src = soundSrc;
    soundElement.play();
}

module.exports = playSound

function checkAnswer(selected, correct) {
    if (selected === correct) {
        alert("נכון! מעבר לשלב הבא.");
        currentStage++;
        if (currentStage < stages.length) {
            setupStage(currentStage);
        } else {
            alert("כל הכבוד! סיימת את המשחק.");
            currentStage = 0;
            setupStage(currentStage);
            window.location.href = "feedbackPupil.html";
        }
    } else {
        alert("לא נכון, נסה שוב.");
    }
}

module.exports = checkAnswer;


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
  // צריך לטפל בהכנסה לשרת!!!!!!!
};

module.exports = feedback