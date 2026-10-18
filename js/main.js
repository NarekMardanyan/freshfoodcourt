(function () {
  "use strict";

  const LANGS = ["en", "ru", "hy"];
  const STORAGE_KEY = "ffc-lang";
  let lang = detectLang();
  let activeCategory = "all";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- language ----------
  function detectLang() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (LANGS.includes(saved)) return saved;
    } catch (e) { /* storage unavailable */ }
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : "en";
  }

  function t(key, vars) {
    let str = (I18N[lang] && I18N[lang][key]) ?? I18N.en[key] ?? key;
    if (vars && typeof str === "string") {
      Object.keys(vars).forEach((k) => { str = str.replace(`{${k}}`, vars[k]); });
    }
    return str;
  }

  const pick = (obj) => (obj && (obj[lang] ?? obj.en)) || "";

  function formatPrice(amount) {
    const num = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${num} ${pick(SITE.currency)}`;
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    render();
  }

  // ---------- images with emoji fallback ----------
  function attachFallback(img) {
    const showFallback = () => {
      const box = img.parentElement;
      box.classList.add("is-placeholder");
      box.setAttribute("data-emoji", img.dataset.fallback || "🍽️");
      img.remove();
    };
    if (img.complete && img.naturalWidth === 0) showFallback();
    else img.addEventListener("error", showFallback, { once: true });
  }

  // ---------- static texts ----------
  function renderTexts() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$("[data-lang]").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.lang === lang);
      b.setAttribute("aria-pressed", b.dataset.lang === lang);
    });
  }

  // ---------- menu ----------
  function renderTabs() {
    const tabs = $("#menuTabs");
    const all = { id: "all", emoji: "⭐", name: { en: t("menu.all"), ru: t("menu.all"), hy: t("menu.all") } };
    tabs.innerHTML = [all, ...SITE.categories].map((c) => `
      <button type="button" role="tab" class="tab ${c.id === activeCategory ? "is-active" : ""}"
        data-cat="${c.id}" aria-selected="${c.id === activeCategory}">
        <span>${c.emoji}</span>${pick(c.name)}
      </button>`).join("");
  }

  function renderMenu() {
    const grid = $("#menuGrid");
    const catEmoji = Object.fromEntries(SITE.categories.map((c) => [c.id, c.emoji]));
    const items = SITE.menu.filter((i) => activeCategory === "all" || i.category === activeCategory);

    grid.innerHTML = items.map((item) => `
      <article class="card">
        <div class="card__media">
          <img src="${item.image}" alt="${pick(item.name)}" loading="lazy" data-fallback="${catEmoji[item.category] || "🍽️"}">
          ${item.tag ? `<span class="card__tag card__tag--${item.tag}">${t("tag." + item.tag)}</span>` : ""}
        </div>
        <div class="card__body">
          <h3 class="card__title">${pick(item.name)}</h3>
          <p class="card__desc">${pick(item.desc)}</p>
          <div class="card__footer">
            <span class="card__price">${formatPrice(item.price)}</span>
            <button type="button" class="card__btn" data-order aria-label="${t("cta.order")}">+</button>
          </div>
        </div>
      </article>`).join("");

    $$("img", grid).forEach(attachFallback);
  }

  // ---------- promos ----------
  function renderPromos() {
    const grid = $("#promoGrid");
    grid.innerHTML = SITE.promos.map((p) => `
      <article class="promo promo--${p.color}">
        <div class="promo__media">
          <img src="${p.image}" alt="" loading="lazy" data-fallback="${p.emoji}">
        </div>
        <div class="promo__body">
          <h3>${pick(p.title)}</h3>
          <p>${pick(p.text)}</p>
        </div>
      </article>`).join("");
    $$("img", grid).forEach(attachFallback);
  }

  // ---------- delivery ----------
  function renderDelivery() {
    const d = SITE.delivery;
    $("#dTime").textContent = t("delivery.timeValue", { time: d.time });
    $("#dMin").textContent = formatPrice(d.minOrder);
    $("#dPrice").textContent = formatPrice(d.price);
    $("#dFree").textContent = t("delivery.freeValue", { amount: formatPrice(d.freeFrom) });
  }

  // ---------- hours ----------
  const toMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

  function yerevanNow() {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Yerevan", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type).value;
    const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday")) + 1;
    return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
  }

  function isOpenNow() {
    const { day, minutes } = yerevanNow();
    const prevDay = day === 1 ? 7 : day - 1;
    return SITE.hours.some((h) => {
      const open = toMin(h.open);
      let close = toMin(h.close);
      if (close <= open) close += 24 * 60; // closes after midnight
      if (h.days.includes(day) && minutes >= open && minutes < close) return true;
      // still open from yesterday's late shift
      return h.days.includes(prevDay) && close > 24 * 60 && minutes < close - 24 * 60;
    });
  }

  function renderHours() {
    const names = t("days.short");
    const { day } = yerevanNow();
    $("#hoursList").innerHTML = SITE.hours.map((h) => {
      const sorted = [...h.days].sort();
      const contiguous = sorted.every((d, i) => i === 0 || d === sorted[i - 1] + 1);
      const label = contiguous && sorted.length > 1
        ? `${names[sorted[0] - 1]}–${names[sorted[sorted.length - 1] - 1]}`
        : sorted.map((d) => names[d - 1]).join(", ");
      return `<li class="${h.days.includes(day) ? "is-today" : ""}"><span>${label}</span><b>${h.open} – ${h.close}</b></li>`;
    }).join("");

    const open = isOpenNow();
    const status = $("#openStatus");
    status.textContent = t(open ? "hours.openNow" : "hours.closedNow");
    status.classList.toggle("status--open", open);
    status.classList.toggle("status--closed", !open);
  }

  // ---------- contacts ----------
  function renderContacts() {
    const c = SITE.contacts;
    const msg = encodeURIComponent(t("order.message"));
    const links = {
      whatsapp: `https://wa.me/${c.whatsapp}?text=${msg}`,
      telegram: `https://t.me/${c.telegram}`,
      instagram: `https://instagram.com/${c.instagram}`,
    };
    $$("[data-social]").forEach((a) => { a.href = links[a.dataset.social]; });

    $("#cAddress").textContent = pick(c.address);
    $("#cPhone").textContent = c.phone;
    $("#cPhone").href = `tel:${c.phoneLink}`;
    $("#orderCall").href = `tel:${c.phoneLink}`;
    $("#cRoute").href = `https://www.google.com/maps/dir/?api=1&destination=${c.map.lat},${c.map.lng}`;

    const mapSrc = `https://maps.google.com/maps?q=${c.map.lat},${c.map.lng}&z=${c.map.zoom}&hl=${lang}&output=embed`;
    const map = $("#cMap");
    if (map.getAttribute("src") !== mapSrc) map.src = mapSrc;
  }

  function render() {
    renderTexts();
    renderTabs();
    renderMenu();
    renderPromos();
    renderDelivery();
    renderHours();
    renderContacts();
  }

  // ---------- order modal ----------
  const modal = $("#orderModal");
  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    $(".modal__actions a", modal).focus({ preventScroll: true });
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  // ---------- events ----------
  document.addEventListener("click", (e) => {
    const langBtn = e.target.closest("[data-lang]");
    if (langBtn) return setLang(langBtn.dataset.lang);

    const tab = e.target.closest("[data-cat]");
    if (tab) {
      activeCategory = tab.dataset.cat;
      renderTabs();
      renderMenu();
      return;
    }

    if (e.target.closest("[data-order]")) { closeNav(); return openModal(); }
    if (e.target.closest("[data-close]")) return closeModal();
    if (e.target.closest(".nav a")) closeNav();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeModal(); closeNav(); }
  });

  // mobile nav
  const burger = $("#burger");
  const header = $("#header");
  function closeNav() {
    header.classList.remove("nav-open");
    burger.setAttribute("aria-expanded", "false");
  }
  burger.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    burger.setAttribute("aria-expanded", String(open));
  });

  // header shadow on scroll
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  $("#year").textContent = new Date().getFullYear();
  $$("img[data-fallback]").forEach(attachFallback);
  render();
  setInterval(renderHours, 60 * 1000);
})();
