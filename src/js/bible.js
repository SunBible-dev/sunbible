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
            if (chapter) {
                const chapterDiv = document.createElement("div");
                chapterDiv.classList.add("SUNBIBLE_bible_book_chapter");
                chapterDiv.innerHTML = `<h1><span class="book_name">${data.book}</span> <span class="chapter_number">${chapter.chapter}</span></h1>` +
                    (chapter.verses ? chapter.verses.map(verse => 
                        `<p class="bible_book_chapter_verse"><span class="verse_number">${verse.verse}</span> <span class="verse_text">${verse.text}</span></p>`
                    ).join('') : '');
                chapterContainer.appendChild(chapterDiv);
            }
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

// Function to load Bible content from local storage
function loadBibleContent(bookName, chapterNum) {
    try {
        console.log(`Attempting to load ${bookName} from localStorage`);
        const storedData = localStorage.getItem(bookName);
        if (!storedData) {
            console.error(`${bookName} not found in localStorage`);
            return;
        }
        const bookData = JSON.parse(storedData);
        console.log(`Parsed book data:`, bookData);
        
        if (bookData && bookData.chapters) {
            const chapterData = bookData.chapters.find(chap => chap.chapter === chapterNum.toString());
            if (chapterData) {
                loadBibleData({ book: bookName, chapters: [chapterData] });
                saveCurrentView(bookName, chapterNum);
                updateUrlParameters('SUNBIBLE_bible', bookName, chapterNum);
                console.log(`Successfully loaded ${bookName} chapter ${chapterNum} from local storage`);
            } else {
                console.error(`Chapter ${chapterNum} not found in ${bookName}`);
            }
        } else {
            console.error(`Invalid book data structure for ${bookName}`);
        }
    } catch (error) {
        console.error(`Error loading Bible content for ${bookName}:`, error);
    }
}

// Function to initialize the app
async function initializeApp() {
    setupNavigation();
    let downloadComplete = localStorage.getItem("downloadComplete");
    
    if (downloadComplete !== "true") {
        showSection('FIRST_TIME_DOWNLOAD');
        await fetchAndStoreBibleData();
        downloadComplete = localStorage.getItem("downloadComplete");
    }

    if (downloadComplete === "true") {
        updateDownloadStatus("Download complete");
        document.getElementById('FIRST_TIME_DOWNLOAD').style.display = 'none';
        
        // Check URL parameters first, then localStorage, then default to Genesis 1
        const urlParams = new URLSearchParams(window.location.search);
        const section = urlParams.get('section') || 'SUNBIBLE_bible';
        const book = urlParams.get('book') || localStorage.getItem('currentBook') || 'Genesis';
        const chapter = parseInt(urlParams.get('chapter') || localStorage.getItem('currentChapter') || '1');
        
        showSection(section);
        if (section === 'SUNBIBLE_bible') {
            loadBibleContent(book, chapter);
            saveCurrentView(book, chapter);
            updateUrlParameters(section, book, chapter);
            console.log(`App initialized with ${book} chapter ${chapter}`);
        } else {
            updateUrlParameters(section);
        }
    } else {
        updateDownloadStatus("Download failed");
        showSection('FIRST_TIME_DOWNLOAD');
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

function saveCurrentView(bookName, chapter) {
  localStorage.setItem('currentBook', bookName);
  localStorage.setItem('currentChapter', chapter);
}


