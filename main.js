// document.getElementById("catalog").innerHTML = 
// `<div class = "item">
//     <h3>A</h3>
//     <p>price</p>
// </div>`



function openProduct(id) {
    window.location.href = "product.html?id=" + id;
}




//модалка


// цепочка из встроенных возможностей:

// ✔ document — объект браузера
// ✔ getElementById() — встроенная функция поиска элемента
// ✔ .textContent — встроенное свойство для текста
// 👀 Это стандарт, который изучают везде

// Это часть DOM API, который:

// встроен в JavaScript

// работает в каждом браузере

// используется в любом веб-проекте

// Именно через него JavaScript взаимодействует с HTML.

function openModal(title, img, desc, price) {
    // подставляем текст
      // 1. Находим элемент <h2 id="modal-title"> и вставляем в него название товара, фото, 
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-img").src = img;
    document.getElementById("modal-desc").textContent = desc;
    document.getElementById("modal-price").textContent = price;



// показываем модалку (делаем flex)

//     Ты говоришь браузеру:

// ➡ «Покажи модалку и сделай её flex-контейнером».

// Flex мы используем для того, чтобы окно было в центре экрана.

// В CSS у тебя есть:

// .modal {
//     display: none;
//     justify-content: center;
//     align-items: center;
// }


// Когда display: none → justify-content и align-items НЕ работают.

// Когда JS меняет на display: flex → модалка:

// становится видимой

// центрирует окно по обоим направлениям

    document.getElementById("modal").style.display = "flex";
}





function closeModal() {
    // скрываем модалку
    document.getElementById("modal").style.display = "none";
}