document.addEventListener('DOMContentLoaded', () => {
  fetchAllBooks();
});

async function fetchAllBooks() {
  try {
    const response = await fetch("/books");
    const data = await response.json();
    const books = data;
    console.log(books);
    if (response.ok) {
      const container = document.getElementById("booksList");
      if (!books || books.length === 0) {
        container.innerHTML = "<p>No books found.</p>";
        return;
      }
      books.forEach((book) => {
        const div = document.createElement("div");
        div.classList.add("book-item");

        // Format genres
        const genres = book.genres ? book.genres.join(", ") : "N/A";
        div.addEventListener("click", async () => {
          showPopup(book);
        });
        // Book item content
        div.innerHTML = `
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author"><strong>Author:</strong> ${book.author}</p>
          <p class="book-genres"><strong>Genres:</strong> ${genres}</p>
        `;

        container.appendChild(div);
      });
    }
  } catch (error) {
    console.error(error);
    alert("Error fetching books");
  }
}

function showPopup(book) {
  const popup = document.getElementById("popup");
  document.getElementById("popupTitle").textContent = book.title;
  document.getElementById("popupAuthor").textContent = `Author: ${book.author}`;
  document.getElementById("popupGenres").textContent = `Genres: ${book.genres ? book.genres.join(", ") : "N/A"}`;
  document.getElementById("popupRating").textContent = `Rating: ${book.rating || "N/A"}`;
  document.getElementById("popupReviews").innerHTML = book.reviews && book.reviews.length
    ? book.reviews.map(r => `<p><strong>${r.name}:</strong> ${r.review}</p>`).join("")
    : "<p>No reviews available.</p>";

  popup.style.display = "flex";
}

// Close popup
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

document.getElementById("addBookForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const description = document.getElementById("description").value;
  const publishedDateValue = document.getElementById("publishedDate").value;
  const rating = document.getElementById("rating").value;

  const newBook = { title, author, genre, description, rating };
  if (rating) {
    newBook.rating = parseFloat(rating);
  }
  if (publishedDateValue) {
    newBook.publishedDate = new Date(publishedDateValue);
  }

  try {
    const response = await fetch("/books", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(newBook)
    });
    const data = await response.json();

    if (response.ok) {
      alert("New Book added successfully");
      document.getElementById("addBookForm").reset();
      window.location.reload();
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error(error);
  }
});

let currentPage = parseInt(new URLSearchParams(window.location.search).get('p'), 10) || 0;

const booksContainer = document.getElementById("booksList");
const pageInfo = document.getElementById("pageInfo");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");

async function loadBooks(page) {
  try {
    const response = await fetch(`/books?p=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch books.");
    }
    const books = await response.json();
    renderBooks(books);
    updatePaginationDisplay(page, books.length);
  } catch (error) {
    booksContainer.innerHTML = `<h1>Books List</h1><p>Error loading books: ${error.message}</p>`;
  }
}

function renderBooks(books) {
  booksContainer.innerHTML = `<h1>Books List</h1>`;
  if (books.length === 0) {
    booksContainer.innerHTML += "<p>No books found.</p>";
    return;
  }

  books.forEach(book => {
    const div = document.createElement("div");
    div.classList.add("book-item");
    div.addEventListener("click", async () => {
      showPopup(book);
    });
    const genres = book.genres ? book.genres.join(", ") : "N/A";
    div.innerHTML = `
      <div class="book-title">${book.title}</div>
      <div><strong>Author:</strong> ${book.author}</div>
      <div><strong>Genres:</strong> ${genres}</div>
      <div><strong>Rating:</strong> ${book.rating || "N/A"}</div>
    `;
    booksContainer.appendChild(div);
  });
}

function updatePaginationDisplay(page, fetchedCount) {
  pageInfo.textContent = `Page ${page + 1}`;
  prevPageBtn.disabled = page === 0;
  nextPageBtn.disabled = fetchedCount < 5;
}

function updateUrl(page) {
  const newUrl = `${window.location.pathname}?p=${page}`;
  window.history.pushState({ path: newUrl }, "", newUrl);
}

prevPageBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    updateUrl(currentPage);
    loadBooks(currentPage);
  }
});

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  updateUrl(currentPage);
  loadBooks(currentPage);
});

loadBooks(currentPage);
