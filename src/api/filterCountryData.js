import { cardsPerScroll, returnClojure, returnRegions } from "../utils/renderHomePage.js";
import { renderCountryData } from "./renderCountryData.js";
import { renderResults, sortCountryData } from "./sortCountryData.js";

const $ = document.querySelector.bind(document);
const $All = document.querySelectorAll.bind(document);

let isFiltering = false;
let isSearching = false;

let filteredCountryList;
let searchResults;
let regionValue;
export const regionOptions = $All('[data-region]')

export function filterCountryData(arr) {
    const countryList = [];
    const filteredCountryRegions = returnRegions();

    for (let i = 0; i < arr.length; i++) {
        countryList.push(arr[i]);
    }

    regionOptions.forEach((region, index) => {
        region.addEventListener('click', () => {
            $('[data-country-cards]').innerHTML = "";
            regionValue = region.innerHTML;

            filteredCountryList = countryList
                .filter((country) => country
                    .region === `${filteredCountryRegions[index]}`);

            renderFilteredResults(filteredCountryList);

            filteredCountryList.length === 0 &&
                renderCountryData(null, 'filter404');

            sortCountryData(filteredCountryList);
            isFiltering = true;
        })
    })
    searchCountryData(countryList);
}

export function getRegions(arr) {
    const countryRegions = [];

    for (let i = 0; i < arr.length; i++) {
        countryRegions.push(arr[i].region);
    }

    const filteredCountryRegions =
        (() => countryRegions
            .filter((item, index) => countryRegions
                .indexOf(item) === index).sort())();

    return filteredCountryRegions;
}

function renderFilteredResults(data) {
    data.length < 8 ?
        renderResults(data, data.length) :
        renderResults(data, cardsPerScroll);
}

export const searchBar = $('[data-search]');
export const searchBtn = $('[data-search-btn]');

function searchCountryData(arr) {
    const searchInfo = $('[data-search-info]');

    searchBar.addEventListener('focus',
        () => searchInfo.innerHTML = "You can search in your native language");
    searchBar.addEventListener('blur',
        () => searchInfo.innerHTML = "");

    searchBtn.addEventListener('click', () => {
        startSearching(arr);
    });
    searchBar.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            startSearching(arr);
            searchBar.blur();
            returnClojure().resetScrolling();
        }
    })
}

function returnSearchResults(arr, searchTerm) {
    const searchResults = arr.filter((country) => [
        returnNestedData(country.name),
        country.region,
        country.capital,
        country.altSpellings,
        country.continents,
        country.tld,
        returnNestedData(country.translations),
        returnNestedData(country.languages),
        returnNestedData(country.demonyms)
    ].toString()
        .toLowerCase()
        .includes(searchTerm))

    return searchResults;
}

function startSearching(arr) {
    const searchValue = searchBar.value.trim().toLowerCase();
    const clearSearchBar = () => searchBar.value = "";
    searchResults = returnSearchResults(arr, searchValue);

    if (searchValue !== "") {
        $('[data-country-cards]').innerHTML = "";
        renderFilteredResults(searchResults);

        returnClojure().updateSearchData(searchResults);

        sortCountryData(searchResults);
        filterCountryData(searchResults);

        searchResults.length === 0 &&
            renderCountryData(null, 'search404');

        isSearching = true;
        isFiltering = false;
    }

    clearSearchBar();
}

export function returnNestedData(obj) {
    let nestedData = [];

    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            nestedData = nestedData.concat(returnNestedData(obj[key]));
        } else {
            nestedData.push(obj[key]);
        }
    }
    return nestedData;
}

export let checkTheFilter = () => isFiltering;
export let checkTheSearch = () => isSearching;

export let returnFilterData = () => filteredCountryList;
export let returnRegionValue = () => regionValue;