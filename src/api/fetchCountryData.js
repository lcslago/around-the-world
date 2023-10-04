import { showCountryData } from "./showCountryData.js";
import { filterCountryData } from "./filterCountryData.js";
import { checkTheFilter } from "./filterCountryData.js";

const versionOfAPI = "v3.1"
const endpointOfAPI = `https://restcountries.com/${versionOfAPI}/`;

export async function fetchCountryData() {
    try {
        let responseArr = [];
        const response = (await fetch(`${endpointOfAPI}all`));
        responseArr = await response.json();

        const cardsPerScroll = 16;
        let currentPosition = 0;
        let currentBatch = cardsPerScroll;
        showCountryData(responseArr, currentPosition, currentBatch);
        filterCountryData(responseArr);

        /* infinity scrolling */
        window.addEventListener('scroll', () => {
            if (checkTheFilter() === false) {
                if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 500) {
                    currentPosition = currentPosition += cardsPerScroll;
                    currentBatch = currentBatch += cardsPerScroll;
                    showCountryData(responseArr, currentPosition, currentBatch);
                }
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }

}