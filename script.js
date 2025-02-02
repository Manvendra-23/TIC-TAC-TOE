const canvas = document.getElementById('tic-tac-toe-canvas');
const resetButton = document.getElementById('reset-button');
const xWinsElement = document.getElementById('x-wins');
const oWinsElement = document.getElementById('o-wins');
const ctx = canvas.getContext('2d');

const boardSize = 3;
const cellSize = canvas.width / boardSize;
let board = [['', '', ''], ['', '', ''], ['', '', '']];
let currentPlayer = 'X';
let gameOver = false;
let xWins = 0;
let oWins = 0;

// Function to draw the board
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;

  // Draw grid lines
  for (let i = 1; i < boardSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(canvas.width, i * cellSize);
    ctx.stroke();
  }

  // Draw X and O
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = board[row][col];
      if (cell === 'X') {
        drawX(col, row);
      } else if (cell === 'O') {
        drawO(col, row);
      }
    }
  }
}

// Function to draw an X
function drawX(x, y) {
  const offsetX = cellSize / 4;
  const offsetY = cellSize / 4;
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 6;

  ctx.beginPath();
  ctx.moveTo(x * cellSize + offsetX, y * cellSize + offsetY);
  ctx.lineTo((x + 1) * cellSize - offsetX, (y + 1) * cellSize - offsetY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo((x + 1) * cellSize - offsetX, y * cellSize + offsetY);
  ctx.lineTo(x * cellSize + offsetX, (y + 1) * cellSize - offsetY);
  ctx.stroke();
}

// Function to draw an O
function drawO(x, y) {
  const offsetX = cellSize / 2;
  const offsetY = cellSize / 2;
  const radius = cellSize / 4;
  ctx.strokeStyle = '#00f';
  ctx.lineWidth = 6;

  ctx.beginPath();
  ctx.arc(x * cellSize + offsetX, y * cellSize + offsetY, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

// Function to check for a win or a draw
function checkWin() {
  const winningCombinations = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board[a[0]][a[1]] &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      return board[a[0]][a[1]]; // Return the winner (X or O)
    }
  }

  // Check for a draw
  if (board.flat().every(cell => cell)) {
    return 'Draw';
  }

  return null; // No winner yet
}

// Function to handle a player's move
canvas.addEventListener('click', function (event) {
  if (gameOver) return;

  const x = Math.floor(event.offsetX / cellSize);
  const y = Math.floor(event.offsetY / cellSize);

  if (board[y][x] === '') {
    board[y][x] = currentPlayer;
    drawBoard();

    const result = checkWin();
    if (result) {
      gameOver = true;
      if (result === 'X') {
        xWins++;
        xWinsElement.textContent = xWins;
        alert('X wins!');
      } else if (result === 'O') {
        oWins++;
        oWinsElement.textContent = oWins;
        alert('O wins!');
      } else {
        alert("It's a draw!");
      }
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
});

// Reset the game
resetButton.addEventListener('click', function () {
  board = [['', '', ''], ['', '', ''], ['', '', '']];
  currentPlayer = 'X';
  gameOver = false;
  drawBoard();
});

// Initial drawing of the board
drawBoard();
