document.addEventListener("DOMContentLoaded", function () {
  // 1. Получаем все необходимые элементы
  const stickyHeader = document.querySelector(".sticky-header");
  const mainContainer = document.querySelector(".main-container");
  const burgerBtns = document.querySelectorAll(".burger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".close-btn");
  const menuLinks = document.querySelectorAll(".mobile-menu a");
  const staticHeader = document.querySelector(".static-header");

  // 2. Проверяем, что элементы существуют
  if (!stickyHeader || !mainContainer || !burgerBtns.length || !mobileMenu) {
    console.error("Не найдены необходимые элементы DOM");
    return;
  }

  // 3. Функция для sticky header
  const initStickyHeader = () => {
    const headerHeight = stickyHeader.offsetHeight;
    const triggerPoint = mainContainer.offsetTop - headerHeight;

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
    handleScroll(); // Инициализация при загрузке
  };

  // 4. Функция для мобильного меню
  const initMobileMenu = () => {
    const toggleMenu = (show) => {
      const isOpen = show ?? !mobileMenu.classList.contains("active");

      // Переключаем состояние меню
      mobileMenu.classList.toggle("active", isOpen);

      // Переключаем бургер-кнопки
      burgerBtns.forEach((btn) => {
        btn.classList.toggle("active", isOpen);
        btn.setAttribute("aria-expanded", isOpen);
      });

      // Блокируем скролл
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    // Обработчики событий
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

  // 5. Обработчик ресайза
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

  // 6. Инициализация всех функций
  initStickyHeader();
  initMobileMenu();
  window.addEventListener("resize", handleResize);

  // 7. Удаление обработчиков при unmount (для SPA)
  return () => {
    window.removeEventListener("scroll", initStickyHeader);
    window.removeEventListener("resize", handleResize);
  };
});
