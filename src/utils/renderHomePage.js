import { renderCountryData } from "./../api/renderCountryData.js";
import { checkTheFilter, filterCountryData, regionOptions, returnFilterData } from "./../api/filterCountryData.js";
import { sortCountryData } from "../api/sortCountryData.js";

export const sortOptions = document.querySelectorAll('[data-sort-option]');

export async function renderHomePage() {
    let fetchWorker = new Worker('./src/api/fetchCountryData.js');
    fetchWorker.postMessage('fetch');

    fetchWorker.addEventListener('message', event => {
        let scrollClojure;

        scrollClojure = infinityScrolling(event.data);
        scrollClojure.startInfinityScrolling();

        [sortOptions, regionOptions].forEach(list => {
            list.forEach(option => {
                option.addEventListener('click', () => {
                    scrollClojure.resetScrolling();
                })
            })
        })

        filterCountryData(event.data);
        sortCountryData(event.data);
    })
}

const infinityScrolling = (arr) => {
    const cardsPerScroll = 8;
    let currentPosition = 0;
    let currentBatch = cardsPerScroll;

    let totalItems = arr.length;

    showCountryData(
        arr,
        currentPosition,
        currentBatch);

    const startInfinityScrolling = () => {
        window.addEventListener('scroll', () => {
            if (currentPosition <= totalItems) {
                if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 500) {
                    currentPosition += cardsPerScroll;
                    currentBatch += cardsPerScroll;

                    checkTheFilter() ?
                        showCountryData(returnFilterData(), currentPosition, currentBatch) :
                        showCountryData(arr, currentPosition, currentBatch);

                }
            }
        });
    }

    const resetScrolling = () => {
        currentPosition = 0;
        currentBatch = cardsPerScroll;
    }

    return { startInfinityScrolling, resetScrolling };
}

function showCountryData(arr, currentPosition, currentBatch) {
    const maxIndex = Math.min(currentBatch, arr.length);

    for (let index = currentPosition; index < maxIndex; index++) {
        renderCountryData(arr[index], 'card');
    }
}


