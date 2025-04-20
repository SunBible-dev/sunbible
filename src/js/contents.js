// ✝️
// SUNBIBLE
// CONTENTS


// Function to load and display contents
function loadContents() {
  const contentsData = localStorage.getItem('contents');
  if (contentsData) {
    const data = JSON.parse(contentsData);
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
        dropdownContent.appendChild(chapterLink);
      }

      bookDiv.appendChild(dropdownContent);
      contentsSection.appendChild(bookDiv);
    });
  } else {
    console.error('Error loading contents: Data not found in local storage');
  }
}

// Call the function to load contents on page load
document.addEventListener('DOMContentLoaded', loadContents);

