//крестики-голики
const tictac_numOfPoints = document.querySelector(".tic-tac__num-of-points");
const tictac_numOfWins = document.querySelector(".tic-tac__num-of-wins");
const tictac_numOfLoses = document.querySelector(".tic-tac__num-of-loses");
const tictac_reset = document.querySelector(".tic-tac__reset");

//получение очков
let userPoints = localStorage.getItem("tictac_user_points");
let userWins = localStorage.getItem("tictac_user_num_wins");
let userLoses = localStorage.getItem("tictac_user_num_loses");

//установка очков
if (userPoints != null) tictac_numOfPoints.innerHTML = userPoints;
else tictac_numOfPoints.innerHTML = "у вас нет очков";

if (userWins != null) tictac_numOfWins.innerHTML = userWins;
else tictac_numOfWins.innerHTML = "у вас нет побед";

if (userLoses != null) tictac_numOfLoses.innerHTML = userLoses;
else tictac_numOfLoses.innerHTML = "у вас нет поражений";

//сброс очков
tictac_reset.addEventListener("click", () => {
  localStorage.removeItem("tictac_user_points");
  localStorage.removeItem("tictac_user_num_wins");
  localStorage.removeItem("tictac_user_num_loses");
  location.reload();
});

//динозавр
const dino_record = document.querySelector(".dino__record-points");
const dino_lastPoints = document.querySelector(".dino__last-points");
const dino_reset = document.querySelector(".dino__reset");

//получение очков
let dino_userRecord = localStorage.getItem("dino_user_record");
let dino_userLastPoints = localStorage.getItem("dino_user_last_points");


//установка очков
if (dino_userRecord != null) dino_record.innerHTML = dino_userRecord;
else dino_record.innerHTML = 0;

if (dino_userLastPoints != null) dino_lastPoints.innerHTML = dino_userLastPoints;
else dino_lastPoints.innerHTML = 0;

//сброс очков
dino_reset.addEventListener("click", () => {
  localStorage.removeItem("dino_user_record");
  localStorage.removeItem("dino_user_last_points");
  location.reload();
});
