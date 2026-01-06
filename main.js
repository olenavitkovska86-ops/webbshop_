// Variables for ham-meny
const hamBtn = document.querySelector(".ham-btn");
const productMenu = document.querySelector(".product-menu");

// Open product menu
hamBtn.addEventListener("click", () => {
  productMenu.classList.toggle("active");
  hamBtn.classList.add("is-hidden");
});

// Close menu buttons
const closeMenu = document.querySelectorAll(".close-menu");

closeMenu.forEach(btn => {
  btn.addEventListener("click", () => {
    productMenu.classList.remove("active");
    hamBtn.classList.remove("is-hidden");

    shopCart.classList.remove("active");
    openButton.classList.remove("hidden");
  });
});

// Product class (blueprint for products)
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

// All product categories with products
const categories = [
  {
    name: "Halsband",
    products: [
      new Product(
        1,
        "img/p01.jpg",
        "Halsband Skimra",
        "1799 kr",
        "Ett elegant halsband där en droppformad pärla möter gnistrande kristaller. Den skimrande kedjan ger ett mjukt fall och gör smycket lika självklart till bröllop som till en uppklädd vardag.",
        "Material: Rhodiumpläterat sterlingsilver med exklusiva kristaller och sötvattenspärla"
      ),
      new Product(
        2,
        "img/p02.jpg",
        "Halsband Kontur",
        "1249 kr",
        "Ett hjärta med diskret kristallglitter och en pärla i centrum – romantiskt, men aldrig för mycket. Ett smycke du bär nära, och en present som alltid känns rätt.",
        "Material: 925 sterlingsilver med sötvattenspärla"
      ),
      new Product(
        3,
        "img/p03.jpg",
        "Halsband Dropp",
        "1249 kr",
        "En dekorativ medaljong som fångar ljuset med varje rörelse och ger direkt karaktär. Perfekt när du vill låta ett enda smycke sätta tonen för hela looken.",
        "Material: 925 sterlingsilver med droppformad kristall och små kristaller"
      ),
      new Product(
        4,
        "img/p04.jpg",
        "Halsband Stilren",
        "1499 kr",
        "Blomformad berlock i kristaller med ett mjukt ljusspel som känns både feminint och tidlöst. Lika fint till en enkel topp som till en klänning – och alltid lätt att bära.",
        "Material: 925 sterlingsilver med exklusiva kristaller"
      ),
    ],
  },
  {
    name: "Armband",
    products: [
      new Product(
        5,
        "img/p05.jpg",
        "Armband Signatur",
        "1195 kr",
        "Ett nätt armband med vågformad linje och stenar som glittrar runt handleden. Bär det ensamt för en diskret touch – eller kombinera med fler armband för ett mer uppklätt uttryck.",
        "Material: 925 sterlingsilver med små kulor och glittrande stenar"
      ),
      new Product(
        6,
        "img/p06.jpg",
        "Armband Harmoni",
        "1195kr",
        "Dubbel linje och en rad stenar som ger precis lagom lyster. Stilrent och modernt – ett armband som förhöjer utan att ta över.",
        "Material: 925 sterlingsilver med klara kubiska zirkonior"
      ),
      new Product(
        7,
        "img/p07.jpg",
        "Armband Klassisk",
        "1099 kr",
        "En slät armring med en rak kristallrad för ett rent, elegant uttryck. Minimalistisk med exakt rätt sparkle – perfekt solo, och lika fin tillsammans med klocka.",
        "Material: 925 sterlingsilver med klara stenar"
      ),
      new Product(
        8,
        "img/p08.jpg",
        "Armband Premium",
        "1299 kr",
        "Droppformade länkar som skapar en mjuk, följsam linje och reflekterar ljus vackert. Ett smycke som ser exklusivt ut, men känns lätt och bekvämt på handleden.",
        "Material: Rodinerat 925 sterlingsilver med exklusiva kristaller"
      ),
    ],
  },
  {
    name: "Ringar",
    products: [
      new Product(
        9,
        "img/p09.jpg",
        "Ring Elegant",
        "1599 kr",
        "En tunn ring i varm ton med en ensam pärla som får tala för sig själv. Enkel, tidlös och så lätt att bära att du gärna låter den sitta kvar.",
        "Material: Guldpläterat 925 sterlingsilver med rund vit sötvattenspärla"
      ),
      new Product(
        10,
        "img/p010.jpg",
        "Ring Tidlös",
        "1899 kr",
        "En djupgrön sten i centrum, omgiven av klara stenar som ger extra skärpa och lyster. En elegant accent som lyfter både vardagslook och fest.",
        "Material: 925 sterlingsilver med grön kubisk zirkonia"
      ),
      new Product(
        11,
        "img/p011.jpg",
        "Ring Grace",
        "1499 kr",
        "Rosatonade stenar samlade i en mjuk blomform, inramade av diskret glitter. Feminint, balanserat och lätt att matcha – en fin färgklick på handen.",
        "Material: 925 sterlingsilver med rosa kubisk zirkonia"
      ),
      new Product(
        12,
        "img/p012.jpg",
        "Ring Aurora",
        "2099 kr",
        "En blomformad ring gjord av Premiumtitan med gnistrande zirkonior, som reflekterar ljuset från alla vinklar. Ett exklusivt smycke som känns festlig utan att bli tung – ett statement som fortfarande är elegant.",
        "Material: Premiumtitan (hypoallergen & nickelfri) med glittrande kubiska zirkonior"
      ),
    ],
  },
];

// RENDER OF CATEGORIES

// Render all products from all categories
function renderAllCategories() {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  categories.forEach(category => {
    category.products.forEach(product => {
      container.innerHTML += cardHTML(product); // Add product card
    });
  });
}

// Render products from one selected category
function renderCategory(name) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  const category = categories.find(c => c.name === name); // Find category
  if (!category) return;

  category.products.forEach(product => {
    container.innerHTML += cardHTML(product); // Add product card
  });
}

let selectedProduct = null; // Variabel, Holds the currently selected product

// Generate HTML for one product card
function cardHTML(product) {
  return `
        <div class="card-box" onclick="
            openModal('${product.img}', '${product.desc}', '${product.price}', categories.flatMap(c => c.products).find(p => p.id === ${product.id}))
        ">
        <div>
            <img src="${product.img}">
        </div class="modal-media">
        <div class="modal-info">
            <p>${product.name}</p>
            <p>${product.price}</p>
        </div>
        </div>
    `;
}

// Add selected product to cart from modal
function addProductFromModal() {
  if (selectedProduct) {
    addToCart(selectedProduct); // Add product to cart
  }
}

// PRODUCT MODAL

// Open modal with product details
function openModal(img, desc, price, product) {
  selectedProduct = product; // Save product object

  document.getElementById("modal-img").src = img;
  document.getElementById("modal-desc").textContent = desc;
  document.getElementById("modal-price").textContent = price;
  document.getElementById("modal-name").textContent = product.name;
  document.getElementById("modal-details").textContent = product.category;
  document.getElementById("modal-product").style.display = "flex"; // Show modal
}

// Close product modal
function closeModal() {
  document.getElementById("modal-product").style.display = "none"; // Hide modal
}

// On page load: shows all products or filters by selected category
function initCatalog() {
  const cards = document.getElementById("cards"); // Product card container
  if (!cards) return; // Stop if not on catalog page

  const params = new URLSearchParams(location.search); // Read URL parameters
  const category = params.get("category"); // Get category from URL

  // If a category exists in the URL
  if (category) {
    renderCategory(category); // Show filtered products
  } else {
    renderAllCategories(); // Show all products
  }
}

// Run catalog when page loads
initCatalog();

// CART

// Get all needed HTML elements
const openButton = document.querySelector("#open-btn");
const shopCart = document.querySelector(".cart");
const closeBtn = document.querySelector(".close-btn");
const itemList = document.querySelector("#cart-items");

// Update cart count
function updateCartCount() {
  // Calculate total number of items in cart
  const totalCount = Array.from(itemList.children).reduce(
    (sum, li) => sum + parseInt(li.querySelector(".count").textContent), // Get quantity of items
    0
  );
  // Show cart count in header icon
  document.getElementById("cart-count").textContent = `(${totalCount})`;
}

// Add product to cart
function addToCart(product) {
  // Check if product already exists in cart
  let existingItem = Array.from(itemList.children).find(
    li => li.dataset.id === product.id.toString() // Compare if cart item matches the product
  );

  if (existingItem) {
    // If product already exists in cart ---> increase count
    const countSpan = existingItem.querySelector(".count");
    countSpan.textContent = parseInt(countSpan.textContent) + 1; // Add 1 to quantity
    updateCartCount();
    updateCartTotal();
    return; // Stop
  }

  // Product is not in cart --> create new list item for it
  const li = document.createElement("li");
  li.dataset.id = product.id;
  li.innerHTML = `
  <img class="cart-img" src="${product.img}" alt="${product.name}">
    <span class="cart-name">${product.name}</span>
    <button class="minus">-</button>
    <span class="count">1</span>
    <button class="plus">+</button>
  `;

  const countSpan = li.querySelector(".count"); // Update product quantity with plus or minus

  // Event for decreasing item quantity
  li.querySelector(".minus").addEventListener("click", () => {
    countSpan.textContent = parseInt(countSpan.textContent) - 1; // Reduce by 1
    if (parseInt(countSpan.textContent) <= 0) li.remove(); // Remove item if quantity <= 0
    updateCartCount();
    updateCartTotal();
  });

  // Event for increasing item quantity
  li.querySelector(".plus").addEventListener("click", () => {
    countSpan.textContent = parseInt(countSpan.textContent) + 1; // Increase by 1
    updateCartCount();
    updateCartTotal();
  });

  // Add the new item to cart list
  itemList.appendChild(li);
  updateCartCount();
  updateCartTotal();
}

// Open shopping cart
if (openButton && shopCart) {
  openButton.addEventListener("click", () => {
    shopCart.classList.toggle("active"); // Show or hide cart
  });
}

// Close shopping cart
if (closeBtn && openButton && shopCart) {
  closeBtn.addEventListener("click", () => {
    shopCart.classList.remove("active"); // Hide cart
  });
}

// Calculate total price
function updateCartTotal() {
  let total = 0;

  // Loop through each cart item
  itemList.querySelectorAll("li").forEach(li => {
    const id = Number(li.dataset.id); // Get product id
    const count = Number(li.querySelector(".count").textContent); // Get quantity

    // Find the product data from categories array
    const product = categories.flatMap(c => c.products).find(p => p.id === id);

    total += parseInt(product.price) * count; // Multiply price by quantity and add to total
  });

  // Show total price in cart
  document.getElementById("cart-total").textContent = `Totalt: ${total} kr`;
}

// Clear cart button
document.querySelector("#clear-cart")?.addEventListener("click", () => {
  itemList.innerHTML = ""; // Remove all <li> items
  updateCartCount(); // Reset to 0
  updateCartTotal(); // Reset to 0
});
