import { returnNestedData } from "../api/filterCountryData.js";
import { returnDataFetched } from "./renderHomePage.js";

export function renderOffcanvas(data, context) {
    let element;

    switch (context) {
        case 'card':
            element = document.querySelectorAll('[data-card]');
            break;
        case 'offcanvas':
            element = document.querySelectorAll('[data-country-borders]');
            break;
    }
    const offcanvas = document.querySelector('[data-offcanvas]');

    element.forEach((item, index) => {
        item.addEventListener('click', () => {

            const nativeName = returnNestedData(
                data[index].name.nativeName,
                (param) => { delete param.official }
            );
            const filteredNativeNames = nativeName
                .filter((item, index) => nativeName
                    .indexOf(item) === index);

            const countryName = data[index].name.common;
            const countryFlag = data[index].cca2.toLowerCase();

            const countryPop = data[index].population;
            const countryRegion = data[index].region;
            const countrySubRegion = data[index].subregion;
            const countryCapital = data[index].capital;
            const countryDomain = data[index].tld;
            const countryTimezone = data[index].timezones;

            const countryBorders = data[index].borders;

            const sortedBorders = countryBorders === undefined ?
                [] : countryBorders.sort((a, b) => a.localeCompare(b));

            const getBorderFlag = (border) =>
                getBordersData(returnDataFetched(), border)
                    .cca2.toLowerCase();

            const getBorderName = (border) =>
                getBordersData(returnDataFetched(), border)
                    .name.common;

            const countryLanguage = returnNestedData(data[index].languages);
            const countryCurrency = returnNestedData(
                data[index].currencies,
                (param) => { delete param.symbol }
            );

            const isUndefined = (data) => data === undefined;
            const multipleData = (data) => !isUndefined(data) && data.length > 1;

            offcanvas.innerHTML = "";
            offcanvas.innerHTML = ` 
                        <div class="offcanvas-header py-2 shadow-sm position-relative">
                                <div class="invisible-block btn-close opacity-0"></div>
                                <div class="offcanvas-title--container d-flex w-100 align-items-center gap-2">
                                    <h5 class="offcanvas-title fw-bold nunito-bolder fs-2" id="countryLabel">
                                        ${countryName}
                                    </h5>
                                </div>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        
                        <div class="offcanvas-body p-0 h-50">
                                <div class="offcanvas-info d-flex align-items-start w-100 gap-0 pt-3 py-2 container" style="height: 60%;">

                                    <div class="flag d-flex h-100 pb-3" style="width: 60%;">
                                        <div class="flag fi fi-${countryFlag}" style="width: 97.5%;"></div>
                                    </div>
                                    
                                    <div class="flag-info overflow-auto country-info p-1 ps-3 pe-3 rounded shadow">
                                        <ul class="list-unstyled w-100">
                                            <li class="py-1">
                                                <b>${multipleData(filteredNativeNames) ? "Native Names" : "Native Name"}:</b>
                                                ${filteredNativeNames.join(', ')}
                                            </li>
                                            <li class="py-1">
                                                <b>Population:</b>
                                                 ${new Intl.NumberFormat().format(countryPop)}
                                            </li>
                                            <li class="py-1"><b>Region: </b>${countryRegion}</li>
                                            <li class="py-1">
                                                <b>Sub Region: </b>
                                            ${isUndefined(countrySubRegion) ? "" : countrySubRegion}
                                            </li>
                                            <li class="py-1">
                                                <b>
                                                ${multipleData(countryCapital) ? "Capitals:" : "Capital:"}
                                                </b>
                                             ${isUndefined(countryCapital) ? "" : countryCapital.join(', ')}
                                             </li>
                                             <li class="py-1"><b>
                                                ${multipleData(countryDomain) ? "Top Level Domains" : "Top Level Domain"}:
                                            </b>
                                                ${isUndefined(countryDomain) ? "" : countryDomain.join(', ')}
                                            </li>
                                            <li class="py-1"><b>
                                                ${multipleData(countryCurrency) ? "Currencies" : "Currency"}:
                                            </b>
                                                ${isUndefined(countryCurrency) ? "" : countryCurrency.join(', ')}
                                            </li>
                                            <li class="py-1"><b>
                                                ${multipleData(countryLanguage) ? "Languages" : "Language"}: 
                                            </b>
                                                ${countryLanguage.join(', ')}
                                            </li>
                                            <li class="py-1"><b>
                                                ${multipleData(countryTimezone) ? "Timezones" : "Timezone"}: 
                                            </b>
                                                ${isUndefined(countryTimezone) ? "" : countryTimezone.join(', ')}
                                            </li>
                                        </ul>
                                            
                                    </div>
                                </div>
                                <div class="borders px-3 container d-flex align-items-start h-25 w-100 align-items-start gap-2">
                                    <div class="d-flex gap-2 flex-wrap" style="width: 100%;">
                                        <p class="m-0 fs-5 p-1"><b>${multipleData(sortedBorders) ? "Border Countries" : "Border Country"}:</b></p>
                                        ${isUndefined(sortedBorders) ? "" : sortedBorders.map(border => `
                                        <button class="border-btn rounded d-flex gap-2 align-items-center px-2 w-auto offcanvas-btn shadow"
                                        style="height: 38px;"
                                        data-country-borders>
                                            <div
                                                class="text-decoration-none
                                                fi fi-${getBorderFlag(border)}"></div>

                                            <p class="m-0">${getBorderName(border)}</p>
                                        </button>`).join('')}  
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
            const newData = !isUndefined(countryBorders) &&
                returnDataFetched()
                    .filter(country => countryBorders
                        .some(border => country.cca3.includes(border)));

            const newDataSorted = !isUndefined(countryBorders) &&
                newData.sort((a, b) => a.cca3.localeCompare(b.cca3));
            // console.log(newDataSorted);

            renderOffcanvas(newDataSorted, 'offcanvas');
        })
    })
}

function getBordersData(arr, item) {
    const countryResult = arr
        .find(country => country.cca3 === item);
    return countryResult ? countryResult : '';
}

export function createStateOffcanvas() {
    const bodyPage = document.querySelector('[data-country-cards]');
    bodyPage.addEventListener('click', event => {
        const cardClicked = event.target.closest('[data-card]');

        if (cardClicked) {
            const offcanvasInstace = document.querySelector('[data-offcanvas]');
            const offcanvasInstanceBS = bootstrap.Offcanvas.getInstance(offcanvasInstace);

            history.state === null &&
                history.pushState({ offcanvasOpened: true }, "offcanvas", './')

            window.addEventListener('popstate', () => {
                offcanvasInstanceBS.hide();
            })
        }
    })
}