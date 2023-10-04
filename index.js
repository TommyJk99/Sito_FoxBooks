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
        <div class="card mx-auto mt-5 shadow zoom position-relative" style="width: 16rem;" data-price="${filteredBooks[i].price}">
                <img class="card-img-top" src="${filteredBooks[i].img}" alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title truncate-2-lines mb-3" 
                        data-bs-toggle="tooltip" 
                        data-bs-placement="top" 
                        title="${filteredBooks[i].title}">
                        ${filteredBooks[i].title}
                    </h4>                
                    <button type="button" class="btn btn-secondary" onclick="addToCart(event)">ADD</button>
                    <button type="button" class="btn btn-warning" onclick="removeCard(event)">DELETE</button>  
                               
                </div>
            </div>
        </div>`;
  }
};

const addToCart = (event) => {
  cartBadgeIncrease();

  // Ottieni l'elemento card corrispondente al bottone premuto
  let cardElement = event.target.closest(".card");

  let imgSrc = cardElement.querySelector(".card-img-top").src;
  let title = cardElement.querySelector(".card-title").title;
  const price = cardElement.getAttribute("data-price"); //APPROCCIO CON DATA FIGO

  let offcanvasBody = document.querySelector(".offcanvas-body");

  // Aggiungo al carrello
  offcanvasBody.innerHTML += /*html*/ `
        <div class="cart-item">
          <div class="container">
            <div class="row mb-3">
              <div class="col-4">
                <img src="${imgSrc}" alt="Book image" width="100" />
              </div>
              <div class="col-8"><p class="truncate-2-lines">${title}</p>
                <p class='card-price mb-0'><span class="orange">Price 👉</span> ${price}$</p>
                <p class="number mt-0"><span class="orange">Number 👉</span> 1</p>
              </div>
            </div>
          </div>
        </div>
    `;
  updateCartTotal();
};

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

const cartBadgeIncrease = () => {
  const badges = document.getElementsByClassName("badge");
  if (badges.length > 0) {
    const badge = badges[0]; // riferimento al primo badge
    const currentValue = parseInt(badge.innerHTML, 10); // ottieni il valore corrente e convertilo in un numero
    badge.innerHTML = currentValue + 1; // incrementa e reimposta il valore
  }
};

const sumCartItems = () => {
  const prices = document.querySelectorAll(".cart-item .card-price");
  let total = 0;

  prices.forEach((priceElement) => {
    const priceValue = parseFloat(priceElement.textContent.replace("Price 👉", "").replace("$", "").trim());
    total += priceValue;
  });

  return total;
};

const updateCartTotal = () => {
  const total = sumCartItems();
  document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
};

//se premo su un altro titolo o sullo schermo il nome completo svanisce
const popover = new bootstrap.Popover(".popover-dismiss", {
  trigger: "focus",
});

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
