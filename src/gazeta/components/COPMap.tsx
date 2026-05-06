import { useState, useRef } from "react";
import mapImg from "../../assets/mapa_cop.png";

const typeLabels: Record<string, string> = {
  huta:      "Hutnictwo",
  lotnictwo: "Lotnictwo",
  zbrojenia: "Zbrojenia",
  ciężki:    "Przemysł ciężki",
  energia:   "Energetyka",
  chemia:    "Chemia",
  transport: "Transport",
  optyka:    "Optyka",
};

// px / py = pozycja w % szerokości i wysokości obrazka
const factories = [
  {
    id: 1,  name: "Stalowa Wola",        short: "HSW",
    px: 54.5, py: 42.5, type: "huta",      icon: "⚙️",  year: 1937, workers: 7000, color: "#991b1b",
    product: "Stal, armaty, czołgi",
    desc: "Huta Stalowa Wola – serce COP. Zakłady Południowe wybudowane od zera w sosnowym lesie w widłach Wisły i Sanu. Produkowały stal, armaty przeciwpancerne i elementy do czołgów 7TP. W szczytowym momencie zatrudniały ponad 7 000 robotników.",
  },
  {
    id: 2,  name: "Mielec",              short: "PZL",
    px: 42.7, py: 54.5, type: "lotnictwo", icon: "✈️",  year: 1938, workers: 3500, color: "#1d4ed8",
    product: "Samoloty PZL.37 Łoś",
    desc: "Wytwórnia Płatowców nr 2 w Mielcu. Produkowała słynnego bombowca PZL.37 Łoś – jedną z najnowocześniejszych konstrukcji lotniczych swoich czasów. Zasięg 2 600 km i udźwig 2 580 kg bomb stawiały go w światowej czołówce.",
  },
  {
    id: 3,  name: "Rzeszów",             short: "WSK",
    px: 58.5, py: 63.5, type: "lotnictwo", icon: "🔧",  year: 1938, workers: 2800, color: "#1d4ed8",
    product: "Silniki lotnicze, karabiny",
    desc: "Wytwórnia Silników nr 2 – produkowała silniki lotnicze do myśliwców PZL P.11 i P.24 oraz karabiny maszynowe Browning wz. 36. Zakłady były ściśle tajne, pracownicy podpisywali zobowiązania o zachowaniu poufności.",
  },
  {
    id: 4,  name: "Radom",               short: "FB",
    px: 29, py: 16.0, type: "zbrojenia", icon: "🔫",  year: 1935, workers: 4200, color: "#92400e",
    product: "Pistolet VIS wz. 35",
    desc: "Fabryka Broni w Radomiu – jeden z kluczowych zakładów zbrojeniowych II RP. Tu powstał legendarny pistolet VIS wz. 35, uznawany za jeden z najlepszych pistoletów II wojny światowej. Produkowano też karabiny Mauser wz. 98.",
  },
  {
    id: 5,  name: "Starachowice",        short: "ZM",
    px: 35.5, py: 26, type: "ciężki",   icon: "🛡️", year: 1923, workers: 5500, color: "#065f46",
    product: "Działa, samochody ciężarowe",
    desc: "Zakłady Starachowickie – najstarszy ośrodek COP. Produkowały haubice, moździerze i samochody ciężarowe dla wojska. W ramach planu 4-letniego Kwiatkowskiego podwojono moce produkcyjne.",
  },
  {
    id: 6,  name: "Rożnów",              short: "EW",
    px: 28.5, py: 73.4, type: "energia",  icon: "⚡",  year: 1941, workers: 800,  color: "#1e40af",
    product: "Energia elektryczna",
    desc: "Elektrownia wodna w Rożnowie – największa budowla hydrotechniczna II RP. Zapora o wysokości 41 m i długości 430 m na Dunajcu. Dostarczała tanią energię elektryczną do fabryk COP. Budowa trwała od 1936 roku.",
  },
  {
    id: 7,  name: "Dębica",              short: "ZP",
    px: 44.5, py: 63, type: "chemia",   icon: "🧪",  year: 1939, workers: 2100, color: "#6b21a8",
    product: "Paliwa syntetyczne, trotyl",
    desc: "Zakłady Przemysłu Chemicznego w Dębicy – produkowały paliwa syntetyczne, materiały wybuchowe (trotyl, melinit) i proch strzelniczy. Zakład był starannie zamaskowany i rozrzucony na dużym obszarze, by utrudnić bombardowanie.",
  },
  {
    id: 8,  name: "Sanok",               short: "Autosan",
    px: 63.5, py: 75.5, type: "transport", icon: "🚌", year: 1937, workers: 1900, color: "#065f46",
    product: "Autobusy, wagony",
    desc: "Fabryka Autobusów i Wagonów w Sanoku. Produkowała autobusy i specjalne wagony kolejowe dla wojska. W ramach COP zakłady rozbudowano i wyposażono w nowoczesne prasy hydrauliczne do tłoczenia karoserii.",
  },
  {
    id: 9,  name: "Kielce",              short: "ZPK",
    px: 25.0, py: 34.5, type: "ciężki",   icon: "⛏️", year: 1936, workers: 1600, color: "#92400e",
    product: "Amunicja, granaty",
    desc: "Zakłady Przemysłowe w Kielcach – produkcja amunicji artyleryjskiej i granatów ręcznych. Miasto leżało na obrzeżu COP, lecz zakłady tworzyły integralną część łańcucha dostaw dla całego okręgu.",
  },
  {
    id: 10, name: "Skarżysko-Kamienna",  short: "PFA",
    px: 15.5, py: 25.0, type: "zbrojenia", icon: "🔫", year: 1924, workers: 6000, color: "#92400e",
    product: "Amunicja strzelecka",
    desc: "Państwowa Fabryka Amunicji – jeden z największych zakładów amunicyjnych w Europie Środkowej. Produkowała naboje karabinowe i elementy do broni maszynowej. Zatrudniała ponad 6 000 osób.",
  },
  {
    id: 11, name: "Ostrowiec Św.",       short: "HSO",
    px: 36.5, py: 32.5, type: "huta",     icon: "⚙️", year: 1897, workers: 4800, color: "#991b1b",
    product: "Stal, szyny kolejowe",
    desc: "Huta Ostrowiec – rozbudowana w ramach COP. Produkowała stal konstrukcyjną, szyny kolejowe i elementy dla przemysłu zbrojeniowego. Dostarczała surowiec dla fabryk w całym okręgu.",
  },
  {
    id: 12, name: "Kraśnik",             short: "FŁT",
    px: 59.0, py: 30.5, type: "zbrojenia", icon: "🔫", year: 1938, workers: 2200, color: "#92400e",
    product: "Łożyska toczne, amunicja",
    desc: "Fabryka Łożysk Tocznych w Kraśniku – jedyny producent łożysk w Polsce. Łożyska były niezbędne w każdym pojeździe wojskowym i samolocie. Zakład powstał od zera w ramach planu COP.",
  },
  {
    id: 13, name: "Poniatowa",           short: "ZPO",
    px: 57.5, py: 25, type: "optyka",   icon: "🔭", year: 1938, workers: 1800, color: "#0f766e",
    product: "Przyrządy optyczne, lornetki",
    desc: "Zakłady Przyrządów Optycznych w Poniatowej – produkowały lornetki polowe, celowniki artyleryjskie i inne przyrządy optyczne dla wojska. Założone z udziałem kapitału państwowego jako odpowiedź na brak krajowego producenta optyki wojskowej.",
  },
];

export function COPMap() {
  const [hoverId,  setHoverId]  = useState<number | null>(null);
  const [pinnedId, setPinnedId] = useState<number | null>(null);
  const [filter,   setFilter]   = useState<string | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeId      = pinnedId ?? hoverId;
  const activeFactory = factories.find(f => f.id === activeId) ?? null;
  const types         = Array.from(new Set(factories.map(f => f.type)));

  const clearTimer = () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); };

  const onPinEnter = (id: number) => { clearTimer(); if (!pinnedId) setHoverId(id); };
  const onPinLeave = () => {
    if (!pinnedId) hoverTimer.current = setTimeout(() => setHoverId(null), 250);
  };
  const onPinClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    clearTimer();
    setPinnedId(prev => (prev === id ? null : id));
    setHoverId(null);
  };
  const closePanel = () => { setPinnedId(null); setHoverId(null); };

  return (
    <div className="font-serif">
      {/* ── Nagłówek ── */}
      <div className="text-center mb-4 border-b-2 border-red-800 pb-4">
        <p className="text-xs tracking-[0.3em] text-red-800 font-bold mb-1">ATLAS INDUSTRIALIZACJI</p>
        <h3 className="text-2xl font-black" style={{ fontFamily: "'Times New Roman', serif" }}>
          ⚙️ MAPA ZAKŁADÓW CENTRALNEGO OKRĘGU PRZEMYSŁOWEGO ⚙️
        </h3>
        <p className="text-xs tracking-widest text-gray-500 mt-1 italic">
          Polska · 1936–1939 · Program uprzemysłowienia II Rzeczypospolitej
        </p>
      </div>

      {/* ── Filtry ── */}
      <div className="flex flex-wrap gap-2 mb-3 justify-center">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1 text-[10px] tracking-widest font-bold border transition-all ${
            filter === null ? "bg-gray-800 text-white border-gray-800" : "bg-transparent text-gray-700 border-gray-400 hover:border-gray-700"
          }`}
        >
          WSZYSTKIE
        </button>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(filter === t ? null : t)}
            className={`px-3 py-1 text-[10px] tracking-widest font-bold border transition-all ${
              filter === t ? "bg-red-800 text-white border-red-800" : "bg-transparent text-gray-700 border-gray-400 hover:border-gray-700"
            }`}
          >
            {typeLabels[t].toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── Mapa ── */}
      <div className="relative w-full" onClick={closePanel}>
        <img src={mapImg} alt="Mapa COP" className="w-full block" draggable={false} style={{ userSelect: "none" }} />

        {/* Piny */}
        {factories.map(f => {
          const isActive   = activeId === f.id;
          const isFiltered = filter !== null && f.type !== filter;
          return (
            <div
              key={f.id}
              className="absolute"
              style={{
                left: `${f.px}%`, top: `${f.py}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 30 : 10,
                opacity: isFiltered ? 0.12 : 1,
                pointerEvents: isFiltered ? "none" : "auto",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={() => onPinEnter(f.id)}
              onMouseLeave={onPinLeave}
              onClick={e => onPinClick(f.id, e)}
            >
              {/* Pulsująca aura */}
              {isActive && (
                <span className="absolute rounded-full animate-ping"
                  style={{ inset: "-7px", background: f.color, opacity: 0.28 }} />
              )}
              {/* Kółko */}
              <div
                className="relative flex items-center justify-center rounded-full cursor-pointer"
                style={{
                  width:     isActive ? 30 : 22,
                  height:    isActive ? 30 : 22,
                  background: f.color,
                  border:    "2.5px solid #fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  fontSize:  isActive ? 14 : 10,
                  transition: "width 0.15s, height 0.15s, font-size 0.15s",
                }}
              >
                {f.icon}
              </div>
              {/* Etykieta */}
              {isActive && (
                <div
                  className="absolute left-1/2 mt-1 px-1.5 py-0.5 text-white text-[9px] font-bold whitespace-nowrap tracking-wide pointer-events-none"
                  style={{ top: "100%", transform: "translateX(-50%)", background: "rgba(10,5,0,0.82)" }}
                >
                  {f.name}
                </div>
              )}
            </div>
          );
        })}

        {/* ── Panel informacyjny ── */}
        {activeFactory && (
          <div
            className="absolute top-2 right-2 z-50 w-56"
            style={{
              background: "#fdf6e8",
              border: `1.5px solid ${activeFactory.color}`,
              boxShadow: "3px 3px 14px rgba(0,0,0,0.22)",
              fontFamily: "'Times New Roman', serif",
            }}
            onMouseEnter={clearTimer}
            onMouseLeave={() => { if (!pinnedId) hoverTimer.current = setTimeout(() => setHoverId(null), 200); }}
            onClick={e => e.stopPropagation()}
          >
            <div className="px-3 py-2 text-white relative" style={{ background: activeFactory.color }}>
              <button onClick={closePanel}
                className="absolute top-1.5 right-2 text-white/70 hover:text-white text-xs font-bold leading-none bg-transparent border-none cursor-pointer">✕</button>
              <div className="text-[8px] tracking-[0.18em] opacity-85 uppercase font-sans">{typeLabels[activeFactory.type]}</div>
              <div className="text-[15px] font-black leading-tight mt-0.5">{activeFactory.name}</div>
              <div className="text-[9px] opacity-70">{activeFactory.short}</div>
            </div>

            <div className="px-3 py-2">
              <div className="grid grid-cols-2 gap-1.5 pb-2 mb-2" style={{ borderBottom: "1px dotted #c8a96e" }}>
                <div>
                  <div className="text-[7.5px] tracking-widest font-sans uppercase" style={{ color: "#8b6914" }}>Rok budowy</div>
                  <div className="text-sm font-bold" style={{ color: "#2c1a06" }}>{activeFactory.year}</div>
                </div>
                <div>
                  <div className="text-[7.5px] tracking-widest font-sans uppercase" style={{ color: "#8b6914" }}>Zatrudnienie</div>
                  <div className="text-sm font-bold" style={{ color: "#2c1a06" }}>{activeFactory.workers.toLocaleString("pl-PL")} os.</div>
                </div>
              </div>
              <div className="text-[7.5px] tracking-widest font-sans uppercase mb-0.5" style={{ color: "#8b6914" }}>Produkcja</div>
              <div className="text-[11px] font-bold mb-2" style={{ color: "#2c1a06" }}>{activeFactory.product}</div>
              <p className="text-[10.5px] leading-relaxed" style={{ color: "#3a2a10", textAlign: "justify" }}>{activeFactory.desc}</p>
              <div className="mt-2 pt-2" style={{ borderTop: "1px dotted #c8a96e" }}>
                <div className="text-[7.5px] tracking-widest font-sans uppercase mb-1" style={{ color: "#8b6914" }}>Skala zakładu</div>
                <div className="h-1.5 rounded-sm" style={{ background: "#e8d5a8" }}>
                  <div className="h-1.5 rounded-sm transition-all duration-500"
                    style={{ width: `${Math.round((activeFactory.workers / 7000) * 100)}%`, background: activeFactory.color }} />
                </div>
                <div className="flex justify-between text-[7px] mt-0.5 font-sans" style={{ color: "#a08040" }}>
                  <span>0</span><span>7 000 prac.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Legenda ── */}
        <div className="absolute bottom-2 left-2 z-40 px-2 py-1.5"
          style={{ background: "rgba(253,246,232,0.93)", border: "1px solid #8b6914" }}>
          <div className="text-[8px] tracking-widest font-sans uppercase mb-1" style={{ color: "#8b6914" }}>Legenda</div>
          {types.map(t => {
            const f = factories.find(x => x.type === t)!;
            return (
              <div key={t} className="flex items-center gap-1.5 mb-0.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: f.color }} />
                <span className="text-[8px] font-sans" style={{ color: "#5c3d0a" }}>{typeLabels[t]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Lista zakładów ── */}
      <div className="mt-4 border-t-2 border-gray-800 pt-3">
        <p className="text-[9px] tracking-[0.25em] text-gray-500 font-bold text-center mb-2 font-sans">
          WSZYSTKIE OBIEKTY · KLIKNIJ ABY ZAZNACZYĆ
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
          {factories.map(f => (
            <button key={f.id} onClick={e => onPinClick(f.id, e)}
              className={`text-center p-1.5 border text-xs transition-all ${
                pinnedId === f.id ? "border-gray-800 bg-amber-100" : "border-gray-300 hover:border-gray-600 bg-amber-50"
              }`}
            >
              <div className="w-3 h-3 rounded-full mx-auto mb-0.5" style={{ background: f.color }} />
              <p className="font-bold text-[8px] leading-tight">{f.name}</p>
              <p className="text-gray-400 text-[7px]">{f.year}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
