import { returnRegionValue } from "./filterCountryData.js";

export function renderCountryData(data, type) {
    const bodyPage = document.querySelector('[data-country-cards]');
    const searchBar = document.querySelector('[data-search]');

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
                    <div class="d-flex justify-content-left gap-lg-5 search-404">
                            <img src='./src/assets/img/search-off.svg' alt="Result not found" class="search-off-icon"/>
                            <div class="container d-flex flex-column justify-content-center">
                                <h2 class="nunito-bolder">Result not found</h2>
                                <hr class="col-lg-6">
                                <p class="col-lg-6">
                                    Your search - <strong>${searchBar.value}</strong> - did not match any country.
                                    Please, make sure all words are spelled correctly.
                                </p>
                            </div>
                    </div>
                    `
            break;

        case 'filter404':
            const filterDivElement = bodyPage.appendChild(document.createElement("div"));
            filterDivElement.classList.add("w-100");
            filterDivElement.innerHTML = `
                    < div class="d-flex justify-content-left gap-lg-5 search-404" >
                            <img src='./src/assets/img/search-off.svg' alt="Result not found" class="search-off-icon"/>
                            <div class="container d-flex flex-column justify-content-center">
                                <h2 class="nunito-bolder">Country not found</h2>
                                <hr class="col-lg-6">
                                <p class="col-lg-6">
                                    There was no country from <strong>${returnRegionValue()}</strong> in your search results.
                                </p>
                            </div>
                        </div >
                    `
            break;
    }
}
