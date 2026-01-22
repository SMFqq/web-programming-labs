const menuContainer = document.getElementById('menu-container');
const gameUi = document.getElementById('game-ui');
const clickArea = document.getElementById('click-area');
const difficultySelect = document.getElementById('difficulty-select');
const colorPicker = document.getElementById('color-picker');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const targetPixel = document.getElementById('target-pixel');

let score = 0;
let timerInterval;
let timeLeft;
let currentConfig = {};

const difficultySettings = {
    easy: {
        time: 3,
        size: 50,
        spread: 0.2 
    },
    medium: {
        time: 2,
        size: 25,
        spread: 0.5 
    },
    hard: {
        time: 1,
        size: 10,
        spread: 1.0 
    }
};

startBtn.addEventListener('click', () => {
    const difficulty = difficultySelect.value;
    const color = colorPicker.value;

    if (!difficulty) {
        alert("Please select a difficulty!");
        return;
    }

    currentConfig = difficultySettings[difficulty];
    targetPixel.style.backgroundColor = color;
    targetPixel.style.width = currentConfig.size + 'px';
    targetPixel.style.height = currentConfig.size + 'px';

    score = 0;
    scoreDisplay.innerText = score;

    menuContainer.classList.add('hidden');
    gameUi.classList.remove('hidden');
    clickArea.classList.remove('hidden');

    spawnPixel();
});

targetPixel.addEventListener('click', () => {
    score++;
    scoreDisplay.innerText = score;
    clearInterval(timerInterval);
    spawnPixel();
});

function spawnPixel() {
    const areaWidth = window.innerWidth;
    const areaHeight = window.innerHeight;
    
    const size = currentConfig.size;
    
    let maxX = areaWidth - size;
    let maxY = areaHeight - size;

    let randomX, randomY;

    if (currentConfig.spread < 1.0) {
        const centerX = areaWidth / 2;
        const centerY = areaHeight / 2;
        
        const rangeX = (areaWidth * currentConfig.spread) / 2;
        const rangeY = (areaHeight * currentConfig.spread) / 2;

        randomX = centerX - rangeX + Math.random() * (rangeX * 2);
        randomY = centerY - rangeY + Math.random() * (rangeY * 2);

        if (randomX < 0) randomX = 0;
        if (randomY < 0) randomY = 0;
        if (randomX > maxX) randomX = maxX;
        if (randomY > maxY) randomY = maxY;

    } else {
        randomX = Math.random() * maxX;
        randomY = Math.random() * maxY;
    }

    targetPixel.style.left = randomX + 'px';
    targetPixel.style.top = randomY + 'px';

    startTimer(currentConfig.time);
}

function startTimer(seconds) {
    timeLeft = seconds;
    timerDisplay.innerText = timeLeft.toFixed(2);

    timerInterval = setInterval(() => {
        timeLeft -= 0.01;
        if (timeLeft <= 0) {
            timeLeft = 0;
            timerDisplay.innerText = "0.00";
            endGame();
        } else {
            timerDisplay.innerText = timeLeft.toFixed(2);
        }
    }, 10);
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Game Over! Your score: ${score}`);
    location.reload(); 
}