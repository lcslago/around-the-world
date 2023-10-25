import { fetchCountryData } from "../api/fetchCountryData.js";
import { renderCountryData } from "./../api/renderCountryData.js";
import { filterCountryData, checkTheFilter } from "./../api/filterCountryData.js";
import { sortCountryData } from "../api/sortCountryData.js";

export async function renderHomePage() {
    const responseArr = await fetchCountryData();
    const sortedData = shuffleCountryData(responseArr);

    const cardsPerScroll = 8;
    let currentPosition = 0;
    let currentBatch = cardsPerScroll;
    showCountryData(sortedData, currentPosition, currentBatch);
    filterCountryData(sortedData);
    sortCountryData(sortedData);

    infinityScrolling(
        sortedData,
        currentPosition,
        currentBatch,
        cardsPerScroll);
}

function infinityScrolling(arr, currentPosition, currentBatch, cardsPerScroll) {
    window.addEventListener('scroll', () => {
        if (!checkTheFilter()) {
            if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 500) {
                currentPosition = currentPosition += cardsPerScroll;
                currentBatch = currentBatch += cardsPerScroll;
                showCountryData(arr, currentPosition, currentBatch);
            }
        }
    });
}

function showCountryData(arr, currentPosition, currentBatch) {
    const maxIndex = Math.min(currentBatch, arr.length);

    for (let index = currentPosition; index < maxIndex; index++) {
        renderCountryData(arr[index], 'card');
    }
}

//algoritmo de ordernação aleatória fisher-yates 
function shuffleCountryData(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
