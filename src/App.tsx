import { useState, useEffect } from 'react';

// ============ DATA ============
const articles = [
  {
    id: 1,
    title: "ZJAWISKOWY WZROST PRODUKCJI W HUCIE IMIENIA LENINA!",
    subtitle: "Nowa hala walcowni przekracza plan pi\u0142oletni o 200%",
    content: "Wczoraj w Krakowie-Nowej Hucie, z udzia\u0142em towarzysza pierwszego sekretarza, odby\u0142a si\u0119 uroczysto\u015B\u0107 otwarcia nowej hali walcowni. Pracownicy huty osi\u0105gn\u0119li niezwyk\u0142e wyniki, przekraczaj\u0105c plan pi\u0119cioletni o 200%. Towarzysz dyrektor Kotarba o\u015Bwiadczy\u0142, \u017Ce jest to dow\u00F3d wy\u017Cszo\u015Bci socjalistycznej gospodarki nad kapitalistyczn\u0105.",
    fullContent: "Wczoraj w Krakowie-Nowej Hucie, z udzia\u0142em towarzysza pierwszego sekretarza, odby\u0142a si\u0119 uroczysto\u015B\u0107 otwarcia nowej hali walcowni. Pracownicy huty osi\u0105gn\u0119li niezwyk\u0142e wyniki, przekraczaj\u0105c plan pi\u0119cioletni o 200%.\n\nTowarzysz dyrektor Kotarba o\u015Bwiadczy\u0142, \u017Ce jest to dow\u00F3d wy\u017Cszo\u015Bci socjalistycznej gospodarki nad kapitalistyczn\u0105. -- Nasi pracownicy, motywowani duchem socjalistycznego wsp\u00F3\u0142zawodnictwa, udowodnili, \u017Ce gospodarka planowa jest przysz\u0142o\u015Bci\u0105 ludzko\u015Bci -- powiedzia\u0142 w swoim przem\u00F3wieniu.\n\nZgromadzeni na uroczysto\u015Bci pracownicy owacjami witali ka\u017Cdego m\u00F3wc\u0119. Pionier pracy, towarzysz Kowalski, w swoim wyst\u0105pieniu podkre\u015Bli\u0142: -- Pracujemy nie tylko dla siebie, ale dla dobra ca\u0142ego narodu i pa\u0144stwa socjalistycznego.\n\nNowa hala walcowni wyposa\u017Cona zosta\u0142a w najnowocze\u015Bniejsze urz\u0105dzenia sprowadzone z ZSRR oraz produkcji krajowej. Szacuje si\u0119, \u017Ce pozwoli to na zwi\u0119kszenie produkcji stali o 40% w skali roku.",
    author: "ZESP\u00D3\u0141 REDAKCYJNY",
    highlighted: true
  },
  {
    id: 2,
    title: "PODR\u00D3\u017B BRATNIA DO KRAJ\u00D3W SOCJALISTYCZNYCH",
    subtitle: "Towarzysz Gierek odwiedza NRD i Czechos\u0142owacj\u0119",
    content: "Pierwszy sekretarz KC PZPR Edward Gierek uda\u0142 si\u0119 z wizyt\u0105 bratni\u0105 do NRD i CSSR. Wizyta ma na celu umocnienie wi\u0119zi mi\u0119dzy krajami bloku wschodniego i koordynacj\u0119 dzia\u0142a\u0144 gospodarczych w ramach RWPG.",
    fullContent: "Pierwszy sekretarz KC PZPR Edward Gierek uda\u0142 si\u0119 z wizyt\u0105 bratni\u0105 do NRD i CSSR. Wizyta ma na celu umocnienie wi\u0119zi mi\u0119dzy krajami bloku wschodniego i koordynacj\u0119 dzia\u0142a\u0144 gospodarczych w ramach RWPG.\n\nW Berlinie towarzysz Gierek spotka\u0142 si\u0119 z Erichem Honeckerem, gdzie om\u00F3wiono kwestie wsp\u00F3\u0142pracy gospodarczej i kulturalnej mi\u0119dzy naszymi krajami. Podpisano protok\u00F3\u0142 o wymianie handlowej na rok 1975.\n\nNast\u0119pnie delegacja uda\u0142a si\u0119 do Pragi, gdzie rozmowy dotyczy\u0142y wsp\u00F3\u0142pracy w ramach Uk\u0142adu Warszawskiego.",
    author: "DZIA\u0141 ZAGRANICZNY"
  },
  {
    id: 3,
    title: "NOWE CENY DETALICZNE -- TOWARZYSZ WICEPREMIER T\u0141UMACZY",
    content: "Od 1 marca wprowadzono nowe ceny detaliczne na podstawowe artyku\u0142y spo\u017Cywcze i przemys\u0142owe. Towarzysz wicepremier Jaroszewicz t\u0142umaczy, \u017Ce zmiany s\u0105 niezb\u0119dne dla utrzymania r\u00F3wnowagi rynkowej.",
    fullContent: "Od 1 marca wprowadzono nowe ceny detaliczne na podstawowe artyku\u0142y spo\u017Cywcze i przemys\u0142owe. Towarzysz wicepremier Jaroszewicz t\u0142umaczy, \u017Ce zmiany s\u0105 niezb\u0119dne dla utrzymania r\u00F3wnowagi rynkowej.\n\nZmiany cen:\n- Cukier: 11 z\u0142/kg (by\u0142o 9 z\u0142)\n- M\u0105ka: 8 z\u0142/kg (by\u0142o 6 z\u0142)\n- Mi\u0119so wieprzowe: 60 z\u0142/kg (by\u0142o 52 z\u0142)\n- Mas\u0142o: 48 z\u0142/kg (by\u0142o 42 z\u0142)\n- Czekolada: 35 z\u0142/tabliczka (by\u0142o 28 z\u0142)\n\nTowarzysz wicepremier podkre\u015Bli\u0142, \u017Ce nowe ceny pozwol\u0105 na zwi\u0119kszenie inwestycji w przemys\u0142 ci\u0119\u017Cki.",
    author: "DZIA\u0141 GOSPODARCZY"
  },
  {
    id: 4,
    title: "M\u0141ODZI PIONIERZY ZBUDOWALI SZKO\u0141\u0118 W CZECHOWICACH",
    content: "M\u0142odzie\u017C zorganizowana w Ochotniczych Hufcach Pracy w zaledwie trzy miesi\u0105ce wznie\u015Bli now\u0105 szko\u0142\u0119 podstawow\u0105 w Czechowicach-Dziedzicach. Akcja nosi\u0142a imi\u0119 Tysi\u0105c szk\u00F3\u0142 na tysi\u0105clecie.",
    fullContent: "M\u0142odzie\u017C zorganizowana w Ochotniczych Hufcach Pracy w zaledwie trzy miesi\u0105ce wznie\u015Bli now\u0105 szko\u0142\u0119 podstawow\u0105 w Czechowicach-Dziedzicach. Akcja nosi\u0142a imi\u0119 Tysi\u0105c szk\u00F3\u0142 na tysi\u0105clecie.\n\nW uroczystym otwarciu uczestniczy\u0142o ponad 500 mieszka\u0144c\u00F3w. Szko\u0142a mie\u015Bci 320 uczni\u00F3w i wyposa\u017Cona jest w nowoczesn\u0105 pracowni\u0119 chemiczn\u0105.\n\nKomendant hufca, towarzysz Nowak, otrzyma\u0142 odznaczenie Zas\u0142u\u017Cony Budowniczy PRL.",
    author: "DZIA\u0141 O\u015AWIATY"
  },
  {
    id: 5,
    title: "REKORD \u015AWIATA POLSKIEJ SZYBOWCOWNICZKI",
    content: "Polska szybowniczka ustanowi\u0142a nowy rekord \u015Bwiata w locie szybowcowym na dystansie 560 km. Lot odby\u0142 si\u0119 na szybowcu typu Jask\u00F3\u0142ka produkcji zak\u0142ad\u00F3w PZL.",
    fullContent: "Polska szybowniczka ustanowi\u0142a nowy rekord \u015Bwiata w locie szybowcowym na dystansie 560 km. Lot odby\u0142 si\u0119 na szybowcu typu Jask\u00F3\u0142ka produkcji zak\u0142ad\u00F3w PZL.\n\nTo wspania\u0142y dzie\u0144 dla polskiego sportu i przemys\u0142u lotniczego. Szybowiec Jask\u00F3\u0142ka jest w ca\u0142o\u015Bci konstrukcj\u0105 polsk\u0105.\n\nObywatelka Majewska zosta\u0142a odznaczona Z\u0142otym Medalem za Wybitne Osi\u0105gni\u0119cia Sportowe.",
    author: "DZIA\u0141 SPORTOWY"
  },
  {
    id: 6,
    title: "PRZEGL\u0104D TEATRALNY: DZIADY W TEATRZE STARYM",
    content: "Adam Mickiewicz Dziady w re\u017Cyserii Konrada Swinarskiego w krakowskim Teatrze Starym. Przedstawienie zyska\u0142o entuzjastyczne recenzje publiczno\u015Bci.",
    fullContent: "Adam Mickiewicz Dziady w re\u017Cyserii Konrada Swinarskiego w krakowskim Teatrze Starym. Przedstawienie zyska\u0142o entuzjastyczne recenzje publiczno\u015Bci.\n\nSpektakl trwaj\u0105cy ponad 4 godziny to wydarzenie o niespotykanej sile wyrazu. Swinarski zreinterpretowa\u0142 klasyczny tekst Mickiewicza.\n\nBilety dost\u0119pne w kasach teatru. Cena: 40-80 z\u0142.",
    author: "DZIA\u0141 KULTURY"
  },
];

const crosswordData = {
  across: [
    { number: 1, clue: "Stolica ZSRR", answer: "MOSKWA", row: 0, col: 0 },
    { number: 4, clue: "Pierwszy sekretarz KC PZPR", answer: "GIEREK", row: 2, col: 3 },
    { number: 5, clue: "Plan gospodarczy na piec lat", answer: "PIECIOLATKA", row: 4, col: 0 },
    { number: 6, clue: "Organizacja mlodziezowa", answer: "ZMP", row: 6, col: 5 },
  ],
  down: [
    { number: 2, clue: "Miasto z wielka huta", answer: "NOWAHUTA", row: 0, col: 2 },
    { number: 3, clue: "Pismo partyjne", answer: "NOWEDROGI", row: 0, col: 5 },
  ]
};

const pogody = [
  { miasto: "Warszawa", temp: "+12\u00B0C", ikona: "\u2601\uFE0F", opis: "Pochmurnie z przejasnieniami" },
  { miasto: "Krak\u00F3w", temp: "+10\u00B0C", ikona: "\u26C5", opis: "Zmienna szata chmur" },
  { miasto: "Gda\u0144sk", temp: "+8\u00B0C", ikona: "\uD83C\uDF27\uFE0F", opis: "Opady deszczu" },
  { miasto: "Wroc\u0142aw", temp: "+11\u00B0C", ikona: "\u2601\uFE0F", opis: "Czesciowe zachmurzenie" },
  { miasto: "Pozna\u0144", temp: "+9\u00B0C", ikona: "\uD83C\uDF24\uFE0F", opis: "Duze zachmurzenie" },
  { miasto: "Katowice", temp: "+7\u00B0C", ikona: "\uD83C\uDF2B\uFE0F", opis: "Mgla, widocznosc do 200m" },
];

const programTV = [
  { godzina: "15:00", program: "Program dla szk\u00F3\u0142 -- Fizyka" },
  { godzina: "15:30", program: "MLODZI I TALENTOWANI -- reportaz" },
  { godzina: "16:15", program: "WIADOMOSCI DZIENNIKA TV" },
  { godzina: "16:30", program: "Kresk\u00F3wka: REKSIO" },
  { godzina: "17:00", program: "Turniej siatk\u00F3wki PRL -- NRD" },
  { godzina: "18:00", program: "PROTOKOL DYPLOMATYCZNY -- film" },
  { godzina: "19:30", program: "DZIENNIK TELEWIZYJNY" },
  { godzina: "20:00", program: "CZTEREJ PANCERNI I PIES -- odc. 5" },
  { godzina: "20:30", program: "Teatr TV: MORALNOSC PANI DULSKIEJ" },
  { godzina: "22:00", program: "Program II -- Zakonczenie nadawania" },
];

// ============ COMPONENTS ============

function Header() {
  const [clockTime, setClockTime] = useState("12:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setClockTime(now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="text-center border-b-4 border-double border-gray-800 pb-4 mb-6 relative">
      {/* Red star */}
      <div className="flex justify-center mb-2">
        <span className="text-5xl animate-pulse">&#11088;</span>
      </div>

      {/* Top bar */}
      <div className="flex justify-between items-center text-xs tracking-widest mb-2 px-4 border-b border-dotted border-gray-600 pb-2">
        <span>ROCZNIK XXVIII &bull; WARSZAWA</span>
        <span className="font-bold text-lg tracking-widest">{clockTime}</span>
        <span>NR 156 (8432) &bull; CENA 2 ZL</span>
      </div>

      {/* Main title */}
      <h1
        className="text-5xl md:text-7xl font-black tracking-wider my-4"
        style={{ fontFamily: "'Times New Roman', serif", textShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}
      >
        TRYBUNA LUDU
      </h1>

      {/* Subtitle */}
      <p className="text-sm tracking-widest text-gray-700 mb-2" style={{ fontSize: '10px' }}>
        CENTRALNY ORGAN KOMITETU CENTRALNEGO POLSKIEJ ZJEDNOCZONEJ PARTII ROBOTNICZEJ
      </p>

      {/* Decorative line */}
      <div className="flex items-center gap-2 px-8 mt-3">
        <div className="flex-1 h-[2px] bg-gray-800"></div>
        <div className="h-3 w-3 bg-red-700 rotate-45"></div>
        <div className="h-2 w-2 bg-gray-800 rotate-45"></div>
        <div className="h-3 w-3 bg-red-700 rotate-45"></div>
        <div className="flex-1 h-[2px] bg-gray-800"></div>
      </div>

      <div className="text-xs mt-2 tracking-widest">
        WTOREK, 12 MARCA 1974 R. &mdash; WYDANIE PORANNE
      </div>
    </header>
  );
}

function Navigation({ activeSection, onNavigate }: { activeSection: string; onNavigate: (s: string) => void }) {
  const sections = [
    { id: 'strona1', label: 'STRONA 1' },
    { id: 'strona2', label: 'STRONA 2' },
    { id: 'krzyzowka', label: 'KRZYZOWKA' },
    { id: 'tv', label: 'PROGRAM TV' },
    { id: 'pogoda', label: 'POGODA' },
    { id: 'ogloszenia', label: 'OGLOSZENIA' },
  ];

  return (
    <nav className="border-b-2 border-t-2 border-gray-800 py-2 mb-6 flex flex-wrap justify-center gap-1">
      {sections.map(s => (
        <button
          key={s.id}
          onClick={() => onNavigate(s.id)}
          className={`px-3 py-1 text-xs tracking-widest font-bold transition-all duration-200 
            ${activeSection === s.id
              ? 'bg-red-800 text-white'
              : 'bg-transparent hover:bg-gray-300 text-gray-800'
            }`}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}

function ArticleCard({ article, onExpand }: { article: typeof articles[0]; onExpand: (id: number) => void }) {
  return (
    <article className={`border border-gray-400 p-4 mb-4 ${article.highlighted ? 'border-2 border-gray-800 bg-amber-50' : ''}`}>
      {article.subtitle && (
        <p className="text-xs tracking-widest text-red-800 font-bold mb-1 uppercase">{article.subtitle}</p>
      )}
      <h2
        className="text-xl font-black mb-2 leading-tight cursor-pointer hover:text-red-800 transition-colors"
        style={{ fontFamily: "'Times New Roman', serif" }}
        onClick={() => onExpand(article.id)}
      >
        {article.title}
      </h2>
      <p className="text-sm leading-relaxed text-gray-800" style={{ fontFamily: "'Times New Roman', serif", textAlign: 'justify', textIndent: '2em' }}>
        {article.content}
      </p>
      <div className="flex justify-between items-center mt-3 border-t border-dotted border-gray-400 pt-2">
        {article.author && (
          <span className="text-xs tracking-widest text-gray-600 font-bold">{article.author}</span>
        )}
        <button
          onClick={() => onExpand(article.id)}
          className="text-xs bg-gray-800 text-white px-3 py-1 hover:bg-red-800 transition-colors tracking-widest"
        >
          CZYTAJ DALEJ &#8594;
        </button>
      </div>
    </article>
  );
}

function ExpandedArticle({ article, onClose }: { article: typeof articles[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-amber-50 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 border-2 border-gray-800 relative"
        style={{ boxShadow: '5px 5px 20px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gray-300 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:text-red-800 text-2xl font-bold z-10"
        >
          &#10005;
        </button>

        {article.subtitle && (
          <p className="text-sm tracking-widest text-red-800 font-bold mb-2">{article.subtitle}</p>
        )}
        <h2 className="text-3xl font-black mb-4 leading-tight" style={{ fontFamily: "'Times New Roman', serif" }}>
          {article.title}
        </h2>

        <div className="border-t border-b border-gray-400 py-1 mb-4 flex justify-between text-xs text-gray-600">
          <span>TRYBUNA LUDU &bull; NR 156</span>
          <span>WTOREK, 12 MARCA 1974</span>
        </div>

        <div className="text-base leading-relaxed text-gray-800" style={{ fontFamily: "'Times New Roman', serif", textAlign: 'justify' }}>
          {article.fullContent.split('\n\n').map((p, i) => (
            <p key={i} className="mb-3" style={{ textIndent: i > 0 ? '2em' : 0 }}>{p}</p>
          ))}
        </div>

        {article.author && (
          <div className="mt-6 text-right border-t border-gray-400 pt-3">
            <span className="text-xs tracking-widest font-bold text-gray-600">{article.author}</span>
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="bg-red-800 text-white px-6 py-2 text-sm tracking-widest hover:bg-red-900 transition-colors"
          >
            POWROT DO GAZETY
          </button>
        </div>
      </div>
    </div>
  );
}

function Crossword() {
  const [userInput, setUserInput] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState<Record<string, boolean>>({});

  const gridSize = 12;
  type Cell = { letter: string; number?: number; isBlank: boolean } | null;
  const grid: Cell[][] = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => null)
  );

  crosswordData.across.forEach(word => {
    for (let i = 0; i < word.answer.length; i++) {
      if (!grid[word.row][word.col + i]) {
        grid[word.row][word.col + i] = { letter: word.answer[i], isBlank: false };
      }
      if (i === 0 && grid[word.row][word.col + i]) {
        grid[word.row][word.col + i]!.number = word.number;
      }
    }
  });

  crosswordData.down.forEach(word => {
    for (let i = 0; i < word.answer.length; i++) {
      if (!grid[word.row + i][word.col]) {
        grid[word.row + i][word.col] = { letter: word.answer[i], isBlank: false };
      }
      if (i === 0 && grid[word.row + i][word.col]) {
        grid[word.row + i][word.col]!.number = word.number;
      }
    }
  });

  const handleCheck = () => {
    const results: Record<string, boolean> = {};
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const cell = grid[r][c];
        if (cell && !cell.isBlank) {
          const key = `${r}-${c}`;
          results[key] = (userInput[key] || '').toUpperCase() === cell.letter;
        }
      }
    }
    setCorrect(results);
    setChecked(true);
  };

  const handleReset = () => {
    setUserInput({});
    setChecked(false);
    setCorrect({});
  };

  return (
    <div>
      <h3 className="text-2xl font-black mb-4 text-center border-b-2 border-gray-800 pb-2" style={{ fontFamily: "'Times New Roman', serif" }}>
        &#9830; KRZYZOWKA POLITYCZNA &#9830;
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="inline-grid gap-0 border-2 border-gray-800 bg-gray-800" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const key = `${r}-${c}`;
                if (!cell || cell.isBlank) {
                  return <div key={key} className="w-8 h-8 bg-gray-800" />;
                }
                return (
                  <div key={key} className="w-8 h-8 bg-white relative">
                    {cell.number && (
                      <span className="absolute top-0 left-0.5 text-[8px] font-bold text-gray-800">{cell.number}</span>
                    )}
                    <input
                      type="text"
                      maxLength={1}
                      value={userInput[key] || ''}
                      onChange={e => {
                        setUserInput(prev => ({ ...prev, [key]: e.target.value }));
                        setChecked(false);
                      }}
                      className={`w-full h-full text-center text-sm font-bold uppercase outline-none border border-gray-300 ${checked ? (correct[key] ? 'bg-green-200' : 'bg-red-200') : 'bg-white'
                        }`}
                    />
                  </div>
                );
              })
            )}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCheck}
              className="bg-gray-800 text-white px-4 py-2 text-xs tracking-widest hover:bg-green-800 transition-colors"
            >
              SPRAWDZ ODPOWIEDZI
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 text-white px-4 py-2 text-xs tracking-widest hover:bg-red-800 transition-colors"
            >
              RESETUJ
            </button>
          </div>
        </div>

        <div>
          <div className="border border-gray-400 p-3 mb-2">
            <h4 className="font-bold text-sm mb-2 border-b border-gray-300 pb-1">&#8594; WPOZIOMIE</h4>
            {crosswordData.across.map(clue => (
              <p key={clue.number} className="text-sm mb-1">
                <span className="font-bold">{clue.number}.</span> {clue.clue}
              </p>
            ))}
          </div>
          <div className="border border-gray-400 p-3">
            <h4 className="font-bold text-sm mb-2 border-b border-gray-300 pb-1">&#8595; PIONOWO</h4>
            {crosswordData.down.map(clue => (
              <p key={clue.number} className="text-sm mb-1">
                <span className="font-bold">{clue.number}.</span> {clue.clue}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WeatherWidget() {
  const [expandedCity, setExpandedCity] = useState<string | null>(null);

  return (
    <div>
      <h3 className="text-2xl font-black mb-4 text-center border-b-2 border-gray-800 pb-2" style={{ fontFamily: "'Times New Roman', serif" }}>
        &#9830; PROGNOZA POGODY &#9830;
      </h3>
      <p className="text-xs text-center mb-4 tracking-widest">INSTYTUT METEOROLOGII I GOSPODARKI WODNEJ</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {pogody.map(p => (
          <button
            key={p.miasto}
            onClick={() => setExpandedCity(expandedCity === p.miasto ? null : p.miasto)}
            className={`border p-4 text-left transition-all duration-300 ${expandedCity === p.miasto ? 'border-red-800 bg-red-50 border-2' : 'border-gray-400 hover:border-gray-800'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl">{p.ikona}</span>
              <div>
                <h4 className="font-bold text-lg">{p.miasto}</h4>
                <p className="text-2xl font-black">{p.temp}</p>
              </div>
            </div>
            {expandedCity === p.miasto && (
              <div className="mt-3 pt-3 border-t border-gray-300">
                <p className="text-sm">{p.opis}</p>
                <p className="text-xs mt-2 text-gray-600">Cisnienie: 1013 hPa</p>
                <p className="text-xs text-gray-600">Wiatr: NW 12 km/h</p>
                <p className="text-xs text-gray-600">Wilgotnosc: 72%</p>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 border border-gray-400 p-3 text-xs text-center">
        <p className="font-bold tracking-widest">PORADA DZIALACZA:</p>
        <p className="mt-1">Pamietaj, towarzyszu! Na dluga zime przygotuj sie juz teraz. Remontuj piece, izoluj okna!</p>
      </div>
    </div>
  );
}

function TVProgram() {
  const [activeChannel, setActiveChannel] = useState<'p1' | 'p2'>('p1');
  const [highlightedShow, setHighlightedShow] = useState<string | null>(null);

  return (
    <div>
      <h3 className="text-2xl font-black mb-4 text-center border-b-2 border-gray-800 pb-2" style={{ fontFamily: "'Times New Roman', serif" }}>
        &#9830; PROGRAM TELEWIZYJNY &#9830;
      </h3>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setActiveChannel('p1')}
          className={`px-6 py-2 text-sm font-bold tracking-widest ${activeChannel === 'p1' ? 'bg-red-800 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
        >
          PROGRAM I
        </button>
        <button
          onClick={() => setActiveChannel('p2')}
          className={`px-6 py-2 text-sm font-bold tracking-widest ${activeChannel === 'p2' ? 'bg-red-800 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
        >
          PROGRAM II
        </button>
      </div>

      <div className="border border-gray-400">
        <div className="bg-gray-800 text-white px-4 py-2 text-xs tracking-widest flex justify-between">
          <span>{activeChannel === 'p1' ? 'PROGRAM I -- TVP' : 'PROGRAM II -- TVP'}</span>
          <span>12.03.1974</span>
        </div>
        {programTV.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => setHighlightedShow(p.godzina)}
            onMouseLeave={() => setHighlightedShow(null)}
            onClick={() => setHighlightedShow(highlightedShow === p.godzina ? null : p.godzina)}
            className={`flex border-b border-gray-300 cursor-pointer transition-all duration-200 ${highlightedShow === p.godzina ? 'bg-yellow-100' : ''
              } ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <span className="w-16 text-center font-bold text-sm py-2 border-r border-gray-300 bg-gray-100 flex-shrink-0">
              {p.godzina}
            </span>
            <span className="px-3 py-2 text-sm flex-1" style={{ fontFamily: "'Times New Roman', serif" }}>
              {p.program}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-center mt-3 text-gray-600 tracking-widest">
        UWAGA: Program moze ulec zmianie ze wzgled\u00F3w technicznych lub politycznych
      </p>
    </div>
  );
}

function Announcements() {
  const [clippedCoupons, setClippedCoupons] = useState<Set<number>>(new Set());

  const announcements = [
    {
      id: 1,
      title: "SLUZBA ZDROWIA INFORMUJE",
      content: "Przypominamy obywatelom o obowiazku szczepien ochronnych. Punkt szczepien czynny w godzinach 8:00-14:00 w przychodni obwodowej.",
      icon: "\uD83C\uDFE5"
    },
    {
      id: 2,
      title: "NABOR DO WOJSKA",
      content: "Powiatowa Komisja Uzupelnien wzywa obywateli rocznikow 1952-1953 do stawienia sie w celu kwalifikacji wojskowej. Termin: 15-30 marca 1974 r.",
      icon: "\uD83C\uDF96\uFE0F"
    },
    {
      id: 3,
      title: "KUPON RACJONALIZATORA",
      content: "Wypelnij i wyslij! 10 najlepszych wnioskow racjonalizatorskich nagrodzonych zostanie bonem na zakup magnetowidu w Pewexie!",
      icon: "\u2702\uFE0F",
      isCoupon: true
    },
    {
      id: 4,
      title: "SPRZEDAZ MIESZKAN",
      content: "Spoldzielnia Mieszkaniowa Przyjazn oglasza zapisy na mieszkania 2- i 3-pokojowe w nowym bloku przy ul. Partyzantow 47.",
      icon: "\uD83C\uDFE0"
    },
    {
      id: 5,
      title: "KINO MOSKWA -- TYDZIEN KINA RADZIECKIEGO",
      content: "Pokazy: Moskwa nie wierzy lzem, Czajkowski, Krolowa sniegu. Bilety: 5 zl. Rezerwacja w kasie kina.",
      icon: "\uD83C\uDFAC"
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-black mb-4 text-center border-b-2 border-gray-800 pb-2" style={{ fontFamily: "'Times New Roman', serif" }}>
        &#9830; OGLOSZENIA I KOMUNIKATY &#9830;
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map(a => (
          <div
            key={a.id}
            className={`border-2 p-4 relative transition-all duration-300 ${a.isCoupon
              ? (clippedCoupons.has(a.id) ? 'border-green-600 bg-green-50 border-solid' : 'border-dashed border-gray-800 bg-yellow-50')
              : 'border-gray-400'
              }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{a.icon}</span>
              <div className="flex-1">
                <h4 className="font-bold text-sm tracking-widest mb-2">{a.title}</h4>
                <p className="text-sm" style={{ fontFamily: "'Times New Roman', serif", textAlign: 'justify' }}>
                  {a.content}
                </p>
              </div>
            </div>

            {a.isCoupon && (
              <button
                onClick={() => {
                  const newClipped = new Set(clippedCoupons);
                  if (newClipped.has(a.id)) {
                    newClipped.delete(a.id);
                  } else {
                    newClipped.add(a.id);
                  }
                  setClippedCoupons(newClipped);
                }}
                className={`mt-3 w-full py-2 text-xs tracking-widest font-bold transition-all ${clippedCoupons.has(a.id)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-white hover:bg-red-800'
                  }`}
              >
                {clippedCoupons.has(a.id) ? 'WYCIETO -- WNIOSEK WYSLANY' : 'WYCIJ I WYSLIJ'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RadioWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(95.2);
  const [visualizer, setVisualizer] = useState<number[]>(Array(20).fill(0));

  useEffect(() => {
    if (!isPlaying) {
      setVisualizer(Array(20).fill(0));
      return;
    }
    const interval = setInterval(() => {
      setVisualizer(prev => prev.map(() => Math.random() * 100));
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const stations = [
    { freq: 95.2, name: "Program I PR" },
    { freq: 98.4, name: "Program II PR" },
    { freq: 102.1, name: "Program III PR" },
    { freq: 107.5, name: "Radio Moskwa" },
  ];

  return (
    <div className="border-2 border-gray-800 p-4 bg-gradient-to-b from-gray-100 to-gray-200">
      <h4 className="text-sm font-black tracking-widest text-center mb-3">RADIOODBIORNIK</h4>

      <div className="bg-gray-900 text-green-400 font-mono text-center text-xl py-2 mb-3 border border-gray-600">
        {frequency.toFixed(1)} MHz
      </div>

      <div className="flex items-end justify-center gap-1 h-12 mb-3 bg-gray-900 p-1">
        {visualizer.map((v, i) => (
          <div
            key={i}
            className="transition-all duration-100"
            style={{
              width: '8px',
              height: isPlaying ? `${Math.max(v, 5)}%` : '2px',
              backgroundColor: isPlaying ? (v > 70 ? '#ff6b6b' : v > 40 ? '#ffd93d' : '#6bcb77') : '#333'
            }}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 mb-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-12 h-12 rounded-full border-2 font-bold text-lg transition-all ${isPlaying ? 'bg-red-600 border-red-800 text-white' : 'bg-gray-800 border-gray-900 text-white hover:bg-green-700'
            }`}
        >
          {isPlaying ? '\u25A0' : '\u25B6'}
        </button>
      </div>

      <div className="mb-3">
        <input
          type="range"
          min="87.5"
          max="108"
          step="0.1"
          value={frequency}
          onChange={e => setFrequency(parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-gray-600" style={{ fontSize: '9px' }}>
          <span>87.5</span>
          <span>97.5</span>
          <span>108.0</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {stations.map(s => (
          <button
            key={s.freq}
            onClick={() => { setFrequency(s.freq); setIsPlaying(true); }}
            className={`text-center py-1 px-2 border transition-all ${Math.abs(frequency - s.freq) < 0.5
              ? 'bg-red-800 text-white border-red-900'
              : 'bg-white border-gray-400 hover:bg-gray-100'
              }`}
            style={{ fontSize: '10px' }}
          >
            {s.freq} &mdash; {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function StampWidget() {
  const [collected, setCollected] = useState<Set<number>>(new Set());

  const stamps = [
    { id: 1, name: "PZPR", bgColor: "#b91c1c", symbol: "\u262D", value: "1 zl" },
    { id: 2, name: "1 MAJA", bgColor: "#dc2626", symbol: "\u2605", value: "50 gr" },
    { id: 3, name: "PKO", bgColor: "#1d4ed8", symbol: "\uD83C\uDFDB\uFE0F", value: "2 zl" },
    { id: 4, name: "PRL", bgColor: "#ffffff", symbol: "\uD83E\uDD85", value: "5 zl" },
    { id: 5, name: "ZSRR", bgColor: "#991b1b", symbol: "\u262D", value: "10 zl" },
    { id: 6, name: "SPOLDZ.", bgColor: "#15803d", symbol: "\uD83E\uDD1D", value: "20 gr" },
  ];

  return (
    <div>
      <h4 className="text-sm font-black tracking-widest text-center mb-3 border-b border-gray-400 pb-2">
        ZNACZKI POCZTOWE PRL &mdash; KOLEKCJA
      </h4>
      <p className="text-xs text-center mb-3 text-gray-600">Kliknij, aby dodac do kolekcji ({collected.size}/{stamps.length})</p>

      <div id="buttons" className="grid grid-cols-3 gap-3">
        {stamps.map(s => (
          <button
            key={s.id}
            onClick={() => {
              const newCollected = new Set(collected);
              if (newCollected.has(s.id)) newCollected.delete(s.id);
              else newCollected.add(s.id);
              setCollected(newCollected);
            }}
            className={`aspect-square border-2 border-gray-600 p-2 color-black flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${collected.has(s.id)
              ? 'shadow-lg ring-2 ring-yellow-500'
              : 'hover:scale-105 opacity-80 hover:opacity-100'
              }`}
            style={{
              backgroundColor: s.bgColor,
              transform: collected.has(s.id) ? `scale(0.95) rotate(${(s.id * 2 - 3)}deg)` : undefined
            }}
          >
            <span className="text-2xl mb-1">{s.symbol}</span>
            <span
              className={`font-bold ${s.id === 4 ? 'text-black-500' : 'text-white/90'}`}
              style={{ fontSize: '9px' }}
            >
              {s.name}
            </span>
            <span
              className={`font-bold ${s.id === 4 ? 'text-black-500' : 'text-white/90'}`}
              style={{ fontSize: '8px' }}
            >
              {s.value}
            </span>
            {collected.has(s.id) && <span className={`font-bold ${s.id === 4 ? 'text-black-500' : 'text-white/90'}`}>&#10003;</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);

  return (
    <div
      className="border-2 border-gray-800 p-4 bg-gray-900 text-green-400 font-mono text-sm cursor-pointer"
      onClick={() => setStarted(true)}
    >
      <p className="text-xs text-gray-500 mb-2">KLIKNIJ ABY ODBIERAC KOMUNIKAT Z KC PZPR:</p>
      {started ? (
        <p>{displayed}<span className="animate-pulse">|</span></p>
      ) : (
        <p className="text-gray-600">[ AWARIA SYSTEMU -- WYMAGANA INTERWENCJA OPERATORA ]</p>
      )}
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="space-y-6">
      <RadioWidget />
      <StampWidget />

      <div className="border-2 border-red-800 bg-red-50 p-4">
        <h4 className="text-sm font-black tracking-widest text-center mb-3 text-red-800">
          CYTAT TYGODNIA
        </h4>
        <blockquote className="text-sm italic text-center leading-relaxed" style={{ fontFamily: "'Times New Roman', serif" }}>
          Kazdy obywatel ma obowiazek pracowac zgodnie ze swoimi zdolnosciami i kwalifikacjami oraz sumiennie wykonywac swoje obowiazki.
        </blockquote>
        <p className="text-xs text-center mt-2 font-bold">&mdash; KONSTYTUCJA PRL, ART. 19</p>
      </div>

      <div className="border-2 border-yellow-600 bg-yellow-50 p-4 text-center">
        <h4 className="text-lg font-black tracking-widest mb-2" style={{ fontFamily: "'Times New Roman', serif" }}>
          PEWEX
        </h4>
        <p className="text-xs tracking-widest mb-2">SKLEPY INTERNACJONALNEJ HANDLU</p>
        <div className="space-y-1 text-sm text-left">
          <p>Fiat 126p &mdash; 69 000 zl</p>
          <p>Kolorowy TV &mdash; 28 000 zl</p>
          <p>Magnetofon &mdash; 4 500 zl</p>
          <p>Dzinsy &mdash; 800 zl</p>
        </div>
        <p className="mt-2 text-gray-600" style={{ fontSize: '10px' }}>* Dostepne za dewizy lub bonami towarowymi PeKaO</p>
      </div>

      <TypewriterText text="TOWARZYSZE! Komitet Centralny informuje, ze w zwiazku z sukcesami gospodarki planowej, od przyszlego miesiaca wprowadzone zostana nowe przydzialy miesa. Kazda rodzina otrzyma dodatkowe 500g na osobe. Niech zyje PRL!" speed={25} />

      <div className="border-2 border-gray-800 bg-red-700 text-white p-4 text-center cursor-pointer hover:bg-red-800 transition-colors">
        <p className="text-3xl mb-2">&#9994;</p>
        <p className="text-sm font-black tracking-widest">PARTIA &mdash; NARZEDZIE PRZEMIAN!</p>
        <p className="mt-2 opacity-80" style={{ fontSize: '10px' }}>PZPR Zaprasza na zebrania organizacyjne co czwartek g. 18:00</p>
      </div>
    </aside>
  );
}

function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={e => { setQuery(e.target.value); onSearch(e.target.value); }}
        placeholder="Szukaj w Trybunie Ludu..."
        className="flex-1 border-2 border-gray-800 px-4 py-2 text-sm bg-white/80 focus:bg-white transition-colors outline-none"
        style={{ fontFamily: "'Times New Roman', serif" }}
      />
      <button className="bg-gray-800 text-white px-6 py-2 text-sm tracking-widest hover:bg-red-800 transition-colors">
        SZUKAJ
      </button>
    </div>
  );
}

// ============ MAIN APP ============

export default function App() {
  const [activeSection, setActiveSection] = useState('strona1');
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageFlip, setPageFlip] = useState(false);

  const handleNavigate = (section: string) => {
    setPageFlip(true);
    setTimeout(() => {
      setActiveSection(section);
      setPageFlip(false);
    }, 300);
  };

  const filteredArticles = searchQuery
    ? articles.filter(a =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : articles;

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative bg-amber-50 p-6 md:p-10 shadow-2xl transition-all duration-300"
          style={{
            transform: pageFlip ? 'rotateY(90deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-in-out',
            backgroundImage: `radial-gradient(ellipse at 85% 15%, rgba(139,90,43,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 10% 90%, rgba(139,90,43,0.06) 0%, transparent 40%)`
          }}
        >
          {/* Paper texture overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-5" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.1) 28px, rgba(0,0,0,0.1) 29px)`
          }} />

          {/* Fold marks */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-40" />

          <Header />
          <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
          <SearchBar onSearch={setSearchQuery} />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <main className="flex-1 min-w-0">
              {(activeSection === 'strona1' || activeSection === 'strona2') && (
                <div>
                  {searchQuery && (
                    <div className="bg-yellow-100 border border-yellow-600 p-2 mb-4 text-sm">
                      Znaleziono {filteredArticles.length} artykulow dla zapytania: {searchQuery}
                    </div>
                  )}

                  <div className={activeSection === 'strona1' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                    {filteredArticles.map(article => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onExpand={setExpandedArticle}
                      />
                    ))}
                  </div>

                  {filteredArticles.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-2xl">&#128269;</p>
                      <p className="text-lg mt-2">Brak artykulow spelniajacych kryteria</p>
                      <p className="text-sm text-gray-600 mt-1">Sprobuj innego zapytania, towarzyszu</p>
                    </div>
                  )}

                  <div className="text-center mt-6 border-t border-gray-400 pt-4">
                    <span className="text-sm tracking-widest">&mdash; STRONA {activeSection === 'strona1' ? '1' : '2'} Z 2 &mdash;</span>
                  </div>
                </div>
              )}

              {activeSection === 'krzyzowka' && <Crossword />}
              {activeSection === 'pogoda' && <WeatherWidget />}
              {activeSection === 'tv' && <TVProgram />}
              {activeSection === 'ogloszenia' && <Announcements />}
            </main>

            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <Sidebar />
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-10 border-t-4 border-double border-gray-800 pt-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="flex-1 h-px bg-gray-400"></div>
              <span className="text-2xl">&#11088;</span>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>
            <p className="text-xs tracking-widest text-gray-600">
              TRYBUNA LUDU &mdash; CZERWONA 6/8, WARSZAWA &bull; TELEFON REDAKCJI: 20-20-44
            </p>
            <p className="text-xs tracking-widest text-gray-600 mt-1">
              NAKLAD: 800 000 EGZEMPLARZY &bull; DRUK: RUCH &bull; RCL Warszawa
            </p>
            <p className="text-gray-500 mt-2" style={{ fontSize: '10px' }}>
              &copy; 1974 RSW Prasa-Ksiazka-Ruch &mdash; Wszelkie prawa zastrzezone. Kopiowanie bez zezwolenia KC PZPR zabronione.
            </p>
          </footer>
        </div>
      </div>

      {/* Expanded article modal */}
      {expandedArticle !== null && (
        <ExpandedArticle
          article={articles.find(a => a.id === expandedArticle)!}
          onClose={() => setExpandedArticle(null)}
        />
      )}
    </div>
  );
}
