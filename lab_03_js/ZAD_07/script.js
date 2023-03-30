'use strict';

const placeA = document.querySelector('.function-1 .input-area');
const placeB = document.querySelector('.function-2 .input-area');
const placeC = document.querySelector('.function-3 .input-area');
const placeD = document.querySelector('.function-4 .input-area');
const placeE = document.querySelector('.function-5 .input-area');
const placeF = document.querySelector('.function-6 .input-area');
const placeG = document.querySelector('.function-7 .input-area');

const renderCities = function () {
  functionA();
  functionB();
  functionC();
  functionD();
  functionE();
  functionF();
  functionG();
};

const functionA = async function () {
  let uri = 'http://localhost:3000/cities?province=małopolskie';
  const res = await fetch(uri);
  const cities = await res.json();
  console.log(cities);
  let data = '';
  cities.forEach((city, index) => {
    if (index == cities.length - 1) data += `${city.name}`;
    else data += `${city.name}, `;
  });
  placeA.innerHTML = data;
};

const functionB = async function () {
  let uri = 'http://localhost:3000/cities?name_like=.*a.*a.*';
  const res = await fetch(uri);
  const cities = await res.json();
  console.log(cities);
  let data = '';
  cities.forEach((city, index) => {
    if (index == cities.length - 1) data += `${city.name}`;
    else data += `${city.name}, `;
  });
  placeB.innerHTML = data;
};

const functionC = async function () {
  //   'http://localhost:3000/cities?_page=5&_limit=1&_sort=dentensity&_order=desc';
  // 'http://localhost:3000/cities?_page=1&_limit=1&_offset=5&_sort=dentensity&_order=desc';

  let uri =
    'http://localhost:3000/cities?_page=5&_limit=1&_sort=dentensity&_order=desc';

  const res = await fetch(uri);
  const cities = await res.json();
  console.log(cities);
  placeC.innerHTML = cities[0].name;
};

const functionD = async function () {
  let uri = 'http://localhost:3000/cities?people_gte=100001';
  const res = await fetch(uri);
  const cities = await res.json();
  console.log('ddddd');
  console.log(cities);
  let data = '';
  cities.forEach((city, index) => {
    if (index == cities.length - 1) data += `${city.name}city`;
    else data += `${city.name}city, `;
  });
  placeD.innerHTML = data;
};

const functionE = async function () {
  let uri1 = 'http://localhost:3000/cities?people_gte=80001';
  let uri2 = 'http://localhost:3000/cities?people_lte=80000';
  const res1 = await fetch(uri1);
  const cities1 = await res1.json();
  const res2 = await fetch(uri2);
  const cities2 = await res2.json();
  const result = cities1.length < cities2.length ? 'ponizej' : 'powyzej';
  const message = `Wiecej jest miast ${result} 80000 mieszkancow\n
  Miast powyzej 80000 mieszkancow jest: ${cities1.length}\n
  Miast ponizej 80000 mieszkancow jest: ${cities2.length}`;
  placeE.textContent = message;
};

const functionF = async function () {
  let uri = 'http://localhost:3000/cities?township_like=^P.*';
  const res = await fetch(uri);
  const cities = await res.json();
  console.log('CITIES!!!!');
  console.log(cities);
  let area = 0;
  cities.forEach(city => {
    area += city.area;
  });
  placeF.textContent = `Srednia powierzchnia miast zaczynajacych sie na literke P wynosi: ${parseFloat(
    area / cities.length
  ).toFixed(2)}`;
};

const functionG = async function () {
  let uri = 'http://localhost:3000/cities?province=pomorskie';
  const res = await fetch(uri);
  const cities = await res.json();
  console.log('ggggg');
  console.log(cities);
  let counter = 0;
  cities.forEach(city => {
    if (city.people > 5000) counter++;
  });
  const mess = counter === cities.length ? 'Wszystkie ' : 'Nie wszystkie ';
  placeG.textContent = `${mess}miasta z wojewodztwa pomorskiego sa wieksze od 5000 osob, jest ich ${counter}`;
};

window.addEventListener('DOMContentLoaded', renderCities);
