// Function to highlight the winning cells
function highlightWinningCells(combination) {
    for (const [row, col] of combination) {
      const cell = document.getElementsByClassName("cell")[row * 3 + col];
      cell.classList.add("winning-cell");
    }
  }
  
  // Game state
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  let currentPlayer = "X";
  let gameEnded = false;
  let computerScore = 0;
  let userScore = 0;
  let tiesScore = 0;
  
  // Function to place a mark on the board
  function placeMark(row, col) {
    if (board[row][col] === "" && !gameEnded) {
      board[row][col] = currentPlayer;
      document.getElementsByClassName("cell")[row * 3 + col].textContent = currentPlayer;
  
      checkWin();
      if (!gameEnded && currentPlayer === "X") {
        currentPlayer = "O";
        computerMove();
      }
    }
  }
  
  // Function for the computer's move
  function computerMove() {
    let availableMoves = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          availableMoves.push({ row: i, col: j });
        }
      }
    }
  
    if (availableMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        const move = availableMoves[randomIndex];
        placeMark(move.row, move.col);
    
        // Check for win after the computer's move
        checkWin();
    
        // Switch the current player back to the user
        currentPlayer = "X";
      }
    }
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
      [[0, 2], [1, 1], [2, 0]]
    ];
  
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      const [rowA, colA] = a;
      const [rowB, colB] = b;
      const [rowC, colC] = c;
  
      if (
        board[rowA][colA] !== "" &&
        board[rowA][colA] === board[rowB][colB] &&
        board[rowA][colA] === board[rowC][colC]
      ) {
        gameEnded = true;
        highlightWinningCells(combination);
  
        if (currentPlayer === "X") {
          userScore++;
          document.getElementById("user-score").textContent = userScore;
        } else {
          computerScore++;
          document.getElementById("computer-score").textContent = computerScore;
        }
  
        setTimeout(() => {
          alert(`Player ${board[rowA][colA]} wins!`);
          resetGame();
        }, 100);
        return;
      }
    }
  
    if (isBoardFull()) {
        gameEnded = true;
        tiesScore++;
        document.getElementById("ties-score").textContent = tiesScore;
        alert("It's a tie!");
        resetBoard();
      }
    }
    
    // Function to check if the board is full
    function isBoardFull() {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === "") {
            return false;
          }
        }
      }
      return true;
    }
    
    // Function to reset the board for a new game
    function resetBoard() {
      board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
      gameEnded = false;
    
      // Clear the board UI
      const cells = document.getElementsByClassName("cell");
      for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
        cells[i].classList.remove("winning-cell");
      }
    }
    
    // Function to reset the game scores
    function resetScores() {
      userScore = 0;
      computerScore = 0;
      tiesScore = 0;
      document.getElementById("user-score").textContent = userScore;
      document.getElementById("computer-score").textContent = computerScore;
      document.getElementById("ties-score").textContent = tiesScore;
    }
    
    // Function to reset the entire game
    function resetGame() {
      resetBoard();
      resetScores();
      currentPlayer = "X";
    }
    
    // Initialize the game
    resetGame();