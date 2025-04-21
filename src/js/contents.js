// ✝️
// SUNBIBLE
// CONTENTS


// Function to load and display contents
function loadContents() {
  const contentsData = localStorage.getItem('contents');
  if (!contentsData) {
    // Fetch the contents.json file
    fetch('https://bafybeiddtdnmeha6kyusdxpabkjecaxfuiwke57hznv4o4vsrti5l5rqoa.ipfs.w3s.link/contents.json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('contents', JSON.stringify(data));
        displayContents(data);
      })
      .catch(error => {
        console.error('Error fetching contents:', error);
      });
    return;
  }

  try {
    const data = JSON.parse(contentsData || localStorage.getItem('contents'));
    const contentsSection = document.getElementById('SUNBIBLE_CONTENTS');
    contentsSection.innerHTML = '<h1>CONTENTS</h1>'; // Clear existing contents

    displayContents(data);
  } catch (error) {
    console.error('Error loading contents:', error);
  }
}

// Function to display contents
function displayContents(data) {
  try {
    const contentsSection = document.getElementById('SUNBIBLE_CONTENTS');
    contentsSection.innerHTML = '<h1>CONTENTS</h1>'; // Clear existing contents

    data.books.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'CONTENTS_dropdown';

      const button = document.createElement('button');
      button.className = 'dropbtn book_link';
      // Keep display name with spaces
      button.textContent = book.name;
      bookDiv.appendChild(button);

      const dropdownContent = document.createElement('div');
      dropdownContent.className = 'CONTENTS_dropdown-content';

      for (let i = 1; i <= book.chapters; i++) {
        const chapterLink = document.createElement('a');
        chapterLink.className = 'chapter_link';
        chapterLink.textContent = `${i}`;
        // Remove spaces for storage operations
        const storageBookName = book.name.replace(/\s+/g, '');
        chapterLink.href = `?section=SUNBIBLE_bible&book=${storageBookName}&chapter=${i}`;
        chapterLink.addEventListener('click', (e) => {
          e.preventDefault();
          saveCurrentView(storageBookName, i);
          loadBibleContent(storageBookName, i);
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

