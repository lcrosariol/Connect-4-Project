/** CONSTANTS **/

const playerColors = {
    '1': "#cc2900",
    '-1': "#e6b800",
    '0': "#838282"
}

/** VARIABLES **/

let board;
let currentPlayer;
let winner;
let totalTurns;
let redWin = 0;
let yellowWin = 0;

/** CACHED ELEMENT REFERENCES **/

const colBtns = [...document.querySelectorAll("#topButtons > button")];
const resetButton = document.getElementById("resetGame")
const headerEl = document.getElementById("displayMessage")
const player = new Audio();
const drum = document.getElementById('drum');
drum.volume = 0.3;
const winnerSound = document.getElementById("winner");
winnerSound.volume = 0.4;
const redEl = document.querySelector(".red");
const yellowEl = document.querySelector(".yellow");

/** EVENT LISTENERS **/

document.getElementById("topButtons").addEventListener("click", playerTakesTurn);
document.getElementById("resetGame").addEventListener("click", init);

/** FUNCTIONS **/

init();

function init() {
    board = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];
    currentPlayer = 1;
    totalTurns = 0;
    winner = null;
    render();
}

function render() {
    board.forEach((column, columnIndex) => {
        column.forEach((cell, cellIndex) => {
            let div = document.getElementById(`c${columnIndex}r${cellIndex}`);
            div.style.backgroundColor = playerColors[cell];
        });
        colBtns[columnIndex].style.visibility = column.includes(0) ? "visible" : "hidden";
    });
    resetGame();
    totalTurns++;
}

function playerTakesTurn(evt) {
    const colIdx = colBtns.indexOf(evt.target);
    if (colIdx === -1 || winner) return false;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    if (rowIdx === -1) return false;
    colArr[rowIdx] = currentPlayer;
    currentPlayer *= -1;
    winner = checkForWin(colIdx, rowIdx);
    drum.play();
    render();

    if (winner === 'T') {
        displayMessage.textContent = "It's a Tie!";
    } else if (winner) {
        winnerSound.play();
        displayMessage.textContent = `${winner === 1 ? 'RED' : 'YELLOW'} is the Winner!`;
        if (winner === 1) {
            ++redWin;
            redEl.innerText = `${redWin}`;
        } else if (winner === -1) {
            ++yellowWin;
            yellowEl.innerText = `${yellowWin}`;
        }
    } else {
        headerEl.textContent = `${currentPlayer === 1 ? 'RED' : 'YELLOW'}'s turn.`;
    }
}

function checkHori(colIdx, rowIdx) {
    if (colIdx > 3) return null;
    if (Math.abs(board[colIdx][rowIdx] + board[colIdx + 1][rowIdx] + board[colIdx + 2][rowIdx] + board[colIdx + 3][rowIdx]) === 4) {
        return board[colIdx][rowIdx];
    } else {
        return null;
    }
}

function checkVert(colArr, rowIdx) {
    if (rowIdx > 2) return null;
    if (Math.abs(colArr[rowIdx] + colArr[rowIdx + 1] + colArr[rowIdx + 2] + colArr[rowIdx + 3]) === 4) {
        return colArr[rowIdx];
    } else {
        return null;
    }
}

function checkDiag(colIdx, rowIdx) {
    if (true) {
        for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
            for (var colIdx = 0; colIdx < 4; colIdx++) {
                if (Math.abs(board[colIdx][rowIdx] + board[colIdx + 1][rowIdx + 1] + board[colIdx + 2][rowIdx + 2] + board[colIdx + 3][rowIdx + 3])===4) {
                    return board[colIdx][rowIdx];
                }
            }
        }    
    } if (true) {
        for (var rowIdx = 5; rowIdx > 2; rowIdx--) {
            for (var colIdx = 6; colIdx > 2; colIdx--) {            
                if (Math.abs(board[colIdx][rowIdx] + board[colIdx - 1][rowIdx - 1] + board[colIdx - 2][rowIdx - 2] + board[colIdx - 3][rowIdx - 3])=== 4) {
                    return board[colIdx][rowIdx];
                }
            }
        }    
    } if (true) {
        for (var rowIdx = 5; rowIdx > 2; rowIdx--) {
            for (var colIdx = 0; colIdx < 4; colIdx++) {
                if (Math.abs(board[colIdx][rowIdx] + board[colIdx + 1][rowIdx - 1] + board[colIdx + 2][rowIdx - 2] + board[colIdx + 3][rowIdx - 3])=== 4) {   
                    return board[colIdx][rowIdx]; 
                }
            }
        }
    } if (true) {
        for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
            for (var colIdx = 6; colIdx > 2; colIdx--) {
                if (Math.abs(board[colIdx][rowIdx] + board[colIdx - 1][rowIdx + 1] + board[colIdx - 2][rowIdx + 2] + board[colIdx - 3][rowIdx + 3])=== 4) {
                    return board[colIdx][rowIdx];
                }
            }
        }
    } 
    return null;   
}

function checkForWin() {
    if (totalTurns === 42) return winner = "T";
    for (let colIdx = 0; colIdx <= 6; colIdx++) {
        winner = checkCol(colIdx);
        if (winner) break;
    }
    return winner;
}

function checkCol(colIdx) {
    const colArr = board[colIdx];
    for (let rowIdx = 0; rowIdx < colArr.length; rowIdx++) {
        let winner = checkVert(colArr, rowIdx) || checkHori(colIdx, rowIdx) ||
            checkDiag(colIdx, rowIdx);
        if (winner) return winner;
    }
    return null;
}

function resetGame() {
    if (winner) {
        resetButton.textContent = "Reset Game?";
    } else {
        resetButton.textContent = "Give up?";
    }
}

/** Some code used from GA examples: https://github.com/jhotz2112/Connect_Four/blob/main/js/script.js 
 * & https://github.com/countchrisdo/connect-four **/

/** Background Code snippet from Nash Vail https://codepen.io/nashvail/pen/wpGgXO **/
// Some random colors
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.background = colors[Math.floor(Math.random() * colors.length)];
    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
    ball.style.transform = `scale(${Math.random()})`;
    ball.style.width = `${Math.random()}em`;
    ball.style.height = ball.style.width;

    balls.push(ball);
    document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
    let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
    };

    let anim = el.animate(
        [
            { transform: "translate(0, 0)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ],
        {
            duration: (Math.random() + 1) * 2000, // random duration
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
        }
    );
});
/** Code snippet from Nash Vail https://codepen.io/nashvail/pen/wpGgXO **/