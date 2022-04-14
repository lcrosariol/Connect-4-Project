/** CONSTANTS **/

//  A colors object with
//  keys for 2 players and a
//  3rd  key with a value of 0; for the unused box on the grid.



/** VARIABLES **/

// -variable for the board
// -variable for the current player
// -variable for the winner
// -variable for the total amount of turns
// -variable for red win count
// -variable for yellow win count

/** CACHED ELEMENT REFERENCES **/

//    Selects the first button with #topButtons as the parent element. Query selector all is array like but can't use array methods on buttons.
//    Creates a constant (resetButton) for the button in the HTML that has an ID of resetGame.
//    Creates a constant (headerEl) for the HTML element that has the ID of displayMessage.
//    Creates a constant (player) for the HTML audio element.
//    Creates a constant (drum) for the HTML ID drum.
//    Sets the volume on the drum sound.
//    Creates a constant (winnerSound) for the HTML ID winnner.
//    Sets the volume on the win sound.

/** EVENT LISTENERS **/

//    Gets the HTML element #topButtons and adds an event listener on click of a mouse to run function playerTakesTurn.
//    Gets the HTML element #resetGame and adds an event listener on click of a mouse to run function init.

/** FUNCIONS **/

// Calls initialization function.  Can be called before the function because of hoisting.

// function init() {                                    Runs Initialization (init) function.
//     board = [                                        Creates a constant for the array that is going to be our game board.
//         [0, 0, 0, 0, 0, 0],  // Column 0
//         [0, 0, 0, 0, 0, 0],  // Column 1
//         [0, 0, 0, 0, 0, 0],  // Column 2
//         [0, 0, 0, 0, 0, 0],  // Column 3
//         [0, 0, 0, 0, 0, 0],  // Column 4
//         [0, 0, 0, 0, 0, 0],  // Column 5
//         [0, 0, 0, 0, 0, 0],  // Column 6
//     ];
//   First player (red) is set to 1.
//   The total turns is set to 0.  Remember there are only 42 squares on the board, so at 42 we have a tie.

//   The winner is set to null, which means nothing.


//   Renders the HTML to the browser.
//   Iterates over each column in the constant board one time.  The parameters are column (element) and columnIndex (index).
//   Iterates over each cell in the constant board one time.  The parameters are cell (element) and cellIndex (index).
//   Targets the specific cell by using the index of both column and cell. Renders the cells to the HTML divs.  Now we have a playable game board.
//   Applies a background style to the cell from colors listed in constants. We start off with grey as all the cells have a value of 0 until played.

//   If column is full make the button above the column invisible (If it includes a 0 (grey square), it is visible, if not it is hidden.)

//   Runs a function to see if the game reset button needs to change its text content.
//   Adds to total turns because when we reach 42, the board is full.


//   When a player takes a turn, the event checks the index of the cell on the column...
//   Declaring a constant colIdx, which is the index of the button that is clicked on (evt). .indexOf returns the first index at which a given element can be found in the array, or -1 if it is not present.
//          So in other words if you can't click on it it will return -1. // If the board is full or we have a winner, return false.
//   Declaring a constant colArr, which is the index of the column of the button clicked on.
//   Declaring a constant rowIdx, which is the index of colArr(the index of the column of the button clicked on) at index 0(row starting at 0(bottom)).
//   IndexOf returns -1 if outside the array.  So if it is -1 return false.
//   The index of the column of the button clicked on at the row index (So the first spot under the button clicked) gets set to the number value of the player (1 or -1).
//   The number value of the player gets multiplied by -1, so the turn changes.
//   We check for a winner by running the checkForWin function, and passing to it the colIdx and rowIdx. IE the player number at that coordinate.
//   Play drum sound.
//   Call render function.

//   If winner is set to 'T', display "It's a Tie!".

//   Else if we have a winner, play win sound and
//      display which player is the winner.
//   If there's not a tie or winner, display who's turn it is.   .textContent or .innerText work fine here.



// Add total to red win count.


// Add total to yellow win count.







// Function checkHoriz passes the parameters colIdx and rowIdx
// If the column index is greater than 3, then return null because a horizontal win cannot be made.
// if the absolute value of the coordinates's value(assigned by player either 1 or -1) added up in 4 adjoining squares horizontally
// to be 4 return to the board.  Otherwise return null. DISCUSS WITH MELANIE IF IT'S THE VALUE OF THE PIECE OR THE COORDINATES.  





// Function checkVert( takes colArr and rowIdx as parameters)
// If the colIdx is greater than 2, return null because you cannot have a connect 4.
// We return the colArr (which is equal to the index of the button clicked in it's index on the board) and rowIdx (which is the index of colArr)






// Function checkDiag( takes colIdx and rowIdx as parameters)
// Devides the board into 4 sections with 8 for loops.  Then tests for hoizontal wins in 4 directions.




































// Function checkForWin
// If turns are greater than 42 (the total spaces on board), then return that it's a tie.
// Loop through the index of the button that was clicked on.  Start at index 0, and go up to index 5.  Increment one at a time.
// Winner = checkCol(colIdx)





// Function checkCol
// Declares a constant colArr which is equal to the index of the button clicked in it's index on the board.
// For loop that loops through rowIdx (which is the index of colArr(the index of the column of the button clicked on)), we start at index 0 and increment by one each loop until
// we reach the length of colArr(index number of the column clicked on).
// DISCUSS WITH MELANIE ABOUT THIS ONE  I don't understand the loop





// Function resetGame