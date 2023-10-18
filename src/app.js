import { renderHomePage, renderScrollUpButton } from "./utils/renderHomePage.js";
import { setTheme } from "./utils/setTheme.js";

(() => {
    renderHomePage();
    setTheme();
    renderScrollUpButton();
})()