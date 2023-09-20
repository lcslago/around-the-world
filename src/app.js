import { showCountryData } from "./api/showCountryData.js";
import { setTheme } from "./utils/setTheme.js";

(() => {
    showCountryData();
    setTheme();
})()