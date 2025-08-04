import { menuArray } from "./data/data";

// Initialize an empty array to hold the item added to the cart
let cartItems = [];
let orderComplete = false;

// Listen for click events on the entire document and delegate actions:
// - If the clicked element has a `data-add-to-cart` attribute, add the item to the cart.
// - If it has a `data-remove-from-cart` attribute, remove the item from the cart.
document.addEventListener("click", (e) => {
  if (e.target.dataset.addToCart) {
    addItemToCart(e.target.dataset.addToCart);
  } else if (e.target.dataset.removeFromCart) {
    removeItemFromCart(e.target.dataset.removeFromCart);
  } else if (e.target.id === "complete-order-button") {
    handleCompleteOrder();
  } else if (document.getElementById("submit-button")) {
    console.log("Submit button clicked");
  }
});

function addItemToCart(itemId) {
  orderComplete = false; // Reset order complete status when adding items
  const item = menuArray.find((item) => item.id === itemId);

  cartItems.push(item);
  render();
}

function removeItemFromCart(itemId) {
  cartItems = cartItems.filter((item) => item.id !== itemId);

  render();
}

function getMenu() {
  return menuArray
    .map((item) => {
      return `
        <div class="menu-item">
          <span class="menu-item__icon">${item.emoji}</span>
          <div class="menu-item__info">
            <h3 class="menu-item__name item-label">${item.name}</h3>
            <p class="menu-item__ingredients">${item.ingredients.join(", ")}</p>
            <p class="menu-item__price item-price">$${item.price}</p>
          </div>
          <button class="menu-item__button hover-effect" data-add-to-cart="${
            item.id
          }" aria-label="Add ${item.name} to cart">+</button>
        </div>
    `;
    })
    .join("");
}

// Generate the HTML for the cart items added to the cart
function generateCartItemsHtml(cartItems) {
  return cartItems
    .map((item) => {
      return `
        <div class="order-summary__item">
          <div class="order-summary__item-info">
            <span class="order-summary__item-name item-label">${item.name}</span>
            <button class="order-summary__item-remove hover-effect" data-remove-from-cart="${item.id}" aria-label="Remove ${item.name} from cart">
              remove
            </button>
          </div>
          <span class="order-summary__item-price item-price">$${item.price}</span>
        </div>
      `;
    })
    .join("");
}

// Generate the total price HTML for the order summary
function generateTotalPriceHtml(cartItems) {
  const total = cartItems.reduce(
    (total, currentItem) => total + currentItem.price,
    0
  );

  return `
    <div class="order-summary__total">
      <span class="order-summary__total-label item-label">Total price:</span>
      <span class="order-summary__total-price item-price">$${total}</span>
    </div>
  `;
}

// Generate the complete HTML for the cart, including items and total price
function generateCompleteCartHtml(cartItems) {
  // Don’t show the cart if it's empty
  if (cartItems.length === 0) {
    return "";
  }

  // Store the generated HTML for cart items and total price
  const cartItemsHtml = generateCartItemsHtml(cartItems);
  const totalPriceHtml = generateTotalPriceHtml(cartItems);

  return `
    <h2 class="order-summary__title item-label">Your order</h2>
    ${cartItemsHtml}
    ${totalPriceHtml}
    <button id="complete-order-button" class="order-summary__button primary-button hover-effect">
      Complete order
    </button>
  `;
}

// Handle the complete order button click event
function handleCompleteOrder() {
  const completeOrderModal = document.getElementById("complete-order-modal");

  completeOrderModal.classList.remove("modal-hidden");
}

document
  .querySelector(".complete-order-modal__form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const formName = e.target.name.value;
    // Hide the modal again after order completion
    document
      .getElementById("complete-order-modal")
      .classList.add("modal-hidden");
    orderComplete = true;
    // Clear the cart items after order completion
    cartItems = [];
    // Re-render the menu and order summary
    render(formName);
  });

// Generate the order complete message
function generateOrderCompleteMessage(name) {
  if (!orderComplete) {
    return "";
  }
  // Return a message thanking the user for their order
  return `<h2 class="order-complete-message__text">Thanks, ${name}!<br /> Your order is on its way!</h2>`;
}

// Render the menu and order summary to the DOM
function render(formName = "") {
  document.getElementById("menu").innerHTML = getMenu();
  document.getElementById("order-summary").innerHTML =
    generateCompleteCartHtml(cartItems);
  document.getElementById("order-complete-message").innerHTML =
    generateOrderCompleteMessage(formName);
}

render();
