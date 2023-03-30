'use strict';

const slider = document.querySelector('.slider-main-area');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.left-arrow-div');
const btnRight = document.querySelector('.right-arrow-div');
const dotContainer = document.querySelector('.indicators');
const randomCube = document.querySelector('.cube');

let currSlide = 0;
const maxSlide = slides.length;

// Needed during work-process
// slider.style.transform('scale(0.5) translateX(-800px)');
// slider.style.overflow('visible');

//Preparing slides
slides.forEach((s, i) => {
  s.style.transform = `translateX(${i * 100}%)`;
});

const activateDot = function (slide) {
  document
    .querySelectorAll('.dot')
    .forEach(dot => dot.classList.remove('active'));
  document.querySelector(`.dot[data-slide="${slide}"]`).classList.add('active');
};

// window.addEventListener('DOMContentLoaded', () => console.log('Page loaded!'));

const manageSlides = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

const prevSlide = function () {
  currSlide = currSlide === 0 ? maxSlide - 1 : currSlide - 1;
  manageSlides(currSlide);
  activateDot(currSlide);
};

const nextSlide = function () {
  currSlide = currSlide === maxSlide - 1 ? 0 : currSlide + 1;
  manageSlides(currSlide);
  activateDot(currSlide);
};

// manageSlides(0);

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
  e.key == 'ArrowLeft' && prevSlide();
  e.key == 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dot')) {
    const { slide } = e.target.dataset;
    currSlide = Number(slide);
    manageSlides(slide);
    activateDot(currSlide);
  }
});

randomCube.addEventListener('click', () => {
  currSlide = randomgenerator(currSlide);
  manageSlides(currSlide);
  activateDot(currSlide);
});

const randomgenerator = function (n) {
  let val = Math.floor(Math.random() * 100) % 4;
  console.log(val);
  while (val === n) {
    val = Math.floor(Math.random() * 100) % 4;
    console.log(val);
  }
  return val;
};
