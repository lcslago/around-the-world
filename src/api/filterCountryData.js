import { renderCountryData } from "./renderCountryData.js";

const $ = document.querySelector.bind(document);
const $All = document.querySelectorAll.bind(document);

let isFiltering = false;

export function filterCountryData(arr) {

    const numberOfContinents = 6;
    const countryRegions = [];
    const countryList = [];

    for (let i = 0; i < arr.length; i++) {
        countryRegions.push(arr[i].region);
        countryList.push(arr[i]);
    }
    const filteredCountryRegions =
        (() => countryRegions.filter((item, index) => countryRegions
            .indexOf(item) === index).sort())()

    for (let i = 0; i < numberOfContinents; i++) {
        $('[data-regions]').appendChild(document.createElement("li"))
            .innerHTML = `<button class="dropdown-item" data-region>
                    ${filteredCountryRegions[i]}
                </button>`
    }

    $All('[data-region]').forEach((region, index) => {
        region.addEventListener('click', () => {
            $('[data-country-cards]').innerHTML = "";

            const filteredCountryList = countryList
                .filter((country) => country
                    .region === `${filteredCountryRegions[index]}`);

            filteredCountryList
                .forEach(country => renderCountryData(country, 'card'));

            isFiltering = true;
        })
    })
    searchCountryData(countryList);
}

const searchBar = $('[data-search]');
function searchCountryData(arr) {
    const searchBtn = $('[data-search-btn]');
    const searchInfo = $('[data-search-info]');

    searchBar.addEventListener('focus',
        () => searchInfo.innerHTML = "You can search in your native language");
    searchBar.addEventListener('blur',
        () => searchInfo.innerHTML = "");

    searchBtn.addEventListener('click', () => startSearching(arr));
    searchBar.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            startSearching(arr);
            searchBar.blur();
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
    let searchResults = returnSearchResults(arr, searchValue);
    const clearSearchBar = () => searchBar.value = "";
    let isSearching = false;

    if (searchValue !== "") {
        $('[data-country-cards]').innerHTML = "";
        searchResults.forEach(result => {
            renderCountryData(result, 'card');
        });

        searchResults.length === 0 &&
            renderCountryData(null, 'search404');

        isFiltering = true;
        isSearching = true;
    } else {
        isSearching ? isFiltering = true : isFiltering = false;
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