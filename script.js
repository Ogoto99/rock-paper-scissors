//Get to DOM elements
const gameContainer = document.querySelector(".container"),
userResult = document.querySelector(".user_result img"),
cpuResult = document.querySelector(".cpu_result img"),
result = document.querySelector(".result"),
optionImages = document.querySelectorAll(".option_image");

// Variables to track scores
let userScore = 0;
let cpuScore = 0;

// Update the result display with scores
function updateResultDisplay(outcome, userChoice, cpuChoice) {
  const outcomeText = outcome === "Draw" ? "Match Draw" : `${outcome} Won!!`;
  const scoreText = `User: ${userScore} | CPU: ${cpuScore}`;
  result.textContent = `${outcomeText} (${userChoice} vs. ${cpuChoice}) - ${scoreText}`;
}

// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "assets/fist (1).png";
    result.textContent = "Wait...";

    // Loop through each option image again
    optionImages.forEach((image2, index2) => {
      // If your current index doesn't match the clicked index
      // remove the "active" class from the other option images
      if (index !== index2) image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    // Set a timeout to delay the result calculation
    setTimeout(() => {
      gameContainer.classList.remove("start");

      // Get the source of the clicked option image
      const userChoice = ["Rock", "Paper", "Scissors"][index];
      userResult.src = `assets/${userChoice.toLowerCase()}.png`;

      // Generate a random number between 0 and 2
      const randomNumber = Math.floor(Math.random() * 3);
      const cpuChoice = ["Rock", "Paper", "Scissors"][randomNumber];
      cpuResult.src = `assets/${cpuChoice.toLowerCase()}.png`;

      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      const cpuValue = ["R", "P", "S"][randomNumber];
      // Assign a letter value to the clicked option (based on index)
      const userValue = ["R", "P", "S"][index];

      // Create an object with all possible outcomes
      const outcomes = {
        RR: "Draw",
        RP: "Cpu",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "Cpu",
        SS: "Draw",
        SR: "Cpu",
        SP: "User",
      };

      // Look up the outcome value based on user and CPU options
      const outcome = outcomes[userValue + cpuValue];

      // Update scores based on the outcome
      if (outcome === "User") {
        userScore++;
      } else if (outcome === "Cpu") {
        cpuScore++;
      }

      // Display the result
      updateResultDisplay(outcome, userChoice, cpuChoice);
    }, 2500);
  });
});

// Reset button functionality
const resetBtn = document.createElement("button");
resetBtn.id = "resetBtn";
resetBtn.textContent = "Reset Game";
document.querySelector(".container").appendChild(resetBtn);

resetBtn.addEventListener("click", () => {
  userScore = 0;
  cpuScore = 0;
  result.textContent = "Let's Play!!";
  userResult.src = "assets/fist (1).png";
  cpuResult.src = "assets/fist (1).png";
});