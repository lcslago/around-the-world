import { returnRegionValue } from "./filterCountryData.js";

export function renderCountryData(data, type) {
    const bodyPage = document.querySelector('[data-country-cards]');
    const searchBar = document.querySelector('[data-search]');

    const resultErrorIcon = () => `
                            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" class="bi bi-x-circle p-2" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>`
    const resultErrorMessage = (message) => `
                            <div class="container d-flex flex-column text-center gap-1">
                                <h2 class="nunito-bolder">Result not found</h2>
                                <p class="col-lg-5 m-auto">
                                    ${message}
                                </p>
                            </div>`

    switch (type) {
        case 'card':
            const countryName = data.name.common;
            const countryPop = data.population;
            const countryRegion = data.region;
            const countryCapital = data.capital;
            const countryFlag = data.cca2.toLowerCase();

            const isUndefined = (data) => data === undefined;
            const multipleCapitals = () => !isUndefined(countryCapital) && countryCapital.length > 1;

            bodyPage.appendChild(document.createElement("div"))
                .innerHTML = `
                        <a href="/#/${countryName.toLowerCase().replaceAll(" ", "-")}" class="text-decoration-none" role="button" data-bs-toggle="offcanvas" data-bs-target="#countryOffcanvas" aria-controls="countryOffcanvas" data-card>
                            <div class="card country-card shadow border-0 col-sm-6 card-container">
                                <div class="card-img-top shadow-sm fi fi-${countryFlag} country-flag">
                                </div>
                                <div class="d-flex flex-column card-body">
                                    <span class="card-title nunito-bolder mb-3" data-card-title>
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

                        <div class="offcanvas offcanvas-end" tabindex="-1" id="countryOffcanvas" aria-labelledby="countryLabel" data-offcanvas>
                        </div>
                    `



            break;

        case 'search404':
            const divElement = bodyPage.appendChild(document.createElement("div"));
            divElement.classList.add("w-100");
            divElement.innerHTML = `
                    <div class="d-flex flex-column align-items-center gap-3 search-404">
                            ${resultErrorIcon()}
                            ${resultErrorMessage(`Your search - <strong>${searchBar.value}</strong> - did not match any country. Please, make sure all words are spelled correctly.`)}
                    </div>
                    `
            break;

        case 'filter404':
            const filterDivElement = bodyPage.appendChild(document.createElement("div"));
            filterDivElement.classList.add("w-100");
            filterDivElement.innerHTML = `
                    <div class="d-flex flex-column align-items-center gap-3 search-404">
                            ${resultErrorIcon()}
                            ${resultErrorMessage(`There was no country from <strong>${returnRegionValue()}</strong> in your search results.`)}
                        </div>
                    `
            break;
    }
}
