const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const injectCard = document.getElementById("cards");
// const query = searchInput.value;

const fetchImages = (query) => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((data) => {
      const filteredBooks = filterBooks(query, data);
      cards(filteredBooks);
    })
    .catch((error) => {
      console.error("Error with the server:", error.message);
    });
};

const filterBooks = (query, data) => {
  const filteredBooks = data.filter((book) => book.title.toLowerCase().includes(query.toLowerCase()));
  return filteredBooks;
};

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let query = searchInput.value;
  query.length >= 3 ? fetchImages(query) : window.alert("Inserisci almeno tre caratteri");
});

const cards = (filteredBooks) => {
  injectCard.innerHTML = "";
  for (let i = 0; i < filteredBooks.length; i++) {
    injectCard.innerHTML +=
      /*html*/
      `<div class="col">
        <div class="card mx-auto" style="width: 18rem; height: 100px;">
                <img class="card-img-top" width=100% src="${filteredBooks[i].img}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${filteredBooks[i].title}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>`;
  }
};
