window.SMART_HW_DATA = {
  store: {
    name: "SMART Hardware Home",
    area: "Rawang, Selangor",
    description: "Your neighbourhood hardware store for reliable tools, fittings, electrical supplies and everyday repair essentials.",
    contact: [
      { label: "Phone", value: "018-949 2887", href: "tel:+60189492887" },
      { label: "WhatsApp", value: "018-949 2887", href: "https://wa.me/60189492887" },
      { label: "Email", value: "support@infosmarthardwarehome.com", href: "mailto:support@infosmarthardwarehome.com" },
      { label: "Address", value: "EG49 & EG51 Jalan 7A/4, Bandar Tasik Puteri, 48020 Rawang, Selangor" },
      { label: "SSM No.", value: "1672848-X" },
      { label: "Business hours", value: "Contact us for today's hours" }
    ]
  },
  categories: ["All", "Tools", "Plumbing", "Electrical", "Hardware Accessories"],
  products: [
    ["Rotary Hammer Drill","Tools","Heavy-duty rotary hammer for drilling and renovation work.","In Store","Power Tool","assets/gallery/tools-rotary-hammer.jpg"],
    ["Electric Mixing Drill","Tools","Electric mixer for paint, mortar and building materials.","In Store","Power Tool","assets/gallery/tools-electric-mixer.jpg"],
    ["Trowels and Scrapers","Tools","Assorted finishing tools for building and repair work.","Many Choices","Hand Tools","assets/gallery/tools-trowels-scrapers.jpg"],
    ["Pressure Sprayers","Tools","Portable pressure sprayers for garden and maintenance work.","In Store","Garden Tool","assets/gallery/tools-pressure-sprayers.jpg"],
    ["Angle Grinders","Tools","Electric grinders for cutting and surface preparation.","Many Choices","Power Tools","assets/gallery/tools-angle-grinders.jpg"],
    ["Electric Drills","Tools","Corded and cordless drills for repair and installation.","Many Choices","Power Tools","assets/gallery/tools-electric-drills.jpg"],
    ["Float Valves and Brass Rods","Plumbing","Parts for water tank installations and repairs.","Ask for Size","Water Tank","assets/gallery/plumbing-float-valves.jpg"],
    ["Plumbing Repair Parts","Plumbing","Assorted plumbing parts for repair and replacement.","In Store","Fittings","assets/gallery/plumbing-repair-parts.jpg"],
    ["Clear Flexible Hose","Plumbing","Flexible hose for water transfer and general use.","Ask for Size","Hose","assets/gallery/plumbing-clear-hose.jpg"],
    ["Industrial Fan","Electrical","High-airflow fan for workshops, shops and home use.","In Store","Ventilation","assets/gallery/electrical-industrial-fan.jpg"],
    ["Wet and Dry Vacuum","Electrical","Workshop and home wet-and-dry vacuum cleaner.","In Store","Cleaning","assets/gallery/electrical-wet-dry-vacuum.jpg"],
    ["Welding Machines","Electrical","Compact welding machines for workshop fabrication.","Ask for Model","Welding","assets/gallery/electrical-welding-machines.jpg"],
    ["Inverter Water Pump","Electrical","Compact inverter-controlled water pump for steady household water pressure.","Ask for Model","Water Pump","assets/gallery/electrical-instant-water-heater.jpg"],
    ["Cleaning Spray Bottles","Hardware Accessories","Multi-purpose cleaners for workshop and household maintenance.","In Store","Cleaning","assets/gallery/hardware-cleaning-spray.jpg"],
    ["Utility Rope Rolls","Hardware Accessories","Utility rope and cord in convenient rolls.","Ask for Size","Rope","assets/gallery/hardware-utility-rope.jpg"],
    ["Adhesive and Tape Rolls","Hardware Accessories","Assorted sealing and utility tape rolls.","Many Choices","Adhesives","assets/gallery/hardware-tape-rolls.jpg"]
  ].map(([name,category,description,status,tag,image]) => ({ name,category,description,status,tag,image,icon:"HW" })),
  notices: [
    { date: "Promotion", title: "Looking for hardware tools?", body: "Quality tools, reliable products and practical prices — all in one local store.", image: "assets/hardware-tools-promo.png" },
    { date: "Product help", title: "Ask us about sizes and uses", body: "Send us a photo or product details on WhatsApp and we will help identify a suitable item." },
    { date: "Store updates", title: "New stock and offers", body: "Check this page for new arrivals, promotions and store announcements." }
  ],
  comments: [
    { name: "Store team", date: "Pinned", message: "Send your product question by email using the form above. For a quick reply, WhatsApp or call 018-949 2887." }
  ]
};

if (Array.isArray(window.DELI_PRODUCTS)) {
  const deliCategories = window.DELI_PRODUCTS.map((product) => product.category);
  window.SMART_HW_DATA.categories = [...new Set([...window.SMART_HW_DATA.categories, ...deliCategories])];
  window.SMART_HW_DATA.products = [...window.SMART_HW_DATA.products, ...window.DELI_PRODUCTS];
}
