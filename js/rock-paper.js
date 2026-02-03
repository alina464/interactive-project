let rock = document.querySelector("#move-rock");
let paper = document.querySelector("#move-paper");
let scissors = document.querySelector("#move-scissors");
let compMove = document.querySelector(".rock__paper-computermove");
let userScore = document.querySelector("#user-score");
let compScore = document.querySelector("#computer-score");
let count = document.querySelector("#rock-paper-count");
let userPoints = 0;
let computerPoints = 0;
const moves = ["rock", "paper", "scissors"];
function playRound(userChoice) {
    const computerChoice = moves[Math.floor(Math.random() * moves.length)];
    compMove.textContent = computerChoice; 
    if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        userPoints++;
        alert("Ви виграли!");
        userScore.textContent = userPoints;
    } 
    else if (userChoice === computerChoice) {
        alert("Нічия!");
    } 
    else {
        computerPoints++;
        alert("Комп’ютер виграв!");
        compScore.textContent = computerPoints;
    }
    count.textContent = `${userPoints}:${computerPoints}`;
}
rock.addEventListener("click", () => playRound("rock"));
paper.addEventListener("click", () => playRound("paper"));
scissors.addEventListener("click", () => playRound("scissors"));
