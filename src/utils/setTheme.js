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
            changeTheme("light");
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
        themeSelector.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"/>
        </svg>
        Dark Mode`;
        themeSelector.setAttribute("title", "Toggle Dark Mode");

    } else if (theme === "light") {
        themeSelector.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
        </svg>
        Light Mode`;
        themeSelector.setAttribute("title", "Toggle Light Mode");
    }
}