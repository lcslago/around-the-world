import { showCountryData } from "./showCountryData.js";
const countryDataFilter = document.querySelectorAll('[data-filter]');

const versionOfAPI = "v3.1"
const endpointOfAPI = `https://restcountries.com/${versionOfAPI}/`;

export async function fetchCountryData() {
    try {
        let responseArr = [];
        const response = (await fetch(`${endpointOfAPI}all`));
        responseArr = await response.json();
        countryDataFilter.forEach(filter => filter.hidden = false);

        const cardsPerScroll = 16;
        let currentPosition = 0;
        let currentBatch = cardsPerScroll;
        showCountryData(responseArr, currentPosition, currentBatch);

        /* infinity scrolling */
        window.addEventListener('scroll', () => {
            if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 500) {
                currentPosition = currentPosition += cardsPerScroll;
                currentBatch = currentBatch += cardsPerScroll;
                showCountryData(responseArr, currentPosition, currentBatch);
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }

}