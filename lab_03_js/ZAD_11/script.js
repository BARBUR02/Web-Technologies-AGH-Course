'use strict';

const subregionMap = new Map();
const subregions = new Set();
let subregionsArray;
let sortedSubregionsArray;
let countriesArray = new Map();
let sortedCountriesArray = new Map();
let sortedCountriesInfo = new Map();

const subregionsMainContainer = document.querySelector('.subregion-innerhtml');

let filterSubregionsArray = new Array();
// let filterSubregionsMap = new Map();
let filterCountriesMap = new Map();
let filterCountriesSorted = new Map();

// Page opearation buttons
const firstBtn = document.querySelector('.first-btn');
const lastBtn = document.querySelector('.last-btn');
const pageBtns = document.querySelectorAll('.page-num-div');
const countryFilter = document.getElementById('country-name');
const capitalFilter = document.getElementById('country-capital');
console.log(countryFilter);
console.log(capitalFilter);

let filterActive = false;
let sorted = false;
let currPage = 0;
let subregionsNum = 25;
let pageSize = 5;

//filtering content
const filterCountries = function (firstVal, secondVal) {
  resetFilterMapandArr();
  const reg1 = new RegExp(`${firstVal.toUpperCase()}`, 'g');
  const reg2 = new RegExp(`${secondVal.toUpperCase()}`, 'g');
  for (const sub of subregionsArray) {
    let flag = false;

    // console.log(sub);
    // console.log(countriesArray.get(sub.name));
    for (const country of countriesArray.get(sub.name)) {
      // console.log(country);
      const comparator1 = country.name.toUpperCase();
      const comparator2 = country.capital ? country.capital.toUpperCase() : '';
      // console.log(comparator);
      // console.log(comparator.match(/firstVal.toUpperCase()/g));

      // console.log(reg1.test(comparator));
      if (reg1.test(comparator1) && reg2.test(comparator2)) {
        console.log('Przeszlo filtry');
        if (!flag) {
          filterSubregionsArray.push(sub);
          flag != flag;
        }
        filterCountriesMap.get(sub.name).push(country);
      }
    }
  }
  filterSubregionsArray = [...new Set(filterSubregionsArray)];
  console.log(filterSubregionsArray);
  for (const sub of filterSubregionsArray) {
    filterCountriesSorted.set(
      sub.name,
      filterCountriesMap.get(sub.name).slice()
    );
  }
  currPage = 0;
  loadPage();
};

const resetFilterMapandArr = function () {
  filterSubregionsArray = new Array();
  for (const key of filterCountriesMap.keys()) {
    filterCountriesMap.set(key, new Array());
  }
};

const resetFilter = function () {
  // console.log('SubregionsARAT!!!');
  // console.log(subregionsArray);
  // console.log(filterCountriesMap);
  for (const sub of subregionsArray) {
    filterCountriesMap.set(sub.name, new Array());
  }
  filterSubregionsArray = new Array();
  filterActive = false;
  loadPage();
};

countryFilter.addEventListener('input', () => {
  const val1 = countryFilter.value ? countryFilter.value : '.';
  const val2 = capitalFilter.value ? capitalFilter.value : '.';
  console.log(val1);
  console.log(val2);
  if (val1 !== '.' || val2 !== '.') {
    filterActive = true;
    filterCountries(val1, val2);
  } else {
    resetFilter();
  }
});

capitalFilter.addEventListener('input', () => {
  const val1 = countryFilter.value ? countryFilter.value : '.';
  const val2 = capitalFilter.value ? capitalFilter.value : '.';
  console.log(val1);
  console.log(val2);
  if (val1 !== '.' || val2 !== '.') {
    filterActive = true;
    filterCountries(val1, val2);
  } else {
    resetFilter();
  }
});

// cmp functions

const cmpSubName = function (b, a) {
  return b.name > a.name ? -1 : 1;
};
const cmpSubNameD = function (a, b) {
  return b.name > a.name ? -1 : 1;
};
const cmpSubPopulation = function (a, b) {
  return b.totalPopulation - a.totalPopulation;
};
const cmpSubPopulationD = function (b, a) {
  return b.totalPopulation - a.totalPopulation;
};
const cmpSubArea = function (a, b) {
  return b.totalArea - a.totalArea;
};
const cmpSubAreaD = function (b, a) {
  return b.totalArea - a.totalArea;
};

const cmpCountryName = function (a, b) {
  return b.name > a.name ? -1 : 1;
};
const cmpCountryNameD = function (b, a) {
  return b.name > a.name ? -1 : 1;
};
const cmpCountryCapital = function (a, b) {
  return b.capital > a.capital ? -1 : 1;
};

const cmpCountryCapitalD = function (b, a) {
  return b.capital > a.capital ? -1 : 1;
};

const cmpCountryPopulation = function (a, b) {
  return b.population - a.population;
};

const cmpCountryPopulationD = function (b, a) {
  return b.population - a.population;
};

const cmpCountryArea = function (a, b) {
  return b.area - a.area;
};

const cmpCountryAreaD = function (b, a) {
  return b.area - a.area;
};

//Subregions
const sortedSubregionsName = { value: false, sortKey: cmpSubName };
const sortedSubregionsPopulation = { value: false, sortKey: cmpSubPopulation };
const sortedSubregionsArea = { value: false, sortKey: cmpSubArea };
const sortedSubregionsNameD = { value: false, sortKey: cmpSubNameD };
const sortedSubregionsAreaD = {
  value: false,
  sortKey: cmpSubAreaD,
};
const sortedSubregionsPopulationD = {
  value: false,
  sortKey: cmpSubPopulationD,
};

const SubregionsortMap = new Map([
  ['sortedSubregionsName', sortedSubregionsName],
  ['sortedSubregionsPopulation', sortedSubregionsPopulation],
  ['sortedSubregionsArea', sortedSubregionsArea],
  ['sortedSubregionsAreaD', sortedSubregionsAreaD],
  ['sortedSubregionsPopulationD', sortedSubregionsPopulationD],
  ['sortedSubregionsNameD', sortedSubregionsNameD],
]);

// Sorting Subregions
const sortSubregions = function (element, definition) {
  element.parentNode.querySelectorAll('.sub-arrow').forEach(el => {
    console.log(el);
    el.classList.remove('active-arrow');
    if (el !== element) SubregionsortMap.get(el.dataset.cmp).value = false;
  });
  definition.value = !definition.value;
  if (definition.value) {
    // element.style.color = 'green';
    element.classList.add('active-arrow');
    sorted = true;
    sortedSubregionsArray = sortedSubregionsArray.sort(definition.sortKey);
    // console.log(sortedSubregionsArray);
  } else {
    // element.style.color = '#f4f4f4';
    element.classList.remove('active-arrow');
    SubregionsupdateSorting();
    supervise();
  }
};
const SubregionsupdateSorting = function () {
  sortedSubregionsArray = subregionsArray.slice();
  for (const item of SubregionsortMap.values()) {
    if (item.value)
      sortedSubregionsArray = sortedSubregionsArray.sort(item.sortKey);
  }
};

const supervise = function () {
  for (const item of SubregionsortMap.values()) {
    if (item.value) return;
  }
  sorted = false;
  sortedSubregionsArray = subregionsArray.slice();
};

const sortCountries = function (element, definitionPrev, sub) {
  let definition = definitionPrev.get(sub);
  console.log('DEFINITION');
  console.log(definition);

  // console.log(sub.slice(0, -1));
  if (sub[sub.length - 1] === 'D') {
    definitionPrev.get(sub.slice(0, -1)).value = false;
  } else {
    definitionPrev.get(sub + 'D').value = false;
  }

  element.parentNode.querySelectorAll('.country-arrow').forEach(el => {
    console.log(el);
    el.classList.remove('active-arrow');
    // if (el !== element) definition.value = false;
  });

  definition.value = !definition.value;
  if (definition.value) {
    element.classList.add('active-arrow');
    // element.style.color = 'green';
    sortedCountriesInfo.set(definition.name, true);
    let tmpArr = sortedCountriesArray.get(definition.name);
    console.log(definition.name);
    // console.log(definition.subregion);
    // console.log('Przed posortowaniem: ');
    // console.log(tmpArr);

    // console.log(definition);
    // console.log(definition.sortKey);
    tmpArr = tmpArr.sort(definition.sortKey);
    // console.log(tmpArr);
    // console.log('Po posortowaniu: ');
    // console.log(tmpArr);
    // console.log(tmpArr);
  } else {
    // element.style.color = '#f4f4f4';
    element.classList.remove('active-arrow');
    // console.log('To co mnie intresuje');
    console.log(CountrySortingObjects.get(definition.name));
    CountriesupdateSorting(
      CountrySortingObjects.get(definition.name),
      definition.name
    );
    superviseCountries(definitionPrev);
  }
};

const superviseCountries = function (sortingObject) {
  console.log('Sorting objects.values()');
  console.log(sortingObject);
  // console.log(sortingObject.values());
  for (const item of sortingObject.values()) {
    if (item.value) return;
  }
  sortedCountriesInfo.set(sortingObject.name, false);
  sortedCountriesArray.set(
    sortingObject.name,
    countriesArray.get(sortingObject.name).slice()
  );
};

const CountriesupdateSorting = function (definition, sub) {
  sortedCountriesArray.set(sub, countriesArray.get(sub).slice());
  console.log('TUTAJ');
  console.log(definition.values());
  for (const item of definition.values()) {
    if (item.value) {
      let tmpArr = sortedCountriesArray.get(sub);
      sortedCountriesArray.set(sub, tmpArr.sort(item.sortKey));
    }
  }
};

// document.querySelectorAll('.header').forEach(el =>
//   el.addEventListener('click', function (e) {
//     // console.log(this);
//     // console.log(e.target);
//     // console.log(e.target.dataset.cmp);
//     // console.log(SubregionsortMap.get(e.target.dataset.cmp));
//     // console.log(3);
//     // console.log(this.dataset.cmp);
//     sortSubregions(e.target, SubregionsortMap.get(e.target.dataset.cmp));
//     loadPage();
//   })
// );

document.querySelectorAll('.sub-arrow').forEach(el =>
  el.addEventListener('click', function (e) {
    console.log('ESSA');
    sortSubregions(e.target, SubregionsortMap.get(e.target.dataset.cmp));
    loadPage();
  })
);

// Page buttons listeners

const prevPage = function () {
  const prev = currPage;
  currPage = currPage - 1 >= 0 ? currPage - 1 : currPage;
  prev === currPage || loadPage(currPage);
  // console.log(currPage);
};

const nextPage = function () {
  const next = currPage;
  currPage =
    currPage + 1 < Math.ceil(subregionsNum / pageSize)
      ? currPage + 1
      : currPage;
  next === currPage || loadPage(currPage);
  // console.log(currPage);
};

firstBtn.addEventListener('click', prevPage);
lastBtn.addEventListener('click', nextPage);
pageBtns.forEach(el =>
  el.addEventListener('click', e => {
    currPage = Number(e.target.dataset.num);
    loadPage();
  })
);

//rozwijanie sie subregionu
const dropdownAction = function (e) {
  this.classList.toggle('dropdown-btn-rotate');
  let element = e.target;
  console.log('kliknelismy dropdow');
  //   console.log(element);
  while (!element.classList.contains('subregion-data')) {
    element = element.parentNode;
    console.log(element);
  }
  element = element.nextSibling.nextSibling;
  element.classList.toggle('manage-dropdown');
};

document.querySelectorAll('.dropdown-btn').forEach(e => {
  e.addEventListener('click', dropdownAction);
});

const loadPage = function () {
  subregionsMainContainer.innerHTML = '';
  console.log('LOADPAGE wywolany!');
  let i = 0;
  for (const btn of pageBtns) {
    if (i === currPage) {
      btn.classList.add('active-btn');
    } else {
      btn.classList.remove('active-btn');
    }
    i++;
  }

  let arraychoice = sorted ? sortedSubregionsArray : subregionsArray;
  console.log('Czy przefiltrowane ?');
  console.log(filterActive);
  let startIndex = currPage * pageSize;
  let endindex =
    currPage * pageSize + pageSize - 1 >= subregionsNum
      ? subregionsNum - 1
      : currPage * pageSize + pageSize - 1;
  if (filterActive) {
    arraychoice = filterSubregionsArray;
    startIndex = currPage * pageSize;
    endindex =
      currPage * pageSize + pageSize - 1 >= filterSubregionsArray.length
        ? filterSubregionsArray.length - 1
        : currPage * pageSize + pageSize - 1;
  }
  for (let i = startIndex; i <= endindex; i++) {
    const subregionElement = document.createElement('div');
    subregionElement.classList.add('subregion');
    subregionElement.innerHTML = createSubregion(arraychoice[i]);
    subregionsMainContainer.append(subregionElement);
  }

  document.querySelectorAll('.dropdown-btn').forEach(e => {
    e.addEventListener('click', dropdownAction);
  });
  document.querySelectorAll('.country-arrow').forEach(el =>
    el.addEventListener('click', function (e) {
      // console.log(CountrySortingObjects);
      const sub = CountrySortingObjects.get(
        e.target.parentNode.parentNode.dataset.subreg
      );
      const comparator = e.target.dataset.cmp;
      console.log(sub + ' To jes subregion');
      console.log(comparator + ' To jest comparator');
      // console.log(sub);
      // console.log(comparator);
      // console.log(CountrySortingObjects);
      // console.log(CountrySortingObjects.get(e.target.dataset.cmp));
      sortCountries(e.target, sub, comparator);
      reloadPageCountries(e.target.parentNode.parentNode.dataset.subreg);
    })
  );
};

//Retreiving Data
const loadData = async function () {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const serverData = await res.json();
  return serverData;
};

const CountrySortingObjects = new Map();

const completeSubregion = async function () {
  const countryData = await loadData();
  countryData.forEach(el => updateMap(el));
  // console.log(subregionMap);
  // console.log(subregionMap.size);
  subregionsArray = Array.from(subregionMap.keys(), value => {
    return {
      name: value,
      totalPopulation: getSubregionPopulation(value),
      totalArea: getTotalArea(value),
    };
  });
  sortedSubregionsArray = subregionsArray.slice();
  // sortedCountiesArray
  // countriesArray
  // console.log(subregionsArray);
  // console.log(subregionMap);
  subregionsArray.forEach(subregion => {
    countriesArray.set(
      subregion.name,
      subregionMap.get(subregion.name).slice()
    );
    sortedCountriesArray.set(
      subregion.name,
      subregionMap.get(subregion.name).slice()
    );
    sortedCountriesInfo.set(subregion.name, false);

    const tmpMap = new Map();
    tmpMap.set('cmpCountryArea', {
      name: subregion.name,
      value: false,
      sortKey: cmpCountryArea,
    });
    tmpMap.set('cmpCountryName', {
      name: subregion.name,
      value: false,
      sortKey: cmpCountryName,
    });
    tmpMap.set('cmpCountryCapital', {
      name: subregion.name,
      value: false,
      sortKey: cmpCountryCapital,
    });
    tmpMap.set('cmpCountryPopulation', {
      name: subregion.name,
      value: false,
      sortKey: cmpCountryPopulation,
    });
    tmpMap.set('cmpCountryPopulationD', {
      name: subregion.name,
      value: false,
      sortKey: cmpCountryPopulationD,
    });
    tmpMap.set('cmpCountryAreaD', {
      name: subregion.name,
      value: false,
      sortKey: cmpCountryAreaD,
    });

    tmpMap.set('cmpCountryNameD', {
      name: subregion.name,
      value: false,
      sortKey: cmpCountryNameD,
    });

    tmpMap.set('cmpCountryCapitalD', {
      name: subregion.name,
      value: false,
      sortKey: cmpCountryCapitalD,
    });

    // tmpMap.set('cmpCountryPopulation', {
    //   name: subregion.name,
    //   value: false,
    //   sortKey: cmpCountryPopulation,
    // });
    filterCountriesMap.set(subregion.name, new Array());

    CountrySortingObjects.set(subregion.name, tmpMap);
  });
  // console.log(countriesArray);
  // console.log(sortedCountriesInfo);
  // console.log(CountrySortingObjects);
  // console.log(subregionsArray);
  loadPage();
};

// { value: false, sortKey: cmpSubArea }
// const cmpCountryName = function (a, b) {
//   return b.name > a.name ? -1 : 1;
// };
// const cmpCountryCapital = function (a, b) {
//   return b.capital > b.capital ? -1 : 1;
// };
// const cmpCountryPopulation = function (a, b) {
//   return b.population - a.population;
// };

// const cmpCountryArea = function (a, b) {
//   return b.area - a.area;
// };

const updateMap = function (el) {
  if (subregions.has(el.subregion)) {
    const tab = subregionMap.get(el.subregion);
    tab.push({
      name: el.name.common,
      flag: el.flags.png,
      capital: Array.isArray(el.capital) ? el.capital[0] : el.capital,
      population: el.population,
      area: el.area,
    });
  } else {
    subregionMap.set(el.subregion, [
      {
        name: el.name.common,
        flag: el.flags.png,
        capital: Array.isArray(el.capital) ? el.capital[0] : el.capital,
        population: el.population,
        area: el.area,
      },
    ]);
    subregions.add(el.subregion);
  }
};

//Helper function to create help Array
const getSubregionPopulation = function (subregion) {
  let sum = 0;
  for (const country of subregionMap.get(subregion)) {
    sum += country.population;
  }
  return sum;
};

const getTotalArea = function (subregion) {
  let sum = 0;
  for (const country of subregionMap.get(subregion)) {
    sum += country.area;
  }
  return sum;
};

const createSubregion = function (el) {
  // console.log('Create Subregion');
  // console.log(el);
  let outerHTML = `<div class="subregion-data subregion-row">
            <h1 class="subregion-name subregion-cell" id="${el.name}">
              <i class="fa-solid fa-circle-chevron-right dropdown-btn"></i
              >${el.name || 'Nieokreslony subregion'}
            </h1>
            <h1 class="subregion-population subregion-cell">${
              el.totalPopulation
            }</h1>
            <h1 class="subregion-area subregion-cell">${el.totalArea}</h1>
          </div>
          
          <div class="subregion-countries-content manage-dropdown">
            <div class="country-row header-country-row" data-subreg="${
              el.name
            }">
              <h1 class="name-tag country-cell country-header" data-cmp="cmpCountryName" data-subreg="${
                el.name
              }">Nazwa  <i class="fa-solid fa-circle-chevron-up country-arrow"
              data-cmp="cmpCountryName"></i>
               <i class="fa-solid fa-circle-chevron-down country-arrow" data-cmp="cmpCountryNameD"></i>
              </h1>

              <h1 class="capital-tag country-cell country-header" data-cmp="cmpCountryCapital">Stolica <i class="fa-solid fa-circle-chevron-up country-arrow" data-cmp="cmpCountryCapital"></i>
               <i class="fa-solid fa-circle-chevron-down country-arrow" data-cmp="cmpCountryCapitalD"></i>  </h1>
              <h1 class="population-tag country-cell country-header" data-cmp="cmpCountryPopulation">
                Populacja <i class="fa-solid fa-circle-chevron-up country-arrow" data-cmp="cmpCountryPopulationD"></i>
               <i class="fa-solid fa-circle-chevron-down country-arrow" data-cmp="cmpCountryPopulation"></i>
              </h1>
              <h1 class="area-tag country-cell country-header" data-cmp="cmpCountryArea">Powierzchnia <i class="fa-solid fa-circle-chevron-up country-arrow" data-cmp="cmpCountryAreaD"></i>
               <i class="fa-solid fa-circle-chevron-down country-arrow" data-cmp="cmpCountryArea"></i></h1>
            </div>
            <div id="country-section-${el.name}">`;
  let iteratorTab = sortedCountriesInfo.get(el.name)
    ? sortedCountriesArray.get(el.name)
    : countriesArray.get(el.name);
  // iteratorTab = filterActive ? filterCountriesMap.get(el.name) : iteratorTab;
  let searchMap = subregionMap;

  if (filterActive) {
    iteratorTab = filterCountriesMap.get(el.name);
    searchMap = filterCountriesMap;
    if (sortedCountriesInfo.get(el.name)) {
      searchMap = filterCountriesSorted;
    }
  }
  // console.log(subregionMap.get(el.name));
  console.log(searchMap.get(el.name));
  for (const country of searchMap.get(el.name)) {
    outerHTML += `<div class="country-row">
              <div class="flag-name-container country-cell">
                <img
                  src="${country.flag}"
                  alt="flag"
                  class="country-flag"
                />
                <h1 class="name-tag">${country.name}</h1>
              </div>
              <h1 class="capital-tag country-cell">${country.capital}</h1>
              <h1 class="population-tag country-cell">${country.population}</h1>
              <h1 class="area-tag country-cell">${country.area}</h1>
            </div>`;
  }
  outerHTML += `</div>
  </div>
        </div>`;
  return outerHTML;
};

const reloadPageCountries = function (sub) {
  const data = sortedCountriesInfo.get(sub)
    ? sortedCountriesArray.get(sub)
    : countriesArray.get(sub);
  let innerHTML = '';
  for (const country of data) {
    innerHTML += `<div class="country-row">
              <div class="flag-name-container country-cell">
                <img
                  src="${country.flag}"
                  alt="flag"
                  class="country-flag"
                />
                <h1 class="name-tag">${country.name}</h1>
              </div>
              <h1 class="capital-tag country-cell">${country.capital}</h1>
              <h1 class="population-tag country-cell">${country.population}</h1>
              <h1 class="area-tag country-cell">${country.area}</h1>
            </div>`;
  }
  innerHTML += `</div>
        </div>`;
  const countriesContainer = document.getElementById(`country-section-${sub}`);
  // console.log(countriesContainer);
  countriesContainer.innerHTML = innerHTML;
};

completeSubregion();
