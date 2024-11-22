const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart");

let score = 0;
let timeLeft = 30; // Game duration in seconds
let gameInterval;
let balloonSpawnRate = 1000; // Initial spawn rate (ms)

// Function to create a balloon
function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    // Random position and color
    balloon.style.left = Math.random() * (window.innerWidth - 50) + "px";
    const colors = ["red", "yellow", "blue", "green", "purple"];
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Random animation speed
    const speed = Math.random() * 3 + 2; // 2s to 5s
    balloon.style.animationDuration = `${speed}s`;

    // Pop the balloon on click
    balloon.addEventListener("click", () => {
        balloon.remove();
        score++;
        scoreDisplay.textContent = score;

        // Play pop sound
        const popSound = new Audio("pop.mp3");
        popSound.play();
    });

    gameContainer.appendChild(balloon);

    // Remove balloon after it floats away
    setTimeout(() => {
        balloon.remove();
    }, speed * 1000);
}

// Function to start the game
function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    gameOverScreen.classList.add("hidden");

    // Spawn balloons at intervals
    gameInterval = setInterval(createBalloon, balloonSpawnRate);

    // Countdown timer
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        // Increase difficulty over time
        if (timeLeft % 10 === 0 && balloonSpawnRate > 400) {
            balloonSpawnRate -= 100;
            clearInterval(gameInterval);
            gameInterval = setInterval(createBalloon, balloonSpawnRate);
        }

        // End the game when time runs out
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
}

// Function to end the game
function endGame() {
    gameOverScreen.classList.remove("hidden");
    finalScore.textContent = score;
}

// Restart the game
restartButton.addEventListener("click", startGame);

// Start the game on page load
startGame();
