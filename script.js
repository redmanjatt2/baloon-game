const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let score = 0;

// Function to create a balloon
function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    // Random horizontal position
    balloon.style.left = Math.random() * (window.innerWidth - 50) + "px";

    // Random color
    const colors = ["red", "yellow", "blue", "green", "purple"];
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Add click event to pop the balloon
    balloon.addEventListener("click", () => {
        balloon.remove();
        score++;
        scoreDisplay.textContent = score;
    });

    gameContainer.appendChild(balloon);

    // Remove balloon after it floats away
    setTimeout(() => {
        balloon.remove();
    }, 5000);
}

// Create balloons every 1 second
setInterval(createBalloon, 1000);
