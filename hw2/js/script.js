let dice = document.getElementById("dice")
let roundNum = 0;
let roundText = document.getElementById("round");
let goalText = document.getElementById("goal");
let winNumber;
let timeout = document.getElementById("timeout");
let play = document.getElementById("play");
let nextRound = document.getElementById("next_round");
let shop = document.getElementById("shop");
let scoreText = document.getElementById("score_text");
let setNumber = document.getElementById("set_num");
let attemptsText = document.getElementById("attempts_num");
let bgMusic = new Audio("./img/marioMusic.mp3");
let beginButton = document.getElementById("beginButton");
let loseScreen = document.getElementById("loser");
let restartButton = document.getElementById("restart");
let scoreRound = document.getElementById("scoring");
let score = 0;
let dlCopy;
let controller;

let diceList = [0, 0, 0, 0, 0];
let numToImg = {
    1: "./img/dice 1.png",
    2: "./img/dice 2.png",
    3: "./img/dice 3.png",
    4: "./img/dice 4.png",
    5: "./img/dice 5.png",
    6: "./img/dice 6.png"
};

let classToInt = {
    "dice 1": 1,
    "dice 2": 2,
    "dice 3": 3,
    "dice 4": 4,
    "dice 5": 5,
    "dice 6": 6
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
    score = 0;
    attempts = 5;
    document.getElementById("roll").textContent = "Your Roll:";
    attemptsText.textContent = `Attempts Left: ${attempts}`;
    scoreText.textContent = `Score: ${score}`;
    timeout.style.visibility = 'hidden';
    document.getElementById("score").textContent = "";
    roundNum++;

    if (((roundNum % 3) == 1) && (roundNum != 1)) {
        newSet();
    }

    roundText.textContent = `Round Number: ${roundNum}`;
    winNumber = Math.floor(Math.random() * 6 * 5) + 1;
    goalText.textContent = `Your Goal: ${1000 * roundNum * setRound}`;
    scoreRound.style.visibility = "hidden";
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
    scoreRound.style.visibility = "hidden";
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
    dlCopy = diceList.slice();
    dlCopy.sort();

    // console.log("Yahtzee: " + yahtzee);
    // console.log("Pair: " + pair);
    // console.log("__________________________________");

    //______________________________________________

    play.style.visibility = 'hidden';
    play.style.maxHeight = '0px';
    scoreRound.style.visibility = "visible";

    for (let i = 1; i <= diceList.length; i++) {
        // console.log(i.toString());
        document.getElementsByClassName("dice " + i.toString())[0].src = numToImg[diceList[i - 1]];
        document.getElementsByClassName("dice " + i.toString())[0].alt = diceList[i - 1].toString();
        // console.log(numToImg[i]);
    }

    //This creates a one-time onClick listener that gets aborted every single roll to ensure that multiple
    //click listeners are not added to the pics of the dice
    controller = setupControllers();
}

// SECTION BELOW IS BASIC SCORING LOGIC
//____________________________________________________
function yahtzee() {
    let yahtzee = true;
    for (let i = 0; i < dlCopy.length - 1; i++) {
        // console.log(dlCopy[i]);
        if (dlCopy[i] != dlCopy[i + 1]) {
            yahtzee = false;
            break;
        } else {
            score += (dlCopy[i] * 100);
        }
    }
    scoreText.textContent = `Score: ${score}`;

    removeListeners();
   
    if (score >= 1000 * roundNum * setRound) {
        round();
    } else {
        playRound();
    }
}

function pair(num) {
    // num = 1;
    num = parseInt(document.getElementsByClassName("dice " + num.toString())[0].alt);
    for (let i = 0; i < dlCopy.length; i++) {
        console.log(dlCopy[i]);
        if (dlCopy[i] == num) {
            score += (dlCopy[i] * 100);
            // console.log("found " + num);
        }
    }
    scoreText.textContent = `Score: ${score}`;

    removeListeners();

    if (score >= 1000 * roundNum * setRound) {
        round();
    } else {
        playRound();
    }
}
//____________________________________________________

function setupControllers() {
    const controller = new AbortController();
    const signal = controller.signal;

    for (let i = 1; i <= diceList.length; i++) {
        document.getElementsByClassName("dice " + i.toString())[0].addEventListener("click", function () {
            // console.log(parseInt(document.getElementsByClassName("dice " + i.toString())[0].alt));
            pair(classToInt[document.getElementsByClassName("dice " + i.toString())[0].className]);
        }, { signal });
    }

    return controller;
}

function removeListeners() {
    controller.abort();
}