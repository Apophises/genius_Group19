const stages = [
    {sound: "sounds/balloon.mp3", correct: "ב", options: ["ב", "ע", "ח", "ו"]},
    {sound: "sounds/love.mp3", correct: "א", options: [ "א", "ה", "ג", "ד"]},
    {sound: "sounds/song.mp3", correct: "ש", options: [ "ט", "ר", "ש", "ג"]},
    {sound: "sounds/notebook.mp3", correct: "מ", options: ["מ", "ע", "ב", "ס"]},
    {sound: "sounds/house.mp3", correct: "ב", options: ["ג", "כ", "ב", "ד"]}
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
        }
    } else {
        alert("לא נכון, נסה שוב.");
    }
}

// הפעלת המשחק עם השלב הראשון
setupStage(currentStage);