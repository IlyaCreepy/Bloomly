document.addEventListener("DOMContentLoaded", function () {
  const stickyHeader = document.querySelector(".sticky-header");
  const mainContainer = document.querySelector(".main-container");
  const aboutContainer = document.querySelector(".about-container");
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

document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero-container");
  const stockContainer = document.querySelector(".stock-container");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target); // Отключаем после срабатывания
        }
      });
    },
    {
      threshold: 0.3, // Срабатывает при 30% видимости
      rootMargin: "0px 0px -100px 0px", // Буферная зона снизу
    }
  );

  observer.observe(heroSection);
  observer.observe(stockContainer);
});

products = [
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
const tea = [
  {
    id: 100001,
    name: "Кашпо фаянсовое В23 см",
    description:
      "Кашпо фаянсовое В23 см, Florian - AM.PM Florian — это цветочный горшок, выполненный из фаянса с текстурированной матовой эмалью и отличающийся непревзойденной элегантностью",
    author: { VASO: "2000001" },
    color: "#DED5CC",
    characteristic: { Высота: "23 см", Диаметр: "37,5 см" },
    price: "535 руб",
    image: "../img/products/1.png",
  },
];

const des = [
  {
    id: 100001,
    name: "Кашпо фаянсовое В23 см",
    description:
      "Кашпо фаянсовое В23 см, Florian - AM.PM Florian — это цветочный горшок, выполненный из фаянса с текстурированной матовой эмалью и отличающийся непревзойденной элегантностью",
    author: { VASO: "2000001" },
    color: "#DED5CC",
    characteristic: { Высота: "23 см", Диаметр: "37,5 см" },
    price: "535 руб",
    image: "../img/products/1.png",
  },
];

// Функция для создания карточки товара
function createProductCard(product) {
  return `
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
            text-align:left;
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
    `;
}

// Функция для отображения всех товаров
function displayProducts(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = products
    .map((product) => createProductCard(product))
    .join("");
}

window.onload = function () {
  displayProducts(products, "products-container-1");
  displayProducts(tea, "products-container-2");
  displayProducts(des, "products-container-3");
};

function navigateToProduct(productId) {
  console.log(productId);
  const productData = products[productId - 100001];

  window.location.href = `product.html?data=${encodeURIComponent(
    JSON.stringify(productData)
  )}`;
}

window.addEventListener("hashchange", function () {
  const hash = window.location.hash; // Получаем часть после #
  console.log("Hash изменился:", hash);

  if (hash[1] === "1" || hash[1] === "2") {
    console.log(1);
    const productId = hash.replace("#", "");
    navigateToProduct(productId);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const buttonId = localStorage.getItem("buttonToClick");
  if (buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.click();
    }
    // Удаляем запись после использования
    localStorage.removeItem("buttonToClick");
  }
});
