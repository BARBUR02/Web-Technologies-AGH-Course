'use strict';

//game-elements variables
const board = document.querySelector('#board');
const cursor = document.querySelector('.cursor');
console.log(cursor);
const rankingArea = document.getElementById('ranking-area');
console.log(rankingArea);
const userIntro = document.getElementById('user-intro');
const nickInputField = document.querySelector('.nick-input-area');
const capitalInd = document.querySelector('.capital');
const digitInd = document.querySelector('.digit');
const readyBtn = document.querySelector('.ready-btn');
const newGameBtn = document.querySelector('.new-game-btn');

//live-game-elements variables
const liveGameStats = document.querySelector('.live-game-info');
const liveGameNick = document.querySelector('.live-game-nick');
const liveScore = document.querySelector('.live-game-score');

//highscore screen elements variables
const highscoreTab = document.querySelector('.highscores');
const endScoreVal = document.querySelector('.current-score-value');
const animationSpeedChoice = ['2.7s', '3.8s', '4.4s', '5s', '6s'];

//on fly variables
let intervalRef = null;
let currNick = '';
let lives = 3;
let game = true;
let score = 0;

//user logging
const checkInput = function () {
  const input = nickInputField.value;
  let counter = 0;
  if (input.match(/.*\p{Lu}.*/u)) {
    capitalInd.classList.contains('fa-circle-check') ||
      capitalInd.classList.add('fa-circle-check');
    capitalInd.classList.contains('green') || capitalInd.classList.add('green');
    counter++;
  } else {
    capitalInd.classList.remove('green');
    capitalInd.classList.remove('fa-circle-check');
  }
  if (input.match(/.*\p{N}.*/u)) {
    digitInd.classList.contains('fa-circle-check') ||
      digitInd.classList.add('fa-circle-check');
    digitInd.classList.contains('green') || digitInd.classList.add('green');
    counter++;
  } else {
    digitInd.classList.remove('green');
    digitInd.classList.remove('fa-circle-check');
  }
  if (counter === 2) {
    readyBtn.classList.contains('hidden') &&
      readyBtn.classList.remove('hidden');
    readyBtn.addEventListener('click', initGame);
  } else {
    readyBtn.classList.contains('hidden') || readyBtn.classList.add('hidden');
    readyBtn.removeEventListener('click', initGame);
  }
};

//starting actual game
const initGame = function (e) {
  liveGameNick.textContent = nickInputField.value;
  currNick = nickInputField.value;
  liveScore.textContent = 0;
  cursor.style.left = e.pageX;
  cursor.style.top = e.pageY;
  cursor.classList.toggle('hidden');
  document.body.style.cursor = 'none';
  nickInputField.value = '';
  digitInd.classList.remove('fa-circle-check');
  digitInd.classList.remove('green');
  capitalInd.classList.remove('fa-circle-check');
  capitalInd.classList.remove('green');
  userIntro.classList.add('hidden');
  liveGameStats.classList.remove('hidden');

  //game cursor
  board.addEventListener('mousemove', function (e) {
    e.stopPropagation();
    const x = e.pageX;
    const y = e.pageY;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  });
  intervalRef = setInterval(createZombie, 900);
  board.addEventListener('click', missedShot);
};

//finish game and show ranking
const finishGame = function () {
  clearInterval(intervalRef);
  document.querySelectorAll('.zombie').forEach(z => board.removeChild(z));
  endScoreVal.textContent = score;
  board.removeEventListener('click', missedShot);
  document.body.style.cursor = 'default';
  cursor.classList.add('hidden');
  updateHighscores();
  liveGameStats.classList.add('hidden');
  rankingArea.classList.toggle('hidden');
  newGameBtn.addEventListener('click', restartGame);
};

//restart game variables and toggle user intro layout
const restartGame = function () {
  highscoreTab.innerHTML = '';
  score = 0;
  lives = 3;
  currNick = '';
  newGameBtn.removeEventListener('click', restartGame);
  document.body.style.cursor = 'default';
  document.querySelectorAll('.segment').forEach(e => e.classList.add('hidden'));
  console.log(userIntro);
  userIntro.classList.remove('hidden');
};

//Game action

const killZombie = function () {
  score += 12;
  board.removeChild(this);
  update();
};

const missedShot = function (e) {
  if (e.target.classList.contains('zombie')) return;
  score - 6 >= 0 ? (score -= 6) : (score = 0);
  update();
};

const update = function () {
  liveScore.textContent = score;
};

const reachedEnd = function () {
  lives--;
  console.log(lives);
  if (lives === 0) {
    game = false;
    finishGame();
  }
};

// creating Zombie
const createZombie = function () {
  const zombie = document.createElement('div');
  zombie.classList.add('zombie');
  board.appendChild(zombie);
  zombie.style.animationDuration =
    '0.9s, ' + animationSpeedChoice[Math.floor(Math.random() * 6)];
  zombie.style.bottom = Math.ceil(Math.random() * 255 - 100) + 'px';
  zombie.style.transform = `scale(${0.7 + Math.random() * 0.5})`;
  zombie.style.zIndex = Math.floor(2 + Math.random() * 45);
  zombie.addEventListener('click', killZombie.bind(zombie));
  zombie.addEventListener('animationend', reachedEnd);
};

document.addEventListener('DOMContentLoaded', () => {
  restartGame();
  nickInputField.addEventListener('input', checkInput);
  pushChangestoServer([]);
});

//Highscores section
const updateHighscores = async function () {
  const data = await fetch(
    'https://jsonblob.com/api/jsonBlob/1042545635454369792'
  );
  const json = await data.json();
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const minutes = now.getMinutes();
  const hour = now.getHours();
  const value = `${[day, month, year].join('/')} ${[hour, minutes].join(':')}`;
  console.log(value);

  const scoresJson = json;
  scoresJson.push({ name: currNick, score: `${score}`, date: value });
  scoresJson.sort(cmp);
  console.log(highscoreTab.childNodes);
  console.log(scoresJson);
  updateHighscoreBoard(scoresJson);
  pushChangestoServer(scoresJson);
};

const cmp = function (a, b) {
  return b['score'] - a['score'];
};

const updateHighscoreBoard = async function (items) {
  console.log(items);
  let i = 0;
  if (highscoreTab.hasChildNodes()) {
    console.log('COSPOSZLONIETAK');
    console.log(highscoreTab.childNodes);
  }
  for (const item of items) {
    const newEl = document.createElement('li');
    newEl.classList.add('highscore-record');
    newEl.innerHTML = fillHTML(item, i);
    highscoreTab.append(newEl);
    if (i == 6) break;
    i++;
  }
};

const fillHTML = function (item, i) {
  return `<h3 class="place">${i + 1}</h3>
            <h3 class="nick">${item.name}</h3>
            <h3 class="score">${item.score} pts</h3>
            <h3 class="date">${item.date}</h3>`;
};

const pushChangestoServer = async function (toSend = {}) {
  const response = await fetch(
    'https://jsonblob.com/api/jsonBlob/1042545635454369792',
    {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSend),
    }
  );
  return response.json();
};
