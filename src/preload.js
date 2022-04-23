const storageKey = "theme-preference";
console.log("FIRST LOAD?");
window.theme = {
    value: getColorPreference(),
    setTheme: setTheme
};

function setTheme() {
    window.theme.value = window.theme.value === "light"
        ? "dark"
        : "light";
    setPreference();
}

function setPreference() {
    localStorage.setItem(storageKey, window.theme.value);
    reflectPreference();
}

function getColorPreference() {
    if(localStorage.getItem(storageKey)) {
        return localStorage.getItem(storageKey);
    } else {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }
}

function reflectPreference() {
    document.firstElementChild.setAttribute("data-theme", window.theme.value);
}

reflectPreference();