document.querySelector("#submitButton").addEventListener("click", gradeQuiz);
shuffleQ1Choices();
let attempts;

if (localStorage.getItem("Attempts") == null) {
    attempts = 0;
} else {
    attempts = localStorage.getItem("Attempts");
}

let attemptsText = document.getElementById("attempts");
attemptsText.textContent = `Attempts: ${attempts}`;

function shuffleQ1Choices() {
    let q1Choices = ["Peace Sign", "Thumbs Up", "Hands up-down", "Waving Hi"];
    let q5Choices = ["Question1", "Question2", "Question3", "Question4"];
    q1Choices = _.shuffle(q1Choices);
    q5Choices = _.shuffle(q5Choices);
    console.log(q1Choices);

    for (let i of q1Choices) {
        let radioElement = document.createElement("input");
        console.log(radioElement);
        radioElement.type = "radio";
        radioElement.name = "q1";
        radioElement.value = i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.className = "userInput";

        //puts the radio element inside the label element with .append
        labelElement.prepend(radioElement);

        document.querySelector("#q1ChoicesDiv").append(labelElement);
    }

    for (let i of q5Choices) {
        let checkboxElement = document.createElement("input");
        checkboxElement.type = "checkbox";
        checkboxElement.name = "q5";
        checkboxElement.value = i;
        checkboxElement.id = i;

        let labelElement2 = document.createElement("label");
        labelElement2.textContent = i;
        labelElement2.className = "userInput";

        //puts the radio element inside the label element with .append
        labelElement2.prepend(checkboxElement);

        document.querySelector("#q5ChoicesDiv").append(labelElement2);
    }
}

function gradeQuiz() {
    let totalScore = 0;
    let q1Answer = "Hands up-down";
    let q2Answer = "Luigi";
    let q3Answer = "Framemogged";
    let q4Answer = 67;
    let q5Answer = "23";
    let userAnswer1 = document.querySelector("input[name=q1]:checked").value;
    let userAnswer2 = document.querySelector("input[name=q2]").value;
    let userAnswer3 = document.querySelector("select[name=q3]").value;
    let userAnswer4 = document.querySelector("input[name=q4]").value;
    let userAnswer5a = document.querySelector("#Question1").checked;
    let userAnswer5b = document.querySelector("#Question2").checked;
    let userAnswer5c = document.querySelector("#Question3").checked;
    let userAnswer5d = document.querySelector("#Question4").checked;
    let q1Pic = document.getElementById("q1DivPic");
    let q2Pic = document.getElementById("q2DivPic");
    let q3Pic = document.getElementById("q3DivPic");
    let q4Pic = document.getElementById("q4DivPic");
    let q5Pic = document.getElementById("q5DivPic");
    attempts++;
    localStorage.setItem("Attempts", attempts);
    attemptsText.textContent = `Attempts: ${attempts}`;
    console.log(userAnswer5a);
    alert("Grading Quiz...");

    if (userAnswer1 == q1Answer) {
        document.getElementById("q1Div").style.backgroundColor = "rgba(88, 255, 102, 0.7)";
        totalScore += 20;
        q1Pic.src = "https://www.freeiconspng.com/uploads/checkmark-png-image-7.png";
        q1Pic.style.height = "100px";
        q1Pic.style.width = "100px";
    } else {
        document.getElementById("q1Div").style.backgroundColor = "rgba(255, 88, 88, 0.7)";
        q1Pic.src = "https://www.freeiconspng.com/uploads/red-x-png-4.png";
        q1Pic.style.height = "100px";
        q1Pic.style.width = "100px";
    }

    if (userAnswer2 == q2Answer) {
        document.getElementById("q2Div").style.backgroundColor = "rgba(88, 255, 102, 0.7)";
        totalScore += 20;
        q2Pic.src = "https://www.freeiconspng.com/uploads/checkmark-png-image-7.png";
        q2Pic.style.height = "100px";
        q2Pic.style.width = "100px";
    } else {
        document.getElementById("q2Div").style.backgroundColor = "rgba(255, 88, 88, 0.7)";
        q2Pic.src = "https://www.freeiconspng.com/uploads/red-x-png-4.png";
        q2Pic.style.height = "100px";
        q2Pic.style.width = "100px";
    }

    if (userAnswer3 == q3Answer) {
        document.getElementById("q3Div").style.backgroundColor = "rgba(88, 255, 102, 0.7)";
        totalScore += 20;
        q3Pic.src = "https://www.freeiconspng.com/uploads/checkmark-png-image-7.png";
        q3Pic.style.height = "100px";
        q3Pic.style.width = "100px";
    } else {
        document.getElementById("q3Div").style.backgroundColor = "rgba(255, 88, 88, 0.7)";
        q3Pic.src = "https://www.freeiconspng.com/uploads/red-x-png-4.png";
        q3Pic.style.height = "100px";
        q3Pic.style.width = "100px";
    }

    if (userAnswer4 == q4Answer) {
        document.getElementById("q4Div").style.backgroundColor = "rgba(88, 255, 102, 0.7)";
        totalScore += 20;
        q4Pic.src = "https://www.freeiconspng.com/uploads/checkmark-png-image-7.png";
        q4Pic.style.height = "100px";
        q4Pic.style.width = "100px";
    } else {
        document.getElementById("q4Div").style.backgroundColor = "rgba(255, 88, 88, 0.7)";
        q4Pic.src = "https://www.freeiconspng.com/uploads/red-x-png-4.png";
        q4Pic.style.height = "100px";
        q4Pic.style.width = "100px";
    }

     if (userAnswer5b && userAnswer5c && !userAnswer5a && !userAnswer5d) {
        document.getElementById("q5Div").style.backgroundColor = "rgba(88, 255, 102, 0.7)";
        totalScore += 20;
        q5Pic.src = "https://www.freeiconspng.com/uploads/checkmark-png-image-7.png";
        q5Pic.style.height = "100px";
        q5Pic.style.width = "100px";
    } else {
        document.getElementById("q5Div").style.backgroundColor = "rgba(255, 88, 88, 0.7)";
        q5Pic.src = "https://www.freeiconspng.com/uploads/red-x-png-4.png";
        q5Pic.style.height = "100px";
        q5Pic.style.width = "100px";
    }

    document.getElementById("score").textContent = `Total Score: ${totalScore}`;
    if (totalScore >= 80) {
        document.getElementById("youWin").textContent = 'You Passed the Quiz!';
    } else {
        document.getElementById("youWin").textContent = '';
    }
}