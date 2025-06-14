// Наша "база данных" товаров
const productsDatabase = [
  {
    id: 100001,
    name: "Кашпо фаянсовое В23 см",
    description:
      "Кашпо фаянсовое В23 см, Florian - AM.PM Florian — это цветочный горшок, выполненный из фаянса с текстурированной матовой эмалью и отличающийся непревзойденной элегантностью",
    author: { name: "VASO", id: "2000001" },
    color: "#DED5CC",
    colorName: "белый",
    characteristic: { Высота: "23 см", Диаметр: "37,5 см" },
    price: "535 руб",
    image: "../img/products/1.png",
  },
  {
    id: 100002,
    name: "Кашпо фаянсовое В23 см",
    description:
      "Кашпо фаянсовое В23 см, Florian - AM.PM Florian — это цветочный горшок, выполненный из фаянса с текстурированной матовой эмалью и отличающийся непревзойденной элегантностью",
    author: { name: "VASO", id: "2000001" },
    color: "#DED5CC",
    colorName: "белый",

    characteristic: { Высота: "23 см", Диаметр: "37,5 см" },
    price: "535 руб",
    image: "../img/products/1.png",
  },
  {
    id: 100003,
    name: "Кашпо фаянсовое В23 см",
    description:
      "Кашпо фаянсовое В23 см, Florian - AM.PM Florian — это цветочный горшок, выполненный из фаянса с текстурированной матовой эмалью и отличающийся непревзойденной элегантностью",
    author: { name: "VASO", id: "2000001" },
    color: "#DED5CC",
    characteristic: { Высота: "23 см", Диаметр: "37,5 см" },
    colorName: "белый",

    price: "535 руб",
    image: "../img/products/1.png",
  },
  {
    id: 100004,
    name: "Кашпо фаянсовое В23 см",
    description:
      "Кашпо фаянсовое В23 см, Florian - AM.PM Florian — это цветочный горшок, выполненный из фаянса с текстурированной матовой эмалью и отличающийся непревзойденной элегантностью",
    author: { name: "VASO", id: "2000001" },
    color: "#DED5CC",
    characteristic: { Высота: "23 см", Диаметр: "37,5 см" },
    colorName: "белый",

    price: "535 руб",
    image: "../img/products/1.png",
  },
];

// Находим все товары автора
function getProductsByAuthor(authorName) {
  return Object.values(productsDatabase).filter(
    (product) => product.author.id === authorName
  );
}

// Рендерим страницу автора
function renderAuthorPage() {
  const params = new URLSearchParams(window.location.search);
  const [authorName, authorId, productId] = decodeURIComponent(
    params.get("name")
  ).split(",");

  if (!authorName) {
    document.body.innerHTML = "<h2>Автор не указан</h2>";
    return;
  }

  // Устанавливаем имя автора
  document.getElementById("authorName").textContent = authorName;
  document.title = `${authorName}`;

  // Получаем и отображаем товары автора
  const authorProducts = getProductsByAuthor(authorId);
  const productsGrid = document.getElementById("productsGrid");

  if (authorProducts.length === 0) {
    productsGrid.innerHTML = "<p>Нет других товаров этого автора</p>";
    return;
  }

  productsGrid.innerHTML = authorProducts
    .map(
      (product) => `
        <div class="poster en" style="
        height: 350px;
        position: relative;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    " onclick="navigateToProduct(${product.id})">
        <img src="${product.image}" alt="${product.name}" style="
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        ">
        
        <div class="hid" style="
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(255,255,255,0.96);
            padding: 16px;
            backdrop-filter: blur(6px);
            border-top: 1px solid rgba(0,0,0,0.08);
        ">
            <div style="
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 8px;
                color: #1e4b2d;
                line-height: 1.3;
            ">
                ${product.name}
            </div>
            
            <div style="
                font-size: 14px;
                color: #555;
                margin-bottom: 14px;
                line-height: 1.5;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            ">
                ${product.description}
            </div>
            
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <span style="
                    font-size: 15px;
                    color: #333;
                    font-weight: 600;
                ">
                    ${Object.values(product.characteristic)[0]}
                </span>
                <span style="
                    font-size: 18px;
                    font-weight: 700;
                    color: #222;
                ">
                    ${product.price}
                </span>
            </div>
        </div>
    </div>
      `
    )
    .join("");
}
function navigateToProduct(productId) {
  console.log(productId);
  const productData = productsDatabase[productId - 100001];

  window.location.href = `product.html?data=${encodeURIComponent(
    JSON.stringify(productData)
  )}`;
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", renderAuthorPage);
document.addEventListener("DOMContentLoaded", function () {
  const stickyHeader = document.querySelector(".sticky-header");
  const aboutContainer = document.querySelector(".back-link");
  const burgerBtns = document.querySelectorAll(".burger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".close-btn");
  const menuLinks = document.querySelectorAll(".mobile-menu a");
  const staticHeader = document.querySelector(".static-header");

  const initStickyHeader = () => {
    const headerHeight = stickyHeader.offsetHeight;
    const triggerPoint = aboutContainer.offsetTop - headerHeight;

    const handleScroll = () => {
      if (window.scrollY >= triggerPoint) {
        stickyHeader.classList.add("visible");
        if (staticHeader) staticHeader.style.opacity = "0";
      } else {
        stickyHeader.classList.remove("visible");
        if (staticHeader) staticHeader.style.opacity = "1";
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
  };

  const initMobileMenu = () => {
    const toggleMenu = (show) => {
      const isOpen = show ?? !mobileMenu.classList.contains("active");

      mobileMenu.classList.toggle("active", isOpen);

      burgerBtns.forEach((btn) => {
        btn.classList.toggle("active", isOpen);
        btn.setAttribute("aria-expanded", isOpen);
      });

      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    burgerBtns.forEach((btn) => {
      btn.addEventListener("click", () => toggleMenu());
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => toggleMenu(false));
    }

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) toggleMenu(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        toggleMenu(false);
      }
    });
  };

  const handleResize = () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      burgerBtns.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
      });
      document.body.style.overflow = "";
    }
  };

  initStickyHeader();
  initMobileMenu();
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("scroll", initStickyHeader);
    window.removeEventListener("resize", handleResize);
  };
});
function redirectToHomeAndClickButton(buttonId) {
  window.location.href = "/templates/";
  localStorage.setItem("buttonToClick", buttonId);
  return;
}
