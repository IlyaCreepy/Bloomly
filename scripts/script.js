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
    image: ["../img/pots/image (1).png", "../img/pots/image (2).png"],
  },
  {
    id: 100002,
    name: "Кашпо двухцветное из керамики 13 см",
    description:
      "Графичный шахматный узор. Приятные округлые формы. Сочетание оттенков. Кашпо Konya делает ставку на оригинальность. Просто-напросто блестяще.",
    author: { name: "VASO", id: "2000001" },
    color: "#026646",
    colorName: "зелёный",
    characteristic: { Высота: "12 см", Диаметр: "13 см" },
    price: "630  руб",
    image: ["../img/pots/image (3).png", "../img/pots/image (4).png"],
  },
  {
    id: 100003,
    name: "Плетеное кашпо 13 см",
    description:
      "Ваши самые красивые растения будут смотреться великолепно в этом кашпо из сухих трав в аутентичном стиле.",
    author: { name: "VASO", id: "2000001" },
    color: "#EBDFCF",
    colorName: "бежевый",
    characteristic: { Высота: "15 см", Диаметр: "13 см" },
    price: "440  руб",
    image: ["../img/pots/image (5).png", "../img/pots/image (6).png"],
  },
  {
    id: 100004,
    name: "Ваза из дутого стекла В25,2 см",
    description:
      "Гармония и эстетика изгибов. Эта ваза из дутого стекла в виде шара играет тонкими оттенками цвета, полученного при окрашивании в массе.",
    author: { name: "BloomVessel", id: "2000002" },
    color: "#AD987B",
    colorName: "бежевый",
    characteristic: { Высота: "25,2 см", Диаметр: "17,7 см" },
    price: "700 руб",
    image: ["../img/pots/image (7).png", "../img/pots/image (8).png"],
  },
  {
    id: 100005,
    name: "Ваза из стекла В22 см",
    description:
      "Винтажный и структурированный дизайн. Ваза из стекла, вдохновленная стилем 70-х, с прямыми линиями и углами для лучшего преломления света.Разумеется, она подчеркнет ваши самые красивые букеты.",
    author: { name: "BloomVessel", id: "2000002" },
    color: "#D6BBB7",
    colorName: "розовый",
    characteristic: { Высота: "22 см", Диаметр: "14 см" },
    price: "850 руб",
    image: ["../img/pots/image (9).png", "../img/pots/image (10).png"],
  },
  {
    id: 100006,
    name: "Ваза из цветного стекла",
    description:
      "Ваза медово-янтарной расцветки - полноценное декоративное и функциональное изделие. Неравномерный принт, окрашенный в массе, и форма каждой вазы делают каждое изделие уникальным.",
    author: { name: "BloomVessel", id: "2000002" },
    color: "#E2A102",
    colorName: "жёлтый",
    characteristic: { Высота: "31 см", Диаметр: "16 см" },
    price: "480 руб",
    image: ["../img/pots/image (11).png", "../img/pots/image (12).png"],
  },
  {
    id: 100007,
    name: "Кашпо с шахматным принтом из керамики 14 см",
    description:
      "Играйте с графическими принтами и расцветками кашпо Ario, чтобы составить красивый декор для растений в вашем интерьере. Созданы из керамики, изготовлены и окрашены вручную в Португалии.",
    author: { name: "TerraRoots", id: "2000003" },
    color: "#C0B479",
    colorName: "зелёный",
    characteristic: { Высота: "14 см", Диаметр: "14 см" },
    price: "790 руб",
    image: ["../img/pots/image (13).png", "../img/pots/image (14).png"],
  },
  {
    id: 100008,
    name: "Ваза из дутого стекла В28 см",
    description:
      "Ее изящные и поразительные эффекты произведены руками мастера-стекольщика. Дутое матовое стекло создает рифленый и опаловый эффект. Наложенные части из стекла образуют лагуну с минеральной расцветкой между землей и морем.",
    author: { name: "TerraRoots", id: "2000003" },
    color: "#DDDFDA",
    colorName: "белый",
    characteristic: { Высота: "28 см", Диаметр: "23,5 см" },
    price: "990 руб",
    image: ["../img/pots/image (15).png", "../img/pots/image (16).png"],
  },
  {
    id: 100009,
    name: "Ваза из керамики в клетку В14,4 см",
    description:
      "Графичный скандинавский стиль, ручное производство: керамическая ваза Neios с узором в клетку и контрастным бортиком. Используйте ее отдельно или в сочетании с другими изделиями из коллекции.",
    author: { name: "TerraRoots", id: "2000003" },
    color: "#E3DED6",
    colorName: "бежевый",
    characteristic: { Высота: "14,4 см", Диаметр: "10,9 см" },
    price: "640 руб",
    image: ["../img/pots/image (17).png", "../img/pots/image (18).png"],
  },
  {
    id: 100010,
    name: "Кашпо на ножке из бамбука В35 см",
    description:
      "Кашпо на ножке из бамбука В35 см в ретро-стиле представляет кашпо на ножке, который придаст нотку шарма вашей гостиной или комнате.",
    author: { name: "Stelo", id: "2000004" },
    color: "#BB8F5E",
    colorName: "оранжевый",
    characteristic: { Высота: "35 см", Диаметр: "26 см" },
    price: "710 руб",
    image: ["../img/pots/image (19).png", "../img/pots/image (20).png"],
  },
  {
    id: 100011,
    name: "Кашпо из сплава алюминия",
    description:
      "Придайте размах и стиль вашему интерьеру с кашпо из сплава алюминия с очень привлекательным внешним видом.",
    author: { name: "Stelo", id: "2000004" },
    color: "#81756C",
    colorName: "серый",
    characteristic: { Высота: "29,2 см", Диаметр: "30,5 см" },
    price: "1222 руб",
    image: ["../img/pots/image (21).png", "../img/pots/image (22).png"],
  },
  {
    id: 100012,
    name: "Кашпо из цементного раствора",
    description:
      "Округлый кашпо с контрастом аутентичного горшка и металлической подставки.",
    author: { name: "Stelo", id: "2000004" },
    color: "#81756C",
    colorName: "серый",
    characteristic: { Высота: "18 см", Диаметр: "35 см" },
    price: "1179 руб",
    image: ["../img/pots/image (23).png", "../img/pots/image (24).png"],
  },
  {
    id: 100013,
    name: "Комплект из 2 подсвечников из алюминия",
    description:
      "Комплект из 2 подсвечников из алюминия Elda. Играйте с разницей по высоте и толщиной подсвечников Elda с черным покрытием и создайте свою особую атмосферу.",
    author: { name: "Kyma", id: "2000005" },
    color: "#393939",
    colorName: "черный",
    characteristic: { Высота: "30,5 см", Диаметр: "9 см" },
    price: "235 руб",
    image: ["../img/decor/image (1).png", "../img/decor/image (2).png"],
  },
  {
    id: 100014,
    name: "Комплект из 3 стеклянных подсвечников",
    description:
      "Стеклянные подсвечники Veli отличаются кристальной прозрачностью и чистым силуэтом. Комплект состоит из трех цилиндров из боросиликатного стекла разной высоты. Каждая свеча словно парит в воздухе, умножая тени. Три элегантных и современных подсвечника, которые можно расположить вместе или по отдельности.",
    author: { name: "Kyma", id: "2000005" },
    color: "#EEEEEE",
    colorName: "прозрачный",
    characteristic: { Высота: "9 см, 12 см, 15 см", Диаметр: "8 см" },
    price: "420 руб",
    image: ["../img/decor/image (3).png", "../img/decor/image (4).png"],
  },
  {
    id: 100015,
    name: "Подсвечник из стекла",
    description:
      "Подсвечник из стекла с изящным резным узором создает атмосферу. Его прозрачная текстура позволяет свету мягко рассеиваться.\nНаходясь на столе во время ужина или в качестве декора, он сочетается с другими моделями из коллекции для создания уникальной атмосферы.",
    author: { name: "Kyma", id: "2000005" },
    color: "#F6C68C",
    colorName: "янтарный",
    characteristic: { Высота: "10,3 см", Диаметр: "7 см" },
    price: "520 руб",
    image: ["../img/decor/image (5).png", "../img/decor/image (6).png"],
  },
  {
    id: 100016,
    name: "Светодиодная восковая свеча",
    description:
      "Светодиодные свечи станут идеальным дополнением интерьера во время праздников. Реалистичное свечение создает эффект пламени, при этом полностью исключая возможность возникновения пожара.",
    author: { name: "Lume", id: "2000006" },
    color: "#ECE1CD",
    colorName: "бежевый",
    characteristic: { Высота: "14,8 см", Диаметр: "7,5 см" },
    price: "945 руб",
    image: ["../img/decor/image (7).png", "../img/decor/image (8).png"],
  },
  {
    id: 100017,
    name: "Свеча восковая светодиодная",
    description:
      "Блестящая идея. Украсьте свечами Caspar интерьер своего дома и сразу же насладитесь теплой и праздничной атмосферой.",
    author: { name: "Lume", id: "2000006" },
    color: "#E9B89D",
    colorName: "персиковый",
    characteristic: { Высота: "14,8 см", Диаметр: "7,5 см" },
    price: "945 руб",
    image: ["../img/decor/image (9).png", "../img/decor/image (10).png"],
  },
  {
    id: 100018,
    name: "Набор из двух витых светодиодных свечей",
    description:
      "Светодиодные свечи станут идеальным дополнением интерьера во время праздников. Реалистичное свечение создает эффект пламени, при этом полностью исключая возможность возникновения пожара.",
    author: { name: "Lume", id: "2000006" },
    color: "#CCD2A6",
    colorName: "салатовый",
    characteristic: { Высота: "24,5 см", Диаметр: "2,4 см" },
    price: "945 руб",
    image: ["../img/decor/image (11).png", "../img/decor/image (12).png"],
  },
  {
    id: 100019,
    name: "Полотно из льна с рисунком",
    description:
      "Абстрактный рисунок в стиле 50-60-х. Полотно с рисунком Sculptural формата для создания искусного декора.",
    author: { name: "Aura", id: "2000007" },
    color: "#70616B",
    colorName: "серо-лиловый",
    characteristic: { Ширина: "70 см", Высота: "100 см", Толщина: "5,5 см" },
    price: "1562 руб",
    image: ["../img/decor/image (13).png", "../img/decor/image (14).png"],
  },
  {
    id: 100020,
    name: "Льняная декоративная доска",
    description:
      "Эта абстрактная композиция, выполненная на льняном холсте, представляет собой смелое сочетание цветов, выполненных в светлых и темных тонах, и геометрических фигур, напоминающих пазлы, - настоящая ода современному искусству. Вдохновленная техниками коллажа, придаст характер вашей гостиной или офису. Дайте волю своему творчеству и создайте свою собственную настенную галерею.",
    author: { name: "Aura", id: "2000007" },
    color: "#BDB4AB",
    colorName: "бежевый",
    characteristic: { Ширина: "60 см", Высота: "80 см", Толщина: "3,8 см" },
    price: "1680 руб",
    image: ["../img/decor/image (15).png", "../img/decor/image (16).png"],
  },
  {
    id: 100021,
    name: "Льняная декоративная доска",
    description:
      "Игра оттенков бежевого и зеленого в абстрактной графической композиции. Благодаря своим мягким оттенкам, которые легко сочетаются, она впишется в любой интерьер.",
    author: { name: "Aura", id: "2000007" },
    color: "#B9B497",
    colorName: "оливковый",
    characteristic: { Ширина: "80 см", Высота: "100 см", Толщина: "4,5 см" },
    price: "1700 руб",
    image: ["../img/decor/image (17).png", "../img/decor/image (18).png"],
  },
  {
    id: 100022,
    name: "Статуэтка в виде птички из стекла",
    description:
      "Предмет декора или идея для подарка -- статуэтка из стекла с радужными вкраплениями золотистого цвета. Выдуваемое ртом стекло придает изделию особенно элегантный, гладкий и блестящий эффект.",
    author: { name: "Gleam", id: "2000008" },
    color: "#AA885D",
    colorName: "золотистый",
    characteristic: { Высота: "7,5 см", Диаметр: "7 см" },
    price: "510 руб",
    image: ["../img/decor/image (19).png", "../img/decor/image (20).png"],
  },
  {
    id: 100023,
    name: "Комплект из трех настенных украшений в виде птиц",
    description:
      "Маленькие декоративные фигуры птиц. Символы весны, птицы приглашают к созерцанию.",
    author: { name: "Gleam", id: "2000008" },
    color: "#D6B885",
    colorName: "золотисто-бежевый",
    characteristic: {
      "Модель 1": "12,5 x 17 см",
      "Модель 2": "11 x 12,5 см",
      "Модель 3": "11 x 10,5 см",
    },
    price: "1765 руб",
    image: ["../img/decor/image (21).png", "../img/decor/image (22).png"],
  },
  {
    id: 100024,
    name: "Игра в крестики-нолики из травертина",
    description:
      "Полноценное декоративное изделие в виде игры из камня травертина. Брутальный рифленый материал, который сочетает аутентичность и современный дизайн. Изысканный предмет декора, идеальный для любой комнаты в вашем доме.",
    author: { name: "Gleam", id: "2000008" },
    color: "#D1BAA6",
    colorName: "бежевый",
    characteristic: { Ширина: "20,5 см", Толщина: "1,5 см" },
    price: "1225 руб",
    image: ["../img/decor/image (23).png", "../img/decor/image (24).png"],
  },
  {
    id: 100025,
    name: "Орхидея",
    description:
      "Нежный цветок с лепестками, напоминающими крылья бабочки, розового оттенка с плавными переходами, отличается длительным цветением и неприхотливостью в уходе.",
    author: { name: "Softness", id: "2000009" },
    color: "#F5BFD9",
    colorName: "розовый",
    characteristic: { "Кол-во штук": "1" },
    price: "500 руб",
    image: ["../img/products/image (1).png", "../img/products/image (2).png"],
  },
  {
    id: 100026,
    name: "Орхидея",
    description:
      "Изящный цветок с чистыми белоснежными лепестками, напоминающими крылья мотылька, символизирующий чистоту и элегантность, отличается долгим цветением и простотой в уходе.",
    author: { name: "Softness", id: "2000009" },
    color: "#EEEDF2",
    colorName: "белый",
    characteristic: { "Кол-во штук": "1" },
    price: "500 руб",
    image: ["../img/products/image (3).png", "../img/products/image (4).png"],
  },
  {
    id: 100027,
    name: "Орхидея",
    description:
      "Эффектный цветок с насыщенными сиреневыми лепестками, создающий атмосферу загадочности и роскоши.",
    author: { name: "Softness", id: "2000009" },
    color: "#EEEDF2",
    colorName: "сиреневый",
    characteristic: { "Кол-во штук": "1" },
    price: "500 руб",
    image: ["../img/products/image (5).png", "../img/products/image (6).png"],
  },
  {
    id: 100028,
    name: "Калла",
    description:
      "Элегантный цветок с гладкими, вытянутыми лепестками, образующими изящный воронковидный завиток, цветок символизирует благородство и чистоту.",
    author: { name: "Puzzle", id: "2000010" },
    color: "#DD98AA",
    colorName: "розово-лиловый",
    characteristic: { "Кол-во штук": "1" },
    price: "300 руб",
    image: ["../img/products/image (7).png", "../img/products/image (8).png"],
  },
  {
    id: 100029,
    name: "Лилия",
    description:
      "Розовая лилия — воздушный цветок с нежным окрасом и тонким ароматом, олицетворяющий романтику",
    author: { name: "Puzzle", id: "2000010" },
    color: "#F1D1DA",
    colorName: "розовый",
    characteristic: { "Кол-во штук": "1" },
    price: "300 руб",
    image: ["../img/products/image (9).png", "../img/products/image (10).png"],
  },
  {
    id: 100030,
    name: "Тюльпан",
    description:
      "Белый тюльпан — кристально чистый цветок с фарфоровой нежностью, знак искренних чувств",
    author: { name: "Puzzle", id: "2000010" },
    color: "#FDFBF1",
    colorName: "белый",
    characteristic: { "Кол-во штук": "1" },
    price: "150 руб",
    image: ["../img/products/image (11).png", "../img/products/image (12).png"],
  },
  {
    id: 100031,
    name: "Кактус",
    description:
      "Архитектурное растение с характером, символ выносливости и лаконичного стиля.",
    author: { name: "Pretty Green", id: "2000011" },
    color: "#355028",
    colorName: "темно-зеленый",
    characteristic: { "Кол-во штук": "1" },
    price: "300 руб",
    image: ["../img/products/image (13).png", "../img/products/image (14).png"],
  },
  {
    id: 100032,
    name: "Маленький кактус",
    description:
      "Очаровательный колючий комочек с плотным стеблем и миниатюрными иголками, будто созданный для уюта.",
    author: { name: "Pretty Green", id: "2000011" },
    color: "#607F4E",
    colorName: "зеленый",
    characteristic: { "Кол-во штук": "1" },
    price: "250 руб",
    image: ["../img/products/image (15).png", "../img/products/image (16).png"],
  },
  {
    id: 100033,
    name: "Алоэ вера",
    description:
      "Природный лекарь с внушительной розеткой листьев, сочетающий пользу и красоту",
    author: { name: "Pretty Green", id: "2000011" },
    color: "#6E8E4F",
    colorName: "травяной зеленый",
    characteristic: { "Кол-во штук": "1" },
    price: "1050 руб",
    image: ["../img/products/image (17).png", "../img/products/image (18).png"],
  },
  {
    id: 100034,
    name: "Суккулент зеленый",
    description:
      "Суккулент в горшке — неприхотливое живое украшение для дома или офиса, требующее минимального ухода и идеально подходящее для подарка.",
    author: { name: "Plump", id: "2000012" },
    color: "#9BBEAB",
    colorName: "мягкий зеленый",
    characteristic: { "Кол-во штук": "1" },
    price: "600 руб",
    image: ["../img/products/image (19).png", "../img/products/image (20).png"],
  },
  {
    id: 100035,
    name: "Суккулент розовый",
    description:
      "Суккулент в горшке — неприхотливое живое украшение для дома или офиса, требующее минимального ухода и идеально подходящее для подарка.",
    author: { name: "Plump", id: "2000012" },
    color: "#DEA0A8",
    colorName: "розовый",
    characteristic: { "Кол-во штук": "1" },
    price: "600 руб",
    image: ["../img/products/image (21).png", "../img/products/image (22).png"],
  },
  {
    id: 100036,
    name: "Суккулент фиолетовый + горшок",
    description:
      "Акция!Суккулент в горшке — неприхотливое живое украшение для дома или офиса, требующее минимального ухода и идеально подходящее для подарка.",
    author: { name: "Plump", id: "2000012" },
    color: "#897EAA",
    colorName: "фиолетовый",
    characteristic: { "Кол-во штук": "1" },
    price: "600 руб -> 400 руб ",
    image: ["../img/products/image (23).png", "../img/products/image (24).png"],
  },
];

const products = [
  {
    id: 100025,
    name: "Орхидея",
    description:
      "Нежный цветок с лепестками, напоминающими крылья бабочки, розового оттенка с плавными переходами, отличается длительным цветением и неприхотливостью в уходе.",
    author: { name: "Softness", id: "2000009" },
    color: "#F5BFD9",
    colorName: "розовый",
    characteristic: { "Кол-во штук": "1" },
    price: "500 руб",
    image: ["../img/products/image (1).png", "../img/products/image (2).png"],
  },
  {
    id: 100026,
    name: "Орхидея",
    description:
      "Изящный цветок с чистыми белоснежными лепестками, напоминающими крылья мотылька, символизирующий чистоту и элегантность, отличается долгим цветением и простотой в уходе.",
    author: { name: "Softness", id: "2000009" },
    color: "#EEEDF2",
    colorName: "белый",
    characteristic: { "Кол-во штук": "1" },
    price: "500 руб",
    image: ["../img/products/image (3).png", "../img/products/image (4).png"],
  },
  {
    id: 100027,
    name: "Орхидея",
    description:
      "Эффектный цветок с насыщенными сиреневыми лепестками, создающий атмосферу загадочности и роскоши.",
    author: { name: "Softness", id: "2000009" },
    color: "#EEEDF2",
    colorName: "сиреневый",
    characteristic: { "Кол-во штук": "1" },
    price: "500 руб",
    image: ["../img/products/image (5).png", "../img/products/image (6).png"],
  },
  {
    id: 100028,
    name: "Калла",
    description:
      "Элегантный цветок с гладкими, вытянутыми лепестками, образующими изящный воронковидный завиток, цветок символизирует благородство и чистоту.",
    author: { name: "Puzzle", id: "2000010" },
    color: "#DD98AA",
    colorName: "розово-лиловый",
    characteristic: { "Кол-во штук": "1" },
    price: "300 руб",
    image: ["../img/products/image (7).png", "../img/products/image (8).png"],
  },
  {
    id: 100029,
    name: "Лилия",
    description:
      "Розовая лилия — воздушный цветок с нежным окрасом и тонким ароматом, олицетворяющий романтику",
    author: { name: "Puzzle", id: "2000010" },
    color: "#F1D1DA",
    colorName: "розовый",
    characteristic: { "Кол-во штук": "1" },
    price: "300 руб",
    image: ["../img/products/image (9).png", "../img/products/image (10).png"],
  },
  {
    id: 100030,
    name: "Тюльпан",
    description:
      "Белый тюльпан — кристально чистый цветок с фарфоровой нежностью, знак искренних чувств",
    author: { name: "Puzzle", id: "2000010" },
    color: "#FDFBF1",
    colorName: "белый",
    characteristic: { "Кол-во штук": "1" },
    price: "150 руб",
    image: ["../img/products/image (11).png", "../img/products/image (12).png"],
  },
  {
    id: 100031,
    name: "Кактус",
    description:
      "Архитектурное растение с характером, символ выносливости и лаконичного стиля.",
    author: { name: "Pretty Green", id: "2000011" },
    color: "#355028",
    colorName: "темно-зеленый",
    characteristic: { "Кол-во штук": "1" },
    price: "300 руб",
    image: ["../img/products/image (13).png", "../img/products/image (14).png"],
  },
  {
    id: 100032,
    name: "Маленький кактус",
    description:
      "Очаровательный колючий комочек с плотным стеблем и миниатюрными иголками, будто созданный для уюта.",
    author: { name: "Pretty Green", id: "2000011" },
    color: "#607F4E",
    colorName: "зеленый",
    characteristic: { "Кол-во штук": "1" },
    price: "250 руб",
    image: ["../img/products/image (15).png", "../img/products/image (16).png"],
  },
  {
    id: 100033,
    name: "Алоэ вера",
    description:
      "Природный лекарь с внушительной розеткой листьев, сочетающий пользу и красоту",
    author: { name: "Pretty Green", id: "2000011" },
    color: "#6E8E4F",
    colorName: "травяной зеленый",
    characteristic: { "Кол-во штук": "1" },
    price: "1050 руб",
    image: ["../img/products/image (17).png", "../img/products/image (18).png"],
  },
  {
    id: 100034,
    name: "Суккулент зеленый",
    description:
      "Суккулент в горшке — неприхотливое живое украшение для дома или офиса, требующее минимального ухода и идеально подходящее для подарка.",
    author: { name: "Plump", id: "2000012" },
    color: "#9BBEAB",
    colorName: "мягкий зеленый",
    characteristic: { "Кол-во штук": "1" },
    price: "600 руб",
    image: ["../img/products/image (19).png", "../img/products/image (20).png"],
  },
  {
    id: 100035,
    name: "Суккулент розовый",
    description:
      "Суккулент в горшке — неприхотливое живое украшение для дома или офиса, требующее минимального ухода и идеально подходящее для подарка.",
    author: { name: "Plump", id: "2000012" },
    color: "#DEA0A8",
    colorName: "розовый",
    characteristic: { "Кол-во штук": "1" },
    price: "600 руб",
    image: ["../img/products/image (21).png", "../img/products/image (22).png"],
  },
  {
    id: 100036,
    name: "Суккулент фиолетовый + горшок",
    description:
      "Акция!Суккулент в горшке — неприхотливое живое украшение для дома или офиса, требующее минимального ухода и идеально подходящее для подарка.",
    author: { name: "Plump", id: "2000012" },
    color: "#897EAA",
    colorName: "фиолетовый",
    characteristic: { "Кол-во штук": "1" },
    price: "600 руб -> 400 руб ",
    image: ["../img/products/image (23).png", "../img/products/image (24).png"],
  },
];

const pots = [
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
    image: ["../img/pots/image (1).png", "../img/pots/image (2).png"],
  },
  {
    id: 100002,
    name: "Кашпо двухцветное из керамики 13 см",
    description:
      "Графичный шахматный узор. Приятные округлые формы. Сочетание оттенков. Кашпо Konya делает ставку на оригинальность. Просто-напросто блестяще.",
    author: { name: "VASO", id: "2000001" },
    color: "#026646",
    colorName: "зелёный",
    characteristic: { Высота: "12 см", Диаметр: "13 см" },
    price: "630  руб",
    image: ["../img/pots/image (3).png", "../img/pots/image (4).png"],
  },
  {
    id: 100003,
    name: "Плетеное кашпо 13 см",
    description:
      "Ваши самые красивые растения будут смотреться великолепно в этом кашпо из сухих трав в аутентичном стиле.",
    author: { name: "VASO", id: "2000001" },
    color: "#EBDFCF",
    colorName: "бежевый",
    characteristic: { Высота: "15 см", Диаметр: "13 см" },
    price: "440  руб",
    image: ["../img/pots/image (5).png", "../img/pots/image (6).png"],
  },
  {
    id: 100004,
    name: "Ваза из дутого стекла В25,2 см",
    description:
      "Гармония и эстетика изгибов. Эта ваза из дутого стекла в виде шара играет тонкими оттенками цвета, полученного при окрашивании в массе.",
    author: { name: "BloomVessel", id: "2000002" },
    color: "#AD987B",
    colorName: "бежевый",
    characteristic: { Высота: "25,2 см", Диаметр: "17,7 см" },
    price: "700 руб",
    image: ["../img/pots/image (7).png", "../img/pots/image (8).png"],
  },
  {
    id: 100005,
    name: "Ваза из стекла В22 см",
    description:
      "Винтажный и структурированный дизайн. Ваза из стекла, вдохновленная стилем 70-х, с прямыми линиями и углами для лучшего преломления света.Разумеется, она подчеркнет ваши самые красивые букеты.",
    author: { name: "BloomVessel", id: "2000002" },
    color: "#D6BBB7",
    colorName: "розовый",
    characteristic: { Высота: "22 см", Диаметр: "14 см" },
    price: "850 руб",
    image: ["../img/pots/image (9).png", "../img/pots/image (10).png"],
  },
  {
    id: 100006,
    name: "Ваза из цветного стекла",
    description:
      "Ваза медово-янтарной расцветки - полноценное декоративное и функциональное изделие. Неравномерный принт, окрашенный в массе, и форма каждой вазы делают каждое изделие уникальным.",
    author: { name: "BloomVessel", id: "2000002" },
    color: "#E2A102",
    colorName: "жёлтый",
    characteristic: { Высота: "31 см", Диаметр: "16 см" },
    price: "480 руб",
    image: ["../img/pots/image (11).png", "../img/pots/image (12).png"],
  },
  {
    id: 100007,
    name: "Кашпо с шахматным принтом из керамики 14 см",
    description:
      "Играйте с графическими принтами и расцветками кашпо Ario, чтобы составить красивый декор для растений в вашем интерьере. Созданы из керамики, изготовлены и окрашены вручную в Португалии.",
    author: { name: "TerraRoots", id: "2000003" },
    color: "#C0B479",
    colorName: "зелёный",
    characteristic: { Высота: "14 см", Диаметр: "14 см" },
    price: "790 руб",
    image: ["../img/pots/image (13).png", "../img/pots/image (14).png"],
  },
  {
    id: 100008,
    name: "Ваза из дутого стекла В28 см",
    description:
      "Ее изящные и поразительные эффекты произведены руками мастера-стекольщика. Дутое матовое стекло создает рифленый и опаловый эффект. Наложенные части из стекла образуют лагуну с минеральной расцветкой между землей и морем.",
    author: { name: "TerraRoots", id: "2000003" },
    color: "#DDDFDA",
    colorName: "белый",
    characteristic: { Высота: "28 см", Диаметр: "23,5 см" },
    price: "990 руб",
    image: ["../img/pots/image (15).png", "../img/pots/image (16).png"],
  },
  {
    id: 100009,
    name: "Ваза из керамики в клетку В14,4 см",
    description:
      "Графичный скандинавский стиль, ручное производство: керамическая ваза Neios с узором в клетку и контрастным бортиком. Используйте ее отдельно или в сочетании с другими изделиями из коллекции.",
    author: { name: "TerraRoots", id: "2000003" },
    color: "#E3DED6",
    colorName: "бежевый",
    characteristic: { Высота: "14,4 см", Диаметр: "10,9 см" },
    price: "640 руб",
    image: ["../img/pots/image (17).png", "../img/pots/image (18).png"],
  },
  {
    id: 100010,
    name: "Кашпо на ножке из бамбука В35 см",
    description:
      "Кашпо на ножке из бамбука В35 см в ретро-стиле представляет кашпо на ножке, который придаст нотку шарма вашей гостиной или комнате.",
    author: { name: "Stelo", id: "2000004" },
    color: "#BB8F5E",
    colorName: "оранжевый",
    characteristic: { Высота: "35 см", Диаметр: "26 см" },
    price: "710 руб",
    image: ["../img/pots/image (19).png", "../img/pots/image (20).png"],
  },
  {
    id: 100011,
    name: "Кашпо из сплава алюминия",
    description:
      "Придайте размах и стиль вашему интерьеру с кашпо из сплава алюминия с очень привлекательным внешним видом.",
    author: { name: "Stelo", id: "2000004" },
    color: "#81756C",
    colorName: "серый",
    characteristic: { Высота: "29,2 см", Диаметр: "30,5 см" },
    price: "1222 руб",
    image: ["../img/pots/image (21).png", "../img/pots/image (22).png"],
  },
  {
    id: 100012,
    name: "Кашпо из цементного раствора",
    description:
      "Округлый кашпо с контрастом аутентичного горшка и металлической подставки.",
    author: { name: "Stelo", id: "2000004" },
    color: "#81756C",
    colorName: "серый",
    characteristic: { Высота: "18 см", Диаметр: "35 см" },
    price: "1179 руб",
    image: ["../img/pots/image (23).png", "../img/pots/image (24).png"],
  },
];

const decor = [
  {
    id: 100013,
    name: "Комплект из 2 подсвечников из алюминия",
    description:
      "Комплект из 2 подсвечников из алюминия Elda. Играйте с разницей по высоте и толщиной подсвечников Elda с черным покрытием и создайте свою особую атмосферу.",
    author: { name: "Kyma", id: "2000005" },
    color: "#393939",
    colorName: "черный",
    characteristic: { Высота: "30,5 см", Диаметр: "9 см" },
    price: "235 руб",
    image: ["../img/decor/image (1).png", "../img/decor/image (2).png"],
  },
  {
    id: 100014,
    name: "Комплект из 3 стеклянных подсвечников",
    description:
      "Стеклянные подсвечники Veli отличаются кристальной прозрачностью и чистым силуэтом. Комплект состоит из трех цилиндров из боросиликатного стекла разной высоты. Каждая свеча словно парит в воздухе, умножая тени. Три элегантных и современных подсвечника, которые можно расположить вместе или по отдельности.",
    author: { name: "Kyma", id: "2000005" },
    color: "#EEEEEE",
    colorName: "прозрачный",
    characteristic: { Высота: "9 см, 12 см, 15 см", Диаметр: "8 см" },
    price: "420 руб",
    image: ["../img/decor/image (3).png", "../img/decor/image (4).png"],
  },
  {
    id: 100015,
    name: "Подсвечник из стекла",
    description:
      "Подсвечник из стекла с изящным резным узором создает атмосферу. Его прозрачная текстура позволяет свету мягко рассеиваться.\nНаходясь на столе во время ужина или в качестве декора, он сочетается с другими моделями из коллекции для создания уникальной атмосферы.",
    author: { name: "Kyma", id: "2000005" },
    color: "#F6C68C",
    colorName: "янтарный",
    characteristic: { Высота: "10,3 см", Диаметр: "7 см" },
    price: "520 руб",
    image: ["../img/decor/image (5).png", "../img/decor/image (6).png"],
  },
  {
    id: 100016,
    name: "Светодиодная восковая свеча",
    description:
      "Светодиодные свечи станут идеальным дополнением интерьера во время праздников. Реалистичное свечение создает эффект пламени, при этом полностью исключая возможность возникновения пожара.",
    author: { name: "Lume", id: "2000006" },
    color: "#ECE1CD",
    colorName: "бежевый",
    characteristic: { Высота: "14,8 см", Диаметр: "7,5 см" },
    price: "945 руб",
    image: ["../img/decor/image (7).png", "../img/decor/image (8).png"],
  },
  {
    id: 100017,
    name: "Свеча восковая светодиодная",
    description:
      "Блестящая идея. Украсьте свечами Caspar интерьер своего дома и сразу же насладитесь теплой и праздничной атмосферой.",
    author: { name: "Lume", id: "2000006" },
    color: "#E9B89D",
    colorName: "персиковый",
    characteristic: { Высота: "14,8 см", Диаметр: "7,5 см" },
    price: "945 руб",
    image: ["../img/decor/image (9).png", "../img/decor/image (10).png"],
  },
  {
    id: 100018,
    name: "Набор из двух витых светодиодных свечей",
    description:
      "Светодиодные свечи станут идеальным дополнением интерьера во время праздников. Реалистичное свечение создает эффект пламени, при этом полностью исключая возможность возникновения пожара.",
    author: { name: "Lume", id: "2000006" },
    color: "#CCD2A6",
    colorName: "салатовый",
    characteristic: { Высота: "24,5 см", Диаметр: "2,4 см" },
    price: "945 руб",
    image: ["../img/decor/image (11).png", "../img/decor/image (12).png"],
  },
  {
    id: 100019,
    name: "Полотно из льна с рисунком",
    description:
      "Абстрактный рисунок в стиле 50-60-х. Полотно с рисунком Sculptural формата для создания искусного декора.",
    author: { name: "Aura", id: "2000007" },
    color: "#70616B",
    colorName: "серо-лиловый",
    characteristic: { Ширина: "70 см", Высота: "100 см", Толщина: "5,5 см" },
    price: "1562 руб",
    image: ["../img/decor/image (13).png", "../img/decor/image (14).png"],
  },
  {
    id: 100020,
    name: "Льняная декоративная доска",
    description:
      "Эта абстрактная композиция, выполненная на льняном холсте, представляет собой смелое сочетание цветов, выполненных в светлых и темных тонах, и геометрических фигур, напоминающих пазлы, - настоящая ода современному искусству. Вдохновленная техниками коллажа, придаст характер вашей гостиной или офису. Дайте волю своему творчеству и создайте свою собственную настенную галерею.",
    author: { name: "Aura", id: "2000007" },
    color: "#BDB4AB",
    colorName: "бежевый",
    characteristic: { Ширина: "60 см", Высота: "80 см", Толщина: "3,8 см" },
    price: "1680 руб",
    image: ["../img/decor/image (15).png", "../img/decor/image (16).png"],
  },
  {
    id: 100021,
    name: "Льняная декоративная доска",
    description:
      "Игра оттенков бежевого и зеленого в абстрактной графической композиции. Благодаря своим мягким оттенкам, которые легко сочетаются, она впишется в любой интерьер.",
    author: { name: "Aura", id: "2000007" },
    color: "#B9B497",
    colorName: "оливковый",
    characteristic: { Ширина: "80 см", Высота: "100 см", Толщина: "4,5 см" },
    price: "1700 руб",
    image: ["../img/decor/image (17).png", "../img/decor/image (18).png"],
  },
  {
    id: 100022,
    name: "Статуэтка в виде птички из стекла",
    description:
      "Предмет декора или идея для подарка -- статуэтка из стекла с радужными вкраплениями золотистого цвета. Выдуваемое ртом стекло придает изделию особенно элегантный, гладкий и блестящий эффект.",
    author: { name: "Gleam", id: "2000008" },
    color: "#AA885D",
    colorName: "золотистый",
    characteristic: { Высота: "7,5 см", Диаметр: "7 см" },
    price: "510 руб",
    image: ["../img/decor/image (19).png", "../img/decor/image (20).png"],
  },
  {
    id: 100023,
    name: "Комплект из трех настенных украшений в виде птиц",
    description:
      "Маленькие декоративные фигуры птиц. Символы весны, птицы приглашают к созерцанию.",
    author: { name: "Gleam", id: "2000008" },
    color: "#D6B885",
    colorName: "золотисто-бежевый",
    characteristic: {
      "Модель 1": "12,5 x 17 см",
      "Модель 2": "11 x 12,5 см",
      "Модель 3": "11 x 10,5 см",
    },
    price: "1765 руб",
    image: ["../img/decor/image (21).png", "../img/decor/image (22).png"],
  },
  {
    id: 100024,
    name: "Игра в крестики-нолики из травертина",
    description:
      "Полноценное декоративное изделие в виде игры из камня травертина. Брутальный рифленый материал, который сочетает аутентичность и современный дизайн. Изысканный предмет декора, идеальный для любой комнаты в вашем доме.",
    author: { name: "Gleam", id: "2000008" },
    color: "#D1BAA6",
    colorName: "бежевый",
    characteristic: { Ширина: "20,5 см", Толщина: "1,5 см" },
    price: "1225 руб",
    image: ["../img/decor/image (23).png", "../img/decor/image (24).png"],
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
        <img src="${product.image[0]}" alt="${product.name}" style="
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
  displayProducts(pots, "products-container-2");
  displayProducts(decor, "products-container-3");
};

function navigateToProduct(productId) {
  const productData = productsDatabase[productId - 100001];
  if (productData !== undefined) {
    window.location.href = `product.html?data=${encodeURIComponent(
      JSON.stringify(productData)
    )}`;
  } else {
    console.log(productId, productId - 100001);
  }
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
