import { useState } from "react";

// ============ DANE FABRYK ============

const factories = [
  {
    id: 1,
    name: "Stalowa Wola",
    shortName: "HSW",
    x: 62,
    y: 66,
    type: "huta",
    icon: "⚙️",
    year: 1937,
    product: "Stal, armaty, czołgi",
    desc: "Huta Stalowa Wola – serce COP. Zakłady Południowe wybudowane od zera w sosnowym lesie w widłach Wisły i Sanu. Produkowały stal, armaty przeciwpancerne i elementy do czołgów 7TP. W szczytowym momencie zatrudniały ponad 7 000 robotników.",
    workers: 7000,
    color: "#b91c1c",
  },
  {
    id: 2,
    name: "Mielec",
    shortName: "PZL",
    x: 52,
    y: 57,
    type: "lotnictwo",
    icon: "✈️",
    year: 1938,
    product: "Samoloty PZL.37 Łoś",
    desc: "Wytwórnia Płatowców nr 2 w Mielcu. Produkowała słynnego bombowca PZL.37 Łoś – jedną z najnowocześniejszych konstrukcji lotniczych swoich czasów. Zasięg 2600 km i udźwig 2580 kg bomb stawiały go w światowej czołówce.",
    workers: 3500,
    color: "#1d4ed8",
  },
  {
    id: 3,
    name: "Rzeszów",
    shortName: "WSK",
    x: 60,
    y: 58,
    type: "lotnictwo",
    icon: "🔧",
    year: 1938,
    product: "Silniki lotnicze, karabiny",
    desc: "Wytwórnia Silników nr 2 – produkowała silniki lotnicze do myśliwców PZL P.11 i P.24 oraz karabiny maszynowe Browning wz. 36. Zakłady były ściśle tajne, a pracownicy musieli podpisywać specjalne zobowiązania o zachowaniu poufności.",
    workers: 2800,
    color: "#1d4ed8",
  },
  {
    id: 4,
    name: "Radom",
    shortName: "FB",
    x: 45,
    y: 34,
    type: "zbrojenia",
    icon: "🔫",
    year: 1935,
    product: "Pistolet VIS wz. 35",
    desc: "Fabryka Broni w Radomiu – jeden z najważniejszych zakładów zbrojeniowych II RP. Tu narodził się legendarny pistolet VIS wz. 35, uznawany za jeden z najlepszych pistoletów II wojny światowej. Produkowano też karabiny Mauser wz. 98.",
    workers: 4200,
    color: "#92400e",
  },
  {
    id: 5,
    name: "Starachowice",
    shortName: "ZM",
    x: 48,
    y: 40,
    type: "ciężki",
    icon: "🛡️",
    year: 1923,
    product: "Działa, samochody ciężarowe",
    desc: "Zakłady Starachowickie – najstarszy ośrodek COP. Produkowały haubice, moździerze oraz samochody ciężarowe dla wojska. Zakłady rozbudowano intensywnie w ramach planu 4-letniego Kwiatkowskiego, podwajając moce produkcyjne.",
    workers: 5500,
    color: "#065f46",
  },
  {
    id: 6,
    name: "Rożnów",
    shortName: "EW",
    x: 48,
    y: 67,
    type: "energia",
    icon: "⚡",
    year: 1941,
    product: "Energia elektryczna",
    desc: "Elektrownia wodna w Rożnowie – największa budowla hydrotechniczna II RP. Zapora o wysokości 41 m i długości 430 m na rzece Dunajec. Dostarczała tanią energię elektryczną do fabryk COP. Budowa trwała od 1936 roku.",
    workers: 800,
    color: "#1e40af",
  },
  {
    id: 7,
    name: "Dębica",
    shortName: "ZP",
    x: 53,
    y: 62,
    type: "chemia",
    icon: "🧪",
    year: 1939,
    product: "Paliwa syntetyczne, trotyl",
    desc: "Zakłady Przemysłu Chemicznego w Dębicy – produkowały paliwa syntetyczne, materiały wybuchowe (trotyl, melinit) oraz proch strzelniczy. Zakład był starannie zamaskowany i rozrzucony na dużym obszarze, by utrudnić bombardowanie.",
    workers: 2100,
    color: "#6b21a8",
  },
  {
    id: 8,
    name: "Sanok",
    shortName: "Autosan",
    x: 63,
    y: 72,
    type: "transport",
    icon: "🚌",
    year: 1937,
    product: "Autobusy, wagony",
    desc: "Fabryka Autobusów i Wagonów w Sanoku. Produkowała autobusy i specjalne wagony kolejowe dla wojska. W ramach COP zakłady zostały znacznie rozbudowane i wyposażone w nowoczesne prasy hydrauliczne do tłoczenia karoserii.",
    workers: 1900,
    color: "#065f46",
  },
  {
    id: 9,
    name: "Kielce",
    shortName: "ZP Kielce",
    x: 40,
    y: 35,
    type: "ciężki",
    icon: "⛏️",
    year: 1936,
    product: "Amunicja, granaty",
    desc: "Zakłady Przemysłowe w Kielcach – produkcja amunicji artyleryjskiej i granatów ręcznych. Miasto leżało na obrzeżu COP, ale jego zakłady były integralną częścią łańcucha dostaw dla całego okręgu.",
    workers: 1600,
    color: "#92400e",
  },
];

const typeLabels: Record<string, string> = {
  huta: "HUTNICTWO",
  lotnictwo: "LOTNICTWO",
  zbrojenia: "ZBROJENIA",
  ciężki: "PRZEMYSŁ CIĘŻKI",
  energia: "ENERGETYKA",
  chemia: "CHEMIA",
  transport: "TRANSPORT",
};

// Uproszczona SVG mapa Polski z zaznaczonym trójkątem COP
const POLAND_PATH =
  "M 155 18 L 195 14 L 230 22 L 265 18 L 290 30 L 310 25 L 325 35 L 318 55 L 335 70 L 328 90 L 342 108 L 335 130 L 315 148 L 295 155 L 275 170 L 255 175 L 235 185 L 218 178 L 200 190 L 180 185 L 162 195 L 140 188 L 118 192 L 100 180 L 85 162 L 72 145 L 58 130 L 50 112 L 45 90 L 48 72 L 38 55 L 45 40 L 62 30 L 85 22 L 110 16 Z";

export function COPMap() {
  const [hovered, setHovered]   = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter]     = useState<string | null>(null);

  const activeId = selected ?? hovered;
  const activeFactory = factories.find((f) => f.id === activeId) ?? null;

  const visibleFactories = filter
    ? factories.filter((f) => f.type === filter)
    : factories;

  const types = Array.from(new Set(factories.map((f) => f.type)));

  return (
    <div className="font-serif">
      {/* ── Nagłówek ── */}
      <div className="text-center mb-6 border-b-2 border-red-800 pb-4">
        <p className="text-xs tracking-[0.3em] text-red-800 font-bold mb-1">
          ATLAS INDUSTRIALIZACJI
        </p>
        <h3
          className="text-2xl font-black tracking-tight"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          ⚙️ MAPA ZAKŁADÓW CENTRALNEGO OKRĘGU PRZEMYSŁOWEGO ⚙️
        </h3>
        <p className="text-xs tracking-widest text-gray-500 mt-1 italic">
          Polska · 1936–1939 · Program uprzemysłowienia II Rzeczypospolitej
        </p>
      </div>

      {/* ── Filtry ── */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1 text-[10px] tracking-widest font-bold border transition-all ${
            filter === null
              ? "bg-gray-800 text-white border-gray-800"
              : "bg-transparent text-gray-700 border-gray-400 hover:border-gray-700"
          }`}
        >
          WSZYSTKIE
        </button>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(filter === t ? null : t)}
            className={`px-3 py-1 text-[10px] tracking-widest font-bold border transition-all ${
              filter === t
                ? "bg-red-800 text-white border-red-800"
                : "bg-transparent text-gray-700 border-gray-400 hover:border-gray-700"
            }`}
          >
            {typeLabels[t]}
          </button>
        ))}
      </div>

      {/* ── Główny layout ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* SVG Mapa */}
        <div className="flex-1 min-w-0 relative">
          <svg
            viewBox="0 0 390 220"
            className="w-full border-2 border-gray-800 bg-amber-50 cursor-crosshair"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 60% 50%, rgba(180,140,80,0.12) 0%, transparent 70%)",
            }}
          >
            {/* Siatka kartograficzna */}
            {[0.25, 0.5, 0.75].map((t) => (
              <g key={t}>
                <line
                  x1={390 * t} y1={0} x2={390 * t} y2={220}
                  stroke="#c8b98a" strokeWidth="0.4" strokeDasharray="3,4"
                />
                <line
                  x1={0} y1={220 * t} x2={390} y2={220 * t}
                  stroke="#c8b98a" strokeWidth="0.4" strokeDasharray="3,4"
                />
              </g>
            ))}

            {/* Kontur Polski */}
            <path
              d={POLAND_PATH}
              fill="#e8d9b5"
              stroke="#5c4a2a"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Rzeki (uproszczone) */}
            {/* Wisła */}
            <path
              d="M 148 55 C 155 75, 165 95, 170 115 C 172 130, 168 148, 175 165"
              fill="none" stroke="#4a90b8" strokeWidth="1.5" opacity="0.6"
            />
            {/* San */}
            <path
              d="M 215 155 C 205 145, 195 135, 185 125 C 178 118, 175 115, 170 115"
              fill="none" stroke="#4a90b8" strokeWidth="1" opacity="0.5"
            />
            {/* Podpisy rzek */}
            <text x="148" y="112" fontSize="5" fill="#2563eb" opacity="0.7"
              transform="rotate(-75 148 112)" fontStyle="italic">Wisła</text>
            <text x="198" y="132" fontSize="5" fill="#2563eb" opacity="0.7"
              transform="rotate(-40 198 132)" fontStyle="italic">San</text>

            {/* Trójkąt bezpieczeństwa COP */}
            <polygon
              points="160,110 205,160 170,165"
              fill="rgba(185,28,28,0.06)"
              stroke="#b91c1c"
              strokeWidth="0.8"
              strokeDasharray="4,3"
            />
            <text x="178" y="148" fontSize="5" fill="#b91c1c" opacity="0.7"
              textAnchor="middle" fontStyle="italic" letterSpacing="0.5">
              TRÓJKĄT COP
            </text>

            {/* Miasta referencyjne */}
            {[
              { x: 153, y: 55,  label: "Warszawa" },
              { x: 148, y: 110, label: "Kraków" },
              { x: 98,  y: 78,  label: "Wrocław" },
              { x: 108, y: 52,  label: "Łódź" },
            ].map((c) => (
              <g key={c.label}>
                <circle cx={c.x * 3.9 / 10 + 0} cy={c.y} r="2" fill="#5c4a2a" opacity="0.4" />
                <text x={c.x * 3.9 / 10 + 4} y={c.y + 1.5} fontSize="5" fill="#5c4a2a" opacity="0.55">
                  {c.label}
                </text>
              </g>
            ))}

            {/* Markery fabryk */}
            {factories.map((f) => {
              const px = (f.x / 100) * 390;
              const py = (f.y / 100) * 220;
              const isActive  = activeId === f.id;
              const isFiltered = filter && f.type !== filter;
              const isVisible  = visibleFactories.includes(f);

              return (
                <g
                  key={f.id}
                  transform={`translate(${px}, ${py})`}
                  style={{ cursor: "pointer", opacity: isFiltered ? 0.2 : 1 }}
                  onMouseEnter={() => !selected && setHovered(f.id)}
                  onMouseLeave={() => !selected && setHovered(null)}
                  onClick={() => setSelected(selected === f.id ? null : f.id)}
                >
                  {/* Pulsująca aura dla aktywnego */}
                  {isActive && (
                    <circle r="10" fill={f.color} opacity="0.15">
                      <animate
                        attributeName="r" values="8;14;8"
                        dur="1.5s" repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity" values="0.15;0;0.15"
                        dur="1.5s" repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Pin */}
                  <circle
                    r={isActive ? 7 : 5}
                    fill={isVisible ? f.color : "#9ca3af"}
                    stroke="white"
                    strokeWidth="1.5"
                    style={{ transition: "r 0.2s" }}
                  />

                  {/* Skrót */}
                  <text
                    y="1.5"
                    fontSize="4"
                    fill="white"
                    textAnchor="middle"
                    fontWeight="bold"
                    style={{ userSelect: "none", pointerEvents: "none" }}
                  >
                    {f.shortName.slice(0, 3)}
                  </text>

                  {/* Etykieta przy aktywnym */}
                  {isActive && (
                    <g transform="translate(9, -9)">
                      <rect
                        x="-1" y="-7" width={f.name.length * 4.5 + 4} height="9"
                        rx="1" fill={f.color} opacity="0.92"
                      />
                      <text
                        x={f.name.length * 2.25 + 1} y="-1"
                        fontSize="5.5" fill="white"
                        textAnchor="middle" fontWeight="bold"
                        style={{ userSelect: "none", pointerEvents: "none" }}
                      >
                        {f.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Kompas */}
            <g transform="translate(355, 30)">
              <circle r="12" fill="#f4ece1" stroke="#5c4a2a" strokeWidth="1" opacity="0.9" />
              <polygon points="0,-9 -2.5,2 0,0 2.5,2" fill="#b91c1c" />
              <polygon points="0,9 -2.5,-2 0,0 2.5,-2"  fill="#5c4a2a" />
              <text y="1.5" fontSize="5" textAnchor="middle" fill="#5c4a2a" fontWeight="bold">N</text>
            </g>

            {/* Skala */}
            <g transform="translate(15, 205)">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#5c4a2a" strokeWidth="1" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="#5c4a2a" strokeWidth="1" />
              <line x1="40" y1="-3" x2="40" y2="3" stroke="#5c4a2a" strokeWidth="1" />
              <text x="20" y="-4" fontSize="4.5" textAnchor="middle" fill="#5c4a2a">100 km</text>
            </g>
          </svg>

          {/* Podpis mapy */}
          <p className="text-[9px] text-center text-gray-400 mt-1 tracking-widest">
            Mapa schematyczna · Współrzędne przybliżone · Stan na rok 1939
          </p>
        </div>

        {/* Panel informacyjny */}
        <div className="lg:w-72 flex-shrink-0">
          {activeFactory ? (
            <div
              className="border-2 bg-amber-50 overflow-hidden"
              style={{ borderColor: activeFactory.color }}
            >
              {/* Header karty */}
              <div
                className="px-4 py-3 text-white"
                style={{ backgroundColor: activeFactory.color }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{activeFactory.icon}</span>
                  <span className="text-[9px] tracking-[0.2em] font-bold opacity-80 uppercase">
                    {typeLabels[activeFactory.type]}
                  </span>
                </div>
                <h4 className="text-xl font-black mt-1 tracking-tight" style={{ fontFamily: "'Times New Roman', serif" }}>
                  {activeFactory.name}
                </h4>
                <p className="text-xs opacity-80 tracking-wider">{activeFactory.shortName}</p>
              </div>

              {/* Dane */}
              <div className="px-4 py-3 border-b border-gray-200 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[9px] tracking-widest text-gray-500 font-bold">ROK BUDOWY</p>
                  <p className="text-sm font-black">{activeFactory.year}</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-widest text-gray-500 font-bold">ZATRUDNIENIE</p>
                  <p className="text-sm font-black">{activeFactory.workers.toLocaleString('pl-PL')} os.</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[9px] tracking-widest text-gray-500 font-bold">PRODUKCJA</p>
                  <p className="text-sm font-bold text-gray-800">{activeFactory.product}</p>
                </div>
              </div>

              {/* Opis */}
              <div className="px-4 py-3">
                <p
                  className="text-xs leading-relaxed text-gray-700"
                  style={{ fontFamily: "'Times New Roman', serif", textAlign: "justify" }}
                >
                  {activeFactory.desc}
                </p>
              </div>

              {/* Pasek zatrudnienia */}
              <div className="px-4 pb-4">
                <p className="text-[9px] tracking-widest text-gray-500 font-bold mb-1">
                  SKALA ZAKŁADU
                </p>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="h-2 transition-all duration-500"
                    style={{
                      width: `${(activeFactory.workers / 7000) * 100}%`,
                      backgroundColor: activeFactory.color,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-gray-400 mt-0.5">
                  <span>0</span>
                  <span>7 000 pracowników</span>
                </div>
              </div>

              {selected && (
                <div className="px-4 pb-3">
                  <button
                    onClick={() => setSelected(null)}
                    className="w-full py-1.5 text-[10px] tracking-widest font-bold border-2 border-gray-400 text-gray-600 hover:border-red-800 hover:text-red-800 transition-colors"
                  >
                    ZAMKNIJ ✕
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 bg-amber-50 p-6 text-center h-full flex flex-col justify-center">
              <p className="text-3xl mb-3 opacity-40">🗺️</p>
              <p className="text-xs tracking-widest text-gray-500 font-bold uppercase mb-2">
                Najedź lub kliknij znacznik
              </p>
              <p className="text-xs text-gray-400 italic" style={{ fontFamily: "'Times New Roman', serif" }}>
                Każdy zakład kryje w sobie kawałek historii największego projektu II Rzeczypospolitej.
              </p>

              {/* Mini legenda */}
              <div className="mt-6 border-t border-gray-200 pt-4 text-left space-y-1.5">
                <p className="text-[9px] tracking-widest text-gray-500 font-bold mb-2">LEGENDA</p>
                {types.map((t) => {
                  const f = factories.find((x) => x.type === t)!;
                  return (
                    <div key={t} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: f.color }} />
                      <span className="text-[9px] tracking-wider text-gray-600">{typeLabels[t]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lista zakładów na dole */}
      <div className="mt-6 border-t-2 border-gray-800 pt-4">
        <p className="text-[10px] tracking-[0.25em] text-gray-500 font-bold text-center mb-3">
          WSZYSTKIE OBIEKTY · KLIKNIJ ABY ZAZNACZYĆ
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
          {factories.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelected(selected === f.id ? null : f.id)}
              className={`text-center p-2 border text-xs transition-all ${
                selected === f.id
                  ? "border-gray-800 bg-amber-100"
                  : "border-gray-300 hover:border-gray-600 bg-amber-50"
              }`}
            >
              <div
                className="w-4 h-4 rounded-full mx-auto mb-1"
                style={{ backgroundColor: f.color }}
              />
              <p className="font-bold text-[9px] leading-tight">{f.name}</p>
              <p className="text-gray-400 text-[8px]">{f.year}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
