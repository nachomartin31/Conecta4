//Global variables:
let positions = [ //This array will contain the ordered positions of the board
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
let round = 1; //Rounds counter
let winner = '';
//preGame section: 

function startGame() { //Starts the game
    const preGame = document.querySelector('.preGame'); //Change section displayed
    const game = document.querySelector('.game');

    preGame.classList.remove('currentSection');
    game.classList.add('currentSection');

    createBoard(); //Call game functions
    placePositions();
    addEvents();
}

//game section:
function createBoard() { //Create the game board elements 
    const board = document.querySelector('.game-board')
    const boardBackplate = document.querySelector('.game-board-backplate')
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const buttonSpace = document.createElement('DIV');
            const button = document.createElement('input:button');

            buttonSpace.classList.add('game-board-buttonSpace');
            buttonSpace.id = `buttonSpace${i}${j}`;
            button.classList.add('game-board-button');
            buttonSpace.addEventListener('click', addEvents);
            button.id = `b${i}${j}`

            board.appendChild(buttonSpace);
            boardBackplate.appendChild(button);
        }

    }

}

function addEvents(e) { //Add eventListeners to the board positions
    let target = e.target.id;
    let targetArray = Array.from(target);
    let column = targetArray[targetArray.length - 1];

    if (winner === '') {
        placeChip(column)
    }
}

function placePositions() { // Get the positions ordered in the array 'positions'
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const position = document.querySelector(`#b${i}${j}`);
            if (j < 7) {
                positions[j].unshift(position);
            }
        }
    }
}



function placeChip(column) { //Place chip on proper position when a column is clicked
    let index = 0;

    for (let i = 0; i < 6; i++) {
        if (positions[column][index] === 'p1' || positions[column][index] === 'p2') {
            index++;
        }

    }
    if (index < 6) {
        if (round % 2 === 0) {
            positions[column][index].classList.add('player1');
            positions[column][index] = 'p1';
        } else {
            positions[column][index].classList.add('player2');
            positions[column][index] = 'p2';

        }
        let x = index;
        let y = parseInt(column);
        checkResults(x, y);
        round++;
    }



}

function checkResults(row, column) {
    let counter = 1;

    for (let i = 0; i < 6; i++) { //Check for horizontal win
        if ((positions[i][row] === 'p1' && positions[i + 1][row] === 'p1') || (positions[i][row] === 'p2' && positions[i + 1][row] === 'p2')) {
            counter++;
        } else {
            counter = 1;
        }
        if (counter === 4) {
            gameOver();
        }

    }

    for (let i = 0; i < 5; i++) { //Check for vertical win
        if ((positions[column][i] === 'p1' && positions[column][i + 1] === 'p1') || (positions[column][i] === 'p2' && positions[column][i + 1] === 'p2')) {
            counter++;
        } else {
            counter = 1;
        }
        if (counter === 4) {
            gameOver();
        }

    }

    if (row >= column) { //Check for diagonal win (bottom-left to top-right)
        for (let i = 0; i + (row - column) < 5; i++) { //Check for diagonal win (from bottom/left to top/right)
            if ((positions[i][i + (row - column)] === 'p1' && positions[i + 1][i + (row - column) + 1] === 'p1') || (positions[i][i + (row - column)] === 'p2' && positions[i + 1][i + (row - column) + 1] === 'p2')) {
                counter++;
            } else {
                counter = 1;
            }
            if (counter === 4) {
                gameOver();
            }
        }

    } else {
        for (let i = 0; i + (column - row) < 6; i++) {
            if ((positions[i + (column - row)][i] === 'p1' && positions[i + (column - row) + 1][i + 1] === 'p1') || (positions[i + (column - row)][i] === 'p2' && positions[i + (column - row) + 1][i + 1] === 'p2')) {
                counter++;
            } else {
                counter = 1;
            }
            if (counter === 4) {
                gameOver();
            }
        }
    }
    if ((6 - column) <= row) { //Check for diagonal win (from bottom-right to top-left)
        for (let i = 0;
            (i + row - (6 - column)) < 5; i++) {
            if ((positions[6 - i][row - (6 - column) + i] === 'p1' && positions[6 - i - 1][row - (6 - column) + i + 1] === 'p1') || (positions[6 - i][row - (6 - column) + i] === 'p2' && positions[6 - i - 1][row - (6 - column) + i + 1] === 'p2')) {
                counter++;
            } else {
                counter = 1;
            }
            if (counter === 4) {
                gameOver();
            }
        }
    } else {
        for (let i = 0;
            (row + column) - i > 0; i++) {
            if ((positions[(row + column) - i][i] === 'p1' && positions[(row + column) - i - 1][i + 1] === 'p1') || (positions[(row + column) - i][i] === 'p2' && positions[(row + column) - i - 1][i + 1] === 'p2')) {
                counter++;
            } else {
                counter = 1;
            }
            if (counter === 4) {
                gameOver();
            }
        }
    }
}
//postGame section:

function gameOver() {
    if (round % 2 !== 0) {
        winner = 'Las rojas';
    } else {
        winner = 'Las azules';
    }

    const game = document.querySelector('.game');
    const postGame = document.querySelector('.postGame');

    setTimeout(() => {
        game.classList.remove('currentSection');
        postGame.classList.add('currentSection');
    }, 1500);

    const anouncement = document.querySelector('.winner');

    anouncement.textContent = `¡${winner} ganan la partida!`;
}

function resetBoard() {
    poitions = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    round = 1;
    winner = '';
    const board = document.querySelector('.game-board');
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    const boardBackplate = document.querySelector('.game-board-backplate');
    while (boardBackplate.firstChild) {
        boardBackplate.removeChild(boardBackplate.firstChild);
    }
    const postGame = document.querySelector('.postGame');
    postGame.classList.remove('currentSection');

}

function newGame() {
    resetBoard();
    startGame();
}

function mainMenu() {
    resetBoard();
    const preGame = document.querySelector('.preGame');
    preGame.classList.add('currentSection');
}