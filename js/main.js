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
    '0': "white"
}




const winCombinations = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
]

let board;
let currentPlayer;
let winner;
let totalTurns;

// const colBtns = [...document.querySelectorAll("#topButtons > button")];
// const squares = document.querySelectorAll("#gameboard")
const resetButton = document.getElementById("resetGame")
const headerEl = document.querySelector("#displayMessage")
const squares = document.querySelectorAll("#gameBoard")


/** EVENT LISTENERS **/
    /** Will need: 
     *       -button click
     *       -replay click
    **/

document.getElementById("topButtons").addEventListener("click", choices);
document.getElementById("resetGame").addEventListener("click", init);


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
    board = new Array(42).fill(null);
    currentPlayer = 1;
    totalTurns = 0;
    winner = null;
    render();
};





function render() {
//     /** Iterates over each column in the board. **/
    board.forEach(function(sq, idx) {
        squares[idx].innerHTML = lookup[sq];
    });
    if (winner === 'T') {
        displayMessage.innerHTML = "It's a Tie!";
    } else if (winner) {
        displayMessage.innerHTML = `${winner=== 1 ? 'RED' : 'YELLOW'} is the Winner!`;
    } else {
        headerEl.innerHTML = `${currentPlayer === 1 ? 'RED' : 'YELLOW'}'s turn.`;
    }
}

function choices(evt) {
    const idx = parseInt(evt.target.id.replace('sq', ''));

    if (board[idx] = winner) return;
    board[idx] = totalTurns;
    totalTurns *= -1;
    winner = getWinner();
    render();
}

function getWinner() {
    for (let i = 0; i < winCombinations.length; i++) {
        const winCombinationsArrayArrayIndexZero = board[winCombinations[i][0]]
        const winCombinationsArrayArrayIndexOne = board[winCombinations[i][1]]
        const winCombinationsArrayArrayIndexTwo = board[winCombinations[i][2]]
        const winCombinationsArrayArrayIndexThree = board[winCombinations[i][3]]

        if (Math.abs(winCombinationsArrayArrayIndexZero[winCombinations[i][0]] + winCombinationsArrayArrayIndexOne[winCombinations[i][1]] + 
            winCombinationsArrayArrayIndexTwo[winCombinations[i][2]] + winCombinationsArrayArrayIndexThree[winCombinations[i][3]]) === 4) 
        return board[winCombinations[i][0]];//should give you a one or negative one 

    if (board.includes(null)) return null;
    return 'T';
    }
}

