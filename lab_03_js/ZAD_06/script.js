'use strict';

const element = document.querySelector('.phone-book-item');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const container = document.getElementById('phone-book-data');
const btnAdd = document.querySelector('.btn-add');
const surnameCheck = /^\p{Lu}?\p{Ll}*(-\p{Lu})?\p{Ll}*$/u;
const nameCheck = /^\p{Lu}?\p{Ll}*$/u;
const nameAndSurnameCheck =
  /^\s*\p{Lu}\p{Ll}{1,}\s{1,}\p{Lu}\p{Ll}{1,}(-\p{Lu})?\p{Ll}{1,}\s*$/u;
const phoneNumCheck = /^\d{9}|\d{12}$/;

function createPhoneBookElement(name, phone) {
  return `<div class="personal-data">
          <h1 class="name">${name}</h1>
          <h2 class="phone-num">${phone}</h2>
        </div>
        <div class="remove-btn"><i class="fa-regular fa-trash-can"></i></div>`;
}

function removeElement() {
  let element = this;
  while (element.className !== 'phone-book-item') element = element.parentNode;
  container.removeChild(element);
}

function transformInput() {
  const phoneValue = phoneInput.value
    .trim()
    .split(/\s+/g)
    .map(item => item.split(''))
    .flat()
    .reduce((prev = '', next, i) =>
      i % 3 == 0 ? prev + ' ' + next : prev + next
    );
  const nameValue = nameInput.value
    .trim()
    .split(/\s+/g)
    .reduce((prev = '', next) => prev + ' ' + next);
  return [nameValue, phoneValue];
}

function checkInput() {
  return (
    nameAndSurnameCheck.test(nameInput.value) &&
    phoneNumCheck.test(phoneInput.value.replace(/ /g, ''))
  );
}

function addPhoneBookElement() {
  if (!checkInput()) {
    let info;
    if (
      !nameAndSurnameCheck.test(nameInput.value) &&
      !phoneNumCheck.test(phoneInput.value.replace(/ /g, ''))
    )
      info = 'Incorrect both name and phone number!';
    if (!nameAndSurnameCheck.test(nameInput.value)) info = 'Incorrect Name!';
    else info = 'Incorrect Phone Number!';
    alert(
      `Invalid input - in order to add item correct mistakes!\nMistakes: ${info}`
    );
    return;
  }
  const newElement = document.createElement('div');
  newElement.classList.add('phone-book-item');
  const [correctName, correctSurname] = transformInput();
  newElement.innerHTML = createPhoneBookElement(correctName, correctSurname);
  newElement
    .querySelector('.remove-btn')
    .addEventListener('click', removeElement);
  container.prepend(newElement);
  alert('Succesfully Added!');
  nameInput.value = '';
  phoneInput.value = '';
}

btnAdd.addEventListener('click', addPhoneBookElement);
document.querySelector('.remove-btn').addEventListener('click', removeElement);
