// Variables for ham-meny
const hamBtn = document.querySelector(".ham-btn")
const productMenu = document.querySelector(".product-menu")

// Activate productmenu
hamBtn.addEventListener("click", () => {
    productMenu.classList.toggle("active")
    hamBtn.classList.add("hidden")
})

//Close-button for both ham-meny and shoppingcart.
const closeBtn = document.querySelectorAll(".close-btn");

closeBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    productMenu.classList.remove("active");
    hamBtn.classList.remove("hidden");

    shopCart.classList.remove("active");
    openButton.classList.remove("hidden");
  });
});


// === cart ===
const openButton = document.querySelector("#open-btn");
const shopCart = document.querySelector(".cart");


// === on click open shoppincart ===
openButton.addEventListener("click", () => {
  shopCart.classList.toggle("active");
  openButton.classList.add("hidden");
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
            new Product(1, "img/p1.png", "Guld Halsband", "199 kr", "Info", "Halsband"),
            new Product(2, "img/p2.png", "Silver Halsband", "249 kr", "Info", "Halsband")
        ]
    },
    {
        name: "Armband",
        products: [
            new Product(3, "img/p3.png", "Guld Armband", "149 kr", "Info", "Armband"),
            new Product(4, "img/p4.png", "Silver Armband", "179 kr", "Info", "Armband")
        ]
    },
    {
        name: "Ringar",
        products: [
            new Product(5, "img/p5.png", "Ring Elegant", "299 kr", "Info", "Ringar"),
            new Product(6, "img/p6.png", "Ring Minimalistisk", "199 kr", "Info", "Ringar")
        ]
    },
    {
        name: "Örhängen",
        products: [
            new Product(7, "img/p7.png", "Guldiga hjärtor Örhängen", "249 kr", "Info", "Örhängen"),
            new Product(8, "img/p8.png", "Guld Örhängen", "299 kr", "Info", "Örhängen")
        ]
    }

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

function cardHTML(product) {
  return `
        <div class="card-box" onclick="
            openModal('${product.img}', '${product.desc}', '${product.price}')
        ">
            <img src="${product.img}">
            <p>${product.name}</p>
            <p>${product.price}</p>
        </div>
    `;
}

// ===== PRODUCT MODAL =====

function openModal(img, desc, price) {
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

