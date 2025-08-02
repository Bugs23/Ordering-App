import { menuArray } from "./data/data";

// Initialize an empty array to hold the item added to the cart
let cartItems = [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.addToCart) {
    addItemToCart(e.target.dataset.addToCart);
  } else if (e.target.dataset.removeFromCart) {
    removeItemFromCart(e.target.dataset.removeFromCart);
  }
});

function addItemToCart(itemId) {
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
            <p class="menu-item__ingredients">${item.ingredients}</p>
            <p class="menu-item__price item-price">$${item.price}</p>
          </div>
          <button class="menu-item__button hover-effect" data-add-to-cart="${item.id}" aria-label="Add ${item.name} to cart">+</button>
        </div>
    `;
    })
    .join("");
}

function getCart(cartItems) {
  // Don’t show the cart if it's empty
  if (cartItems.length === 0) {
    return "";
  }

  // Generate HTML for each item in the cart
  let cartItemsHtml = cartItems
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

  // Calculate the total price of the order
  const total = cartItems.reduce(
    (total, currentItem) => total + currentItem.price,
    0
  );

  // Return the complete HTML for the cart
  return `
        <h2 class="order-summary__title item-label">Your order</h2>

        ${cartItemsHtml}

        <div class="order-summary__total">
          <span class="order-summary__total-label item-label"
            >Total price:</span
          >
          <span class="order-summary__total-price item-price">$${total}</span>
        </div>

        <button class="order-summary__button hover-effect">
          Complete order
        </button>
  `;
}

function render() {
  document.getElementById("menu").innerHTML = getMenu();
  document.getElementById("order-summary").innerHTML = getCart(cartItems);
}

render();
