let darkBool = true;

function darkMode() {
    console.log(dark.src);
    if (document.documentElement.classList.dark == null && darkBool) {
        document.documentElement.classList.add("dark");
        dark.src = "./img/sunIcon.png"
        darkBool = false;
    } else {
        document.documentElement.classList.remove("dark");
        dark.src = "./img/moonIcon.png"
        darkBool = true;
    }
}
let dark = document.querySelector("#darkMode");

document.querySelector("#darkMode").addEventListener("click", darkMode);