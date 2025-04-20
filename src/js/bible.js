// ✝️
// SUNBIBLE

// PLEASE KEEP THE FUCTIONS CLEARLY NAMED
// AND CONSOLE LOG EVERYTHING

// Function to fetch Bible data from IPFS
async function fetchBibleData(cid) {
    const url = `https://w3s.link/ipfs/${cid}`;
    try {
        console.log(`Fetching Bible data from IPFS: ${url}`);
        const response = await fetch(url);
        const data = await response.json();
        console.log("Bible data fetched successfully:", data);
        return data;
    } catch (error) {
        console.error("Error fetching Bible data:", error);
        return null;
    }
}

// Function to update the download status
function updateDownloadStatus(status) {
    const statusElement = document.getElementById("DOWNOAD_status");
    statusElement.textContent = status;
    console.log("Download status updated:", status);
}

// Function to load Bible data into the UI
function loadBibleData(data) {
    const bookElement = document.getElementById("SUNBIBLE_bible_book_name");
    const chapterElement = document.querySelector(".SUNBIBLE_bible_book_chapter");
    if (data && data.book && data.chapters) {
        bookElement.textContent = data.book;
        const chapter = data.chapters[0]; // Load the first chapter
        chapterElement.innerHTML = chapter.verses.map(verse => 
            `<p class="bible_book_chapter_verse"><span class="verse_number">${verse.verse}</span> <span class="verse_text">${verse.text}</span></p>`
        ).join('');
        console.log("Bible data loaded into UI:", data);
    }
}

// Function to show a section and update URL parameters
function showSection(sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => section.style.display = "none");
    const activeSection = document.getElementById(sectionId);
    activeSection.style.display = "block";
    updateUrlParameters(sectionId);
    console.log(`Section displayed: ${sectionId}`);
}

// Function to update URL parameters
function updateUrlParameters(sectionId, book = "", chapter = "") {
    const url = new URL(window.location);
    url.searchParams.set("section", sectionId);
    if (book) url.searchParams.set("book", book);
    if (chapter) url.searchParams.set("chapter", chapter);
    window.history.pushState({}, '', url);
    console.log("URL parameters updated:", url.searchParams.toString());
}

// Function to handle navigation clicks
function setupNavigation() {
    document.querySelector(".BIBLE_loader").addEventListener("click", () => showSection("SUNBIBLE_bible"));
    document.querySelector(".NAV_loader").addEventListener("click", () => showSection("SUNBIBLE_CONTENTS"));
    document.querySelector(".THEME_loader").addEventListener("click", () => showSection("SUNBIBLE_theme"));
    console.log("Navigation setup complete");
}

// Function to initialize the app
async function initializeApp() {
    setupNavigation();
    const bibleData = await fetchBibleData("bafkreifdrb2imosam7cestlhegq3xizq63nic4mdkgwuprjtpuwrnrerdu");
    if (bibleData) {
        updateDownloadStatus("Download complete");
        loadBibleData(bibleData);
        showSection("SUNBIBLE_bible");
    } else {
        updateDownloadStatus("Download failed");
    }
    console.log("App initialized");
}

// Initialize the app on page load
window.onload = initializeApp;


