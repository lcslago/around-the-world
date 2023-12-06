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