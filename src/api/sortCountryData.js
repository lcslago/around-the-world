import { cardsPerScroll, sortOptions } from "../utils/renderHomePage.js";
import { renderOffcanvas } from "../utils/renderOffcanvas.js";
import { filterCountryData } from "./filterCountryData.js";
import { renderCountryData } from "./renderCountryData.js";

const bodyPage = document.querySelector('[data-country-cards]');
export const sortLabel = document.getElementById('sortLabel');
const $ = document.querySelector.bind(document);
let optionsArr = [];

export function sortCountryData(arr) {
    for (let i = 0; i < sortOptions.length; i++) {
        optionsArr.push(sortOptions[i].innerHTML);
    }

    sortOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            let dataSorted = sort(arr, optionsArr[index]);
            bodyPage.innerHTML = "";

            dataSorted.length < 8 ?
                renderResults(dataSorted, dataSorted.length) :
                renderResults(dataSorted, cardsPerScroll);

            filterCountryData(dataSorted);

            dataSorted.length === 0 &&
                renderCountryData(null, 'sort404');
        });
    })
}

function sort(countryData, type) {
    const nameAscending = optionsArr[0];
    const nameDescending = optionsArr[1];
    const mostPopulated = optionsArr[2];
    const leastPopulated = optionsArr[3];

    switch (type) {
        case nameAscending:
            StyleSortFor(nameAscending);
            return sortByName(countryData);
        case nameDescending:
            StyleSortFor(nameDescending);
            return sortByName(countryData).reverse();
        case mostPopulated:
            StyleSortFor(mostPopulated);
            return sortByPopulation(countryData).reverse();
        case leastPopulated:
            StyleSortFor(leastPopulated);
            return sortByPopulation(countryData);
    }
}

function StyleSortFor(sortType) {
    $('[data-sort-label]').innerHTML = `<b>${sortType}</b>`;
    $('#sorter').classList.add("dropdown-menu-filtered");
}

export function sortByName(arr) {
    return arr.sort((a, b) =>
        a.name.common
            .localeCompare(
                b.name.common,
                'en',
                { sensitivity: 'base' }));
}

function sortByPopulation(arr) {
    return arr.sort((a, b) =>
        a.population - b.population
    );
}

export function renderResults(arr, cardsPerScroll) {
    for (let i = 0; i < cardsPerScroll; i++) {
        renderCountryData(arr[i], 'card');
    }
    renderOffcanvas(arr, 'card');
}