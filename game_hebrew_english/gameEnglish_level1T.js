const stages = [
    {sound: "banana.ogg", correct: "b", options: ["l", "h", "g", "b"]},
    {sound: "iphone.ogg", correct: "i", options: [ "i", "l", "j", "d"]},
    {sound: "dog.ogg", correct: "d", options: [ "o", "a", "d", "c"]},
    {sound: "small.ogg", correct: "s", options: ["m", "s", "v", "e"]},
    {sound: "cat.ogg", correct: "c", options: ["c", "m", "f", "x"]}
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
            window.location.href = "feedbackTeacher.html"
        }
    } else {
        alert("לא נכון, נסה שוב.");
    }
}

// הפעלת המשחק עם השלב הראשון
setupStage(currentStage);