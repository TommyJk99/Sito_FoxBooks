const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const injectCard = document.getElementById("cards");
const cart = document.getElementsByClassName("offcanvas-body");
// const query = searchInput.value;

const fetchImages = (query) => {
  showSpinner();
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
        <div class="card mx-auto mt-4 shadow" style="width: 14rem;">
                <img class="card-img-top" src="${filteredBooks[i].img}" alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title truncate-2-lines">${filteredBooks[i].title}</h4>                
                    <button type="button" class="btn btn-secondary" onclick="addToCart(event)">ADD</button>
                    <button type="button" class="btn btn-warning" onclick="removeCard(event)">DELETE</button>             
                </div>
            </div>
        </div>`;
  }
};

const addToCart = (event) => {};

const removeCard = (event) => {
  const deleteButton = event.target;
  const cardElement = deleteButton.closest(".card");
  if (cardElement) {
    cardElement.parentElement.remove();
  }
};

const showSpinner = () => {
  const spinnerHTML =
    /*html*/
    `<div class="d-flex align-items-center center-spinner">
      <strong role="status"></strong>
      <div class="spinner-border mx-auto mt-5" aria-hidden="true"></div>
      </div>`;
  injectCard.innerHTML = spinnerHTML;
};

//se premo su un altro titolo o sullo schermo il nome completo svanisce
const popover = new bootstrap.Popover(".popover-dismiss", {
  trigger: "focus",
});
