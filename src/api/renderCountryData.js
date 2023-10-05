export function renderCountryData(data) {
    const bodyPage = document.querySelector('[data-country-cards]');

    const countryName = data.name.common;
    const countryPop = data.population;
    const countryRegion = data.region;
    const countryCapital = data.capital;
    const countryFlag = data.cca2.toLowerCase();

    const isUndefined = (data) => data === undefined;
    const multipleCapitals = () => !isUndefined(countryCapital) && countryCapital.length > 1;

    bodyPage.appendChild(document.createElement("div"))
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