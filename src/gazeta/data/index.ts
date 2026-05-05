// ============ ARTYKUŁY ============
export const articles = [
  {
    id: 1,
    title: "LOREM IPSUM DOLOR SIT AMET!",
    subtitle: "Consectetur adipiscing elit sed do eiusmod tempor",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    fullContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    author: "LOREM IPSUM",
    highlighted: true,
  },
  {
    id: 2,
    title: "LOREM IPSUM DOLOR SIT AMET!",
    subtitle: "Consectetur adipiscing elit sed do eiusmod tempor",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    fullContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    author: "LOREM IPSUM",
    highlighted: true,
  },
];

export type Article = (typeof articles)[0];

// ============ POGODA ============
export const pogody = [
  { miasto: "Warszawa", temp: "+12°C", ikona: "☁️", opis: "Pochmurnie z przejasnieniami" },
  { miasto: "Kraków",   temp: "+10°C", ikona: "⛅", opis: "Zmienna szata chmur" },
  { miasto: "Gdańsk",   temp: "+8°C",  ikona: "🌧️", opis: "Opady deszczu" },
  { miasto: "Wrocław",  temp: "+11°C", ikona: "☁️", opis: "Czesciowe zachmurzenie" },
  { miasto: "Poznań",   temp: "+9°C",  ikona: "🌤️", opis: "Duze zachmurzenie" },
  { miasto: "Katowice", temp: "+7°C",  ikona: "🌫️", opis: "Mgla, widocznosc do 200m" },
];

// ============ KRZYŻÓWKA ============
export const crosswordData = {
  across: [
    { number: 1,  clue: "Stolica COP, miasto nad Kamienną",       answer: "STARACHOWICE", row: 0, col: 0 },
    { number: 5,  clue: "Główny surowiec wydobywany w COP",       answer: "RUDA",          row: 2, col: 3 },
    { number: 7,  clue: "Miasto z fabryką samolotów PZL",         answer: "MIELEC",        row: 4, col: 1 },
    { number: 9,  clue: "Huta i fabryka broni w Stalowej...",     answer: "WOLA",          row: 6, col: 0 },
    { number: 11, clue: "Minister, twórca COP",                   answer: "KWIATKOWSKI",   row: 8, col: 2 },
  ],
  down: [
    { number: 2,  clue: "Rzeka przepływająca przez COP",               answer: "WISLA",       row: 0, col: 5  },
    { number: 3,  clue: "Miasto z fabryką amunicji",                   answer: "RADOM",       row: 0, col: 8  },
    { number: 4,  clue: "Fabryka Samochodów Osobowych w Warszawie (skrót)", answer: "FSO",   row: 1, col: 10 },
    { number: 6,  clue: "Zakłady Metalowe w Rzeszowie (skrót)",        answer: "WSK",         row: 2, col: 2  },
    { number: 8,  clue: "Dekada powstania COP (lata...)",              answer: "TRZYDZIESTE", row: 3, col: 6  },
    { number: 10, clue: "Produkt fabryk COP",                          answer: "BRON",        row: 6, col: 4  },
  ],
};

// ============ ZNACZKI ============
export const stamps = [
  { id: 1, name: "STALOWA WOLA",   bgColor: "#434b54", symbol: "⚙️", value: "25 GR", desc: "HUTNICTWO"    },
  { id: 2, name: "PZL MIELEC",     bgColor: "#3a506b", symbol: "✈️", value: "50 GR", desc: "LOTNICTWO"    },
  { id: 3, name: "ROŻNÓW",         bgColor: "#2d5a88", symbol: "⚡", value: "1 ZŁ",  desc: "ZAPORA"       },
  { id: 4, name: "E. KWIATKOWSKI", bgColor: "#6b4f3a", symbol: "👤", value: "2 ZŁ",  desc: "WIZJONER"     },
  { id: 5, name: "STARACHOWICE",   bgColor: "#5a3a50", symbol: "🛡️", value: "15 GR", desc: "ZBROJENIÓWKA" },
  { id: 6, name: "RADOM - VIS",    bgColor: "#3a5a54", symbol: "🔫", value: "30 GR", desc: "BROŃ"         },
];

// ============ OGŁOSZENIA ============
export const announcements = [
  {
    id: 1,
    title: "SLUZBA ZDROWIA INFORMUJE",
    content:
      "Przypominamy obywatelom o obowiazku szczepien ochronnych. Punkt szczepien czynny w godzinach 8:00-14:00 w przychodni obwodowej.",
    icon: "🏥",
    isCoupon: false,
  },
  {
    id: 2,
    title: "NABOR DO WOJSKA",
    content:
      "Powiatowa Komisja Uzupelnien wzywa obywateli rocznikow 1952-1953 do stawienia sie w celu kwalifikacji wojskowej. Termin: 15-30 marca 1974 r.",
    icon: "🎖️",
    isCoupon: false,
  },
  {
    id: 3,
    title: "KUPON RACJONALIZATORA",
    content:
      "Wypelnij i wyslij! 10 najlepszych wnioskow racjonalizatorskich nagrodzonych zostanie bonem na zakup magnetowidu w Pewexie!",
    icon: "✂️",
    isCoupon: true,
  },
  {
    id: 4,
    title: "SPRZEDAZ MIESZKAN",
    content:
      "Spoldzielnia Mieszkaniowa Przyjazn oglasza zapisy na mieszkania 2- i 3-pokojowe w nowym bloku przy ul. Partyzantow 47.",
    icon: "🏠",
    isCoupon: false,
  },
  {
    id: 5,
    title: "KINO MOSKWA -- TYDZIEN KINA RADZIECKIEGO",
    content:
      "Pokazy: Moskwa nie wierzy lzem, Czajkowski, Krolowa sniegu. Bilety: 5 zl. Rezerwacja w kasie kina.",
    icon: "🎬",
    isCoupon: false,
  },
];

// ============ STACJE RADIOWE ============
export const radioStations = [
  { freq: 95.2,  name: "PR I"    },
  { freq: 98.4,  name: "PR II"   },
  { freq: 102.1, name: "PR III"  },
  { freq: 107.5, name: "MOSKWA"  },
];
