import { renderHomePage } from "./utils/renderHomePage.js";
import { renderScrollUpButton } from "./utils/renderScrollUpButton.js";
import { setTheme } from "./utils/setTheme.js";

(() => {
    renderHomePage();
    setTheme();
    renderScrollUpButton();
})()