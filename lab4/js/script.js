let zipCode = document.querySelector("#zipCode");
let state = document.querySelector("#state");
let usernameBox = document.querySelector("#usernameBox");
let passwordBox = document.querySelector("#passwordBox");
let passwordAgainBox = document.querySelector("#passwordAgainBox");
let signUpForm = document.querySelector("#signUpForm");
let available = false;

zipCode.addEventListener("input", displayCity);
state.addEventListener("input", displayCounties);
usernameBox.addEventListener("input", checkUsername);
passwordBox.addEventListener("click", checkPassword);
signUpForm.addEventListener("submit", function(event) {
    validateForm(event);
});

async function displayCity() {
    let zip = zipCode.value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zip;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;
}

displayStates();
displayCounties();
async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);

        for (let i of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = i.state;
            optionEl.value = i.usps;

            document.querySelector("#state").append(optionEl);
        }
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

async function displayCounties() {
    document.querySelector("#county").innerHTML = "";
    let stateAbv = state.value;
    let url = "https://csumb.space/api/countyListAPI.php?state=" + stateAbv;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);

        for (let i of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = i.county;
            optionEl.value = i.county;

            document.querySelector("#county").append(optionEl);
        }
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

async function checkUsername() {
    let username = usernameBox.value;
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + username;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);

        if (data.available == false) {
            document.querySelector("#available").textContent = `Username ${username} not available`;
            document.querySelector("#available").style.color = "red";
            available = false;
        } else {
            document.querySelector("#available").textContent = `Username ${username} is available`;
            document.querySelector("#available").style.color = "green";
            available = true;
        }
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

async function checkPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);

        document.querySelector("#password").textContent = `Suggested Password: ${data.password}`;
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

function validateForm(e) {
    let isValid = true;
    if (!available) {
        isValid = false;
        document.querySelector("#userNameDiv").style.backgroundColor = "pink";
    }
    
    if (usernameBox.value.length < 3) {
        isValid = false;
        document.querySelector("#userNameDiv").style.backgroundColor = "pink";
        document.querySelector("#available").textContent = "Username Too Short";
        console.log("THIS HAPPENED");
    } else if ((usernameBox.value.length >= 3) && (available)) {
        document.querySelector("#userNameDiv").style.backgroundColor = "";
    }
    
    if (passwordBox.value.length < 6) {
        isValid = false;
        document.querySelector("#passwordDiv").style.backgroundColor = "pink";
        document.querySelector("#password").textContent = "Password Too Short";
    } else {
        document.querySelector("#passwordDiv").style.backgroundColor = "";
        document.querySelector("#password").textContent = "";
    }

    if (passwordBox.value != passwordAgainBox.value) {
        isValid = false;
        document.querySelector("#passwordAgainDiv").style.backgroundColor = "pink";
        document.querySelector("#passwordAgain").textContent = "Retype Password";
    } else {
        document.querySelector("#passwordAgainDiv").style.backgroundColor = "";
        document.querySelector("#passwordAgain").textContent = "";
    }

    if (!isValid) {
        e.preventDefault();
    }
}