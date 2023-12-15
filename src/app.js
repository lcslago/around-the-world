import { renderCountryData } from "./api/renderCountryData.js";
import { workerEventHandler } from "./utils/renderHomePage.js";
import { createStateOffcanvas } from "./utils/renderOffcanvas.js";
import { renderScrollUpButton } from "./utils/renderScrollUpButton.js";
import { setTheme } from "./utils/setTheme.js";

//para o webpack
import './styles/main.css';
import * as bootstrap from './vendor/js/bootstrap.bundle.min.js';
window.bootstrap = bootstrap;

let fetchWorker = new Worker(new URL('./worker.js', import.meta.url));
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