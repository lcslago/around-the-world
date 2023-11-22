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
            const sortedBorders = countryBorders.sort((a, b) => a.localeCompare(b));

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
                        <div class="offcanvas-header py-2">
                                <div class="d-flex align-items-center gap-2">
                                    <h5 class="offcanvas-title fw-bold nunito-bolder fs-2" id="countryLabel">
                                        ${countryName}
                                    </h5>
                                </div>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        
                        <div class="offcanvas-body p-0 h-50">
                                <div class="d-flex align-items-start w-100" style="height: 60%;">

                                    <div class="d-flex w-100 h-100 gap-3 pb-3">
                                        <div class="w-100 fi fi-${countryFlag}"></div>

                                    </div>
                                    
                                    <div class="w-50 h-100">
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
                                        </ul>

                                        <ul class="list-unstyled w-100">
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
                                                ${multipleData(countryTimezone) ? "Timezones" : "Timezone"}: 
                                            </b>
                                                ${isUndefined(countryTimezone) ? "" : countryTimezone.join(', ')}
                                            </li>
                                            <li class="py-1"><b>
                                                ${multipleData(countryLanguage) ? "Languages" : "Language"}: 
                                            </b>
                                                ${countryLanguage.join(', ')}
                                            </li>
                                        </ul>    
                                    </div>
                                </div>
                                <div class="px-3 container d-flex align-items-start h-25 w-100 align-items-start gap-2">
                                    <div class="d-flex gap-2 flex-wrap" style="width: 65%;">
                                    <p class="m-0 fs-5 p-1"><b>Border Countries:</b></p>
                                        ${isUndefined(sortedBorders) ? "" : sortedBorders.map(border => `
                                        <div class="btn d-flex gap-1 align-items-center px-1 w-auto"
                                        data-country-borders>
                                            <div
                                                href="#" 
                                                class="text-decoration-none
                                                fi fi-${getBorderFlag(border)}"></div>

                                            <p class="m-0">${getBorderName(border)}</p>
                                        </div>`).join('')}  
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
            const newData = !isUndefined(countryBorders) &&
                returnDataFetched()
                    .filter(country => countryBorders
                        .some(border => country.cca3.includes(border)));

            // const newDataSorted = newData.sort((a, b) => a.cca3.localeCompare(b.cca3));
            // console.log(newDataSorted);

            renderOffcanvas(newData, 'offcanvas');
        })
    })
}

function getBordersData(arr, item) {
    const countryResult = arr
        .find(country => country.cca3 === item);
    return countryResult ? countryResult : '';
}