import { menuArray } from "./data/data";

document.addEventListener("click", (event) => {
  if (event.target.dataset.addToCart) {
    console.log(
      "Add to cart clicked for item ID:",
      event.target.dataset.addToCart
    );
  }
});

function getMenu() {
  let menuHtml = ``;

  menuArray.forEach((item) => {
    menuHtml += `
      <div class="menu-item">
        <div class="menu-item_details">
          <span class="menu-item_emoji">${item.emoji}</span>
          <div class="menu-item_details_text">
            <h2 class="menu-item_details_name">${item.name}</h2>
            <p class="menu-item_details_ingredients">${item.ingredients.join(
              ", "
            )}</p>
            <p class="menu-item_details_price">${item.price}</p>
          </div>
        </div>
        <span class="menu-item_circle-btn" data-add-to-cart="${item.id}">
          <i class="fas fa-plus"></i>
        </span>
      </div>
      <hr class="menu-item_divider" />
    `;
  });

  return menuHtml;
}

function render() {
  document.getElementById("menu").innerHTML = getMenu();
}

render();
