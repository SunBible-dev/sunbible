// ✝️
// SUNBIBLE

// PLEASE KEEP THE FUCTIONS CLEARLY NAMED
// AND CONSOLE LOG EVERYTHING

// Function to fetch Bible data from IPFS
async function fetchBibleData(cid) {
    const url = `https://bafybeiddtdnmeha6kyusdxpabkjecaxfuiwke57hznv4o4vsrti5l5rqoa.ipfs.link/${cid}`;
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
    const chapterContainer = document.getElementById("SUNBIBLE_bible_book");
    chapterContainer.innerHTML = "";
    if (data && data.book && data.chapters) {
        bookElement.textContent = data.book;
        data.chapters.forEach(chapter => {
            const chapterDiv = document.createElement("div");
            chapterDiv.classList.add("SUNBIBLE_bible_book_chapter");
            chapterDiv.innerHTML = `<h1><span class="book_name">${data.book}</span> <span class="chapter_number">${chapter.chapter}</span></h1>` +
                chapter.verses.map(verse => 
                    `<p class="bible_book_chapter_verse"><span class="verse_number">${verse.verse}</span> <span class="verse_text">${verse.text}</span></p>`
                ).join('');
            chapterContainer.appendChild(chapterDiv);
        });
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

// Function to fetch and store Bible data from IPFS
async function fetchAndStoreBibleData() {
    const books = ["Genesis", "1Chronicles", "1Corinthians", "1John", "1Kings", "1Peter", "1Samuel", "1Thessalonians", "1Timothy", "2Chronicles", "2Corinthians", "2John", "2Kings", "2Peter", "2Samuel", "2Thessalonians", "2Timothy", "3John", "Acts", "Amos", "Books", "Colossians", "contents", "Daniel", "Deuteronomy", "Ecclesiastes", "Ephesians", "Esther", "Exodus", "Ezekiel", "Ezra", "Galatians", "Habakkuk", "Haggai", "Hebrews", "Hosea", "Isaiah", "James", "Jeremiah", "Job", "Joel", "John", "Jonah", "Joshua", "Jude", "Judges", "Lamentations", "Leviticus", "Luke", "Malachi", "Mark", "Matthew", "Micah", "Nahum", "Nehemiah", "Numbers", "Obadiah", "Philemon", "Philippians", "Proverbs", "Psalms", "Revelation", "Romans", "Ruth", "SongofSolomon", "Titus", "Zechariah", "Zephaniah"];
    const baseUrl = "https://bafybeiddtdnmeha6kyusdxpabkjecaxfuiwke57hznv4o4vsrti5l5rqoa.ipfs.w3s.link/";
    let allDownloaded = true;

    const downloadComplete = localStorage.getItem("downloadComplete");
    if (downloadComplete === "true") {
        console.log("Download already complete.");
        return;
    }

    for (const book of books) {
        const url = `${baseUrl}${book}.json`;
        try {
            console.log(`Fetching ${book} data from IPFS: ${url}`);
            const response = await fetch(url);
            const data = await response.json();
            localStorage.setItem(book, JSON.stringify(data));
            updateDownloadStatus(`${book} downloaded`);
            console.log(`${book} data stored in local storage.`);
        } catch (error) {
            console.error(`Error fetching ${book} data:`, error);
            allDownloaded = false;
        }
    }

    if (allDownloaded) {
        localStorage.setItem("downloadComplete", "true");
        updateDownloadStatus("Download complete");
        console.log("All books downloaded and stored successfully.");
    } else {
        updateDownloadStatus("Some books failed to download.");
        console.log("Some books failed to download.");
    }
}

// Function to initialize the app
async function initializeApp() {
    setupNavigation();
    await fetchAndStoreBibleData();
    const downloadComplete = localStorage.getItem("downloadComplete");
    if (downloadComplete === "true") {
        updateDownloadStatus("Download complete");
        const genesisData = JSON.parse(localStorage.getItem("Genesis"));
        loadBibleData(genesisData);
        showSection("SUNBIBLE_bible");
    } else {
        updateDownloadStatus("Download failed");
    }
    console.log("App initialized");
}

// Initialize the app on page load
window.onload = initializeApp;



// Function to load the last viewed book and chapter from local storage
function loadLastViewed() {
    const lastViewed = localStorage.getItem('lastViewed');
    if (lastViewed) {
        const { book, chapter } = JSON.parse(lastViewed);
        console.log(`Loading last viewed book: ${book}, chapter: ${chapter}`);
        // Logic to load the book and chapter
        loadBibleData({ book, chapters: [{ chapter }] });
    } else {
        console.log('No last viewed book found, loading Genesis.');
        // Logic to load Genesis
        loadBibleData({ book: 'Genesis', chapters: [{ chapter: 1 }] });
    }
}

// Function to save the current book and chapter to local storage
function saveCurrentView(book, chapter) {
    localStorage.setItem('lastViewed', JSON.stringify({ book, chapter }));
    console.log(`Saved current view: book ${book}, chapter ${chapter}`);
}

// Call the function to load the last viewed book on page load
document.addEventListener('DOMContentLoaded', loadLastViewed);


