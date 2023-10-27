import { sortOptions } from "../utils/renderHomePage.js";
import { renderCountryData } from "./renderCountryData.js";

const bodyPage = document.querySelector('[data-country-cards]');
let optionsArr = [];

export function sortCountryData(arr) {
    for (let i = 0; i < sortOptions.length; i++) {
        optionsArr.push(sortOptions[i].innerText);
    }

    sortOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            bodyPage.innerHTML = "";
            renderResults(sort(arr, optionsArr[index]));
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
            return sortByName(countryData);
        case nameDescending:
            return sortByName(countryData).reverse();
        case mostPopulated:
            return sortByPopulation(countryData).reverse();
        case leastPopulated:
            return sortByPopulation(countryData);
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

function renderResults(arr) {
    for (let i = 0; i < 8; i++) {
        renderCountryData(arr[i], 'card');
    }
}