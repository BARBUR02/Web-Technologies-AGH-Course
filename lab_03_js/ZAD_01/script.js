'use strict';

const btn = document.getElementById('btn');
const namespace = document.getElementById('namespace');

let textInput;

btn.addEventListener('click', e => {
  e.preventDefault();
  textInput = prompt('Please select your name: ');
  namespace.textContent = textInput;
});
