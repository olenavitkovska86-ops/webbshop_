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

function renderCategoryButtons() {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    menu.innerHTML += `<button onclick="renderAllCategories()">Alla</button>`;

    categories.forEach(cat => {
        menu.innerHTML += `
            <button onclick="renderCategory('${cat.name}')">${cat.name}</button>
        `;
    });
}

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

function openModal( img, desc, price) {
    
    document.getElementById("modal-img").src = img;
    document.getElementById("modal-desc").textContent = desc;
    document.getElementById("modal-price").textContent = price;

    document.getElementById("modal-product").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal-product").style.display = "none";
}

// START
renderCategoryButtons();
renderAllCategories();


// Växla meny när du klickar på hamburgare
document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("menu").classList.toggle("hidden");
});

// Rendera kategoriknappar i menyn
function renderCategoryButtons() {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    menu.innerHTML += `<button onclick="renderAllCategories()">Alla</button>`;

    categories.forEach(cat => {
        menu.innerHTML += `
            <button onclick="renderCategory('${cat.name}')">${cat.name}</button>
        `;
    });
}

// // ===== HAMBURGER MENU =====
// document.addEventListener("DOMContentLoaded", () => {
//     const hamburger = document.getElementById("hamburger");
//     const menu = document.getElementById("menu");

//     if (hamburger) {
//         hamburger.addEventListener("click", () => {
//             menu.classList.toggle("hidden");
//         });
//     }
// });





// Checkbox filtering function
function applyFilters() {
    const checked = [...document.querySelectorAll(".filter-checkbox:checked")]
        .map(cb => cb.value);

    const container = document.getElementById("cards");
    container.innerHTML = "";

    // If nothing is selected → show all
    if (checked.length === 0) {
        renderAllCategories();
        return;
    }

    // Filtering products
    categories.forEach(category => {
        if (checked.includes(category.name)) {
            category.products.forEach(product => {
                container.innerHTML += cardHTML(product);
            });
        }
    });
}

// We hang listeners on checkboxes
document.querySelectorAll(".filter-checkbox").forEach(cb => {
    cb.addEventListener("change", applyFilters);
});


