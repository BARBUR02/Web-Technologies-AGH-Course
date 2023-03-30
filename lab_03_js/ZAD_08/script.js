'use strict';

const mainInput = document.getElementById('main-password');
const repeatInput = document.getElementById('repeat-password');
const characterCount = document.querySelector('#character-count .fa-solid');
const characterSpecial = document.querySelector('#character-special .fa-solid');
const characterCapital = document.querySelector('#character-capital .fa-solid');
const characterDigit = document.querySelector('#character-digit .fa-solid');
const feedbackBtn = document.querySelector('.feedback-icon');
const userInfo = document.getElementById('user-info');
const infoDisplay = document.querySelector('.feedback-info');

let checkCounter = 0;

const eyeManage = function () {
  // e.preventDefault();
  this.classList.toggle('fa-eye');
  const input = this.previousSibling.previousSibling;
  console.log(input);
  const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
  input.setAttribute('type', type);
};

const check = function () {
  const value = mainInput.value.trim();
  console.log(value);
  // A
  if (value.length >= 8) {
    if (!characterCount.classList.contains('fa-circle-check')) {
      checkAction(characterCount);
      checkCounter++;
    }
  } else {
    if (characterCount.classList.contains('fa-circle-check')) {
      checkAction(characterCount);
      checkCounter--;
    }
  }
  // B;
  if (value.match(/[^\p{L}\p{N}]+/u)) {
    if (!characterSpecial.classList.contains('fa-circle-check')) {
      checkAction(characterSpecial);
      checkCounter++;
    }
  } else {
    if (characterSpecial.classList.contains('fa-circle-check')) {
      checkAction(characterSpecial);
      checkCounter--;
    }
  }

  // C
  if (value.match(/[\p{Lu}]+/u)) {
    if (!characterCapital.classList.contains('fa-circle-check')) {
      checkAction(characterCapital);
      checkCounter++;
    }
  } else {
    if (characterCapital.classList.contains('fa-circle-check')) {
      checkAction(characterCapital);
      checkCounter--;
    }
  }
  // D
  if (value.match(/[\p{N}]+/u)) {
    if (!characterDigit.classList.contains('fa-circle-check')) {
      checkAction(characterDigit);
      checkCounter++;
    }
  } else {
    if (characterDigit.classList.contains('fa-circle-check')) {
      checkAction(characterDigit);
      checkCounter--;
    }
  }
};

const checkBoth = function () {
  console.log(repeatInput.value.trim());
  if (
    repeatInput.value.trim() === mainInput.value.trim() &&
    repeatInput.value.trim() === ''
  ) {
    if (!userInfo.classList.contains('hidden')) {
      userInfo.classList.add('hidden');
      return;
    }
  } else {
    if (userInfo.classList.contains('hidden'))
      userInfo.classList.remove('hidden');
  }

  if (repeatInput.value.trim() === mainInput.value.trim()) {
    // console.log('essa');

    if (!feedbackBtn.classList.contains('fa-square-check'))
      if (checkCounter == 4) {
        feedbackBtn.classList.add('fa-square-check');
        feedbackBtn.classList.remove('fa-square-xmark');
        updateInfo(2);
      } else {
        updateInfo(1);
      }
  } else {
    if (feedbackBtn.classList.contains('fa-square-check'))
      feedbackBtn.classList.add('fa-square-xmark');
    feedbackBtn.classList.remove('fa-square-check');
    updateInfo(0);
  }
};

const updateInfo = function (n) {
  const messages = [
    'SPRAWDZ ZGODNOSC HASEL',
    'HASLA ZGODNE, NIE SPELNIA WYMOGOW',
    'HASLA ZGODNE, WYMOGI SPELNIONE',
  ];
  console.log(checkCounter);
  switch (n) {
    case 0:
      userInfo.style.color = 'red';
      break;
    case 1:
      userInfo.style.color = 'orange';
      break;
    case 2:
      userInfo.style.color = 'green';
      break;
    default:
      break;
  }
  infoDisplay.textContent = messages[n];
};

const checkAction = function (el) {
  el.classList.toggle('fa-circle-check');
  el.classList.toggle('fa-circle-xmark');
  el.classList.toggle('satisfied');
};

document.querySelectorAll('.input-area').forEach(el => {
  el.addEventListener('focus', function (e) {
    e.preventDefault();
    this.parentNode.classList.add('focus-border');
  });
  el.addEventListener('focusout', function (e) {
    e.preventDefault();
    this.parentNode.classList.remove('focus-border');
  });
  el.parentElement
    .querySelector('.fa-eye-slash')
    .addEventListener('click', eyeManage);
});

mainInput.addEventListener('input', check);
mainInput.addEventListener('input', checkBoth);
repeatInput.addEventListener('input', checkBoth);
