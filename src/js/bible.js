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
    const books = ["Genesis", "1Chronicles"];
    const baseUrl = "https://bafybeiddtdnmeha6kyusdxpabkjecaxfuiwke57hznv4o4vsrti5l5rqoa.ipfs.dweb.link/";
    let allDownloaded = true;

    for (const book of books) {
        const url = `${baseUrl}${book}.json`;
        try {
            console.log(`Fetching ${book} data from IPFS: ${url}`);
            const response = await fetch(url);
            const data = await response.json();
            localStorage.setItem(book, JSON.stringify(data));
            console.log(`${book} data stored in local storage.`);
        } catch (error) {
            console.error(`Error fetching ${book} data:`, error);
            allDownloaded = false;
        }
    }

    if (allDownloaded) {
        localStorage.setItem("downloadComplete", "true");
        console.log("All books downloaded and stored successfully.");
    } else {
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


