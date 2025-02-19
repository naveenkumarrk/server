

 document.getElementById('recommFormDiv').addEventListener('submit', async(e) => {
    e.preventDefault()
    const author = document.getElementById("recAuthor").value
    const genre = document.getElementById("recGenre").value
    const preferences = {author, genre}

    try {
      const response = await fetch(`http://localhost:3000/api/recommendation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      const data = await response.json();
      if (response.ok) {
        displayRecommendations(data);
      } else {
        alert(data.message || "Error fetching recommendations.");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching recommendations.");
    }
  });

  // function displayRecommendations(recommendations) {
  //   const container = document.getElementById("recommendationsResult");
  //   container.innerHTML = "";
  //   if (!recommendations || recommendations.length === 0) {
  //     container.innerHTML = "<p>No recommendations found.</p>";
  //     return;
  //   }
  //   recommendations.forEach((rec) => {
  //     const div = document.createElement("div");
  //   //   div.classList.add("book-item");
  //   const genres = rec.genres ? rec.genres.join(",") : "N/A";
  //     div.textContent = `Title: ${rec.title} | Author: ${rec.author} | Genre: ${genres} | Rating: ${rec.rating || "N/A"}`;
  //     container.appendChild(div);
  //   });
  // }

  
function displayRecommendations(books) {
  const container = document.getElementById("recommendationsResult");
    container.innerHTML = "";
  container.innerHTML = `<h1>Books List</h1>`;
  if (books.length === 0) {
    container.innerHTML += "<p>No books found.</p>";
    return;
  }
  
  books.forEach(book => {
    const div = document.createElement("div");
    div.classList.add("book-item");
    div.addEventListener("click", async () => {
      showPopup(book);
    })
    const genres = book.genres ? book.genres.join(", ") : "N/A";
    div.innerHTML = `
      <div class="book-title">${book.title}</div>
      <div><strong>Author:</strong> ${book.author}</div>
      <div><strong>Genres:</strong> ${genres}</div>
      <div><strong>Rating:</strong> ${book.rating || "N/A"}</div>
    `;
    container.appendChild(div);
  });
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
