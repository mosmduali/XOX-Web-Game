const cells = document.querySelectorAll('[data-cell]'); // Hücreler

var h2Elements = document.querySelectorAll(".game_score_message h3"); // h2 scor textleri

const messageContainer = document.getElementById('message'); // Button Kutusu
const restartButton = document.getElementById('restart-button'); // Yeniden Başlat Düğmesi

let xIsNext = true; // Sıradaki kişi

// Oyuncu X ve O tanımlanmıştır
let player_X = 0; 
let player_O = 0;

const WINNING_COMBOS = [ 
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Kutucuklara tetiklenme ayarı verir
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});
// tıklama olayı dinleyicisi
restartButton.addEventListener('click', startGame);

startGame();

function startGame() { 
  score();
  xIsNext = true;
  messageContainer.classList.add('hidden');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = xIsNext ? 'X' : 'O';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}
// Gönderiler sembolü yerleştirmek için kullanılır
function placeMark(cell, currentClass) {
  cell.textContent = currentClass;
}
// sıradaki oyuncuyu belirler
function swapTurns() {
  xIsNext = !xIsNext;
}

function checkWin(currentClass) {
  return WINNING_COMBOS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}
// Oyunun berabere bitip bitmediği kontrol edilir
function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent === 'X' || cell.textContent === 'O';
  });
}
// 3 kez kazanan oyuncuyu kontrol eder
function isWinner(){
  score()
  if(player_X === 3){
    h2Elements[0].textContent = "";
    h2Elements[1].textContent = "X, " + player_X + "-" + player_O + " Win!";
    h2Elements[2].textContent = "";
    h2Elements[1].style.color = "red";

    player_X = 0;
    player_O = 0;
    draw_X_O = 0;
  }
  if(player_O === 3){
    h2Elements[0].textContent = "";
    h2Elements[1].textContent = "O, " + player_O + "-" + player_X + " Win!";
    h2Elements[2].textContent = "";
    h2Elements[1].style.color = "red";

    player_X = 0;
    player_O = 0;
    draw_X_O = 0;
  }
}
// skor
function score(){
  h2Elements[0].textContent = "X: "+player_X;
  h2Elements[1].textContent = "";
  h2Elements[2].textContent = "O: "+player_O;
}
// oyun bitişi
function endGame(draw) {
  isWinner();
  if (draw) {
    h2Elements[0].textContent = "";
    h2Elements[1].textContent = 'Draw!';
    h2Elements[2].textContent = "";
  } else {
    xIsNext ? "X"+(player_X+=1) : "O"+(player_O+=1);
    isWinner();
  }
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
  messageContainer.classList.remove('hidden');

}
