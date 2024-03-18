const cells = document.querySelectorAll('[data-cell]'); // Hücreler

var gsmContainer = document.querySelectorAll(".game_score_message h3"); // h2 scor textleri
var gb_div = document.querySelector(".game_score_message");

var color_x = document.querySelectorAll("#X");
var color_o = document.getElementById("O");

var gsm_div = document.getElementById("game-board");

const messageContainer = document.getElementById('message'); // Button Kutusu
const restartButton = document.getElementById('restart-button'); // Yeniden Başlat Düğmesi

let xIsNext; // Sıradaki kişi



// Oyuncu X ve O tanımlanmıştır
let player_x = 0; 
let player_o = 0;

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

// Sağ tıklama olayını engelle
window.addEventListener('contextmenu', function (e) {
  e.preventDefault(); 
});

// Kutucuklara tetiklenme ayarı verir
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});
// tıklama olayı dinleyicisi
restartButton.addEventListener('click', startGame);

startGame();

function startGame() { 
  xIsNext = getRandomBoolean();
  console.log(xIsNext)
  score();
  color(xIsNext);
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
  if(cell.textContent === "X"){
    cell.style.textShadow = "0px 0px 5px red";
  }else{
    cell.style.textShadow = "0px 0px 5px green";
  }
  
}
function color(xIsNext){
  if(xIsNext){
    color_x.forEach(function(color_x) {
      color_x.style.color = "red"; 
      color_x.style.fontSize = "1.5em";
    });
    color_o.style.color = "#333";
    color_o.style.fontSize = "1em";
    
  }else {
    color_o.style.color = "green";
    color_o.style.fontSize = "1.5em";
    color_x.forEach(function(color_x) {
      color_x.style.color = "#333"; color_x.style.fontSize = "1em";
    });
  }

  gb_div.style.boxShadow = xIsNext ? "0px -2px 10px 0px red" : "0px -2px 10px 0px green";
  gsm_div.style.boxShadow = xIsNext ? "0px -2px 10px 0px red" : "0px -2px 10px 0px green";
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}
// sıradaki oyuncuyu belirler
function swapTurns() {
  xIsNext = !xIsNext;
  color(xIsNext);
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
  if(player_x === 3){
    gsmContainer[0].textContent = "";
    gsmContainer[1].textContent = "X, wins " + player_x + "-" + player_o + "!";
    gsmContainer[2].textContent = "";

    player_x = 0;
    player_o = 0;
  }
  if(player_o === 3){
    gsmContainer[0].textContent = "";
    gsmContainer[1].textContent = "O, wins " + player_x + "-" + player_o + "!";
    gsmContainer[2].textContent = "";

    player_x = 0;
    player_o = 0;
  }
}
// skor
function score(){
  gsmContainer[0].textContent = "X: "+player_x;
  gsmContainer[1].textContent = "";
  gsmContainer[2].textContent = "O: "+player_o;
}
// oyun bitişi
function endGame(draw) {
  isWinner();
  if (draw) {
    gsmContainer[0].textContent = "";
    gsmContainer[1].textContent = 'Draw!';
    gsmContainer[2].textContent = "";
  } else {
    xIsNext ? "X"+(player_x+=1) : "O"+(player_o+=1);
    isWinner();
  }
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
  messageContainer.classList.remove('hidden');

}
