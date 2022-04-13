

// IF THAT ONE DOESN"T WORK THIS DOES!!!!


/** CONSTANTS **/
    /** Will need:
     *      -a colors object with keys for 2 players and 
     *       a 3rd  key with a value of 'null; for the unused 
     *       box on the grid
     *      -an array to track the winning combinations OR 
     *       use a function instead which may be useful in 
     *       clearing the board for reset; also typing a bunch 
     *       of numbers in an array may be easier than typing 
     *       a bunch of functions to determine the win
    **/
const colors = {
    '1': "red",
    '-1': "yellow",
    '0': "#838282"
}

/** VARIABLES **/
    /** Will probably need: 
     *      -board
     *      -player turns
     *      -winner
     **/
let board;
let currentPlayer;
let winner;
let totalTurns;



// // Constants
// const sounds = {
//     laser: 'http://www.freesound.org/data/previews/42/42106_70164-lq.mp3',
//     dog: 'http://www.freesound.org/data/previews/327/327666_5632380-lq.mp3',
//     cow: 'http://www.freesound.org/data/previews/58/58277_634166-lq.mp3',
//     siren: 'http://www.freesound.org/data/previews/336/336899_4939433-lq.mp3'
// };

// // Cached DOM Elements
// const player = new Audio();
// const bgPlayer = document.getElementById('bg-player');
// const bgCheckbox = document.querySelector('input[type="checkbox"]');

// // Adjust volume of background music to 50%
// bgPlayer.volume = .3;

// // Event Listeners
// document.getElementById('play-btn').addEventListener('click', handlePlaySound);
// bgCheckbox.addEventListener('change', handleBgChanged);

// // Functions
// function handlePlaySound() {
//   // Use the CSS :checked pseudoclass to select the selected radio button
//     const selSoundInp = document.querySelector('input[name="sound"]:checked');
//     playSound(selSoundInp.value);
// }

// function playSound(name) {
//     player.src = sounds[name];
//     player.play();
// }

// function handleBgChanged() {
//     bgCheckbox.checked ? bgPlayer.play() : bgPlayer.pause();
// }








/** CACHED ELEMENT REFERENCES **/
    /** Will need: 
     *      -buttons for top of game
     *      -replay button
     *      -winner display
     *      -load squares on html to js (td or div)
    **/
const colBtns = [...document.querySelectorAll("#topButtons > button")]; // selects the first button with 
//#topButtons as the parent element
console.log(colBtns);
//query selector all is array like but can't use array methods on buttons
// const squares = document.querySelectorAll("#gameboard")
const resetButton = document.getElementById("resetGame")
const headerEl = document.querySelector("#displayMessage")
const player = new Audio();

/** EVENT LISTENERS **/
    /** Will need: 
     *       -button click
     *       -replay click
    **/

document.getElementById("topButtons").addEventListener("click", playerTakesTurn);
document.getElementById("resetGame").addEventListener("click", init);
// document.querySelector(".top").addEventListener("click", playerTakesTurn);


/** FUNCTIONS **/
    /** Will need: 
     *        -a board initialization that makes all the 
     *         boxes 'null', turn, winner variables
     *        -a render function to loop over the squares, 
     *         use index to change the color of the square
     *         upon player selection; also winner message
     *        -a function to track the choices made by 
     *         players/and check for a win like TTT but 
     *         4 positions instead of 3 and ===4 instead of 3;
     *         also look for a tie if ===42(spots on board and no win)
     *        -or search for square by background color to compare against 
     *         winning combinations.
     *        -if board includes null return null 
     *        
     *        -**/


init();

function init() {
    board = [
        [0, 0, 0, 0, 0, 0],  // Column 0
        [0, 0, 0, 0, 0, 0],  // Column 1
        [0, 0, 0, 0, 0, 0],  // Column 2
        [0, 0, 0, 0, 0, 0],  // Column 3
        [0, 0, 0, 0, 0, 0],  // Column 4
        [0, 0, 0, 0, 0, 0],  // Column 5
        [0, 0, 0, 0, 0, 0],  // Column 6
    ];
    currentPlayer = 1;
    totalTurns = 0;
    winner = null;
    render();
}

function render() {
//     /** Iterates over each column in the board. **/
    board.forEach((column, columnidx) => {
//         /** Iterates over each cell in the column. **/
        column.forEach((cell, cellidx) => {
//             /** Targets the specific cell by using the index of both column and cell. **/
            let div = document.getElementById(`c${columnidx}r${cellidx}`);
//             /** Applies a background style to the cell from colors listed in constants. **/
            div.style.backgroundColor = colors[cell];
        });
//     /** If column is full make the button above the column invisible (If it includes a 0 (white square), it is visible, if not it is hidden.)**/
        colBtns[columnidx].style.visibility = column.includes(0) ? "visible" : "hidden";
    });
//     /** Adds to total turns because when we reach 42, the board is full. **/
    resetGame();
    totalTurns++;
}

function playerTakesTurn(evt) {
    const  colIdx = colBtns.indexOf(evt.target);
    if (colIdx === -1 || winner) return;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    if (rowIdx === -1) return;
    colArr[rowIdx] = currentPlayer;
    currentPlayer *= -1;
    winner = checkForWin(colIdx, rowIdx);
    render();
    
    if (winner === 'T') {
        displayMessage.innerText = "It's a Tie!";
    } else if (winner) {
        displayMessage.innerText = `${winner=== 1 ? 'RED' : 'YELLOW'} is the Winner!`;
    } else {
        headerEl.innerHTML = `${currentPlayer === 1 ? 'RED' : 'YELLOW'}'s turn.`;
    }
}

function checkForWin() {
    if (totalTurns >= 42) {return winner = "T"};
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
            checkDiag(colIdx, rowIdx, 1) || checkDiag(colIdx, rowIdx, -1);
        if (winner) return winner;
    }
    return null;
}

function checkDiag(colIdx, rowIdx, dir) {
    if (dir > 0 && colIdx > 3 || dir > 0 && rowIdx > 2) return null;
    if (dir < 0 && colIdx > 3 || dir < 0 && rowIdx < 3) return null;
    if (Math.abs(board[colIdx][rowIdx] + board[colIdx + 1][rowIdx + dir] + board[colIdx + 2][rowIdx + dir * 2]+ board[colIdx + 3][rowIdx + dir * 3]) === 4) {
        return board[colIdx][rowIdx];
    } else {
        return null;
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

function resetGame() {
    if (winner) {
        resetButton.innerText = "Reset Game?";
    } else {
        resetButton.innerText = "Give up?";
    }
}
