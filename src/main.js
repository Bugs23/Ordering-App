import { menuArray } from "./data/data";

function getMenu() {
  let menuHtml = ``;

  menuArray.map((item) => {
    menuHtml += `
      <div class="menu-item">
        <div class="menu-item_details">
          <span class="menu-item_emoji">${item.emoji}</span>
          <div class="menu-item_details_text">
            <h2 class="menu-item_details_name">${item.name}</h2>
            <p class="menu-item_details_ingredients">${item.ingredients}</p>
            <p class="menu-item_details_price">${item.price}</p>
          </div>
        </div>
        <span class="menu-item_circle-btn">
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
