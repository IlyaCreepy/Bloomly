function getProductDataFromUrl() {
  try {
    // Получаем параметр 'data' из URL
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");

    // Проверяем наличие данных
    if (!encodedData || encodedData === "undefined") {
      console.error("Данные товара не получены или неверный параметр URL");
      return null;
    }

    // Декодируем и парсим данные
    const decodedData = decodeURIComponent(encodedData);
    const productData = JSON.parse(decodedData);

    // Проверяем обязательные поля
    if (!productData || !productData.id || !productData.name) {
      console.error("Данные товара неполные или неверные");
      return null;
    }

    return productData;
  } catch (error) {
    console.error("Ошибка при обработке данных товара:", error);
    return null;
  }
}
const productData = getProductDataFromUrl();

// Функция для отображения страницы товара
function renderProductPage(data) {
  document.title = `${data.name} | ${data.author.name}`;
  // Генерация карусели изображений (только переданное изображение)
  const carouselInner = document.getElementById("carouselInner");
  const carouselIndicators = document.getElementById("carouselIndicators");

  // Создаем массив изображений (только переданное фото)
  const images = [data.image[0], data.image[1]];

  // Очищаем карусель
  carouselInner.innerHTML = "";
  carouselIndicators.innerHTML = "";

  // Заполняем карусель изображениями
  images.forEach((img, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item";
    carouselItem.style.backgroundImage = `url('${img}')`;
    carouselInner.appendChild(carouselItem);

    const indicator = document.createElement("div");
    indicator.className = "indicator";
    if (index === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => goToSlide(index));
    carouselIndicators.appendChild(indicator);
  });

  // Генерация характеристик (DOM-safe, no innerHTML with user data)
  const characteristicsContainer = document.createElement("div");
  characteristicsContainer.className = "characteristics";

  const makeCharRow = (name, value, withCopyIcon = false) => {
    const row = document.createElement("div");
    row.className = "characteristic-row";
    const nameEl = document.createElement("div");
    nameEl.className = "characteristic-name";
    nameEl.textContent = name;
    const valueEl = document.createElement("div");
    valueEl.className = "characteristic-value";
    valueEl.textContent = value;
    if (withCopyIcon) {
      const icon = document.createElement("i");
      icon.className = "fas fa-copy copy-icon";
      icon.title = "Скопировать артикул";
      valueEl.appendChild(icon);
    }
    row.appendChild(nameEl);
    row.appendChild(valueEl);
    return row;
  };

  characteristicsContainer.appendChild(makeCharRow("Артикул", `#${data.id}`, true));
  if (data.characteristic) {
    for (const [key, value] of Object.entries(data.characteristic)) {
      characteristicsContainer.appendChild(makeCharRow(key, value));
    }
  }

  // Build product details safely using DOM APIs (prevents XSS from URL params)
  const productDetails = document.getElementById("productDetails");
  productDetails.innerHTML = "";

  const title = document.createElement("h1");
  title.className = "product-title";
  title.textContent = `${data.name}, Florian`;

  const authorLink = document.createElement("a");
  authorLink.className = "author-link";
  authorLink.href = `author.html?name=${encodeURIComponent([data.author.name, data.author.id, data.id])}`;
  authorLink.textContent = data.author.name;

  const colorSection = document.createElement("div");
  colorSection.className = "color-section";
  const colorLabel = document.createElement("div");
  colorLabel.className = "color-label";
  colorLabel.textContent = "Цвет:";
  const colorBox = document.createElement("div");
  colorBox.className = "color-box";
  colorBox.style.backgroundColor = data.color;
  const colorName = document.createElement("div");
  colorName.textContent = data.colorName;
  colorSection.appendChild(colorLabel);
  colorSection.appendChild(colorBox);
  colorSection.appendChild(colorName);

  const description = document.createElement("div");
  description.className = "description";
  const descTitle = document.createElement("h3");
  descTitle.textContent = "Описание";
  const descText = document.createElement("p");
  descText.textContent = data.description;
  description.appendChild(descTitle);
  description.appendChild(descText);

  const price = document.createElement("div");
  price.className = "product-price";
  price.textContent = data.price;

  const buyButton = document.createElement("button");
  buyButton.className = "buy-button";
  buyButton.textContent = "Купить";

  productDetails.appendChild(title);
  productDetails.appendChild(authorLink);
  productDetails.appendChild(colorSection);
  productDetails.appendChild(characteristicsContainer);
  productDetails.appendChild(description);
  productDetails.appendChild(price);
  productDetails.appendChild(buyButton);

  // Добавляем обработчики событий
  initEventHandlers();
}

// Инициализация обработчиков событий
function initEventHandlers() {
  // Копирование артикула
  const copyIcon = document.querySelector(".copy-icon");
  const copiedMessage = document.querySelector(".copied-message");

  if (copyIcon) {
    copyIcon.addEventListener("click", () => {
      const article = document
        .querySelector(".characteristic-value")
        .textContent.trim();
      navigator.clipboard.writeText(article);

      // Показываем сообщение
      copiedMessage.classList.add("show");
      setTimeout(() => {
        copiedMessage.classList.remove("show");
      }, 2000);
    });
  }

  // Анимация кнопки покупки
  const buyButton = document.querySelector(".buy-button");
  if (buyButton) {
    buyButton.addEventListener("mousedown", () => {
      buyButton.classList.add("active");
    });

    buyButton.addEventListener("mouseup", () => {
      buyButton.classList.remove("active");
    });

    buyButton.addEventListener("mouseleave", () => {
      buyButton.classList.remove("active");
    });

    // Для сенсорных устройств
    buyButton.addEventListener("touchstart", () => {
      buyButton.classList.add("active");
    });

    buyButton.addEventListener("touchend", () => {
      buyButton.classList.remove("active");
    });
  }

  // Инициализация карусели
  initCarousel();
}

// Инициализация карусели
function initCarousel() {
  const carouselInner = document.querySelector(".carousel-inner");
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");
  const indicators = document.querySelectorAll(".indicator");
  const items = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;

  // Функция перехода к слайду
  function goToSlide(index) {
    currentIndex = index;
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Обновляем индикаторы
    indicators.forEach((indicator, i) => {
      if (i === currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // Бесконечная карусель
  function nextSlide() {
    if (currentIndex === items.length - 1) {
      // Переход к первому слайду без анимации
      carouselInner.style.transition = "none";
      carouselInner.style.transform = `translateX(0)`;
      // Небольшая задержка для сброса перехода
      setTimeout(() => {
        carouselInner.style.transition = "transform 0.5s ease-in-out";
        currentIndex = 0;
        goToSlide(currentIndex);
      }, 50);
    } else {
      goToSlide(currentIndex + 1);
    }
  }

  // Настройка автопрокрутки
  let autoSlide = setInterval(nextSlide, 4000);

  // Обработчики кнопок
  prevButton.addEventListener("click", () => {
    clearInterval(autoSlide);
    if (currentIndex === 0) {
      // Переход к последнему слайду без анимации
      carouselInner.style.transition = "none";
      carouselInner.style.transform = `translateX(-${
        (items.length - 1) * 100
      }%)`;
      // Небольшая задержка для сброса перехода
      setTimeout(() => {
        carouselInner.style.transition = "transform 0.5s ease-in-out";
        currentIndex = items.length - 1;
        goToSlide(currentIndex);
      }, 50);
    } else {
      goToSlide(currentIndex - 1);
    }
    autoSlide = setInterval(nextSlide, 4000);
  });

  nextButton.addEventListener("click", () => {
    clearInterval(autoSlide);
    nextSlide();
    autoSlide = setInterval(nextSlide, 4000);
  });

  // Обработчики индикаторов
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      clearInterval(autoSlide);
      goToSlide(index);
      autoSlide = setInterval(nextSlide, 4000);
    });
  });
}

// Запускаем рендеринг страницы
document.addEventListener("DOMContentLoaded", () => {
  renderProductPage(productData);
});
document.addEventListener("DOMContentLoaded", function () {
  const stickyHeader = document.querySelector(".sticky-header");
  const aboutContainer = document.querySelector(".product-container");
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
