const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let move = 0;
let crosses = [];
let zeros = [];

let winCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function convertToCellNumber (row, column) {
    return column + row * 3;
}

function convertToCoordinates (numb) {
    let col = numb % 3;
    let row = numb - col * 3;
    return [row, col];
}

function isSubArray(arr1, arr2) {
    return arr2.every(element => arr1.includes(element));
}

function colorizeComb (comb, winner) {
    for (const numb of comb) {
        let coord = convertToCoordinates(numb);
        let row = coord[0];
        let col = coord[1];

    }
}

function cellClickHandler (row, col) {
    let numb = convertToCellNumber(row, col);
    if (findCell(row, col).textContent === EMPTY) {
        if (move % 2 === 0) {
            renderSymbolInCell(CROSS, row, col);
            crosses.push(numb);
            for (const comb of winCombs) {
                if (isSubArray(crosses, comb)) {
                    setTimeout(() => { alert('Крестики победили!') }, 250);
                }
            }
        } else {
            renderSymbolInCell(ZERO, row, col);
            zeros.push(numb);
            for (const comb of winCombs) {
                if (isSubArray(zeros, comb)) {
                    setTimeout(() => { alert('Нолики победили!') }, 250);
                }
            }
        }
        move++;
        if (move === 9) {

            alert('гойда!');
        }
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
