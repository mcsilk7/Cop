import { useState } from "react";

// ─── DANE ────────────────────────────────────────────────────────────────────

const produkty = [
  { icon: "🔭", nazwa: "Lornetka polowa wz. 37",        opis: "Powiększenie 6×30, pole widzenia 8°. Podstawowe wyposażenie oficerów piechoty i kawalerii.", produkcja: "8 000 szt./rok",  status: "W PRODUKCJI" },
  { icon: "🔭", nazwa: "Lornetka polowa wz. 38",        opis: "Udoskonalona wersja z powłoką antyrefleksyjną. Powiększenie 8×30.", produkcja: "4 000 szt./rok",  status: "W PRODUKCJI" },
  { icon: "🎯", nazwa: "Celownik panoramiczny wz. 38",  opis: "Do haubic lekkich wz. 18 i armat 75 mm. Obrót 360°, dokładność do 0,5 miliredianu.", produkcja: "2 400 szt./rok",  status: "W PRODUKCJI" },
  { icon: "📏", nazwa: "Dalmierz stereoskopowy 1 m",    opis: "Baza 1 metr. Do artylerii polowej. Zasięg pomiarowy do 8 km.", produkcja: "600 szt./rok",   status: "W PRODUKCJI" },
  { icon: "📏", nazwa: "Dalmierz stereoskopowy 2 m",    opis: "Baza 2 metry. Do artylerii przeciwlotniczej. Zasięg do 15 km.", produkcja: "240 szt./rok",   status: "ROZRUCH" },
  { icon: "🔬", nazwa: "Peryskop czołgowy wz. 38",      opis: "Do czołgu 7TP. Pole widzenia 60°. Odporny na wibracje i wstrząsy.", produkcja: "1 200 szt./rok",  status: "W PRODUKCJI" },
  { icon: "🌙", nazwa: "Przyrząd obserwacyjny nocny",   opis: "Z wzmacniaczem obrazu. Prototyp w fazie prób. Zasięg do 400 m w warunkach księżycowych.", produkcja: "— (prototyp)",  status: "PROTOTYP" },
  { icon: "✈️", nazwa: "Celownik bombowy lotniczy",     opis: "Do samolotów PZL.37 Łoś. Współpraca z Wytwórnią Płatowców w Mielcu.", produkcja: "500 szt./rok",   status: "ROZRUCH" },
];

const kalendarium = [
  { data: "Styczeń 1937",    kolor: "#6b7280", opis: "Instytut Techniczny Uzbrojenia przedstawia MSWojsk. raport o braku krajowej optyki wojskowej i pilnej potrzebie budowy zakładu." },
  { data: "Marzec 1937",     kolor: "#92400e", opis: "Misja negocjacyjna do Paryża. Rozmowy z firmą SOMHP (Société d'Optique et de Mécanique de Haute Précision). Wstępne uzgodnienia licencyjne." },
  { data: "Czerwiec 1937",   kolor: "#92400e", opis: "Podpisanie umowy licencyjno-technicznej między Skarbem Państwa RP a SOMHP. Wartość kontraktu: 4,2 mln franków. Transfer 14 inżynierów." },
  { data: "Lipiec 1937",     kolor: "#065f46", opis: "Wybór lokalizacji: wieś Poniatowa k. Opola Lubelskiego. Decyduje bliskość linii kolejowej Lublin–Kraśnik i oddalenie od granicy." },
  { data: "Październik 1937",kolor: "#065f46", opis: "Oficjalna uroczystość wmurowania kamienia węgielnego. Wicepremier Kwiatkowski w przemówieniu: »Tu rodzi się polskie oko armii.«" },
  { data: "Zima 1937–1938",  kolor: "#1e40af", opis: "Wyjątkowo mroźna zima. Budowa nie zostaje wstrzymana — prace trwają w systemie trzyzmianowym. Odwodnienie terenu jako kluczowe wyzwanie." },
  { data: "Wiosna 1938",     kolor: "#1e40af", opis: "Przyjazd 14 francuskich specjalistów z SOMHP. Montaż precyzyjnych szlifierek i polernic. Uruchomienie laboratorium kontroli jakości." },
  { data: "Sierpień 1938",   kolor: "#065f46", opis: "Pierwsze próbne szlifowanie soczewek. Wynik: 23% braków — inżynierowie uznają to za dobry początek przy nowej załodze." },
  { data: "Styczeń 1939",    kolor: "#991b1b", opis: "Uruchomienie produkcji pilotażowej. Z taśmy schodzi pierwsza partia lornetki wz. 37 — 180 sztuk przekazanych do prób wojskowych." },
  { data: "Marzec 1939",     kolor: "#991b1b", opis: "Wojsko składa pozytywną ocenę lornetki wz. 37. Zamówienie na 6 000 sztuk. Zakład przechodzi na dwie zmiany produkcyjne." },
  { data: "Lato 1939",       kolor: "#7c3aed", opis: "Planowane osiągnięcie pełnej mocy: 1 800 pracowników, 8 linii produkcyjnych. Budowa hali nr 5 dla dalmierzy okrętowych." },
  { data: "Wrzesień 1939",   kolor: "#7f1d1d", opis: "Wybuch wojny. Zakład ewakuowany częściowo na wschód. Niemcy zajmują Poniatową 18 września. Maszyny częściowo ukryte lub zniszczone." },
];

const pracownicy = [
  { imie: "inż. Władysław Kowalczyk",  rola: "Kierownik działu optyki precyzyjnej", cytat: "Tu robimy rzeczy, o których Polsce się nie śniło. Każda soczewka to kilka godzin pracy i kilkadziesiąt lat polskiej zaległości nadrabianych jednocześnie." },
  { imie: "Zofia Malinowska",           rola: "Szlifierka soczewek, III zmiana",      cytat: "Przyjechałam z Zamojszczyzny. Tu zarabiam 180 złotych — trzy razy tyle co w domu. Mam własny pokój w bloku. To brzmi banalnie, ale dla mnie to wszystko." },
  { imie: "Jean-Pierre Morin",          rola: "Doradca techniczny SOMHP (Francja)",   cytat: "Jestem pod wrażeniem tego narodu. Dwa lata temu nie było tu nic — tylko las. Dziś mam 400 pracowników, którzy szlifują szkło jak Francuzi z dziesięcioletnim stażem." },
  { imie: "ppor. Henryk Ostrowski",     rola: "Oficer łącznikowy MSWojsk.",           cytat: "Każda lornetka, która wyjedzie z Poniatowej, to żołnierz, który zobaczy wroga jako pierwszy. To nie jest produkcja. To jest przewaga taktyczna." },
];

// ─── KOMPONENTY ──────────────────────────────────────────────────────────────

function Ornament() {
  return (
    <div className="flex items-center gap-2 my-6">
      <div className="flex-1 h-px bg-gray-700" />
      <div className="flex gap-1 items-center">
        <div className="w-1.5 h-1.5 bg-red-800 rotate-45" />
        <div className="w-2.5 h-2.5 border border-gray-700 rotate-45" />
        <div className="w-1.5 h-1.5 bg-red-800 rotate-45" />
      </div>
      <div className="flex-1 h-px bg-gray-700" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-6 bg-red-800" />
      <p className="text-[10px] tracking-[0.35em] font-bold text-red-800 font-sans uppercase">{children}</p>
    </div>
  );
}

// ─── GŁÓWNY KOMPONENT ────────────────────────────────────────────────────────

export function PoniatowaPage() {
  const [activeTab, setActiveTab] = useState<"produkcja" | "historia" | "ludzie">("produkcja");
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'Times New Roman', serif" }}>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <div className="relative bg-gray-900 text-amber-50 overflow-hidden mb-0" style={{ minHeight: 340 }}>
        {/* Tło — siatka industrialna */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 40px), repeating-linear-gradient(90deg,#fff,#fff 1px,transparent 1px,transparent 40px)"
        }} />
        {/* Diagonalna belka akcentu */}
        <div className="absolute -right-20 top-0 bottom-0 w-64 bg-red-900 opacity-30"
          style={{ transform: "skewX(-8deg)" }} />

        <div className="relative z-10 px-6 pt-10 pb-8 max-w-4xl">
          {/* Kicker */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-red-500" />
            <span className="text-[9px] tracking-[0.4em] text-red-400 font-sans font-bold uppercase">
              Centralny Okręg Przemysłowy · Reportaż Specjalny
            </span>
          </div>

          {/* Tytuł */}
          <h1 className="text-5xl md:text-7xl font-black leading-[0.95] mb-4 text-amber-50"
            style={{ fontFamily: "'Times New Roman', serif", letterSpacing: "-0.02em" }}>
            PONIATOWA
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-amber-300 mb-5 leading-tight">
            Miasto zbudowane z precyzji i szkła —<br />
            jak Polska zyskała własne oczy na wojnę
          </h2>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 border-t border-amber-800 pt-4">
            {[
              ["1938", "Rok założenia"],
              ["1 800", "Pracowników"],
              ["14 ha", "Powierzchnia hal"],
              ["8 000", "Lornetki / rok"],
              ["4,2 mln fr.", "Wartość kontraktu"],
            ].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-2xl font-black text-amber-300 leading-none">{val}</div>
                <div className="text-[9px] tracking-widest text-amber-600 font-sans uppercase mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Numer wydania */}
        <div className="absolute bottom-3 right-4 text-[9px] tracking-widest text-amber-800 font-sans">
          Luty 1939 · Nr 156
        </div>
      </div>

      {/* Czarna belka */}
      <div className="bg-gray-900 text-amber-50 px-6 py-2 flex items-center gap-4 text-[9px] tracking-[0.2em] font-sans border-b-2 border-red-800 mb-6">
        <span className="font-bold text-red-400">● NA ŻYWO</span>
        <span className="opacity-60">ZAKŁADY WYTWÓRCZE PRZYRZĄDÓW OPTYCZNYCH</span>
        <span className="opacity-40 hidden md:block">·</span>
        <span className="opacity-60 hidden md:block">PONIATOWA, WOJ. LUBELSKIE</span>
      </div>

      {/* ════════════════════════════════════════════
          INTRO — DWIE KOLUMNY
      ════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <SectionLabel>Otwarcie reportażu</SectionLabel>
          <p className="text-base leading-relaxed text-gray-800 mb-4" style={{ textAlign: "justify" }}>
            <span className="float-left text-[5rem] font-black leading-[0.7] mr-2 mt-1 text-red-800"
              style={{ fontFamily: "'Times New Roman', serif" }}>W</span>
            idłach Wisły i Wieprza, pośród łagodnych wzgórz Wyżyny Lubelskiej,
            wyrasta miasto, którego jeszcze pięć lat temu nie było na żadnej mapie.
            Poniatowa — bo o niej mowa — nie istniała jako samodzielna osada.
            Dziś liczy kilka tysięcy mieszkańców, posiada własne ulice, szkoły,
            osiedle robotnicze i — przede wszystkim — jeden z najbardziej
            strzeżonych zakładów przemysłowych Drugiej Rzeczypospolitej.
          </p>
          <p className="text-base leading-relaxed text-gray-800 mb-4" style={{ textAlign: "justify", textIndent: "2em" }}>
            Mowa o Zakładach Wytwórczych Przyrządów Optycznych, potocznie zwanych
            „Optyką" lub skrótem ZWPO. To tu, w nowocześnie urządzonych halach
            produkcyjnych, rodzi się polskie oko wojska — lornetki polowe,
            celowniki artyleryjskie, dalmierze, peryskopy dla czołgów. Produkty,
            które jeszcze dekadę temu Polska musiała sprowadzać wyłącznie
            z Niemiec, Francji i Czechosłowacji.
          </p>
          <p className="text-base leading-relaxed text-gray-800" style={{ textAlign: "justify", textIndent: "2em" }}>
            Decyzja o lokalizacji zakładu właśnie tutaj nie była przypadkowa.
            Eugeniusz Kwiatkowski, wicepremier i architekt Centralnego Okręgu
            Przemysłowego, od początku kładł nacisk na strategiczne rozproszenie
            przemysłu zbrojeniowego. Poniatowa spełniała wszystkie warunki:
            leżała w bezpiecznej odległości od granic, miała dostęp do linii
            kolejowej Lublin–Kraśnik, a jej klimat — suchy, pozbawiony
            nadmiernej wilgoci — był idealny do precyzyjnej produkcji optycznej.
          </p>
        </div>

        {/* Sidebar — dane + cytat */}
        <div className="space-y-4">
          <div className="border-2 border-gray-800 p-4 bg-amber-50">
            <h4 className="text-[10px] tracking-[0.25em] font-sans font-bold text-red-800 uppercase mb-3 pb-1 border-b border-red-800">
              ◆ Dane zakładu
            </h4>
            {[
              ["Pełna nazwa",       "Zakłady Wytwórcze Przyrządów Optycznych"],
              ["Lokalizacja",      "Poniatowa, pow. Opole Lub."],
              ["Rok założenia",    "1938"],
              ["Podległość",       "Min. Spraw Wojskowych"],
              ["Powierzchnia",     "ponad 14 ha hal"],
              ["Zatrudnienie",     "ok. 1 800 os. (1939)"],
              ["Licencjodawca",    "SOMHP, Paryż (Francja)"],
              ["Wartość kontraktu","4,2 mln franków"],
            ].map(([lbl, val]) => (
              <div key={lbl} className="mb-2 pb-1 border-b border-dotted border-gray-200 last:border-0">
                <div className="text-[8px] tracking-widest font-sans text-gray-400 uppercase">{lbl}</div>
                <div className="text-xs font-bold text-gray-800 leading-snug">{val}</div>
              </div>
            ))}
          </div>

          {/* Wielki cytat */}
          <div className="bg-red-800 text-white p-4">
            <div className="text-5xl font-black leading-none text-red-600 mb-1" style={{ fontFamily: "'Times New Roman', serif" }}>"</div>
            <p className="text-sm italic leading-relaxed mb-2">
              Polska armia potrzebuje oczu. Bez celownika działo jest ślepe,
              bez lornetki oficer jest głuchy. Poniatowa daje wojsku wzrok.
            </p>
            <p className="text-[9px] font-bold tracking-wider opacity-80 font-sans">
              — GEN. TADEUSZ KASPRZYCKI<br />
              MINISTER SPRAW WOJSKOWYCH, 1938
            </p>
          </div>
        </div>
      </div>

      <Ornament />

      {/* ════════════════════════════════════════════
          ZAKŁADKI: PRODUKCJA / HISTORIA / LUDZIE
      ════════════════════════════════════════════ */}
      <div className="mb-2">
        <div className="flex border-b-2 border-gray-800 mb-6">
          {(["produkcja", "historia", "ludzie"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-[11px] tracking-[0.2em] font-bold font-sans uppercase transition-all ${
                activeTab === tab
                  ? "bg-gray-800 text-white"
                  : "bg-amber-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab === "produkcja" ? "Produkcja" : tab === "historia" ? "Kalendarium" : "Ludzie zakładu"}
            </button>
          ))}
        </div>

        {/* TAB: PRODUKCJA */}
        {activeTab === "produkcja" && (
          <div>
            <SectionLabel>Asortyment produkcyjny · Stan na luty 1939</SectionLabel>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr className="bg-gray-900 text-amber-50">
                    {["", "Wyrób", "Przeznaczenie", "Produkcja roczna", "Status"].map(h => (
                      <th key={h} className="text-left px-3 py-2 text-[9px] tracking-[0.2em] font-sans font-bold uppercase border-r border-gray-700 last:border-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {produkty.map((p, i) => (
                    <tr key={i} className={`border-b border-gray-200 ${i % 2 === 0 ? "bg-amber-50" : "bg-white"}`}>
                      <td className="px-3 py-2 text-xl">{p.icon}</td>
                      <td className="px-3 py-2">
                        <div className="font-bold text-gray-900 text-xs">{p.nazwa}</div>
                        <div className="text-[10px] text-gray-500 leading-snug mt-0.5">{p.opis}</div>
                      </td>
                      <td className="px-3 py-2 text-[10px] text-gray-600 hidden md:table-cell">{p.opis.split(".")[0]}</td>
                      <td className="px-3 py-2 font-black text-xs text-gray-800 whitespace-nowrap">{p.produkcja}</td>
                      <td className="px-3 py-2">
                        <span className={`text-[9px] font-bold font-sans tracking-wider px-2 py-0.5 ${
                          p.status === "W PRODUKCJI" ? "bg-green-100 text-green-800" :
                          p.status === "ROZRUCH"     ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Infografika – zatrudnienie */}
            <div className="mt-8 border-t-2 border-gray-800 pt-6">
              <SectionLabel>Struktura zatrudnienia</SectionLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { dział: "Szlifiernia i polernia",  os: 620,  proc: 34, kolor: "#991b1b" },
                  { dział: "Montaż i justowanie",     os: 440,  proc: 24, kolor: "#065f46" },
                  { dział: "Kontrola jakości",        os: 220,  proc: 12, kolor: "#1d4ed8" },
                  { dział: "Obsługa techniczna",      os: 180,  proc: 10, kolor: "#6b21a8" },
                  { dział: "Inżynieria i R&D",        os: 120,  proc: 7,  kolor: "#92400e" },
                  { dział: "Administracja",           os: 100,  proc: 5,  kolor: "#374151" },
                  { dział: "Dozór i ochrona",         os: 80,   proc: 4,  kolor: "#374151" },
                  { dział: "Inne",                    os: 40,   proc: 2,  kolor: "#9ca3af" },
                ].map(d => (
                  <div key={d.dział} className="border border-gray-200 bg-amber-50 p-3">
                    <div className="text-xs font-bold text-gray-800 leading-tight mb-2">{d.dział}</div>
                    <div className="h-1.5 bg-gray-200 mb-1">
                      <div className="h-1.5" style={{ width: `${d.proc * 2.5}%`, background: d.kolor }} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[9px] font-black" style={{ color: d.kolor }}>{d.os} os.</span>
                      <span className="text-[9px] text-gray-400 font-sans">{d.proc}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: HISTORIA */}
        {activeTab === "historia" && (
          <div>
            <SectionLabel>Kalendarium budowy i uruchomienia · 1937–1939</SectionLabel>
            <div className="space-y-0">
              {kalendarium.map((ev, i) => (
                <div
                  key={i}
                  className={`flex gap-4 cursor-pointer group transition-all ${expandedEvent === i ? "" : ""}`}
                  onClick={() => setExpandedEvent(expandedEvent === i ? null : i)}
                >
                  {/* Linia czasu */}
                  <div className="flex flex-col items-center flex-shrink-0" style={{ width: 28 }}>
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white flex-shrink-0 mt-3 z-10 transition-transform group-hover:scale-125"
                      style={{ background: ev.kolor, boxShadow: `0 0 0 2px ${ev.kolor}40` }}
                    />
                    {i < kalendarium.length - 1 && (
                      <div className="w-0.5 flex-1 mt-0" style={{ background: `${ev.kolor}50`, minHeight: 24 }} />
                    )}
                  </div>

                  {/* Treść */}
                  <div className={`flex-1 border-b border-dotted border-gray-200 pb-3 pt-2 ${expandedEvent === i ? "pb-4" : ""}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-widest font-sans uppercase" style={{ color: ev.kolor }}>
                        {ev.data}
                      </span>
                      <span className="text-gray-300 text-xs group-hover:text-gray-500 transition-colors">
                        {expandedEvent === i ? "▲" : "▼"}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed text-gray-700 mt-1 ${expandedEvent === i ? "" : "line-clamp-1"}`}
                      style={{ textAlign: "justify" }}>
                      {ev.opis}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Ornament />

            {/* Sekcja tekstowa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-black mb-3 pb-1 border-b-2 border-gray-800">
                  OD IMPORTU DO SUWERENNOŚCI OPTYCZNEJ
                </h3>
                <p className="text-sm leading-relaxed text-gray-800 mb-3" style={{ textAlign: "justify", textIndent: "2em" }}>
                  Przez całe lata dwudzieste i wczesne trzydzieste Polska nie posiadała
                  ani jednego rodzimego producenta sprzętu optycznego dla wojska.
                  Lornetki, lunety, celowniki i dalmierze sprowadzano wyłącznie z zagranicy,
                  co w przypadku konfliktu zbrojnego groziło całkowitym odcięciem
                  od dostaw i paraliżem bojowym armii.
                </p>
                <p className="text-sm leading-relaxed text-gray-800" style={{ textAlign: "justify", textIndent: "2em" }}>
                  Już w 1931 roku Instytut Techniczny Uzbrojenia przygotował stosowny
                  memoriał do Ministerstwa Spraw Wojskowych. Dokument wskazywał,
                  że Polska importuje rocznie sprzęt optyczny o wartości kilkunastu
                  milionów złotych, zaś w razie mobilizacji zapasy wystarczyłyby
                  co najwyżej na trzy miesiące działań wojennych.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black mb-3 pb-1 border-b-2 border-gray-800">
                  UMOWA Z PARYŻEM
                </h3>
                <p className="text-sm leading-relaxed text-gray-800 mb-3" style={{ textAlign: "justify", textIndent: "2em" }}>
                  Negocjacje z partnerami zagranicznymi trwały kilkanaście miesięcy.
                  Ostatecznie zdecydowano o pozyskaniu licencji od francuskiej firmy
                  SOMHP z Paryża. Umowę podpisano w marcu 1937 roku.
                  Kontrakt obejmował transfer technologii, dostawę maszyn
                  i oddelegowanie czternastu inżynierów na trzy lata.
                </p>
                <p className="text-sm leading-relaxed text-gray-800" style={{ textAlign: "justify", textIndent: "2em" }}>
                  Wybór Francuzów nie był przypadkowy — w odróżnieniu od Niemców
                  (których nie chciano uzależniać) i Brytyjczyków (zbyt drodzy),
                  SOMHP oferowało pełny transfer know-how bez klauzul blokujących
                  dalszy rozwój. Polska miała stać się po 1944 roku całkowicie
                  samodzielna technologicznie.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: LUDZIE */}
        {activeTab === "ludzie" && (
          <div>
            <SectionLabel>Portrety z hali szlifierskiej</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {pracownicy.map((p, i) => (
                <div key={i} className="border-2 border-gray-300 bg-amber-50 overflow-hidden">
                  <div className="flex items-start gap-4 p-4">
                    <div className="w-14 h-14 rounded-full bg-gray-200 border-2 border-gray-400 flex items-center justify-center text-2xl flex-shrink-0">
                      👤
                    </div>
                    <div>
                      <div className="font-black text-sm leading-tight">{p.imie}</div>
                      <div className="text-[9px] tracking-widest text-red-800 font-sans uppercase font-bold mt-0.5">{p.rola}</div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-4 pb-4 pt-3 bg-white">
                    <div className="text-3xl text-gray-200 leading-none mb-1" style={{ fontFamily: "'Times New Roman', serif" }}>"</div>
                    <p className="text-sm italic leading-relaxed text-gray-700" style={{ textAlign: "justify" }}>{p.cytat}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reportaż o warunkach pracy */}
            <div className="border-t-2 border-gray-800 pt-6">
              <SectionLabel>Warunki pracy i życia w Poniatowej</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    tyt: "🏭 Hala szlifierska",
                    tresc: "Serce zakładu. Temperatura utrzymywana stale w przedziale 18–20°C, wilgotność względna nie może przekroczyć 55%. Szlifierki pracują w izolowanych boksach, by wibracje jednej maszyny nie wpływały na sąsiednie stanowisko. Pracownicy noszą bawełniane rękawiczki — odciski palców na soczewce dyskwalifikują wyrób.",
                  },
                  {
                    tyt: "🏠 Osiedle robotnicze",
                    tresc: "Cztery bloki z czerwonej cegły, każdy po 24 mieszkania dwupokojowe. Stołówka na 1 000 osób z tanią zupą za 15 groszy. Przychodnia lekarska czynna 6 dni w tygodniu. Klub sportowy KS Optyk z boiskiem piłkarskim i salą gimnastyczną. W trakcie budowy kościół p.w. Matki Boskiej Częstochowskiej.",
                  },
                  {
                    tyt: "💰 Zarobki i świadczenia",
                    tresc: "Szlifierz soczewek (wykwalifikowany): 220–280 zł miesięcznie. Pracownica montażu (po kursie): 160–190 zł. Inżynier ze stażem: 480–650 zł. Dla porównania: średnia płaca robotnika rolnego w Polsce to ok. 60 zł miesięcznie. Zakład zapewnia węgiel na zimę, bon żywnościowy i tygodniowy urlop.",
                  },
                ].map(k => (
                  <div key={k.tyt} className="border border-gray-300 bg-white p-4">
                    <h4 className="font-black text-sm mb-2">{k.tyt}</h4>
                    <p className="text-xs leading-relaxed text-gray-700" style={{ textAlign: "justify" }}>{k.tresc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Ornament />

      {/* ════════════════════════════════════════════
          BLOK STRATEGICZNY – ciemne tło
      ════════════════════════════════════════════ */}
      <div className="bg-gray-900 text-amber-50 p-6 mb-6 -mx-0">
        <SectionLabel>Znaczenie strategiczne</SectionLabel>
        <h2 className="text-2xl font-black mb-5 text-amber-200">
          DLACZEGO PONIATOWA JEST KLUCZEM DO OBRONNOŚCI POLSKI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm leading-relaxed mb-4 text-amber-100" style={{ textAlign: "justify" }}>
              Strategiczne znaczenie Poniatowej wykracza daleko poza samą produkcję
              lornetki czy celownika. Jest to zakład, który po raz pierwszy w historii
              daje Polsce <strong className="text-amber-400">suwerenność optyczną</strong> —
              zdolność do samodzielnego wyposażenia armii bez zależności od obcych dostawców.
            </p>
            <p className="text-sm leading-relaxed text-amber-100" style={{ textAlign: "justify" }}>
              W dobie narastającego napięcia w Europie ta niezależność może mieć
              dosłownie znaczenie życia i śmierci. Armia, która traci dostawy
              optyki, traci zdolność do celnego ognia artyleryjskiego, obserwacji
              pola walki i prowadzenia operacji w trudnych warunkach pogodowych.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { lbl: "Uniezależnienie od importu optyki",               val: "100%",       kolor: "#22c55e" },
              { lbl: "Pokrycie potrzeb armii w warunkach pokojowych",   val: "~85%",       kolor: "#22c55e" },
              { lbl: "Zdolność mobilizacyjna (po 1944)",                val: "planowana",  kolor: "#f59e0b" },
              { lbl: "Transfer technologii zakończony",                 val: "do 1944 r.", kolor: "#f59e0b" },
              { lbl: "Roczna oszczędność na imporcie",                  val: "> 8 mln zł", kolor: "#22c55e" },
            ].map(r => (
              <div key={r.lbl} className="flex justify-between items-center border-b border-amber-900 pb-2">
                <span className="text-xs text-amber-200">{r.lbl}</span>
                <span className="text-sm font-black" style={{ color: r.kolor }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          EPILOG I STOPKA
      ════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <SectionLabel>Miasto wśród pól Lubelszczyzny</SectionLabel>
          <p className="text-sm leading-relaxed text-gray-800 mb-3" style={{ textAlign: "justify", textIndent: "2em" }}>
            Gdy odwiedzamy Poniatową w lutym 1939 roku, zakład jest wciąż w fazie
            rozruchu — część maszyn dopiero czeka na uruchomienie, robotnicy uczą się
            obsługi skomplikowanych szlifierek, a harmonogram produkcji nie jest
            w pełni ustabilizowany. Mimo to atmosfera jest niemal namacalna —
            atmosfera pionierska, poczucie uczestnictwa w czymś ważnym.
          </p>
          <p className="text-sm leading-relaxed text-gray-800" style={{ textAlign: "justify", textIndent: "2em" }}>
            Wieczorami, gdy zmiana schodzi z hali, ulice osiedla wypełniają się
            głosami. Przy sklepiku ktoś gra na akordeonie. Dzieci biegają między
            blokami. Ktoś powiesił na balkonie kwiatek w doniczce. To są szczegóły,
            które reporter zapamiętuje najdłużej — szczegóły normalności budowanej
            z niczego, w miejscu gdzie dwa lata temu stały tylko sosny.
          </p>
        </div>
        <div className="border-2 border-double border-gray-800 p-5 bg-amber-50 flex flex-col justify-center">
          <div className="text-4xl font-black text-gray-200 leading-none mb-2"
            style={{ fontFamily: "'Times New Roman', serif" }}>"</div>
          <p className="text-base italic leading-relaxed text-gray-800 mb-3" style={{ textAlign: "justify" }}>
            Poniatowa to mikrokosmos całego COP-u — odważny eksperyment
            industrialny i społeczny zarazem, realizowany w tempie wymuszonym
            przez narastające zagrożenie wojenne. Czy zdążą? Tego nie wie nikt.
            Wiadomo jedno: robotnicy Poniatowej pracują w dzień i w nocy,
            a ich szlifierki nie stają.
          </p>
          <p className="text-[10px] font-bold tracking-widest text-red-800 font-sans">
            — Z REPORTAŻU WŁASNEGO<br />
            CENTRALNY OKRĘG PRZEMYSŁOWY, LUTY 1939
          </p>
        </div>
      </div>

      {/* Stopka artykułu */}
      <div className="border-t-2 border-double border-gray-800 pt-3 flex flex-wrap justify-between items-center gap-2 text-[9px] tracking-widest font-sans text-gray-500">
        <span>CENTRALNY OKRĘG PRZEMYSŁOWY · REPORTAŻ WŁASNY · NR 156</span>
        <span>PONIATOWA, WOJ. LUBELSKIE · LUTY 1939 R.</span>
        <span>© 1939 RSW PRASA · WSZELKIE PRAWA ZASTRZEŻONE</span>
      </div>
    </div>
  );
}
