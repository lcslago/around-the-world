const bodyMain = document.querySelector('[data-body-main]');

export function showCountryData(arr, currentPosition, currentBatch) {
    const maxIndex = Math.min(currentBatch, arr.length);

    for (let index = currentPosition; index < maxIndex; index++) {

        const countryName = arr[index].name.common;
        const countryPop = arr[index].population;
        const countryRegion = arr[index].region;
        const countryCapital = arr[index].capital;
        const countryFlag = arr[index].cca2.toLowerCase();

        const isUndefined = (data) => data === undefined;
        const multipleCapitals = () => !isUndefined(countryCapital) && countryCapital.length > 1;

        bodyMain.appendChild(document.createElement("div"))
            .innerHTML = `
            <a href="#" class="text-decoration-none">
                <div class="card country-card shadow border-0 col-sm-6 card-container">
                    <div class="card-img-top shadow-sm fi fi-${countryFlag} country-flag">
                    </div>
                    <div class="d-flex flex-column card-body">
                        <span class="card-title nunito-bolder mb-3">
                            ${countryName}
                        </span>
                        <span class="card-text">
                            <b>Population:</b>
                            ${new Intl.NumberFormat().format(countryPop)}
                        </span>
                        <span class="card-text">
                            <b>Region:</b>
                            ${countryRegion}
                        </span>
                        <span class="card-text">
                            <b>${multipleCapitals() ? "Capitals:" : "Capital:"}</b>
                            ${isUndefined(countryCapital) ? "" : countryCapital.join(', ')}
                        </span>
                    </div>
                </div>
            </a>
        `
    }
}
