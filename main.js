// Variables for ham-meny
const hamBtn = document.querySelector(".ham-btn");
const productMenu = document.querySelector(".product-menu");

// Activate productmenu
hamBtn.addEventListener("click", () => {
  productMenu.classList.toggle("active");
  hamBtn.classList.add("is-hidden");
});

//Close-button
const closeMenu = document.querySelectorAll(".close-menu");

closeMenu.forEach(btn => {
  btn.addEventListener("click", () => {
    productMenu.classList.remove("active");
    hamBtn.classList.remove("is-hidden");

    shopCart.classList.remove("active");
    openButton.classList.remove("hidden");
  });
});

class Product {
  constructor(id, img, name, price, desc, category) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.price = price;
    this.desc = desc;
    this.category = category;
  }
}

const categories = [
  {
    name: "Halsband",
    products: [
      new Product(
        1,
        "img/p01.jpg",
        "Guld Halsband",
        "199 kr",
        "Info",
        "Halsband"
      ),
      new Product(
        2,
        "img/p02.jpg",
        "Silver Halsband",
        "249 kr",
        "Info",
        "Halsband"
      ),
      new Product(
        3,
        "img/p03.jpg",
        "Silver Halsband",
        "249 kr",
        "Info",
        "Halsband"
      ),
      new Product(
        4,
        "img/p04.jpg",
        "Silver Halsband",
        "249 kr",
        "Info",
        "Halsband"
      ),
    ],
  },
  {
    name: "Armband",
    products: [
      new Product(
        5,
        "img/p05.jpg",
        "Guld Armband",
        "149 kr",
        "Info",
        "Armband"
      ),
      new Product(
        6,
        "img/p06.jpg",
        "Silver Armband",
        "179 kr",
        "Info",
        "Armband"
      ),
      new Product(
        7,
        "img/p07.jpg",
        "Silver Armband",
        "179 kr",
        "Info",
        "Armband"
      ),
      new Product(
        8,
        "img/p08.jpg",
        "Silver Armband",
        "179 kr",
        "Info",
        "Armband"
      ),
    ],
  },
  {
    name: "Ringar",
    products: [
      new Product(9, "img/p09.jpg", "Ring Elegant", "299 kr", "Info", "Ringar"),
      new Product(
        10,
        "img/p010.jpg",
        "Ring Minimalistisk",
        "199 kr",
        "Info",
        "Ringar"
      ),
      new Product(
        11,
        "img/p011.jpg",
        "Ring Elegant",
        "299 kr",
        "Info",
        "Ringar"
      ),
      new Product(
        12,
        "img/p012.jpg",
        "Ring Minimalistisk",
        "199 kr",
        "Info",
        "Ringar"
      ),
    ],
  },
];

// ===== RENDER OF CATEGORIES =====

function renderAllCategories() {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  categories.forEach(category => {
    category.products.forEach(product => {
      container.innerHTML += cardHTML(product);
    });
  });
}

function renderCategory(name) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  const category = categories.find(c => c.name === name);
  if (!category) return;

  category.products.forEach(product => {
    container.innerHTML += cardHTML(product);
  });
}

let selectedProduct = null;

function cardHTML(product) {
  return `
        <div class="card-box" onclick="
            openModal('${product.img}', '${product.desc}', '${product.price}', categories.flatMap(c => c.products).find(p => p.id === ${product.id}))
        ">
            <img src="${product.img}">
            <p>${product.name}</p>
            <p>${product.price}</p>
        </div>
    `;
}

function addProductFromModal() {
  if (selectedProduct) {
    addToCart(selectedProduct);
    closeModal();
  }
}

// ===== PRODUCT MODAL =====

function openModal(img, desc, price, product) {
  selectedProduct = product; // spara produktobjektet

  document.getElementById("modal-img").src = img;
  document.getElementById("modal-desc").textContent = desc;
  document.getElementById("modal-price").textContent = price;
  document.getElementById("modal-product").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal-product").style.display = "none";
}

// On page load: shows all products or filters by selected category
function initCatalog() {
  // Find the container where product cards are rendered
  const cards = document.getElementById("cards");

  // If the container does not exist, we are not on the catalog page
  // Exit the function to avoid errors on other pages
  if (!cards) return;

  // Read query parameters from the current URL
  // Example: catalog.html?category=Ringar
  const params = new URLSearchParams(location.search);

  // Get the value of the "category" parameter from the URL
  // Will be null if no category is specified
  const category = params.get("category");

  // If a category exists in the URL,
  // render only products from that category
  if (category) {
    renderCategory(category);

    // Otherwise, render all products in the catalog
  } else {
    renderAllCategories();
  }
}

// Run catalog initialization when the page loads
initCatalog();

// ==== cart ====
// ==== Hämta alla html taggar vi behöver====

const openButton = document.querySelector("#open-btn");
const shopCart = document.querySelector(".cart");
const closeBtn = document.querySelector(".close-btn");
const itemList = document.querySelector("#cart-items");

function updateCartCount() {
  const totalCount = Array.from(itemList.children).reduce(
    (sum, li) => sum + parseInt(li.querySelector(".count").textContent),
    0
  );
  document.getElementById("cart-count").textContent = `(${totalCount})`;
}

function addToCart(product) {
  let existingItem = Array.from(itemList.children).find(
    li => li.dataset.id === product.id.toString()
  );

  if (existingItem) {
    const countSpan = existingItem.querySelector(".count");
    countSpan.textContent = parseInt(countSpan.textContent) + 1;
    updateCartCount();
    updateCartTotal();
    return;
  }

  const li = document.createElement("li");
  li.dataset.id = product.id;
  li.innerHTML = `
    <span>${product.name} </span>
    <button class="minus">-</button>
    <span class="count">1</span>
    <button class="plus">+</button>
  `;

  const countSpan = li.querySelector(".count");

  li.querySelector(".minus").addEventListener("click", () => {
    countSpan.textContent = parseInt(countSpan.textContent) - 1;
    if (parseInt(countSpan.textContent) <= 0) li.remove();
    updateCartCount();
    updateCartTotal();
  });

  li.querySelector(".plus").addEventListener("click", () => {
    countSpan.textContent = parseInt(countSpan.textContent) + 1;
    updateCartCount();
    updateCartTotal();
  });

  itemList.appendChild(li);
  updateCartCount();
  updateCartTotal();
}

// ==== on click open shoppingcart ====
if (openButton && shopCart) {
  openButton.addEventListener("click", () => {
    shopCart.classList.toggle("active");
  });
}

// ==== on click hide shoppingcart ====
if (closeBtn && openButton && shopCart) {
  closeBtn.addEventListener("click", () => {
    shopCart.classList.remove("active");
  });
}

//total-price
function updateCartTotal() {
  let total = 0;

  itemList.querySelectorAll("li").forEach(li => {
    const id = Number(li.dataset.id);
    const count = Number(li.querySelector(".count").textContent);

    const product = categories.flatMap(c => c.products).find(p => p.id === id);

    total += parseInt(product.price) * count;
  });

  document.getElementById("cart-total").textContent = `Totalt: ${total} kr`;
}
