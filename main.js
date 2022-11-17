const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelectorAll('.score');
const lastScoreBoard = document.querySelector('.record1');
const bestScoreBoard = document.querySelector('.record2');
const moles = document.querySelectorAll('.mole');

function randomtime(min, max) {
    return Math.round(Math.random()* (max-min)+min);
}

let lastHole;
let timeUp = false;
let score = 0;
let lastScore = 0
let bestScore = 0

lastScoreBoard.textContent = localStorage.getItem('lastScore')
bestScoreBoard.textContent = localStorage.getItem('bestScore')

function randomHole(holes) {
    const idx = Math.floor(Math.random()*holes.length)
    // const idx = Math.floor(1.12)
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomtime(1000,4000);
    const hole = randomHole(holes);
    
    hole.classList.add('up')
    setTimeout (() => {
    hole.classList.remove('up');
    if (!timeUp) peep();

    else {
        lastScore = score
        localStorage.setItem("lastScore", score)
        lastScoreBoard.textContent = localStorage.getItem("lastScore")
        if (lastScore > bestScore){
            bestScore = lastScore
            localStorage.setItem("bestScore", bestScore)
            bestScoreBoard.textContent = localStorage.getItem("bestScore")
        }
    }

}, time);

}

function startGame() {
    score = 0;
    scoreBoard[0].textContent = score;
    timeUp = false;
    peep();
    setTimeout(() => timeUp = true, 15000)
}

function bonk(e) { 
    console.log(score)
    score++;
    scoreBoard[0].textContent = score;  
    console.log(this.parentNode.classList.remove('up'))  
}

moles.forEach(mole => mole.addEventListener('click', bonk));