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
let scoreRound = document.getElementById("scoring");

//TODO: Select newly created dice by adding dice number to class and grabbing that element by the class name

let diceList = [0, 0, 0, 0, 0];
let numToImg = {
    1: "./img/dice 1.png",
    2: "./img/dice 2.png",
    3: "./img/dice 3.png",
    4: "./img/dice 4.png",
    5: "./img/dice 5.png",
    6: "./img/dice 6.png"
};

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
    winNumber = Math.floor(Math.random() * 6 * 5) + 1;
    goalText.textContent = `Your Goal: ${winNumber}`;
    play.style.visibility = 'hidden';
    play.style.maxHeight = '0px';
    shop.style.visibility = 'visible';
}

function resetDice() {
    let total = 0;
    for (let i in diceList) {
        diceList[i] = Math.floor(Math.random() * 6 * diceNumber) + 1;
        total += diceList[i];
    }

    checkScore();
    document.getElementById("roll").textContent = `Your Roll: ${total}`;
    timeout.style.visibility = 'hidden';
    dice.src = "./img/dice.png";
    if (attempts <= 0) {
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

function checkScore() {
    let dlCopy = diceList.slice();
    let yahtzee = false;
    let pair = false;
    dlCopy.sort();

    for (let i = 0; i < dlCopy.length - 1; i++) {
        console.log(dlCopy[i]);
        if (diceList[i] == dlCopy[i + 1]) {
            yahtzee = true;
            pair = true;
        } else {
            yahtzee = false;
        }
    }

    console.log("Yahtzee: " + yahtzee);
    console.log("Pair: " + pair);
    console.log("__________________________________");

    //______________________________________________

    play.style.visibility = 'hidden';
    play.style.maxHeight = '0px';
    scoreRound.style.visibility = "visible";

    for (let i = 1; i <= diceList.length; i++) {
        console.log(i.toString());
        document.getElementsByClassName("dice " + i.toString())[0].src = numToImg[diceList[i-1]];
        console.log(numToImg[i]);
    }
}