const stages = [
    { img: "balls.jpg", options: ['1', '2', '3', '5'], correct: '5' },
    { img: "books.jpg", options: ['8', '7', '2', '6'], correct: '8' },
    { img: "dogs.jpg", options: ['4', '5', '6', '3'], correct: '4' },
    { img: "dwarves.jpg", options: ['4', '6', '7', '8'], correct: '7' },
    { img: "spinning_wheels.jpg", options: ['4', '3', '2', '1'], correct: '3' }
  ];
  
  let currentStage = 0;
  
  function loadStage(stageIndex) {
    const stage = stages[stageIndex];
    document.getElementById('image').src = stage.img;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // Clear previous options
    stage.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option, stage.correct);
        optionsContainer.appendChild(button);
    });
  }
  
  function checkAnswer(selectedOption, correctOption) {
    if (selectedOption === correctOption) {
        currentStage++;
        if (currentStage < stages.length) {
            loadStage(currentStage);
        } else {
            alert('כל הכבוד! סיימת את המשחק.');
            currentStage = 0;
            loadStage(currentStage); // Restart game
        }
    } else {
        alert('נסה שוב!');
    }
  }
  
  window.onload = () => loadStage(currentStage);