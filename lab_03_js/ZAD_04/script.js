'use strict';

const displayer = document.getElementById('displayer');
const increment = document.getElementById('increment');
const reset = document.getElementById('reset');

let active = true;
let counter = 0;
displayer.textContent = counter;

function incrementer() {
  displayer.textContent = ++counter;
}

increment.addEventListener('click', incrementer);

reset.addEventListener('click', () => {
  if (active) {
    increment.removeEventListener('click', incrementer);
    reset.textContent = 'DISABLED';
    counter = 0;
    displayer.textContent = counter;
  } else {
    increment.addEventListener('click', incrementer);
    reset.textContent = 'ENABLED';
  }
  active = !active;
});
