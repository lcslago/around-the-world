import { renderCountryData } from "./renderCountryData.js";

const bodyPage = document.querySelector('[data-country-cards]');
export const sortOptions = document.querySelectorAll('[data-sort-option]');

let optionsArr = [];

export function sortCountryData(arr) {
    for (let i = 0; i < sortOptions.length; i++) {
        optionsArr.push(sortOptions[i].innerText);
    }

    sortOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            sort(arr, optionsArr[index]);
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
            sortByName(countryData);
            renderSortResults(countryData);
            break;

        case nameDescending:
            sortByName(countryData).reverse();
            renderSortResults(countryData);
            break;

        case mostPopulated:
            sortByPopulation(countryData).reverse();
            renderSortResults(countryData);
            break;

        case leastPopulated:
            sortByPopulation(countryData);
            renderSortResults(countryData);
            break;
    }
}

function sortByName(arr) {
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

function renderSortResults(arr) {
    bodyPage.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        renderCountryData(arr[i], 'card');
    }
}