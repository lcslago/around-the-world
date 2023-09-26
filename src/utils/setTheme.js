const themeSelector = document.querySelector('[data-theme]');
const pageBody = document.querySelector('[data-body-main]');

export const setTheme = () => {
    onPageShow();

    themeSelector.addEventListener('click', () => {
        themeSelector.innerHTML === "Dark Mode" ? changeTheme("dark") : changeTheme("light");
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

    if (theme === "dark") {
        themeSelector.innerHTML = "Light Mode";
        pageBody.style.backgroundColor = "#191717";
    } else {
        themeSelector.innerHTML = "Dark Mode";
        pageBody.style.backgroundColor = "#F1EFEF";
    }
}