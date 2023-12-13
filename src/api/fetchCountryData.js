const versionOfAPI = "v3.1"
const endpointOfAPI = `https://restcountries.com/${versionOfAPI}/all`;

async function fetchCountryData() {
    try {
        let responseArr = [];
        const response = await fetch(`${endpointOfAPI}`);

        if (response.ok) {
            responseArr = await response.json();
            const shuffledData = shuffleCountryData(responseArr);
            postMessage(shuffledData);
        } else {
            response.status >= 500
                && postMessage({ error: 'ServerError' });
            (response.status >= 400 && response.status < 500)
                && postMessage({ error: 'ClientError' });

            console.log(`Error: code ${response.status}`);
        }

    } catch (error) {
        if (error instanceof TypeError) {
            postMessage({ error: 'TypeError' });
            console.error('Error:', error.name, '-> Check the fetch URL or API version');
        } else {
            postMessage({ error: 'Misc' });
            console.error(error);
        }
    }
}

//algoritmo de ordernação aleatória fisher-yates 
function shuffleCountryData(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

addEventListener('message', () => {
    fetchCountryData();
})