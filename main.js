class Product {
    constructor(id, title, img, name, price, desc, category) {
        this.id = id;
        this.title = title;
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
            new Product(1, "Kort1", "img/p1.jpg", "Guld Halsband", "199 kr", "Info", "Halsband"),
            new Product(2, "Kort2", "img/p2.jpg", "Silver Halsband", "249 kr", "Info", "Halsband")
        ]
    },
    {
        name: "Armband",
        products: [
            new Product(3, "Kort3", "img/p3.jpg", "Guld Armband", "149 kr", "Info", "Armband"),
            new Product(4, "Kort4", "img/p4.jpg", "Silver Armband", "179 kr", "Info", "Armband")
        ]
    },
    {
        name: "Ringar",
        products: [
            new Product(5, "Kort5", "img/r1.png", "Ring Elegant", "299 kr", "Info", "Ringar"),
            new Product(6, "Kort6", "img/p6.jpg", "Ring Minimalistisk", "199 kr", "Info", "Ringar")
        ]
    },
    {
        name: "Örhängen",
        products: [
            new Product(7, "Kort7", "img/o1.png", "Guldiga hjärtor Örhängen", "249 kr", "Info", "Örhängen"),
            new Product(8, "Kort8", "img/p8.jpg", "Guld Örhängen", "299 kr", "Info", "Örhängen")
        ]
    }
];

function renderCategoryButtons() {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    menu.innerHTML += `<button onclick="renderAllCategories()">Alla</button>`;

    categories.forEach(cat => {
        menu.innerHTML += `<button onclick="renderCategory('${cat.name}')">${cat.name}</button>`;
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
            openModal('${product.title}', '${product.img}', '${product.desc}', '${product.price}')
        ">
            <h1>${product.title}</h1>
            <img src="${product.img}">
            <p>${product.name}</p>
            <p>${product.price}</p>
        </div>
    `;
}

function openModal(title, img, desc, price) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-img").src = img;
    document.getElementById("modal-desc").textContent = desc;
    document.getElementById("modal-price").textContent = price;

    document.getElementById("modal-product").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal-product").style.display = "none";
}

renderCategoryButtons();
renderAllCategories();

document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("menu").classList.toggle("hidden");
});

document.querySelectorAll(".filter-checkbox").forEach(cb => {
    cb.addEventListener("change", applyFilters);
});