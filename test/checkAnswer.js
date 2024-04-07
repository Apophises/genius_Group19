let currentStage = 0;

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