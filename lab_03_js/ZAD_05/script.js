'use strict';

const yellow = document.querySelector('.div-3');
const red = document.querySelector('.div-2');
const blue = document.querySelector('.div-1');
const displayer = document.getElementById('info-display');
const liveScore = document.querySelector('.live-score');
const btnPropagation = document.querySelector('.btn-propagation');
const btnReset = document.querySelector('.btn-reset');
const btnChange = document.querySelector('.btn-change');

let score = 0;
let propagation = false;
let order = false;

function modify(color) {
  console.log(this);
  switch (color) {
    case 'yellow':
      score += 5;
      displayer.textContent = 'Nacisnales zolty o wartosci 5!';
      break;
    case 'red':
      score += 2;
      displayer.textContent = 'Nacisnales czerwony o wartosci 2!';
      break;
    case 'blue':
      score += 1;
      displayer.textContent = 'Nacisnales niebieski o wartosci 1!';
      break;
  }
  liveScore.textContent = score;
}

function action(e) {
  modify(this.id);
  check();
  if (!propagation) e.stopPropagation();
}

function changeEventListeners() {
  document.querySelectorAll('.item').forEach(function (el) {
    el.removeEventListener('click', action, !order);
    el.addEventListener('click', action, order);
  });
}

btnReset.addEventListener('click', e => {
  score = 0;
  propagation = false;
  order = false;
  btnPropagation.textContent = 'START PROPAGATION';
  displayer.textContent = '';
  liveScore.textContent = 0;
  red.classList.remove('fade');
  yellow.classList.remove('fade');
  changeEventListeners();
  btnChange.textContent = 'DEFAULT DIRECTION';
});

btnPropagation.addEventListener('click', () => {
  if (propagation) btnPropagation.textContent = 'START PROPAGATION';
  else btnPropagation.textContent = 'STOP PROPAGATION';
  propagation = !propagation;
});

btnChange.addEventListener('click', () => {
  order = !order;
  changeEventListeners();
  check();
  btnChange.textContent = !order ? 'DEFAULT DIRECTION' : 'DOWNWARDS DIRECTION';
});

function check() {
  if (score > 30) {
    red.removeEventListener('click', action, order);
    red.classList.add('fade');
  }
  if (score > 50) {
    yellow.removeEventListener('click', action, order);
    yellow.classList.add('fade');
  }
}

changeEventListeners();
