import { renderCountryData } from "./renderCountryData.js";

let isFiltering = false;

export function filterCountryData(arr) {
    const $ = document.querySelector.bind(document);
    const $All = document.querySelectorAll.bind(document);

    const numberOfContinents = 6;

    const countryRegions = [];
    const countryList = [];

    for (let i = 0; i < arr.length; i++) {
        countryRegions.push(arr[i].region);
        countryList.push(arr[i]);
    }
    const filteredCountryRegions = countryRegions
        .filter((item, index) => countryRegions
            .indexOf(item) === index).sort()


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
                .filter((country) => country.region === `${filteredCountryRegions[index]}`);

            filteredCountryList.forEach(country => {
                const countryName = country.name.common;
                const countryPop = country.population;
                const countryRegion = country.region;
                const countryCapital = country.capital;
                const countryFlag = country.cca2.toLowerCase();

                renderCountryData(countryName, countryPop, countryRegion, countryCapital, countryFlag);
            })
            // console.log(filteredCountryList.length);
            isFiltering = true;
        })
    })
}

export let checkTheFilter = () => isFiltering;