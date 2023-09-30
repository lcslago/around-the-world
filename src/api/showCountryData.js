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
        const multipleCapitals = () => {
            if (!isUndefined(countryCapital)) {
                return countryCapital.length > 1;
            }
        }

        bodyMain.appendChild(document.createElement("div"))
            .innerHTML = `
            <a href="#" class="text-decoration-none">
                <div class="card shadow border-0" style="width: 15rem; height: 22rem;">
                    <div class="card-img-top shadow-sm fi fi-${countryFlag}" style="background-size:100%; background-position:top; width:100%; height:179px;">
                    </div>
                    <div class="d-flex flex-column card-body">
                        <span class="card-title nunito-bolder mb-3">
                            ${countryName}
                        </span>
                        <span class="card-text" style="font-size: .9rem">
                            <b>Population:</b>
                            ${new Intl.NumberFormat().format(countryPop)}
                        </span>
                        <span class="card-text" style="font-size: .9rem">
                            <b>Region:</b>
                            ${countryRegion}
                        </span>
                        <span class="card-text" style="font-size: .9rem">
                            <b>${multipleCapitals() ? "Capitals:" : "Capital:"}</b>
                            ${isUndefined(countryCapital) ? "" : countryCapital.join(', ')}
                        </span>
                    </div>
                </div>
            </a>
        `
    }
}