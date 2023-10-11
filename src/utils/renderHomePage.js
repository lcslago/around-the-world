import { fetchCountryData } from "../api/fetchCountryData.js";
import { renderCountryData } from "./../api/renderCountryData.js";
import { filterCountryData, checkTheFilter } from "./../api/filterCountryData.js";

export async function renderHomePage() {
    const responseArr = await fetchCountryData();

    const cardsPerScroll = 16;
    let currentPosition = 0;
    let currentBatch = cardsPerScroll;
    showCountryData(responseArr, currentPosition, currentBatch);
    filterCountryData(responseArr);

    infinityScrolling(
        responseArr,
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
