//ИГРА_КРЕСТИКИ_НОЛИКИ
const board = document.querySelector(".tictac-board");
const cells = document.querySelectorAll(".tictac-cell");
const result = document.querySelector(".tictac-result");
const restartButton = document.querySelector(".tictac-reset");
let currentPlayer = "X";
let gameFinished = false;

//Если первый запуск
window.addEventListener("load", function () {
  if (!localStorage.getItem("tictac_user_points"))
    localStorage.setItem("tictac_user_points", 0);
  if (!localStorage.getItem("tictac_user_num_wins"))
    localStorage.setItem("tictac_user_num_wins", 0);
  if (!localStorage.getItem("tictac_user_num_loses"))
    localStorage.setItem("tictac_user_num_loses", 0);
});

//Очки
let userPoints = localStorage.getItem("tictac_user_points");
let userWins = localStorage.getItem("tictac_user_num_wins");
let userLoses = localStorage.getItem("tictac_user_num_loses");

// ходит пользователь
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!gameFinished && !cell.innerHTML) {
      cell.innerHTML = currentPlayer;
      cell.style.color = currentPlayer === "X" ? "#557755" : "blue";

      //пользователь выиграл
      if (checkWin()) {
        userPoints = Number(userPoints) + 10;
        localStorage.setItem("tictac_user_points", userPoints);

        userWins = Number(userWins) + 1;
        localStorage.setItem("tictac_user_num_wins", userWins);

        result.style.opacity = "1";
        result.style.visibility = "visible";

        result.innerHTML = `Вы победили! У вас ${userPoints} очков`;
        result.style.color = "#557755";

        gameFinished = true;
        return;
      }
      if (currentPlayer === "X") currentPlayer = "O";
      else currentPlayer = "X";
      setTimeout(computerTurn, 50);
    }
  });
});

// Ходит компьютер
function computerTurn() {
  result.style.opacity = "1";
  result.style.visibility = "visible";
  const unoccupiedCells = [...cells].filter((cell) => !cell.innerHTML);
  if (unoccupiedCells.length > 0) {
    const randomCell =
      unoccupiedCells[Math.floor(Math.random() * unoccupiedCells.length)];
    randomCell.innerHTML = currentPlayer;
    //победил компьютер
    if (checkWin()) {
      if (userPoints < 10) userPoints = 0;
      else userPoints = Number(userPoints) - 10;
      localStorage.setItem("tictac_user_points", userPoints);

      userLoses = Number(userLoses) + 1;
      localStorage.setItem("tictac_user_num_loses", userLoses);

      result.style.color = "#793e3e";
      result.innerHTML = `Вы проиграли! У вас ${userPoints} очков`;
      gameFinished = true;
      return;
    }
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
  } else {
    restartButton.style.opacity = "1";
    restartButton.style.visibility = "visible";
    result.style.color = "#afafaf";
    result.innerHTML = "Ничья!";
    gameFinished = true;
  }
}

// Check if there is a winner
function checkWin() {
  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningPositions.length; i++) {
    const [a, b, c] = winningPositions[i];
    if (
      cells[a].innerHTML &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    ) {
      cells[a].classList.add("winning-cell");
      cells[b].classList.add("winning-cell");
      cells[c].classList.add("winning-cell");
      restartButton.style.opacity = "1";
      restartButton.style.visibility = "visible";

      return true;
    }
  }
  return false;
}

// Сброс игры
function resetGame() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("winning-cell"); // Remove the "winning-cell" class
    cell.style.color = "#793e3e";
  });
  result.innerHTML = "";
  currentPlayer = "X";
  gameFinished = false;
}

// Кнопка для сброса игры
restartButton.addEventListener("click", function () {
  resetGame();
  restartButton.style.opacity = "0";
  restartButton.style.visibility = "hidden";
});

// Shuffle the cells randomly
function shuffleCells() {
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i].innerHTML, cells[j].innerHTML] = [
      cells[j].innerHTML,
      cells[i].innerHTML,
    ];
  }
}

shuffleCells();
resetGame();
