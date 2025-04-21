document.addEventListener('DOMContentLoaded', function() {
    const fontSelect = document.getElementById('SETTINGS_FONT_select');
    const fonts = [
        { name: 'Arial', value: 'Arial, sans-serif' },
        { name: 'Times New Roman', value: '"Times New Roman", serif' },
        { name: 'Courier New', value: '"Courier New", monospace' },
        { name: 'Georgia', value: 'Georgia, serif' },
        { name: 'Verdana', value: 'Verdana, sans-serif' }
    ];

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
    });
});