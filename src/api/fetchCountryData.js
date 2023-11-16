const versionOfAPI = "v3.1"
const endpointOfAPI = `https://restcountries.com/${versionOfAPI}/`;

async function fetchCountryData() {
    try {
        let responseArr = [];
        const response = (await fetch(`${endpointOfAPI}all`));
        responseArr = await response.json();

        const shuffledData = shuffleCountryData(responseArr);
        postMessage(shuffledData);

    } catch (error) {
        console.error('Error:', error);
    }
}

//algoritmo de ordernação aleatória fisher-yates 
function shuffleCountryData(arr) {
    const newDate = new Date();
    const twentyFourHours = 86400000;
    let timeInterval = newDate.getTime() + twentyFourHours;

    if (newDate.getTime() >= timeInterval) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        timeInterval = newDate.getTime() + twentyFourHours;
    }
    return arr;
}

addEventListener('message', () => {
    fetchCountryData();
})