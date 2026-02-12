let dice = document.getElementById("dice")
let roundNum = 0;
let roundText = document.getElementById("round");
let goalText = document.getElementById("goal");
let winNumber;
let timeout = document.getElementById("timeout");
let play = document.getElementById("play");
let nextRound = document.getElementById("next_round");
let shop = document.getElementById("shop");

window.addEventListener('load', round);
dice.addEventListener("click", roll);
nextRound.addEventListener("click", playRound);

function roll() {
    dice.src = "./img/dice_rolling.gif";
    timeout.style.visibility = 'visible';
    setTimeout(resetDice, 1500);

    if (randomNumber == winNumber) {
        document.getElementById("score").textContent = "You Win!";
        timeout.style.visibility = 'visible';
        setTimeout(round, 5000);
    }
}

function round() {
    timeout.style.visibility = 'hidden';
    document.getElementById("score").textContent = "";
    roundNum++;
    roundText.textContent = `Round Number: ${roundNum}`;
    winNumber = Math.floor(Math.random() * 6) + 1;
    goalText.textContent = `Your Goal: ${winNumber}`;
    play.style.visibility = 'hidden';
    play.style.maxHeight = '0px';
    shop.style.visibility = 'visible';
}

function resetDice() {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    document.getElementById("roll").textContent = `Your Roll: ${randomNumber}`;
    timeout.style.visibility = 'hidden';
    dice.src = "./img/dice.png";
}

function playRound() {
    shop.style.visibility = 'hidden';
    play.style.removeProperty('maxHeight');
    play.style.visibility = 'visible';
}