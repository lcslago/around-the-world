import { renderCountryData } from "./../api/renderCountryData.js";

import {
    checkTheFilter,
    checkTheSearch,
    filterCountryData,
    getRegions,
    regionOptions,
    returnFilterData
} from "./../api/filterCountryData.js";

import { sortCountryData } from "../api/sortCountryData.js";
import { renderOffcanvas } from "./renderOffcanvas.js";

export const sortOptions = document.querySelectorAll('[data-sort-option]');
export let cardsPerScroll = setCardPerScroll();

let scrollClojure;
let countryRegionList;
let dataFetched;

export function workerEventHandler(worker) {
    worker.addEventListener('message', event => {
        dataFetched = event.data;
        renderHomePage(dataFetched);
    })
}

export function renderHomePage(data) {
    scrollClojure = infinityScrolling(data);
    scrollClojure.startInfinityScrolling();

    [sortOptions, regionOptions].forEach(list => {
        list.forEach(option => {
            option.addEventListener('click', () => {
                scrollClojure.resetScrolling();
            })
        })
    })

    countryRegionList = getRegions(data);
    filterCountryData(data);
    sortCountryData(data);
}

export let returnDataFetched = () => dataFetched;
export let returnRegions = () => countryRegionList;
export let returnClojure = () => scrollClojure;

const infinityScrolling = (arr) => {
    let currentPosition = 0;
    let currentBatch = cardsPerScroll;

    let searchResultsUpdated;

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

                    if (checkTheFilter()) {
                        showCountryData(returnFilterData(), currentPosition, currentBatch);
                    } else if (checkTheSearch()) {
                        showCountryData(searchResultsUpdated, currentPosition, currentBatch);
                    } else {
                        showCountryData(arr, currentPosition, currentBatch);
                    }
                }
            }
        });
    }

    const resetScrolling = () => {
        currentPosition = 0;
        currentBatch = cardsPerScroll;
    }

    const updateSearchData = (newData) => {
        searchResultsUpdated = newData;
    }

    return { startInfinityScrolling, resetScrolling, updateSearchData };
}

function showCountryData(arr, currentPosition, currentBatch) {
    const maxIndex = Math.min(currentBatch, arr.length);

    for (let index = currentPosition; index < maxIndex; index++) {
        renderCountryData(arr[index], 'card');
    }
    renderOffcanvas(arr, 'card');
}

function setCardPerScroll() {
    const desktopWidth = 1440;
    const tabletWidth = 768;
    const mobileWidth = 320;

    if (window.innerWidth >= mobileWidth && window.innerWidth < tabletWidth) {
        return 2;
    } else if (window.innerWidth >= tabletWidth && window.innerWidth < desktopWidth) {
        return 8;
    } else if (window.innerWidth >= desktopWidth) {
        return 20;
    }
}

const styleDropdown = (() => {
    const dropdowns = document.querySelectorAll('[data-dropdown-container]');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('shown.bs.dropdown', () => {
            dropdown.classList.add("dropdown-menu-active");
        })

        dropdown.addEventListener('hide.bs.dropdown', () => {
            dropdown.classList.remove("dropdown-menu-active");
        })
    })
})();
