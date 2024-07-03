const game = document.getElementById('game');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const backgroundMusic = document.getElementById('background-music');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] || checkWinner()) {
        return;
    }

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    } else if (gameState.every(cell => cell)) {
        setTimeout(() => alert('Draw!'), 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function restartGame() {
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
backgroundMusic.play();
