'use strict';

// const img = document.getElementsByTagName('img');
const imgTest = document.querySelector('.img');
// console.log(img);
let state = 0;
const styleList = ['style-1', 'style-2', 'style-3'];
const imgLinkList = ['./img/mountain.jpg', './img/sea.jpg', './img/forest.jpg'];
const len = imgLinkList.length;

imgTest.addEventListener('click', e => {
  e.preventDefault();
  imgTest.classList.remove(styleList[state]);
  state = (state + 1) % len;
  imgTest.src = imgLinkList[state];
  console.log(imgTest.classList);
  imgTest.classList.add(styleList[state]);
  console.log(`State: ${state}, current link: ${imgLinkList[state]}\n
  current style: ${imgTest.classList}`);
});
