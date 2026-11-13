// Všechny informace o týmu jsou tady. Úpravou tohoto souboru změníš obsah webu.
// Převzato ze starého webu (github.com/Koleckoo/prague_crocodiles).

export const team = {
  name: "Prague Crocodiles",
  sport: "Dodgeball",
  city: "Praha",
  tagline: "Dodgeball v Praze. Přijď si zaházet s námi.",
};

export const colors = {
  green: "#01845f", // hlavní barva – krokodýl
  blue: "#14467f", // míč / česká vlajka
  red: "#d7161d", // míč / česká vlajka
  ink: "#111312",
  white: "#ffffff",
};

export const contact = {
  email: "praguecrocodilles@gmail.com",
  facebook: {
    label: "Dodgeball - Prague Crocodiles",
    url: "https://www.facebook.com/dodgeballprague/",
  },
  instagram: {
    label: "dodgeball_prague",
    url: "https://www.instagram.com/dodgeball_prague/",
    // otevře rovnou zprávu (DM) na Instagramu
    dm: "https://ig.me/m/dodgeball_prague",
    // oficiální náhled profilu – sám ukazuje nejnovější příspěvky
    embed: "https://www.instagram.com/dodgeball_prague/embed/",
  },
};

// Tréninky – pro další trénink stačí přidat další položku.
export const trainings = [
  {
    venue: "Střední odborná škola Jarov",
    day: "Úterý",
    time: "18:30 – 21:00",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1279.8571238970526!2d14.499178351529704!3d50.09163669913055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b93309ef337d1%3A0xa39a88a2fa6d85a4!2zU3TFmWVkbsOtIG9kYm9ybsOhIMWha29sYSBKYXJvdg!5e0!3m2!1scs!2scz!4v1709634012975!5m2!1scs!2scz",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=St%C5%99edn%C3%AD+odborn%C3%A1+%C5%A1kola+Jarov+Praha",
    // Jak se dostat od vchodu školy až k nám (kroky po sobě).
    directions: [
      "Vejdi do školy hlavním vchodem.",
      "Jdi pořád rovně skrz první budovu.",
      "Projdi vnitřním průchodem a dej se do dveří vlevo.",
    ],
    pickup: "Nechceš bloudit? Napiš nám a vyzvedneme tě před školou.",
  },
];

// Sekce „Co je dodgeball?" – pravidla ve čtyřech krocích.
export const rules = {
  intro:
    "Dva týmy, jedno hřiště a látkové míče. Pravidla pochopíš za minutu a zbytek se naučíš na hřišti.",
  steps: [
    { title: "Hoď", text: "Trefíš soupeře míčem? Je vybitý a jde ze hry." },
    {
      title: "Chyť",
      text: "Chytíš soupeřův hod ze vzduchu? Ven jde on a tvůj vybitý spoluhráč se vrací do hry.",
    },
    { title: "Uhni", text: "Nenech se trefit. Uhýbej, skákej, kryj se míčem." },
    { title: "Vyhraj", text: "Kolo bere tým, který vybije všechny soupeře." },
  ],
};

// Rada týmu. instagram je nepovinný (uživatelské jméno bez @).
export const council = [
  { name: "Jan Illetško", role: "Vedoucí týmu", instagram: "doncare722" },
  { name: "Tom Reiter", role: "Rada týmu", instagram: "t0mreiter" },
  { name: "Luci Beránková", role: "Rada týmu", instagram: "luciberankova" },
  { name: "Kamile Kobieluszová", role: "Rada týmu", instagram: "kami.kob" },
];

export const credits = "Jan Illetško";

// Sekce „Jdeš poprvé?" – co má nováček vědět před prvním tréninkem.
// icon: gift | bag | shield | coins
export const firstTime = [
  {
    icon: "gift",
    title: "První trénink zdarma",
    text: "Přijď si to nezávazně vyzkoušet, za první trénink nic neplatíš.",
  },
  {
    icon: "bag",
    title: "Co s sebou",
    text: "Sportovní oblečení, sálovou obuv a vodu.",
  },
  {
    icon: "shield",
    title: "Chrániče na kolena",
    text: "Hodí se, ale na prvním tréninku je mít nemusíš.",
  },
  {
    icon: "coins",
    title: "Když tě to chytne",
    text: "Pokud budeš chtít pokračovat, platí se 2 250 Kč na půl roku.",
  },
];
