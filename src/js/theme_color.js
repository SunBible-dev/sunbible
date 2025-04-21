document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;

    // Function to apply theme colors
    function applyThemeColors(background, backgroundDark) {
        root.style.setProperty('--color-background', background);
        root.style.setProperty('--color-background-dark', backgroundDark);
    }

    // Function to save theme colors to local storage
    function saveThemeColors(background, backgroundDark) {
        localStorage.setItem('color-background', background);
        localStorage.setItem('color-background-dark', backgroundDark);
    }

    // Load saved theme colors from local storage
    const savedBackground = localStorage.getItem('color-background');
    const savedBackgroundDark = localStorage.getItem('color-background-dark');

    if (savedBackground && savedBackgroundDark) {
        applyThemeColors(savedBackground, savedBackgroundDark);
    }

    // Event listeners for theme buttons
    document.querySelector('#SETTINGS_COLOR button:nth-child(2)').addEventListener('click', () => {
        applyThemeColors('#00022C', '#FFFDD0'); // Cream theme
        saveThemeColors('#00022C', '#FFFDD0');
    });

    document.querySelector('#SETTINGS_COLOR button:nth-child(3)').addEventListener('click', () => {
        applyThemeColors('#003637', '#FFC8C8'); // Pink theme
        saveThemeColors('#003637', '#FFC8C8');
    });

    document.querySelector('#SETTINGS_COLOR button:nth-child(4)').addEventListener('click', () => {
        applyThemeColors('#333333', '#CCCCCC'); // Gray theme
        saveThemeColors('#333333', '#CCCCCC');
    });
});