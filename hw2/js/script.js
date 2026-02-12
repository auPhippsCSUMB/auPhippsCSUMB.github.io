let dice = document.getElementById("dice")
let roundNum = 0;
let roundText = document.getElementById("round");
let goalText = document.getElementById("goal");
let winNumber;
let timeout = document.getElementById("timeout");
let play = document.getElementById("play");
let nextRound = document.getElementById("next_round");
let shop = document.getElementById("shop");
let numDice = document.getElementById("num_dice");
let setNumber = document.getElementById("set_num");
let setRound = 0;
let diceNumber = 0;

window.addEventListener('load', round);
dice.addEventListener("click", roll);
nextRound.addEventListener("click", playRound);

function roll() {
    dice.src = "./img/dice_rolling.gif";
    timeout.style.visibility = 'visible';
    setTimeout(resetDice, 1500);
}

function round() {
    numDice.textContent = `Dice: ${diceNumber}`;
    timeout.style.visibility = 'hidden';
    document.getElementById("score").textContent = "";
    roundNum++;

    if (roundNum %3 == 0) {
        newSet();
    }

    roundText.textContent = `Round Number: ${roundNum}`;
    winNumber = Math.floor(Math.random() * 6 * diceNumber) + 1;
    goalText.textContent = `Your Goal: ${winNumber}`;
    play.style.visibility = 'hidden';
    play.style.maxHeight = '0px';
    shop.style.visibility = 'visible';
}

function resetDice() {
    let randomNumber = Math.floor(Math.random() * 6 * diceNumber) + 1;
    document.getElementById("roll").textContent = `Your Roll: ${randomNumber}`;
    timeout.style.visibility = 'hidden';
    dice.src = "./img/dice.png";

    if (randomNumber == winNumber) {
        console.log(randomNumber + " " + winNumber);
        document.getElementById("score").textContent = "You Win!";
        timeout.style.visibility = 'visible';
        setTimeout(round, 5000);
    }
}

function playRound() {
    shop.style.visibility = 'hidden';
    play.style.removeProperty('maxHeight');
    play.style.visibility = 'visible';
}

function newSet() {
    diceNumber++;
    setNumber.textContent = `Set Number: ${setRound}`;
}