import { fetchCountryData } from "../api/fetchCountryData.js";
import { renderCountryData } from "./../api/renderCountryData.js";
import { filterCountryData, checkTheFilter } from "./../api/filterCountryData.js";

export async function renderHomePage() {
    const responseArr = await fetchCountryData();
    const sortedData = shuffleCountryData(responseArr);

    const cardsPerScroll = 16;
    let currentPosition = 0;
    let currentBatch = cardsPerScroll;
    showCountryData(sortedData, currentPosition, currentBatch);
    filterCountryData(sortedData);

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

export function renderScrollUpButton() {
    window.addEventListener('scroll', () => {
        const scrollUpButton = document.querySelector('[data-scroll-up]');

        window.scrollY === 0 ?
            scrollUpButton.hidden = true :
            scrollUpButton.hidden = false;

        scrollUpButton.addEventListener('click', () => {
            window.scrollBy({
                top: -window.innerHeight - 1000000,
                behavior: "instant"
            })
        })
    });
}

//algoritmo de ordernação aleatória fisher-yates 
function shuffleCountryData(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
