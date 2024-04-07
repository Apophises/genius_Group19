const stages = [
    {sound: "sounds.six.ogg", correct: "6", options: ["6", "4", "8", "7"]},
    {sound: "sounds.one.ogg", correct: "1", options: [ "1", "8", "2", "3"]},
    {sound: "sounds.four.ogg", correct: "4", options: [ "8", "4", "1", "7"]},
    {sound: "sounds.seven.ogg", correct: "7", options: ["3", "2", "8", "7"]},
    {sound: "sounds.nine.ogg", correct: "9", options: ["9", "5", "10", "8"]}
];

let currentStage = 0;

function setupStage(stageIndex) {
    const stage = stages[stageIndex];
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // נקה את האופציות לפני הוספת החדשות
    
    // יצירת כפתורים עבור כל אחת מהאופציות
    stage.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option, stage.correct);
        optionsDiv.appendChild(button);
    });

    // הגדרת הכפתור להשמעת הצליל
    const playSoundBtn = document.getElementById('play-sound');
    playSoundBtn.onclick = () => playSound(stage.sound);
}

function playSound(soundSrc) {
    const soundElement = document.getElementById('wordSound');
    soundElement.src = soundSrc;
    soundElement.play();
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        alert("נכון! מעבר לשלב הבא.");
        currentStage++;
        if (currentStage < stages.length) {
            setupStage(currentStage);
        } else {
            alert("כל הכבוד! סיימת את המשחק.");
            // אפשרות להתחיל מחדש את המשחק
            currentStage = 0;
            setupStage(currentStage);
            window.location.href = "feedbackParent.html"
        }
    } else {
        alert("לא נכון, נסה שוב.");
    }
}

// הפעלת המשחק עם השלב הראשון
setupStage(currentStage);