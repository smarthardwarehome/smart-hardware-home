(function () {
  const data = window.SMART_HW_DATA;
  const $ = (selector) => document.querySelector(selector);

  const productGrid = $("#product-grid");
  const productPagination = $("#product-pagination");
  const filters = $("#category-filters");
  const galleryModeTabs = document.querySelectorAll("[data-gallery-mode]");
  const galleryFilterPanel = $(".gallery-filter-panel");
  const galleryFilters = $("#gallery-category-filters");
  const galleryDateFrom = $("#gallery-date-from");
  const galleryDateTo = $("#gallery-date-to");
  const gallerySortOrder = $("#gallery-sort-order");
  const productGallery = $("#product-gallery");
  const noticeList = $("#notice-list");
  const productStorageKey = "smartHardwareHomeProducts";
  const noticeStorageKey = "smartHardwareHomeNotices";
  const storeStorageKey = "smartHardwareHomeStoreInfo";
  const adminSessionKey = "smartHardwareHomeAdmin";
  const langStorageKey = "smartHardwareHomeLanguage";
  const deliCatalogueStorageKey = "smartHardwareHomeDeliCatalogueVersion";
  const deliCatalogueVersion = "2026-05-04-r4";
  const allCategory = data.categories[0] || "All";
  let currentCategory = allCategory;
  let currentGalleryMode = "events";
  let currentLang = localStorage.getItem(langStorageKey) || "en";
  let productSearchTerm = "";
  let currentProductPage = 1;
  let productPageSize = 20;
  let activeGalleryCategories = new Set();
  let editingProductIndex = null;
  let editingNoticeIndex = null;
  let selectedProductImages = [];
  let selectedProductVideos = [];
  let selectedNoticeImage = "";
  let activeMediaItems = [];
  let activeMediaIndex = 0;

  const translations = {
    en: {
      brand_area: "Rawang, Selangor",
      nav_products: "Products",
      nav_gallery: "Gallery",
      nav_updates: "Updates",
      nav_contact: "Contact",
      hero_eyebrow: "Your one-stop hardware store",
      hero_title: "Hardware and industrial supply",
      hero_copy: "Tools, plumbing, electrical items and hardware accessories with ready stock and friendly local help in Rawang.",
      hero_products: "Browse products",
      hero_whatsapp: "Ask on WhatsApp",
      hero_feature_quality: "Quality products",
      hero_feature_stock: "Ready stock",
      hero_feature_price: "Competitive price",
      hero_feature_help: "Expert advice",
      quick_products: "Find products",
      info_location: "Location",
      info_stock_label: "What we stock",
      info_stock: "Tools, fittings and hardware",
      info_help_label: "Need help?",
      info_help: "Send us a product photo",
      category_card_tools: "Power tools",
      category_card_welding: "Welding",
      category_card_safety: "Hand tools",
      category_card_electrical: "Electrical",
      category_card_plumbing: "Plumbing",
      category_card_hardware: "Hardware",
      category_card_view: "View products",
      promo_power_eyebrow: "Power up your work",
      promo_power_title: "High performance tools ready in store",
      promo_trust_eyebrow: "Quality you can trust",
      promo_trust_title: "Trusted brands and practical hardware choices",
      promo_shop: "Shop now",
      promo_contact: "Contact us",
      why_eyebrow: "Why choose",
      why_title: "SMART Hardware Home?",
      why_selection: "Wide selection",
      why_selection_copy: "Thousands of products for daily repair work.",
      why_stock: "Ready stock",
      why_stock_copy: "Most items available in store.",
      why_price: "Competitive price",
      why_price_copy: "Fair value for your project.",
      why_support: "Helpful support",
      why_support_copy: "Ask before you buy.",
      visit_eyebrow: "Visit our store",
      visit_title: "Browse more items in person",
      visit_more: "View more photos",
      products_eyebrow: "Products",
      products_title: "Find what you need",
      search_label: "Search products",
      search_placeholder: "Search products or categories...",
      gallery_eyebrow: "In store",
      gallery_title: "Photo gallery",
      gallery_events: "Shop events",
      gallery_activities: "Shop Gallery",
      gallery_products: "Shop Gallery",
      gallery_choose: "Choose a category",
      gallery_choose_help: "Select one, several, or show all",
      gallery_date_range: "Shop Gallery date range",
      gallery_date_range_help: "Choose a date range and sort shop gallery photos.",
      gallery_from: "From",
      gallery_to: "To",
      gallery_sort: "Sort",
      gallery_newest: "Newest first",
      gallery_oldest: "Oldest first",
      updates_eyebrow: "Latest",
      updates_title: "Store updates",
      updates_link: "Ask about stock",
      contact_eyebrow: "Visit or contact us",
      contact_title: "We're here to help.",
      contact_copy: "Visit SMART Hardware Home in Rawang or contact us before your trip to check stock.",
      empty_products_title: "No products found",
      empty_products_copy: "Try another search or category.",
      products_per_page: "Items per page",
      products_page_status: "Showing {start}-{end} of {total}",
      products_page_number: "Page number",
      products_prev: "Previous",
      products_next: "Next",
      view_media: "View media",
      media: "media",
      ask_whatsapp: "Ask on WhatsApp",
      whatsapp_text: "Hi, I would like to ask about",
      no_event_title: "No shop event photos yet",
      no_event_copy: "Add an event or notice photo in the admin page, then it will appear here by date.",
      no_activity_title: "No Shop Gallery photos in this range",
      no_activity_copy: "Try another date range or add event photos in the admin page.",
      no_product_photo_title: "No product photos yet",
      no_product_photo_copy: "Upload product photos in the admin page and they will appear here.",
      event_count: "event photo sorted by latest date",
      event_count_plural: "event photos sorted by latest date",
      photo: "Photo",
      video: "Video",
      no_date: "No date",
      category_All: "All",
      category_Tools: "Tools",
      category_Plumbing: "Plumbing",
      category_Electrical: "Electrical",
      category_Hardware_Accessories: "Hardware Accessories",
      category_Professional_Power_Tools: "Professional Power Tools",
      category_Power_Tool_Kits: "Power Tool Kits",
      category_Semi_Pro_Power_Tools: "Semi-Pro Power Tools",
      category_Cordless_Screwdriver: "Cordless Screwdriver",
      category_Air_Tools: "Air Tools",
      category_Corded_Power_Tools: "Corded Power Tools",
      category_Garden_Tools: "Garden Tools",
      category_Water_Pumps: "Water Pumps",
      category_Hand_Tools: "Hand Tools",
      category_Insulated_Tools: "Insulated Tools",
      category_Tool_Accessories: "Tool Accessories",
      category_Safety_and_Security: "Safety & Security",
      category_Stationery: "Stationery",
      contact_Phone: "Phone",
      contact_WhatsApp: "WhatsApp",
      contact_Email: "Email",
      contact_Address: "Address",
      contact_SSM_No: "SSM No.",
      contact_Business_hours: "Business hours"
    },
    bm: {
      brand_area: "Rawang, Selangor",
      nav_products: "Produk",
      nav_gallery: "Galeri",
      nav_updates: "Berita",
      nav_contact: "Hubungi",
      hero_eyebrow: "Kedai perkakasan sehenti anda",
      hero_title: "Bekalan perkakasan dan industri",
      hero_copy: "Alat, paip, barangan elektrik dan aksesori perkakasan dengan stok sedia ada serta bantuan mesra di Rawang.",
      hero_products: "Lihat produk",
      hero_whatsapp: "Tanya di WhatsApp",
      hero_feature_quality: "Produk berkualiti",
      hero_feature_stock: "Stok sedia ada",
      hero_feature_price: "Harga berpatutan",
      hero_feature_help: "Nasihat pakar",
      quick_products: "Cari produk",
      info_location: "Lokasi",
      info_stock_label: "Barang kami",
      info_stock: "Alat, aksesori dan perkakasan",
      info_help_label: "Perlu bantuan?",
      info_help: "Hantar gambar produk",
      category_card_tools: "Alat kuasa",
      category_card_welding: "Kimpalan",
      category_card_safety: "Alat tangan",
      category_card_electrical: "Elektrik",
      category_card_plumbing: "Paip",
      category_card_hardware: "Perkakasan",
      category_card_view: "Lihat produk",
      promo_power_eyebrow: "Kuatkan kerja anda",
      promo_power_title: "Alat berprestasi tinggi sedia di kedai",
      promo_trust_eyebrow: "Kualiti dipercayai",
      promo_trust_title: "Jenama dipercayai dan pilihan perkakasan praktikal",
      promo_shop: "Beli sekarang",
      promo_contact: "Hubungi kami",
      why_eyebrow: "Kenapa pilih",
      why_title: "SMART Hardware Home?",
      why_selection: "Pilihan luas",
      why_selection_copy: "Pelbagai produk untuk kerja pembaikan harian.",
      why_stock: "Stok sedia ada",
      why_stock_copy: "Kebanyakan barang tersedia di kedai.",
      why_price: "Harga berpatutan",
      why_price_copy: "Nilai baik untuk projek anda.",
      why_support: "Bantuan mesra",
      why_support_copy: "Tanya sebelum membeli.",
      visit_eyebrow: "Lawat kedai kami",
      visit_title: "Lihat lebih banyak barang di kedai",
      visit_more: "Lihat lagi foto",
      products_eyebrow: "Produk",
      products_title: "Cari barang yang diperlukan",
      search_label: "Cari produk",
      search_placeholder: "Cari produk atau kategori...",
      gallery_eyebrow: "Dalam kedai",
      gallery_title: "Galeri foto",
      gallery_events: "Acara kedai",
      gallery_activities: "Galeri Kedai",
      gallery_products: "Galeri Kedai",
      gallery_choose: "Pilih kategori",
      gallery_choose_help: "Pilih satu, beberapa, atau papar semua",
      gallery_date_range: "Julat tarikh aktiviti",
      gallery_date_range_help: "Pilih julat tarikh dan susun foto aktiviti.",
      gallery_from: "Dari",
      gallery_to: "Hingga",
      gallery_sort: "Susun",
      gallery_newest: "Terkini dahulu",
      gallery_oldest: "Terlama dahulu",
      updates_eyebrow: "Terkini",
      updates_title: "Berita kedai",
      updates_link: "Tanya stok",
      contact_eyebrow: "Lawat atau hubungi kami",
      contact_title: "Kami sedia membantu.",
      contact_copy: "Lawat SMART Hardware Home di Rawang atau hubungi kami sebelum datang untuk semak stok.",
      empty_products_title: "Tiada produk dijumpai",
      empty_products_copy: "Cuba carian atau kategori lain.",
      products_per_page: "Item setiap halaman",
      products_page_status: "Memaparkan {start}-{end} daripada {total}",
      products_page_number: "Nombor halaman",
      products_prev: "Sebelumnya",
      products_next: "Seterusnya",
      view_media: "Lihat media",
      media: "media",
      ask_whatsapp: "Tanya WhatsApp",
      whatsapp_text: "Hai, saya ingin bertanya tentang",
      no_event_title: "Belum ada foto acara kedai",
      no_event_copy: "Tambah foto acara atau berita di halaman admin, kemudian ia akan muncul mengikut tarikh.",
      no_activity_title: "Tiada foto Galeri Kedai dalam julat ini",
      no_activity_copy: "Cuba julat tarikh lain atau tambah foto acara di halaman admin.",
      no_product_photo_title: "Belum ada foto produk",
      no_product_photo_copy: "Muat naik foto produk di halaman admin dan ia akan muncul di sini.",
      event_count: "foto acara disusun ikut tarikh terkini",
      event_count_plural: "foto acara disusun ikut tarikh terkini",
      photo: "Foto",
      video: "Video",
      no_date: "Tiada tarikh",
      category_All: "Semua",
      category_Tools: "Alat",
      category_Plumbing: "Paip",
      category_Electrical: "Elektrik",
      category_Hardware_Accessories: "Aksesori perkakasan",
      category_Professional_Power_Tools: "Alat Kuasa Profesional",
      category_Power_Tool_Kits: "Set Alat Kuasa",
      category_Semi_Pro_Power_Tools: "Alat Kuasa Semi-Pro",
      category_Cordless_Screwdriver: "Pemutar Skru Tanpa Wayar",
      category_Air_Tools: "Alat Angin",
      category_Corded_Power_Tools: "Alat Kuasa Berwayar",
      category_Garden_Tools: "Alat Taman",
      category_Water_Pumps: "Pam Air",
      category_Hand_Tools: "Alat Tangan",
      category_Insulated_Tools: "Alat Berpenebat",
      category_Tool_Accessories: "Aksesori Alat",
      category_Safety_and_Security: "Keselamatan & Sekuriti",
      category_Stationery: "Alat Tulis",
      contact_Phone: "Telefon",
      contact_WhatsApp: "WhatsApp",
      contact_Email: "E-mel",
      contact_Address: "Alamat",
      contact_SSM_No: "No. SSM",
      contact_Business_hours: "Waktu operasi"
    },
    cn: {
      brand_area: "Rawang, Selangor",
      nav_products: "产品",
      nav_gallery: "图库",
      nav_updates: "公告",
      nav_contact: "联络",
      hero_eyebrow: "本地五金店",
      hero_title: "各种工具与五金用品，一站式找齐。",
      hero_copy: "在 Rawang 选购工具、配件和日常五金用品，我们为顾客提供亲切协助。",
      hero_products: "查看产品",
      hero_whatsapp: "WhatsApp 询问",
      hero_feature_quality: "优质产品",
      hero_feature_stock: "现货供应",
      hero_feature_price: "价格合理",
      hero_feature_help: "专业建议",
      quick_products: "找产品",
      info_location: "地区",
      info_stock_label: "主营",
      info_stock: "工具、配件与五金用品",
      info_help_label: "需要帮忙？",
      info_help: "发送产品照片给我们",
      category_card_tools: "电动工具",
      category_card_welding: "焊接设备",
      category_card_safety: "手工具",
      category_card_electrical: "电器",
      category_card_plumbing: "水喉",
      category_card_hardware: "五金配件",
      category_card_view: "查看产品",
      promo_power_eyebrow: "提升工作效率",
      promo_power_title: "高性能工具，店内现货供应",
      promo_trust_eyebrow: "值得信赖的品质",
      promo_trust_title: "可靠品牌与实用五金选择",
      promo_shop: "立即选购",
      promo_contact: "联系我们",
      why_eyebrow: "为何选择",
      why_title: "SMART Hardware Home？",
      why_selection: "选择多样",
      why_selection_copy: "满足日常维修需求的多种产品。",
      why_stock: "现货供应",
      why_stock_copy: "多数商品店内有现货。",
      why_price: "价格合理",
      why_price_copy: "为您的工程提供实在价值。",
      why_support: "亲切协助",
      why_support_copy: "购买前欢迎咨询。",
      visit_eyebrow: "欢迎到店",
      visit_title: "亲临店内查看更多商品",
      visit_more: "查看更多照片",
      products_eyebrow: "产品",
      products_title: "寻找所需产品",
      search_label: "搜索产品",
      search_placeholder: "搜索产品或分类...",
      gallery_eyebrow: "店内",
      gallery_title: "照片图库",
      gallery_events: "店铺活动",
      gallery_activities: "店铺图库",
      gallery_products: "店铺图库",
      gallery_choose: "选择分类",
      gallery_choose_help: "可选择一个、多个，或显示全部",
      gallery_date_range: "活动日期范围",
      gallery_date_range_help: "选择日期范围并排序活动照片。",
      gallery_from: "开始",
      gallery_to: "结束",
      gallery_sort: "排序",
      gallery_newest: "最新在前",
      gallery_oldest: "最旧在前",
      updates_eyebrow: "最新",
      updates_title: "店铺公告",
      updates_link: "询问库存",
      contact_eyebrow: "到店或联络我们",
      contact_title: "我们乐意协助。",
      contact_copy: "欢迎到 Rawang 的 SMART Hardware Home，或出发前先联络我们确认库存。",
      empty_products_title: "找不到相关产品",
      empty_products_copy: "请尝试其他关键词或分类。",
      products_per_page: "每页显示",
      products_page_status: "显示 {start}-{end} / 共 {total}",
      products_page_number: "页码",
      products_prev: "上一页",
      products_next: "下一页",
      view_media: "查看媒体",
      media: "媒体",
      ask_whatsapp: "WhatsApp 询问",
      whatsapp_text: "您好，我想询问",
      no_event_title: "暂时没有店铺活动照片",
      no_event_copy: "店主可在 admin 页面添加活动或公告照片，之后会按日期显示在这里。",
      no_activity_title: "这个日期范围没有店铺图库照片",
      no_activity_copy: "请选择其他日期范围，或在 admin 页面添加活动照片。",
      no_product_photo_title: "暂时没有产品照片",
      no_product_photo_copy: "在 admin 页面上传产品照片后，这里会自动显示。",
      event_count: "张活动照片，按最新日期排序",
      event_count_plural: "张活动照片，按最新日期排序",
      photo: "照片",
      video: "视频",
      no_date: "没有日期",
      category_All: "全部",
      category_Tools: "工具",
      category_Plumbing: "水喉",
      category_Electrical: "电器",
      category_Hardware_Accessories: "五金配件",
      category_Professional_Power_Tools: "专业电动工具",
      category_Power_Tool_Kits: "电动工具套装",
      category_Semi_Pro_Power_Tools: "半专业电动工具",
      category_Cordless_Screwdriver: "充电式螺丝刀",
      category_Air_Tools: "气动工具",
      category_Corded_Power_Tools: "有线电动工具",
      category_Garden_Tools: "园艺工具",
      category_Water_Pumps: "水泵",
      category_Hand_Tools: "手工具",
      category_Insulated_Tools: "绝缘工具",
      category_Tool_Accessories: "工具配件",
      category_Safety_and_Security: "安全与防护",
      category_Stationery: "文具",
      contact_Phone: "电话",
      contact_WhatsApp: "WhatsApp",
      contact_Email: "电邮",
      contact_Address: "地址",
      contact_SSM_No: "SSM 编号",
      contact_Business_hours: "营业时间"
    }
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function isText(value) {
    return typeof value === "string";
  }

  function isValidProduct(product) {
    return product && typeof product === "object"
      && ["name", "category", "description", "status", "tag"].every((field) => isText(product[field]) && product[field].trim());
  }

  function isValidNotice(notice) {
    return notice && typeof notice === "object"
      && ["date", "title", "body"].every((field) => isText(notice[field]) && notice[field].trim());
  }

  function isValidContact(contact) {
    return contact && typeof contact === "object" && isText(contact.label) && isText(contact.value)
      && (contact.href === undefined || isText(contact.href));
  }

  function safeHref(value) {
    const href = String(value || "").trim();
    return /^(?:https?:|mailto:|tel:)/i.test(href) ? href : "";
  }

  function t(key) {
    return translations[currentLang]?.[key] || translations.en[key] || key;
  }

  function keySlug(value) {
    return String(value || "")
      .replaceAll(".", "")
      .replaceAll("&", "and")
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+|_+$/g, "");
  }

  function categoryLabel(category) {
    return t(`category_${keySlug(category)}`) || category;
  }

  function contactLabel(label) {
    return t(`contact_${keySlug(label)}`) || label;
  }

  function applyLanguage() {
    if (!translations[currentLang]) currentLang = "en";
    document.documentElement.lang = currentLang === "cn" ? "zh-Hans" : currentLang === "bm" ? "ms" : "en";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === currentLang);
    });
  }

  function getProducts() {
    try {
      const saved = JSON.parse(localStorage.getItem(productStorageKey));
      if (Array.isArray(saved) && saved.every(isValidProduct)) {
        if (localStorage.getItem(deliCatalogueStorageKey) !== deliCatalogueVersion && Array.isArray(window.DELI_PRODUCTS)) {
          const deliProductsByTag = new Map(window.DELI_PRODUCTS.map((product) => [product.tag, product]));
          const savedTags = new Set(saved.map((product) => product.tag));
          const missingDeliProducts = window.DELI_PRODUCTS.filter((product) => !savedTags.has(product.tag));
          const migratedProducts = saved.map((product) => {
            const catalogueProduct = deliProductsByTag.get(product.tag);
            if (catalogueProduct && product.category === "USB & Type-C Tools") {
              return { ...product, category: catalogueProduct.category };
            }
            if (product.tag === "Deli | DL8080" && product.category === "Cordless Screwdriver") {
              return { ...product, category: "Electrical" };
            }
            if (product.name === "Instant Water Heater" && product.category === "Electrical") {
              return {
                ...product,
                name: "Inverter Water Pump",
                description: "Compact inverter-controlled water pump for steady household water pressure.",
                tag: "Water Pump"
              };
            }
            return product;
          });
          migratedProducts.push(...missingDeliProducts);
          try {
            localStorage.setItem(productStorageKey, JSON.stringify(migratedProducts));
            localStorage.setItem(deliCatalogueStorageKey, deliCatalogueVersion);
          } catch (error) {
            // Return the merged catalogue even when browser storage has no remaining capacity.
          }
          return migratedProducts;
        }
        return saved;
      }
      return data.products;
    } catch (error) {
      return data.products;
    }
  }

  function saveProducts(products) {
    localStorage.setItem(productStorageKey, JSON.stringify(products));
  }

  function getStore() {
    try {
      const saved = JSON.parse(localStorage.getItem(storeStorageKey));
      if (saved && typeof saved === "object") {
        return {
          ...data.store,
          ...saved,
          contact: Array.isArray(saved.contact) && saved.contact.every(isValidContact) ? saved.contact : data.store.contact
        };
      }
    } catch (error) {
      // Use default store data when saved info is not readable.
    }
    return data.store;
  }

  function saveStore(store) {
    localStorage.setItem(storeStorageKey, JSON.stringify(store));
  }

  function getContact(store, label) {
    return (store.contact || []).find((item) => item.label === label) || {};
  }

  const businessDays = [
    ["mon", "Monday"],
    ["tue", "Tuesday"],
    ["wed", "Wednesday"],
    ["thu", "Thursday"],
    ["fri", "Friday"],
    ["sat", "Saturday"],
    ["sun", "Sunday"]
  ];

  function getNotices() {
    try {
      const saved = JSON.parse(localStorage.getItem(noticeStorageKey));
      return Array.isArray(saved) && saved.every(isValidNotice) ? saved : data.notices;
    } catch (error) {
      return data.notices;
    }
  }

  function saveNotices(notices) {
    localStorage.setItem(noticeStorageKey, JSON.stringify(notices));
  }

  function getWhatsAppNumber() {
    const item = getStore().contact.find((contact) => contact.label === "WhatsApp");
    if (!item) return "";
    const fromLink = String(item.href || "").match(/(?:wa\.me\/|Wasap\.my\/)(\d+)/i);
    return fromLink ? fromLink[1] : item.value.replace(/\D/g, "").replace(/^0/, "60");
  }

  function resizeImage(file, maxSize = 900, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(image.width * scale);
          canvas.height = Math.round(image.height * scale);
          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        image.onerror = reject;
        image.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function getProductImages(product) {
    if (Array.isArray(product.images)) return product.images.filter(Boolean);
    return product.image ? [product.image] : [];
  }

  function getProductVideos(product) {
    const media = Array.isArray(product.media) ? product.media : [];
    return media
      .map((item) => normalizeMediaItem(item, product.name))
      .filter((item) => item && item.type === "video");
  }

  function normalizeMediaItem(item, fallbackAlt = "Product media") {
    if (typeof item === "string") {
      const isVideo = /\.(mp4|webm|ogg)$/i.test(item) || item.startsWith("data:video/");
      return { type: isVideo ? "video" : "image", src: item, alt: fallbackAlt };
    }
    if (!item || !item.src) return null;
    const type = item.type || (/\.(mp4|webm|ogg)$/i.test(item.src) || String(item.src).startsWith("data:video/") ? "video" : "image");
    return { type, src: item.src, alt: item.alt || fallbackAlt };
  }

  function getProductMedia(product) {
    const imageMedia = getProductImages(product).map((image) => ({ type: "image", src: image, alt: product.name }));
    return [...imageMedia, ...getProductVideos(product)];
  }

  function getPrimaryProductMedia(product) {
    return getProductMedia(product)[0] || null;
  }

  function isProductVisible(product) {
    return product.visible !== false;
  }

  function getPublicProducts() {
    return getProducts().filter(isProductVisible);
  }

  function getCategories(products = getProducts()) {
    const categories = new Set([allCategory, ...data.categories.filter((category) => category !== allCategory)]);
    products.forEach((product) => categories.add(product.category));
    return [...categories].filter(Boolean);
  }

  function getGalleryCategories(products = getPublicProducts()) {
    const categories = new Set();
    products
      .filter((product) => getProductMedia(product).length)
      .forEach((product) => {
        if (product.category) categories.add(product.category);
      });
    return [...categories];
  }

  function renderGalleryFilters() {
    if (!galleryFilterPanel) return;
    galleryFilterPanel.hidden = currentGalleryMode !== "activities";
  }

  function parseEventDate(value) {
    const text = String(value || "").trim();
    if (!text) return 0;
    const normalized = text
      .replace(/t|\/|\./g, "-")
      .replace(/\s+/g, "-")
      .replace(/-{2,}/g, "-")
      .replace(/[^\d-]/g, "");
    const timestamp = Date.parse(normalized);
    return Number.isNaN(timestamp) ? 0 : timestamp;
  }

  function getDateInputTimestamp(value, isEndDate = false) {
    if (!value) return 0;
    const timestamp = Date.parse(`${value}T${isEndDate ? "23:59:59" : "00:00:00"}`);
    return Number.isNaN(timestamp) ? 0 : timestamp;
  }

  function getActivityDateFilters() {
    return {
      from: getDateInputTimestamp(galleryDateFrom?.value || ""),
      to: getDateInputTimestamp(galleryDateTo?.value || "", true),
      sort: gallerySortOrder?.value === "asc" ? "asc" : "desc"
    };
  }

  function getEventGalleryItems(options = {}) {
    const from = Number(options.from || 0);
    const to = Number(options.to || 0);
    const sort = options.sort === "asc" ? "asc" : "desc";
    const hasDateRange = Boolean(from || to);
    return getNotices()
      .filter((notice) => notice.image)
      .map((notice, index) => ({ ...notice, index, timestamp: parseEventDate(notice.date) }))
      .filter((item) => {
        if (!hasDateRange) return true;
        if (!item.timestamp) return false;
        if (from && item.timestamp < from) return false;
        if (to && item.timestamp > to) return false;
        return true;
      })
      .sort((a, b) => {
        const dateDiff = sort === "asc" ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
        return dateDiff || (sort === "asc" ? a.index - b.index : b.index - a.index);
      });
  }

  function renderGalleryModeTabs() {
    galleryModeTabs.forEach((button) => {
      button.classList.toggle("active", button.dataset.galleryMode === currentGalleryMode);
    });
    renderGalleryFilters();
  }

  function renderProducts(category = currentCategory) {
    if (!productGrid) return;
    const allProducts = getProducts();
    const publicProducts = allProducts.filter(isProductVisible);
    const categories = getCategories(publicProducts);
    currentCategory = categories.includes(category) ? category : allCategory;
    let products = currentCategory === allCategory
      ? publicProducts
      : publicProducts.filter((product) => product.category === currentCategory);

    if (productSearchTerm) {
      const query = productSearchTerm.toLocaleLowerCase();
      products = products.filter((product) =>
        [product.name, product.category, product.description, product.tag]
          .some((value) => String(value || "").toLocaleLowerCase().includes(query))
      );
    }

    if (!products.length) {
      productGrid.innerHTML = `<div class="empty-state"><strong>${escapeHtml(t("empty_products_title"))}</strong><span>${escapeHtml(t("empty_products_copy"))}</span></div>`;
      renderProductPagination(0);
      return;
    }

    const totalProducts = products.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / productPageSize));
    currentProductPage = Math.min(Math.max(1, currentProductPage), totalPages);
    const pageStart = (currentProductPage - 1) * productPageSize;
    const pageEnd = Math.min(pageStart + productPageSize, totalProducts);
    const pageProducts = products.slice(pageStart, pageEnd);
    const whatsappNumber = getWhatsAppNumber();

    productGrid.innerHTML = pageProducts.map((product) => {
      const productIndex = allProducts.indexOf(product);
      const primaryMedia = getPrimaryProductMedia(product);
      const mediaCount = getProductMedia(product).length;
      return `
        <article class="product-card">
          ${primaryMedia
            ? `<button class="product-photo-wrap media-trigger" type="button" data-product-index="${productIndex}" data-media-index="0" aria-label="View ${escapeHtml(product.name)} media">
                ${primaryMedia.type === "video"
                  ? `<video class="product-photo" src="${escapeHtml(primaryMedia.src)}" muted playsinline></video><span class="media-type-badge">Video</span>`
                  : `<img class="product-photo" src="${escapeHtml(primaryMedia.src)}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async">`
                }
                <span class="media-open-hint">${escapeHtml(t("view_media"))}</span>
                ${mediaCount > 1 ? `<span class="media-count-badge">${mediaCount} ${escapeHtml(t("media"))}</span>` : ""}
              </button>`
            : `<div class="product-icon" aria-hidden="true">${product.icon}</div>`
          }
          <div>
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.description)}</p>
          </div>
          <div class="product-meta">
            <span class="pill ${product.status === "" ? "hot" : ""}">${escapeHtml(product.status)}</span>
            <span class="pill">${escapeHtml(product.tag)}</span>
          </div>
          ${whatsappNumber ? `<a class="product-inquiry" href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`${t("whatsapp_text")} ${product.name}.`)}" target="_blank" rel="noopener"><img class="whatsapp-icon" src="assets/whatsapp-icon.png" alt="" aria-hidden="true"> ${escapeHtml(t("ask_whatsapp"))}</a>` : ""}
        </article>
      `;
    }).join("");
    renderProductPagination(totalProducts, pageStart + 1, pageEnd, totalPages);
  }

  function formatProductPageStatus(start, end, total) {
    return t("products_page_status")
      .replace("{start}", String(start))
      .replace("{end}", String(end))
      .replace("{total}", String(total));
  }

  function renderProductPagination(totalProducts, start = 0, end = 0, totalPages = 1) {
    if (!productPagination) return;
    if (!totalProducts) {
      productPagination.innerHTML = "";
      return;
    }

    productPagination.innerHTML = `
      <div class="pagination-status">${escapeHtml(formatProductPageStatus(start, end, totalProducts))}</div>
      <label class="page-size-control">
        <span>${escapeHtml(t("products_per_page"))}</span>
        <select id="product-page-size">
          ${[20, 30, 50].map((size) => `<option value="${size}" ${size === productPageSize ? "selected" : ""}>${size}</option>`).join("")}
        </select>
      </label>
      <div class="pagination-buttons">
        <button type="button" data-product-page="prev" ${currentProductPage <= 1 ? "disabled" : ""}>${escapeHtml(t("products_prev"))}</button>
        <label class="page-number-control">
          <select id="product-page-number" aria-label="${escapeHtml(t("products_page_number"))}">
            ${Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => `<option value="${page}" ${page === currentProductPage ? "selected" : ""}>${page}</option>`).join("")}
          </select>
          <span>/ ${totalPages}</span>
        </label>
        <button type="button" data-product-page="next" ${currentProductPage >= totalPages ? "disabled" : ""}>${escapeHtml(t("products_next"))}</button>
      </div>
    `;
  }

  function renderProductGallery() {
    if (!productGallery) return;

    if (currentGalleryMode === "events" || currentGalleryMode === "activities") {
      const isActivityGallery = currentGalleryMode === "activities";
      const eventItems = getEventGalleryItems(isActivityGallery ? getActivityDateFilters() : {});
      if (!eventItems.length) {
        productGallery.innerHTML = `
          <div class="empty-gallery">
            <strong>${escapeHtml(t(isActivityGallery ? "no_activity_title" : "no_event_title"))}</strong>
            <span>${escapeHtml(t(isActivityGallery ? "no_activity_copy" : "no_event_copy"))}</span>
          </div>
        `;
        return;
      }

      const groups = eventItems.reduce((grouped, item) => {
        const date = item.date || t("no_date");
        if (!grouped.has(date)) grouped.set(date, []);
        grouped.get(date).push(item);
        return grouped;
      }, new Map());

      productGallery.innerHTML = [...groups.entries()].map(([date, items]) => `
        <section class="gallery-group event-gallery-group" aria-label="${escapeHtml(date)} ${escapeHtml(isActivityGallery ? "shop gallery" : "shop event gallery")}">
          <h3>${escapeHtml(date)}</h3>
          <p class="gallery-group-meta">${items.length} ${escapeHtml(t(items.length > 1 ? "event_count_plural" : "event_count"))}</p>
          <div class="gallery-grid">
            ${items.map((item) => `
              <article class="gallery-item">
                <button class="gallery-media-button media-trigger" type="button" data-event-index="${eventItems.indexOf(item)}" aria-label="View ${escapeHtml(item.title)} event photo">
                  <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" decoding="async">
                </button>
                <div>
                  <strong>${escapeHtml(item.title)}</strong>
                  <span>${escapeHtml(item.body)}</span>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      `).join("");
      return;
    }
  }

  function renderFilters() {
    if (!filters) {
      renderCategoryOptions();
      return;
    }
    const categories = getCategories(getPublicProducts());
    filters.innerHTML = categories.map((category) => `
      <button type="button" class="${category === currentCategory ? "active" : ""}" data-category="${escapeHtml(category)}">${escapeHtml(categoryLabel(category))}</button>
    `).join("");

    renderCategoryOptions(categories);
  }

  function setupProductFilters() {
    if (!filters) {
      renderCategoryOptions();
      return;
    }
    renderFilters();

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      currentCategory = button.dataset.category;
      currentProductPage = 1;
      renderFilters();
      renderProducts(currentCategory);
    });
  }

  function setupProductPagination() {
    if (!productPagination) return;
    productPagination.addEventListener("change", (event) => {
      const select = event.target.closest("#product-page-size");
      const pageSelect = event.target.closest("#product-page-number");
      if (select) {
        productPageSize = Number(select.value) || 20;
        currentProductPage = 1;
        renderProducts(currentCategory);
        return;
      }
      if (!pageSelect) return;
      currentProductPage = Number(pageSelect.value) || 1;
      renderProducts(currentCategory);
    });

    productPagination.addEventListener("click", (event) => {
      const button = event.target.closest("[data-product-page]");
      if (!button || button.disabled) return;
      currentProductPage += button.dataset.productPage === "next" ? 1 : -1;
      renderProducts(currentCategory);
      document.querySelector("#products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function setupGalleryFilters() {
    renderGalleryFilters();

    galleryFilters?.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      const category = button.dataset.galleryCategory;

      if (category === allCategory) {
        activeGalleryCategories.clear();
      } else if (activeGalleryCategories.has(category)) {
        activeGalleryCategories.delete(category);
      } else {
        activeGalleryCategories.add(category);
      }

      renderGalleryFilters();
      renderProductGallery();
    });

    [galleryDateFrom, galleryDateTo, gallerySortOrder].forEach((control) => {
      control?.addEventListener("change", renderProductGallery);
    });
  }

  function setupGalleryModeTabs() {
    if (!galleryModeTabs.length) return;
    renderGalleryModeTabs();

    galleryModeTabs.forEach((button) => {
      button.addEventListener("click", () => {
        currentGalleryMode = button.dataset.galleryMode || "events";
        renderGalleryModeTabs();
        renderProductGallery();
      });
    });
  }

  function setupCategoryShortcuts() {
    document.querySelectorAll("[data-category-shortcut]").forEach((link) => {
      link.addEventListener("click", () => {
        const category = link.dataset.categoryShortcut;
        if (!category) return;
        currentCategory = category;
        productSearchTerm = "";
        currentProductPage = 1;
        const search = $("#product-search");
        if (search) search.value = "";
        renderFilters();
        renderProducts(category);
      });
    });
  }

  function setupProductSearch() {
    const search = $("#product-search");
    if (!search) return;
    search.addEventListener("input", () => {
      productSearchTerm = search.value.trim();
      currentProductPage = 1;
      renderProducts(currentCategory);
    });
  }

  function refreshPublicLanguageViews() {
    applyLanguage();
    renderFilters();
    renderGalleryModeTabs();
    renderGalleryFilters();
    renderProducts(currentCategory);
    renderProductGallery();
    renderStoreInfo();
  }

  function setupLanguageSwitcher() {
    const buttons = document.querySelectorAll("[data-lang]");
    if (!buttons.length) return;
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        currentLang = button.dataset.lang || "en";
        localStorage.setItem(langStorageKey, currentLang);
        refreshPublicLanguageViews();
      });
    });
  }

  function renderLightbox() {
    const lightbox = $("#media-lightbox");
    const mediaBox = $("#lightbox-media");
    const caption = $("#lightbox-caption");
    const prev = $("#lightbox-prev");
    const next = $("#lightbox-next");
    if (!lightbox || !mediaBox || !caption) return;
    const item = activeMediaItems[activeMediaIndex];
    if (!item) return;
    mediaBox.innerHTML = item.type === "video"
      ? `<video src="${escapeHtml(item.src)}" controls autoplay playsinline></video>`
      : `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || "Product media")}">`;
    caption.textContent = `${item.alt || "Product media"}  ${activeMediaIndex + 1} / ${activeMediaItems.length}`;
    if (prev) prev.hidden = activeMediaItems.length <= 1;
    if (next) next.hidden = activeMediaItems.length <= 1;
  }

  function openLightbox(items, startIndex = 0) {
    const lightbox = $("#media-lightbox");
    if (!lightbox || !items.length) return;
    activeMediaItems = items;
    activeMediaIndex = Math.max(0, Math.min(startIndex, items.length - 1));
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    renderLightbox();
  }

  function closeLightbox() {
    const lightbox = $("#media-lightbox");
    const mediaBox = $("#lightbox-media");
    if (!lightbox) return;
    lightbox.hidden = true;
    if (mediaBox) mediaBox.innerHTML = "";
    document.body.classList.remove("lightbox-open");
  }

  function setupMediaViewer() {
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest(".media-trigger");
      if (!trigger) return;
      if (trigger.hasAttribute("data-event-index")) {
        const eventItems = getEventGalleryItems(currentGalleryMode === "activities" ? getActivityDateFilters() : {});
        const eventMedia = eventItems.map((item) => ({
          type: "image",
          src: item.image,
          alt: `${item.title}  ${item.date}`
        }));
        openLightbox(eventMedia, Number(trigger.dataset.eventIndex || 0));
        return;
      }
      const products = getProducts();
      let product = null;
      if (trigger.dataset.productIndex) product = products[Number(trigger.dataset.productIndex)];
      if (!product && trigger.dataset.productName) product = products.find((item) => item.name === trigger.dataset.productName);
      if (!product) return;
      openLightbox(getProductMedia(product), Number(trigger.dataset.mediaIndex || 0));
    });

    $("#lightbox-close")?.addEventListener("click", closeLightbox);
    $("#media-lightbox")?.addEventListener("click", (event) => {
      if (event.target.id === "media-lightbox") closeLightbox();
    });
    $("#lightbox-prev")?.addEventListener("click", () => {
      activeMediaIndex = (activeMediaIndex - 1 + activeMediaItems.length) % activeMediaItems.length;
      renderLightbox();
    });
    $("#lightbox-next")?.addEventListener("click", () => {
      activeMediaIndex = (activeMediaIndex + 1) % activeMediaItems.length;
      renderLightbox();
    });
    document.addEventListener("keydown", (event) => {
      const lightbox = $("#media-lightbox");
      if (!lightbox || lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") $("#lightbox-prev")?.click();
      if (event.key === "ArrowRight") $("#lightbox-next")?.click();
    });
  }

  function renderNotices() {
    if (!noticeList) return;
    noticeList.innerHTML = getNotices().map((notice) => `
      <article class="notice-card">
        ${notice.image ? `<img class="notice-image" src="${escapeHtml(notice.image)}" alt="${escapeHtml(notice.title)}">` : ""}
        <span class="notice-date">${escapeHtml(notice.date)}</span>
        <h3>${escapeHtml(notice.title)}</h3>
        <p>${escapeHtml(notice.body)}</p>
      </article>
    `).join("");
  }

  function renderAdminNotices() {
    const list = $("#admin-notice-list");
    if (!list) return;
    list.innerHTML = getNotices().map((notice, index) => `
      <article class="admin-product-row ${index === editingNoticeIndex ? "editing" : ""}">
        <div>
          ${notice.image ? `<img class="admin-thumb" src="${escapeHtml(notice.image)}" alt="${escapeHtml(notice.title)}">` : ""}
          <strong>${escapeHtml(notice.title)}</strong>
          <span>${escapeHtml(notice.date)}</span>
        </div>
        <div class="admin-row-actions">
          <button class="button light" type="button" data-edit-notice="${index}">Edit</button>
          <button class="button danger" type="button" data-delete-notice="${index}">Delete</button>
        </div>
      </article>
    `).join("");
  }

  function renderAdminMetrics() {
    const products = getProducts();
    const notices = getNotices();
    const productCount = $("#admin-product-count");
    const photoCount = $("#admin-photo-count");
    const noticeCount = $("#admin-notice-count");
    if (productCount) productCount.textContent = products.length;
    if (photoCount) photoCount.textContent = products.reduce((count, product) => count + getProductMedia(product).length, 0);
    if (noticeCount) noticeCount.textContent = notices.length;
  }

  function renderNoticeImagePreview() {
    const preview = $("#notice-image-preview");
    if (!preview) return;
    preview.innerHTML = selectedNoticeImage
      ? `<img src="${escapeHtml(selectedNoticeImage)}" alt="Notice preview"><span>Selected image</span>`
      : "<span>No image selected</span>";
  }

  function fillStoreForm() {
    const form = $("#store-form");
    if (!form) return;
    const store = getStore();
    $("#store-name").value = store.name || "";
    $("#store-area-input").value = store.area || "";
    $("#store-description-input").value = store.description || "";
    $("#store-phone").value = getContact(store, "Phone").value || "";
    $("#store-whatsapp").value = getContact(store, "WhatsApp").value || "";
    $("#store-email").value = getContact(store, "Email").value || "";
    $("#store-address").value = getContact(store, "Address").value || "";
    $("#store-ssm").value = getContact(store, "SSM No.").value || "";
    const savedHours = store.businessHours || {};
    const firstOpenDay = businessDays
      .map(([key]) => savedHours[key])
      .find((day) => day && day.open && (day.start || day.end));
    const bulkStart = $("#bulk-hour-start");
    const bulkEnd = $("#bulk-hour-end");
    if (bulkStart) bulkStart.value = firstOpenDay?.start || "";
    if (bulkEnd) bulkEnd.value = firstOpenDay?.end || "";
    businessDays.forEach(([key]) => {
      const open = document.querySelector(`[data-hour-open="${key}"]`);
      const day = savedHours[key] || {};
      if (open) open.checked = Boolean(day.open);
    });
    renderBusinessHourPreviews();
  }

  function collectBusinessHours() {
    const startValue = $("#bulk-hour-start")?.value || "";
    const endValue = $("#bulk-hour-end")?.value || "";
    return businessDays.reduce((hours, [key]) => {
      const isOpen = Boolean(document.querySelector(`[data-hour-open="${key}"]`)?.checked);
      hours[key] = {
        open: isOpen,
        start: isOpen ? startValue : "",
        end: isOpen ? endValue : ""
      };
      return hours;
    }, {});
  }

  function formatTime(value) {
    if (!value) return "";
    const [hourText, minuteText] = value.split(":");
    let hour = Number(hourText);
    const suffix = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12;
    return `${hour}:${minuteText}${suffix}`;
  }

  function formatBusinessHours(hours) {
    const lines = businessDays.map(([key, label]) => {
      const day = hours[key] || {};
      if (!day.open) return `${label}: Closed`;
      if (!day.start || !day.end) return `${label}: Open`;
      return `${label}: ${formatTime(day.start)} - ${formatTime(day.end)}`;
    });
    return lines.join(" | ");
  }

  function renderBusinessHourPreviews() {
    const startValue = $("#bulk-hour-start")?.value || "";
    const endValue = $("#bulk-hour-end")?.value || "";
    businessDays.forEach(([key]) => {
      const preview = document.querySelector(`[data-hour-preview="${key}"]`);
      const isOpen = Boolean(document.querySelector(`[data-hour-open="${key}"]`)?.checked);
      if (!preview) return;
      preview.textContent = isOpen && startValue && endValue
        ? `${formatTime(startValue)} - ${formatTime(endValue)}`
        : isOpen
          ? "Open, time not set"
          : "Closed";
    });
  }

  function phoneHref(value) {
    const digits = String(value || "").replace(/\D/g, "");
    if (!digits) return "";
    const malaysiaNumber = digits.startsWith("60") ? digits : digits.replace(/^0/, "60");
    return `tel:+${malaysiaNumber}`;
  }

  function whatsappHref(value) {
    const digits = String(value || "").replace(/\D/g, "");
    if (!digits) return "";
    const malaysiaNumber = digits.startsWith("60") ? digits : digits.replace(/^0/, "60");
    return `https://wa.me/${malaysiaNumber}`;
  }

  function buildStoreFromForm() {
    const phone = $("#store-phone").value.trim();
    const whatsapp = $("#store-whatsapp").value.trim();
    const email = $("#store-email").value.trim();
    const businessHours = collectBusinessHours();
    const businessHoursText = formatBusinessHours(businessHours);
    return {
      name: $("#store-name").value.trim(),
      area: $("#store-area-input").value.trim(),
      description: $("#store-description-input").value.trim(),
      businessHours,
      contact: [
        { label: "Phone", value: phone, href: phoneHref(phone) },
        { label: "WhatsApp", value: whatsapp, href: whatsappHref(whatsapp) },
        { label: "Email", value: email, href: email ? `mailto:${email}` : "" },
        { label: "Address", value: $("#store-address").value.trim() },
        { label: "SSM No.", value: $("#store-ssm").value.trim() },
        { label: "Business hours", value: businessHoursText }
      ].filter((item) => item.value)
    };
  }

  function clearNoticeForm() {
    const form = $("#notice-form");
    if (!form) return;
    form.reset();
    editingNoticeIndex = null;
    selectedNoticeImage = "";
    $("#save-notice").textContent = "Publish Update";
    $("#cancel-notice-edit").hidden = true;
    renderNoticeImagePreview();
  }

  function renderCategoryOptions(categories = getCategories()) {
    const options = $("#category-options");
    if (!options) return;
    options.innerHTML = categories
      .filter((category) => category !== allCategory)
      .map((category) => `<option value="${escapeHtml(category)}"></option>`)
      .join("");
  }

  function renderAdminProducts() {
    const list = $("#admin-product-list");
    if (!list) return;
    const products = getProducts();
    list.innerHTML = products.map((product, index) => `
      <article class="admin-product-row ${index === editingProductIndex ? "editing" : ""}">
        <label class="admin-row-select" aria-label="Select ${escapeHtml(product.name)}">
          <input type="checkbox" data-select-product="${index}">
        </label>
        <div class="admin-row-summary">
          ${getPrimaryProductMedia(product)
            ? getPrimaryProductMedia(product).type === "video"
              ? `<video class="admin-thumb" src="${escapeHtml(getPrimaryProductMedia(product).src)}" muted playsinline></video>`
              : `<img class="admin-thumb" src="${escapeHtml(getPrimaryProductMedia(product).src)}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async">`
            : ""}
          <strong>${escapeHtml(product.name)}</strong>
          <span>${escapeHtml(product.category)}  ${escapeHtml(product.status)}  ${getProductMedia(product).length} media  ${isProductVisible(product) ? "Public" : "Hidden"}</span>
        </div>
        <label class="admin-public-toggle">
          <input type="checkbox" data-toggle-product-visible="${index}" ${isProductVisible(product) ? "checked" : ""}>
          Display
        </label>
        <div class="admin-row-actions">
          <button class="button light" type="button" data-edit-product="${index}">Edit</button>
          <button class="button danger" type="button" data-delete-product="${index}">Delete</button>
        </div>
      </article>
    `).join("");
    updateProductBulkControls();
  }

  function getSelectedProductIndexes() {
    return [...document.querySelectorAll("[data-select-product]:checked")]
      .map((input) => Number(input.dataset.selectProduct))
      .filter((index) => Number.isInteger(index));
  }

  function updateProductBulkControls() {
    const selected = getSelectedProductIndexes();
    const selectedCount = $("#selected-product-count");
    const deleteSelected = $("#delete-selected-products");
    const selectAll = $("#select-all-products");
    const rowChecks = [...document.querySelectorAll("[data-select-product]")];
    if (selectedCount) selectedCount.textContent = `${selected.length} selected`;
    if (deleteSelected) deleteSelected.disabled = selected.length === 0;
    if (selectAll) {
      selectAll.checked = rowChecks.length > 0 && selected.length === rowChecks.length;
      selectAll.indeterminate = selected.length > 0 && selected.length < rowChecks.length;
    }
  }

  function setProductFormMode(index = null) {
    editingProductIndex = index;
    const saveProduct = $("#save-product");
    const cancelEdit = $("#cancel-edit");
    if (saveProduct) saveProduct.textContent = index === null ? "Add Product" : "Update Product";
    if (cancelEdit) cancelEdit.hidden = index === null;
  }

  function fillProductForm(product) {
    $("#product-name").value = product.name || "";
    $("#product-category").value = product.category || "";
    $("#product-status").value = product.status || "";
    $("#product-tag").value = product.tag || "";
    $("#product-description").value = product.description || "";
    $("#product-icon").value = product.icon || "*";
    $("#product-visible").checked = isProductVisible(product);
    selectedProductImages = getProductImages(product);
    selectedProductVideos = getProductVideos(product).map((item) => item.src);
    const removeImage = $("#remove-product-image");
    if (removeImage) removeImage.checked = false;
    renderImagePreview();
  }

  function clearProductForm() {
    const productForm = $("#product-form");
    if (!productForm) return;
    productForm.reset();
    $("#product-icon").value = "*";
    $("#product-visible").checked = true;
    selectedProductImages = [];
    selectedProductVideos = [];
    renderImagePreview();
    setProductFormMode(null);
  }

  function renderImagePreview() {
    const preview = $("#product-image-preview");
    if (!preview) return;
    const mediaItems = [
      ...selectedProductImages.map((src) => ({ type: "image", src })),
      ...selectedProductVideos.map((src) => ({ type: "video", src }))
    ];
    preview.innerHTML = mediaItems.length
      ? `<div class="image-preview-grid">
          ${mediaItems.map((item, index) => `
            <figure>
              ${item.type === "video"
                ? `<video src="${escapeHtml(item.src)}" muted playsinline></video>`
                : `<img src="${escapeHtml(item.src)}" alt="Product media preview ${index + 1}">`
              }
              <figcaption>${item.type === "video" ? "Video" : "Photo"} ${index + 1}</figcaption>
            </figure>
          `).join("")}
        </div>
        <span>${mediaItems.length} media file(s) selected</span>`
      : "<span>No product media selected</span>";
  }

  function refreshProductViews() {
    renderFilters();
    renderProducts(currentCategory);
    renderGalleryModeTabs();
    renderGalleryFilters();
    renderProductGallery();
    renderAdminProducts();
    renderAdminMetrics();
  }

  function setupAdmin() {
    // Public deployment package does not include the admin page.
  }

  function renderStoreInfo() {
    const store = getStore();
    const brandName = document.querySelector(".brand-text strong");
    const storeArea = $("#store-area");
    const storeDescription = $("#store-description");
    const contactList = $("#contact-list");
    const headerPhone = $("#header-phone-link");
    const headerWhatsApp = $(".header-whatsapp");
    const phone = getContact(store, "Phone");
    const whatsapp = getContact(store, "WhatsApp");
    if (brandName) brandName.textContent = store.name || data.store.name;
    if (storeArea) storeArea.textContent = store.area || data.store.area;
    if (storeDescription) storeDescription.textContent = store.description || t("contact_copy");
    if (headerPhone && phone.value) {
      headerPhone.textContent = phone.value;
      if (phone.href) headerPhone.href = phone.href;
    }
    if (headerWhatsApp && safeHref(whatsapp.href)) headerWhatsApp.href = safeHref(whatsapp.href);
    if (!contactList) return;
    contactList.innerHTML = (store.contact || []).map((item) => {
      const href = safeHref(item.href);
      return `
      <div class="contact-item">
        <span>${escapeHtml(contactLabel(item.label))}</span>
        <strong>
          ${href
            ? `<a href="${escapeHtml(href)}" target="${href.startsWith("http") ? "_blank" : "_self"}" rel="noopener">${escapeHtml(item.value)}</a>`
            : escapeHtml(item.value)
          }
        </strong>
      </div>
    `;
    }).join("");
  }

  function setupNavigation() {
    const toggle = $(".nav-toggle");
    const nav = $("#main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("open") || event.target.closest(".site-header")) return;
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  applyLanguage();
  setupLanguageSwitcher();
  renderStoreInfo();
  setupProductFilters();
  setupProductPagination();
  setupGalleryModeTabs();
  setupCategoryShortcuts();
  setupGalleryFilters();
  setupProductSearch();
  renderProducts();
  renderProductGallery();
  renderNotices();
  setupAdmin();
  setupNavigation();
  setupMediaViewer();
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
