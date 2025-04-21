document.addEventListener('DOMContentLoaded', function() {
    const fontSelect = document.getElementById('SETTINGS_FONT_select');
    const fonts = [
        { name: 'Arial', value: 'Arial, sans-serif' },
        { name: 'Times New Roman', value: '"Times New Roman", serif' },
        { name: 'Courier New', value: '"Courier New", monospace' },
        { name: 'Georgia', value: 'Georgia, serif' },
        { name: 'Verdana', value: 'Verdana, sans-serif' },
        { name: 'Helvetica', value: 'Helvetica, sans-serif' },
        { name: 'Tahoma', value: 'Tahoma, sans-serif' },
        { name: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
        { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive, sans-serif' }
    ];

    const fontSizeRange = document.getElementById('fontSizeRange');
    const resetButton = document.getElementById('SETTINGS_FONT_reset');

    // Populate the dropdown with font options
    fonts.forEach(font => {
        const option = document.createElement('option');
        option.value = font.value;
        option.textContent = font.name;
        fontSelect.appendChild(option);
    });

    // Apply the selected font
    fontSelect.addEventListener('change', function() {
        const selectedFont = fontSelect.value;
        document.documentElement.style.setProperty('--font-family', selectedFont);
        document.documentElement.style.setProperty('--header-font-family', selectedFont);
        localStorage.setItem('selectedFont', selectedFont);
        console.log(`Font changed to: ${selectedFont}`);
    });

    // Apply the selected font size with debounce
    fontSizeRange.addEventListener('input', debounce(function() {
        const fontSize = fontSizeRange.value + 'px';
        document.documentElement.style.setProperty('--font-size', fontSize);
        localStorage.setItem('fontSize', fontSize);
        console.log(`Font size changed to: ${fontSize}`);
    }, 300));

    // Reset font settings
    resetButton.addEventListener('click', function() {
        const defaultFont = fonts[0].value;
        const defaultFontSize = '20px';
        document.documentElement.style.setProperty('--font-family', defaultFont);
        document.documentElement.style.setProperty('--header-font-family', defaultFont);
        document.documentElement.style.setProperty('--font-size', defaultFontSize);
        fontSelect.value = defaultFont;
        fontSizeRange.value = 20;
        localStorage.removeItem('selectedFont');
        localStorage.removeItem('fontSize');
        console.log('Font settings reset to default');
    });

    // Load saved settings
    window.addEventListener('DOMContentLoaded', function() {
        const savedFont = localStorage.getItem('selectedFont');
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFont) {
            document.documentElement.style.setProperty('--font-family', savedFont);
            document.documentElement.style.setProperty('--header-font-family', savedFont);
            fontSelect.value = savedFont;
        }
        if (savedFontSize) {
            document.documentElement.style.setProperty('--font-size', savedFontSize);
            fontSizeRange.value = parseInt(savedFontSize);
        }
    });
});


function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}