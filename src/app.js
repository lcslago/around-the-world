import { renderCountryData } from "./api/renderCountryData.js";
import { workerEventHandler } from "./utils/renderHomePage.js";
import { createStateOffcanvas } from "./utils/renderOffcanvas.js";
import { renderScrollUpButton } from "./utils/renderScrollUpButton.js";
import { setTheme } from "./utils/setTheme.js";

let fetchWorker = new Worker('./src/api/fetchCountryData.js');
fetchWorker.postMessage('fetch');

(() => {
    workerEventHandler(fetchWorker);
    setTheme();
    renderScrollUpButton();
    createStateOffcanvas();
})();

//lidando com erros de fetch
fetchWorker.onmessage = event => {
    const errorType = event.data.error;

    errorType === 'TypeError' && renderCountryData(null, 'typeError');
    errorType === 'Misc' && renderCountryData(null, 'miscError');
    errorType === 'ServerError' && renderCountryData(null, 'serverError');
    errorType === 'ClientError' && renderCountryData(null, 'clientError');
}