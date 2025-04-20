// ✝️
// SUNBIBLE
// CONTENTS


// Function to load and display contents
function loadContents() {
  const contentsData = localStorage.getItem('contents');
  if (!contentsData) {
    // Create default contents data for Bible books
    const defaultBooks = ["Genesis", "1Chronicles", "1Corinthians", "1John", "1Kings", "1Peter", "1Samuel", "1Thessalonians", "1Timothy", "2Chronicles", "2Corinthians", "2John", "2Kings", "2Peter", "2Samuel", "2Thessalonians", "2Timothy", "3John", "Acts", "Amos", "Books", "Colossians", "Daniel", "Deuteronomy", "Ecclesiastes", "Ephesians", "Esther", "Exodus", "Ezekiel", "Ezra", "Galatians", "Habakkuk", "Haggai", "Hebrews", "Hosea", "Isaiah", "James", "Jeremiah", "Job", "Joel", "John", "Jonah", "Joshua", "Jude", "Judges", "Lamentations", "Leviticus", "Luke", "Malachi", "Mark", "Matthew", "Micah", "Nahum", "Nehemiah", "Numbers", "Obadiah", "Philemon", "Philippians", "Proverbs", "Psalms", "Revelation", "Romans", "Ruth", "SongofSolomon", "Titus", "Zechariah", "Zephaniah"];
    const contentsData = {
      books: defaultBooks.map((name, id) => ({
        id: id + 1,
        name: name,
        chapters: 150 // Set a large enough number to cover all possible chapters
      }))
    };
    localStorage.setItem('contents', JSON.stringify(contentsData));
  }

  try {
    const data = JSON.parse(contentsData || localStorage.getItem('contents'));
    const contentsSection = document.getElementById('SUNBIBLE_CONTENTS');
    contentsSection.innerHTML = '<h1>CONTENTS</h1>'; // Clear existing contents

    data.books.sort((a, b) => a.id - b.id).forEach(book => {
      const bookName = book.name.replace(/\s+/g, ''); // Remove spaces
      const bookDiv = document.createElement('div');
      bookDiv.className = 'CONTENTS_dropdown';

      const button = document.createElement('button');
      button.className = 'dropbtn book_link';
      button.textContent = bookName;
      bookDiv.appendChild(button);

      const dropdownContent = document.createElement('div');
      dropdownContent.className = 'CONTENTS_dropdown-content';

      for (let i = 1; i <= book.chapters; i++) {
        const chapterLink = document.createElement('a');
        chapterLink.className = 'chapter_link';
        chapterLink.textContent = `${i}`;
        chapterLink.href = `?section=SUNBIBLE_bible&book=${bookName}&chapter=${i}`;
        chapterLink.addEventListener('click', (e) => {
          e.preventDefault();
          saveCurrentView(bookName, i);
          loadBibleContent(bookName, i);
          showSection('SUNBIBLE_bible');
        });
        dropdownContent.appendChild(chapterLink);
      }

      bookDiv.appendChild(dropdownContent);
      contentsSection.appendChild(bookDiv);
    });
  } catch (error) {
    console.error('Error loading contents:', error);
  }
}

// Call the function to load contents on page load
document.addEventListener('DOMContentLoaded', loadContents);

