let randomNumber;
let attempts;
let maxAttempts = 10;
let totalRounds = 0;
let totalAttempts = 0;

document.addEventListener("DOMContentLoaded", () => {
    initializeGame();

    document.getElementById("guessButton").addEventListener("click", () => {
        let userGuess = parseInt(document.getElementById("guessInput").value);
        if (!isNaN(userGuess)) {
            attempts--;
            totalAttempts++;
            checkGuess(userGuess);
        }
    });

    document.getElementById("playAgainButton").addEventListener("click", () => {
        totalRounds++;
        initializeGame();
    });
});

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = maxAttempts;
    document.getElementById("message").textContent = "I have generated a random number between 1 and 100. You have 10 attempts to guess it.";
    document.getElementById("attempts").textContent = `Attempts left: ${attempts}`;
    document.getElementById("guessInput").value = '';
    document.getElementById("guessInput").disabled = false;
    document.getElementById("guessButton").style.display = 'inline-block';
    document.getElementById("playAgainButton").style.display = 'none';
    updateScore();
}

function checkGuess(guess) {
    let message = '';
    if (guess === randomNumber) {
        message = 'Congratulations! You guessed the number correctly.';
        endGame();
    } else if (guess < randomNumber) {
        message = 'Too low! Try again.';
    } else {
        message = 'Too high! Try again.';
    }
    
    if (attempts === 0 && guess !== randomNumber) {
        message = `You've used all your attempts. The number was: ${randomNumber}`;
        endGame();
    }
    
    document.getElementById("message").textContent = message;
    document.getElementById("attempts").textContent = `Attempts left: ${attempts}`;
}

function endGame() {
    document.getElementById("guessInput").disabled = true;
    document.getElementById("guessButton").style.display = 'none';
    document.getElementById("playAgainButton").style.display = 'inline-block';
}

function updateScore() {
    let averageAttempts = (totalRounds > 0) ? (totalAttempts / totalRounds).toFixed(2) : 0;
    document.getElementById("score").textContent = `Total Rounds: ${totalRounds}, Average Attempts per Round: ${averageAttempts}`;
}
