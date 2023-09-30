import { fetchCountryData } from "./api/fetchCountryData.js";
import { setTheme } from "./utils/setTheme.js";

(() => {
    fetchCountryData();
    setTheme();
})()