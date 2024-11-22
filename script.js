const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const highScoreDisplay = document.getElementById("high-score");
const restartButton = document.getElementById("restart");
const pauseResumeButton = document.getElementById("pause-resume");

let score = 0;
let timeLeft = 30;
let gameInterval, timerInterval;
let balloonSpawnRate = 1000;
let paused = false;

// Load high score from local storage
let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.textContent = highScore;

// Pause/Resume functionality
pauseResumeButton.addEventListener("click", () => {
    paused = !paused;
    pauseResumeButton.textContent = paused ? "Resume" : "Pause";
    if (paused) {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
    } else {
        startTimer();
        startSpawning();
    }
});

// Create balloon with special types
function createBalloon() {
    if (paused) return;

    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    // Random properties
    const colors = ["red", "yellow", "blue", "green", "purple"];
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = Math.random() * (gameContainer.offsetWidth - 50) + "px";
    balloon.style.animationDuration = `${Math.random() * 3 + 2}s`;

    // Add special balloons
    if (Math.random() < 0.2) {
        balloon.classList.add("special-balloon");
    }

    // Balloon click event
    balloon.addEventListener("click", () => {
        // Play pop sound
        const popSound = new Audio("pop.mp3");
        popSound.play();

        if (balloon.classList.contains("special-balloon")) {
            score += 5; // Bonus points for special balloons
        } else {
            score++;
        }
        scoreDisplay.textContent = score;
        balloon.remove();
    });

    gameContainer.appendChild(balloon);

    // Remove balloon after floating
    setTimeout(() => balloon.remove(), 5000);
}

// Start balloon spawning
function startSpawning() {
    gameInterval = setInterval(createBalloon, balloonSpawnRate);
}

// Start timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (paused) return;
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        // Increase difficulty
        if (timeLeft % 10 === 0 && balloonSpawnRate > 400) {
            balloonSpawnRate -= 100;
            clearInterval(gameInterval);
            startSpawning();
        }

        // End game
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
}

// End game
function endGame() {
    gameOverScreen.classList.remove("hidden");
    finalScore.textContent = score;

    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
    highScoreDisplay.textContent = highScore;
}

// Restart game
restartButton.addEventListener("click", () => {
    score = 0;
    timeLeft = 30;
    balloonSpawnRate = 1000;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    gameOverScreen.classList.add("hidden");
    startTimer();
    startSpawning();
});

// Start the game
startTimer();
startSpawning();
