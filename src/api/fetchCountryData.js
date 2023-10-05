const versionOfAPI = "v3.1"
const endpointOfAPI = `https://restcountries.com/${versionOfAPI}/`;

export async function fetchCountryData() {
    try {
        let responseArr = [];
        const response = (await fetch(`${endpointOfAPI}all`));
        responseArr = await response.json();

        return responseArr;

    } catch (error) {
        console.error('Error:', error);
    }
}