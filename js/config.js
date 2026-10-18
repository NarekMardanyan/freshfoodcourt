/*
 * ============================================================
 *  FRESH FOOD COURT — site content
 *  Edit this file to change contacts, hours, menu and promos.
 *  Every text has three versions: en / ru / hy.
 *  Photos: put files into images/menu or images/promo and set
 *  the "image" path. If the file is missing, a colored
 *  placeholder with an emoji is shown instead.
 * ============================================================
 */

const SITE = {
  // ---------- CONTACTS (placeholders — replace with real ones) ----------
  contacts: {
    phone: "+374 00 000 000",          // shown on the site
    phoneLink: "+37400000000",         // used in tel: link (no spaces)
    whatsapp: "37400000000",           // number for wa.me (no + and spaces)
    telegram: "freshfoodcourt",        // Telegram username without @
    instagram: "freshfoodcourt",       // Instagram username without @
    address: {
      en: "1 Example Street, Yerevan, Armenia",
      ru: "ул. Примерная, 1, Ереван, Армения",
      hy: "Օրինակելի փող. 1, Երևան, Հայաստան",
    },
    // Map: coordinates of the venue (currently central Yerevan)
    map: { lat: 40.1792, lng: 44.4991, zoom: 16 },
  },

  // ---------- OPENING HOURS ----------
  // days: 1 = Monday ... 7 = Sunday. Times in 24h "HH:MM".
  hours: [
    { days: [1, 2, 3, 4, 5], open: "10:00", close: "23:00" },
    { days: [6, 7], open: "11:00", close: "00:00" },
  ],

  // ---------- DELIVERY ----------
  delivery: {
    minOrder: 3000,        // AMD
    freeFrom: 7000,        // AMD
    price: 500,            // AMD, delivery cost below freeFrom
    time: "30–50",         // minutes
  },

  currency: { en: "AMD", ru: "֏", hy: "֏" },

  // ---------- MENU ----------
  categories: [
    { id: "shawarma", emoji: "🌯", name: { en: "Shawarma", ru: "Шаурма", hy: "Շաուրմա" } },
    { id: "burgers",  emoji: "🍔", name: { en: "Burgers",  ru: "Бургеры", hy: "Բուրգերներ" } },
    { id: "hotdogs",  emoji: "🌭", name: { en: "Hot dogs", ru: "Хот-доги", hy: "Հոթ-դոգեր" } },
    { id: "sides",    emoji: "🍟", name: { en: "Sides",    ru: "Закуски", hy: "Խորտիկներ" } },
    { id: "drinks",   emoji: "🥤", name: { en: "Drinks",   ru: "Напитки", hy: "Ըմպելիքներ" } },
  ],

  menu: [
    // ---- Shawarma ----
    {
      category: "shawarma", price: 1500, image: "images/menu/shawarma-chicken.jpg", tag: "hit",
      name: { en: "Chicken Shawarma", ru: "Шаурма с курицей", hy: "Հավով շաուրմա" },
      desc: {
        en: "Juicy grilled chicken, fresh vegetables, pickles and garlic sauce in thin lavash.",
        ru: "Сочная курица на гриле, свежие овощи, соленья и чесночный соус в тонком лаваше.",
        hy: "Հյութալի խորոված հավ, թարմ բանջարեղեն, թթու և սխտորով սոուս բարակ լավաշի մեջ։",
      },
    },
    {
      category: "shawarma", price: 1900, image: "images/menu/shawarma-beef.jpg",
      name: { en: "Beef Shawarma", ru: "Шаурма с говядиной", hy: "Տավարի մսով շաուրմա" },
      desc: {
        en: "Tender spiced beef, tomatoes, onions, herbs and tahini sauce.",
        ru: "Нежная говядина со специями, помидоры, лук, зелень и соус тахини.",
        hy: "Փափուկ համեմված տավարի միս, լոլիկ, սոխ, կանաչի և թահինի սոուս։",
      },
    },
    {
      category: "shawarma", price: 2200, image: "images/menu/shawarma-xl.jpg", tag: "new",
      name: { en: "Shawarma XL", ru: "Шаурма XL", hy: "Շաուրմա XL" },
      desc: {
        en: "Double meat, cheese, fries inside and our signature sauce. For the really hungry.",
        ru: "Двойное мясо, сыр, картофель фри внутри и фирменный соус. Для очень голодных.",
        hy: "Կրկնակի միս, պանիր, ֆրի ներսում և մեր հատուկ սոուսը։ Շատ սոված լինողների համար։",
      },
    },
    {
      category: "shawarma", price: 1800, image: "images/menu/shawarma-plate.jpg",
      name: { en: "Shawarma Plate", ru: "Шаурма на тарелке", hy: "Շաուրմա ափսեով" },
      desc: {
        en: "Chicken shawarma meat with fries, salad, lavash and two sauces.",
        ru: "Мясо шаурмы с картофелем фри, салатом, лавашом и двумя соусами.",
        hy: "Շաուրմայի միս ֆրիով, աղցանով, լավաշով և երկու սոուսով։",
      },
    },
    {
      category: "shawarma", price: 1400, image: "images/menu/shawarma-veggie.jpg",
      name: { en: "Veggie Shawarma", ru: "Вегетарианская шаурма", hy: "Բուսական շաուրմա" },
      desc: {
        en: "Falafel, hummus, grilled vegetables and fresh greens.",
        ru: "Фалафель, хумус, овощи гриль и свежая зелень.",
        hy: "Ֆալաֆել, հումուս, խորոված բանջարեղեն և թարմ կանաչի։",
      },
    },

    // ---- Burgers ----
    {
      category: "burgers", price: 2200, image: "images/menu/burger-classic.jpg", tag: "hit",
      name: { en: "Classic Burger", ru: "Классический бургер", hy: "Դասական բուրգեր" },
      desc: {
        en: "Beef patty, cheddar, lettuce, tomato, pickles and house sauce in a brioche bun.",
        ru: "Говяжья котлета, чеддер, салат, помидор, огурчики и фирменный соус в бриошь.",
        hy: "Տավարի կոտլետ, չեդեր, հազար, լոլիկ, թթու վարունգ և հատուկ սոուս բրիոշ բուլկիով։",
      },
    },
    {
      category: "burgers", price: 2900, image: "images/menu/burger-double.jpg",
      name: { en: "Double Cheeseburger", ru: "Двойной чизбургер", hy: "Կրկնակի չիզբուրգեր" },
      desc: {
        en: "Two beef patties, double cheddar, caramelized onions and BBQ sauce.",
        ru: "Две говяжьи котлеты, двойной чеддер, карамелизированный лук и соус барбекю.",
        hy: "Երկու տավարի կոտլետ, կրկնակի չեդեր, կարամելացված սոխ և BBQ սոուս։",
      },
    },
    {
      category: "burgers", price: 2100, image: "images/menu/burger-chicken.jpg",
      name: { en: "Crispy Chicken Burger", ru: "Бургер с хрустящей курицей", hy: "Խրթխրթան հավով բուրգեր" },
      desc: {
        en: "Crispy chicken fillet, coleslaw, pickles and spicy mayo.",
        ru: "Хрустящее куриное филе, коул-слоу, огурчики и острый майонез.",
        hy: "Խրթխրթան հավի ֆիլե, կաղամբով աղցան, թթու վարունգ և կծու մայոնեզ։",
      },
    },

    // ---- Hot dogs ----
    {
      category: "hotdogs", price: 1200, image: "images/menu/hotdog-classic.jpg",
      name: { en: "Classic Hot Dog", ru: "Классический хот-дог", hy: "Դասական հոթ-դոգ" },
      desc: {
        en: "Grilled sausage, ketchup, mustard and crispy onions.",
        ru: "Сосиска гриль, кетчуп, горчица и хрустящий лук.",
        hy: "Խորոված նրբերշիկ, կետչուպ, մանանեխ և խրթխրթան սոխ։",
      },
    },
    {
      category: "hotdogs", price: 1500, image: "images/menu/hotdog-cheese.jpg", tag: "new",
      name: { en: "Cheese Dog", ru: "Хот-дог с сыром", hy: "Պանրով հոթ-դոգ" },
      desc: {
        en: "Smoked sausage, melted cheese sauce, jalapeños and fresh herbs.",
        ru: "Копчёная сосиска, сырный соус, халапеньо и свежая зелень.",
        hy: "Ապխտած նրբերշիկ, հալած պանրի սոուս, հալապենյո և թարմ կանաչի։",
      },
    },

    // ---- Sides ----
    {
      category: "sides", price: 800, image: "images/menu/fries.jpg",
      name: { en: "French Fries", ru: "Картофель фри", hy: "Կարտոֆիլ ֆրի" },
      desc: {
        en: "Golden and crispy, with a sauce of your choice.",
        ru: "Золотистый и хрустящий, с соусом на выбор.",
        hy: "Ոսկեգույն և խրթխրթան, ձեր ընտրած սոուսով։",
      },
    },
    {
      category: "sides", price: 1600, image: "images/menu/nuggets.jpg",
      name: { en: "Chicken Nuggets (9 pcs)", ru: "Наггетсы (9 шт.)", hy: "Նագեթսներ (9 հատ)" },
      desc: {
        en: "Tender chicken in a crispy coating with sweet chili sauce.",
        ru: "Нежная курица в хрустящей панировке с соусом сладкий чили.",
        hy: "Փափուկ հավ խրթխրթան պանիրովկայով, քաղցր չիլի սոուսով։",
      },
    },
    {
      category: "sides", price: 1300, image: "images/menu/salad.jpg",
      name: { en: "Fresh Salad", ru: "Свежий салат", hy: "Թարմ աղցան" },
      desc: {
        en: "Cucumbers, tomatoes, peppers, greens and lemon-olive dressing.",
        ru: "Огурцы, помидоры, перец, зелень и лимонно-оливковая заправка.",
        hy: "Վարունգ, լոլիկ, պղպեղ, կանաչի և կիտրոնաձիթապտղային սոուս։",
      },
    },

    // ---- Drinks ----
    {
      category: "drinks", price: 500, image: "images/menu/cola.jpg",
      name: { en: "Coca-Cola 0.5 L", ru: "Coca-Cola 0,5 л", hy: "Coca-Cola 0,5 լ" },
      desc: { en: "Ice cold.", ru: "Ледяная.", hy: "Սառը։" },
    },
    {
      category: "drinks", price: 600, image: "images/menu/tan.jpg", tag: "hit",
      name: { en: "Tan", ru: "Тан", hy: "Թան" },
      desc: {
        en: "Traditional Armenian yogurt drink — perfect with shawarma.",
        ru: "Традиционный армянский кисломолочный напиток — идеально к шаурме.",
        hy: "Ավանդական հայկական ըմպելիք՝ իդեալական շաուրմայի հետ։",
      },
    },
    {
      category: "drinks", price: 900, image: "images/menu/lemonade.jpg",
      name: { en: "Homemade Lemonade", ru: "Домашний лимонад", hy: "Տնական լիմոնադ" },
      desc: {
        en: "Lemon, mint and a little sweetness. Also with tarragon.",
        ru: "Лимон, мята и немного сладости. Есть с тархуном.",
        hy: "Կիտրոն, անանուխ և մի քիչ քաղցրություն։ Կա նաև թարխունով։",
      },
    },
    {
      category: "drinks", price: 400, image: "images/menu/water.jpg",
      name: { en: "Mineral Water", ru: "Минеральная вода", hy: "Հանքային ջուր" },
      desc: { en: "Jermuk / Bjni, 0.5 L.", ru: "Джермук / Бжни, 0,5 л.", hy: "Ջերմուկ / Բջնի, 0,5 լ։" },
    },
  ],

  // ---------- PROMOS ----------
  promos: [
    {
      emoji: "🎉", color: "orange", image: "images/promo/combo.jpg",
      title: { en: "Combo of the day", ru: "Комбо дня", hy: "Օրվա կոմբո" },
      text: {
        en: "Shawarma + fries + drink for just 2 500 AMD.",
        ru: "Шаурма + картофель фри + напиток всего за 2 500 ֏.",
        hy: "Շաուրմա + ֆրի + ըմպելիք ընդամենը 2 500 ֏։",
      },
    },
    {
      emoji: "🕒", color: "green", image: "images/promo/happy-hours.jpg",
      title: { en: "Happy hours", ru: "Счастливые часы", hy: "Երջանիկ ժամեր" },
      text: {
        en: "−20% on all burgers on weekdays from 15:00 to 17:00.",
        ru: "−20% на все бургеры по будням с 15:00 до 17:00.",
        hy: "−20% բոլոր բուրգերների համար աշխատանքային օրերին 15:00-ից 17:00։",
      },
    },
    {
      emoji: "🎂", color: "orange", image: "images/promo/birthday.jpg",
      title: { en: "Birthday gift", ru: "Подарок в день рождения", hy: "Նվեր ծննդյան օրը" },
      text: {
        en: "Free shawarma on your birthday — just show your ID.",
        ru: "Бесплатная шаурма в ваш день рождения — просто покажите документ.",
        hy: "Անվճար շաուրմա ձեր ծննդյան օրը՝ պարզապես ցույց տվեք անձնագիրը։",
      },
    },
  ],
};
