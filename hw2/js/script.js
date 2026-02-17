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
let attemptsText = document.getElementById("attempts_num");
let bgMusic = new Audio("./img/marioMusic.mp3");
let beginButton = document.getElementById("beginButton");
let loseScreen = document.getElementById("loser");
let restartButton = document.getElementById("restart");

let diceList = [0, 0, 0, 0, 0];

let setRound = 1;
let diceNumber = 1;
let attempts = 5;

dice.addEventListener("click", roll);
nextRound.addEventListener("click", playRound);
beginButton.addEventListener("click", playBgMusic);
restartButton.addEventListener("click", restartGame);

function playBgMusic() {
    beginButton.style.visibility = "hidden";
    bgMusic.currentTime = 0;
    bgMusic.volume = 1;
    bgMusic.play();
    round();
    playRound();
}

function roll() {
    attempts--;
    attemptsText.textContent = `Attempts Left: ${attempts}`;
    dice.src = "./img/dice_rolling.gif";
    timeout.style.visibility = 'visible';
    setTimeout(resetDice, 1500);
}

function round() {
    attempts = 5;
    document.getElementById("roll").textContent = "Your Roll:";
    attemptsText.textContent = `Attempts Left: ${attempts}`;
    numDice.textContent = `Dice: ${diceNumber}`;
    timeout.style.visibility = 'hidden';
    document.getElementById("score").textContent = "";
    roundNum++;

    if (((roundNum % 3) == 1) && (roundNum != 1)) {
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
    } else if (attempts <= 0) {
        lose();
    }
}

function playRound() {
    shop.style.visibility = 'hidden';
    play.style.removeProperty('maxHeight');
    play.style.visibility = 'visible';
}

function newSet() {
    setRound++;
    diceNumber++;
    setNumber.textContent = `Set Number: ${setRound}`;
}

function lose() {
    play.style.visibility = 'hidden';
    play.style.maxHeight = '0px';
    loseScreen.style.visibility = "visible";
    pauseMusic();
}

function restartGame() {
    roundNum = 0;
    setRound = 1;
    diceNumber = 1;
    loseScreen.style.visibility = "hidden";
    playBgMusic();
}

function pauseMusic() {
    timeout.style.visibility = "visible";
    const lowerVolume = setInterval(() => {
        console.log(bgMusic.volume);
        bgMusic.volume = Math.max(0, bgMusic.volume - 0.1);
        if (bgMusic.volume <= 0) {
            timeout.style.visibility = "hidden";
            clearInterval(lowerVolume);
            console.log("Min Volume");
            bgMusic.pause();
        }
    }, 200);
}