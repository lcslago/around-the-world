import { renderCountryData } from "./renderCountryData.js";

export function showCountryData(arr, currentPosition, currentBatch) {
    const maxIndex = Math.min(currentBatch, arr.length);

    for (let index = currentPosition; index < maxIndex; index++) {

        const countryName = arr[index].name.common;
        const countryPop = arr[index].population;
        const countryRegion = arr[index].region;
        const countryCapital = arr[index].capital;
        const countryFlag = arr[index].cca2.toLowerCase();

        renderCountryData(countryName, countryPop, countryRegion, countryCapital, countryFlag);
    }
}
