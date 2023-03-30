'use strict';

const remove = document.getElementById('btn-left');
const add = document.getElementById('btn-right');
const container = document.getElementById('items-display-area');

let counter = 1;
const valueTab = [];

function createBlockElement() {
  const newElement = document.createElement('div');
  newElement.setAttribute(
    'style',
    'background-color: #f4f4f4; color: #333; height: 20px; width: 20px; margin: 0px 3px; font-size: 0.7rem; display:flex; justify-content: center; align-items: center;'
  );
  return newElement;
}

add.addEventListener('click', () => {
  //   console.log('add clicked!');
  const newContent = createBlockElement();
  valueTab.push(newContent);
  newContent.textContent = counter++;
  container.append(newContent);
});

remove.addEventListener('click', () => {
  if (valueTab.length > 0) {
    container.removeChild(valueTab[0]);
    valueTab.shift();
  }
});
