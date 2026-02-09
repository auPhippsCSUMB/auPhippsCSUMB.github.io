let guessBtn = document.querySelector("#guessBtn");
guessBtn.addEventListener("click", guess);

//Global variables
let randomNumber = Math.floor(Math.random() * 99) + 1;
console.log(randomNumber);
let numAttempts = 0;

function guess() {
    numAttempts++;
    console.log(numAttempts);
    let num = document.querySelector("#userGuess").value;
    document.querySelector("#userGuesses").textContent += ` ${num} `;

    document.querySelector("#userGuesses").style.color = "red";
    document.querySelector("#userGuesses").style.backgroundColor = "yellow";

    if (numAttempts >= 7) {
        document.querySelector("#isWin").textContent = "YOU LOSE YOU ARE A LOSER GO AWAY!";
    }
    else if (num < randomNumber) {
        document.querySelector("#isWin").textContent = "TOO LOW!";
    } else if (num > randomNumber) {
        document.querySelector("#isWin").textContent = "TOO HIGH!";
    } else {
        document.querySelector("#isWin").textContent = `YOU WIN! number guessed: ${randomNumber}`;
        document.getElementById("fireGif").style.visibility = 'visible';
    }
}