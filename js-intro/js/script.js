let today = new Date();
let year = today.getFullYear();

alert(today);
alert(year);

console.log(today);
console.log(year);

console.dir(today);
console.dir(year);

let month = today.getMonth();

let displayMonth = getMonthName(month);
console.log(displayMonth);
// if (month === 1) {
//     console.log("February!");
// } else {
//     console.log("Not February!");
// }

function getMonthName(monthIndex) {
    if (monthIndex === today.getMonth()) {
        return "February!";
    } else {
        return " ";
    }
}

function updateTime() {
    today1 = today1 + 1;
    return document.querySelector('#clock').innerHTML = today1.toLocaleTimeString();
}

let headTitle = document.querySelector('#heading');
headTitle.textContent = today.toDateString();
updateTime();
const timer = setInterval(updateTime(), 1000);