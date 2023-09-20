const bodyMain = document.querySelector('[data-body-main]');

const versionOfAPI = "v3.1"
const endpointOfAPI = `https://restcountries.com/${versionOfAPI}/`;

export async function showCountryData() {
    let responseArr = [];
    const response = (await fetch(`${endpointOfAPI}all`)).json();
    responseArr = await response;

    responseArr.forEach((_, index) => {

        const countryFlag = responseArr[index].flags.svg;
        const countryName = responseArr[index].name.common;
        const countryPop = responseArr[index].population;
        const countryRegion = responseArr[index].region;
        const countryCapital = responseArr[index].capital;

        const isUndefined = (data) => data === undefined;
        const multipleCapitals = () => {
            if (!isUndefined(countryCapital)) {
                return countryCapital.length > 1;
            }
        }

        bodyMain.appendChild(document.createElement("div"))
            .innerHTML = `
            <a href="#" class="text-decoration-none">
                <div class="card" style="width: 15rem; height: 20rem;">
                    <img src="${countryFlag}" class="card-img-top" style="height: 150px">
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
    })
}