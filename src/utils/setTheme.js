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
    window.addEventListener('pageshow', () => {
        localStorage !== "" ?
            changeTheme(localStorage.getItem("theme")) :
            pageBody.style.backgroundColor = "#F1EFEF";
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