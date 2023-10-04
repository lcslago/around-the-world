const $ = document.querySelector.bind(document);
const themeSelector = $('[data-theme]');
const pageBody = $('[data-body-main]');

export const setTheme = () => {
    onPageShow();

    themeSelector.addEventListener('click', () => {
        themeSelector.innerHTML.includes("Dark Mode") ? changeTheme("dark") : changeTheme("light");
        let themeData = document.documentElement.attributes[2].nodeValue;
        localStorage.setItem("theme", `${themeData}`);
    });
}

function onPageShow() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    window.addEventListener('pageshow', () => {
        if (savedTheme) {
            changeTheme(savedTheme)
        } else if (prefersDark) {
            changeTheme("dark")
        } else {
            pageBody.style.backgroundColor = "#F1EFEF";
        }
    })
}

function changeTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    theme === "dark" ? setThemeButton("light") : setThemeButton("dark");
}

function setThemeButton(theme) {
    const moonIcon = "🌚";
    const sunIcon = "🌝";

    if (theme === "dark") {
        themeSelector.innerHTML = `${moonIcon} Dark Mode`;
        themeSelector.setAttribute("title", "Toggle Dark Mode");

    } else if (theme === "light") {
        themeSelector.innerHTML = `${sunIcon} Light Mode`;
        themeSelector.setAttribute("title", "Toggle Light Mode");
    }
}