const playerCar = document.getElementById("player-car");
const gameContainer = document.querySelector(".game-container");
const roadWidth = 400; // Road width (px)
const carWidth = 50;   // Car width (px)

// Initial position of the car
let carX = 175;

// Listen for keyboard events
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        moveCar(-10); // Move left
    } else if (e.key === "ArrowRight") {
        moveCar(10); // Move right
    }
});

// Function to move the car
function moveCar(distance) {
    carX += distance;

    // Prevent the car from going off the road
    if (carX < 0) carX = 0;
    if (carX > roadWidth - carWidth) carX = roadWidth - carWidth;

    // Update the car's position
    playerCar.style.left = `${carX}px`;
}
