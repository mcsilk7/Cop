import { RadioWidget } from './RadioWidget';
import { StampWidget } from './StampWidget';

export function Sidebar() {
  return (
    <aside className="space-y-6">
      <RadioWidget />
      <StampWidget />

      <div className="border-2 border-red-800 hover:bg-gray-300 bg-red-50 p-4">
        <h4 className="text-sm font-black tracking-widest text-center mb-3 text-red-800">
          CYTAT TYGODNIA
        </h4>
        <blockquote
          className="text-sm italic text-center leading-relaxed"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          "Pieniądz publiczny jest pieniądzem świętym i trzeba się z nim obchodzić jak z najwyższą
          świętością"
        </blockquote>
        <p className="text-xs text-center mt-2 font-bold">&mdash; Eugeniusz Kwiatkowski</p>
      </div>

      <div className="border-2 border-gray-800 bg-gray-100 hover:bg-gray-300 p-4 text-center">
        <h4
          className="text-lg font-bold tracking-widest mb-2 uppercase"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          CENTRALNY OKRĘG PRZEMYSŁOWY
        </h4>
        <p className="text-xs tracking-widest mb-2">
          ROZWÓJ PRZEMYSŁU • SIŁA GOSPODARKI <br /> NOWOCZESNA POLSKA
        </p>
        <div className="space-y-1 text-sm text-left">
          <p>Stal konstrukcyjna — 120 zł / tona</p>
          <p>Maszyny rolnicze — od 950 zł</p>
          <p>Radioodbiornik — 320 zł</p>
          <p>Obuwie skórzane — 45 zł</p>
        </div>
        <p className="mt-2 text-gray-700" style={{ fontSize: '10px' }}>
          * Produkcja krajowa wspierana przez państwowe inwestycje przemysłowe
        </p>
      </div>

      <div className="border-2 border-gray-800 bg-gray-200 text-gray-900 p-4 text-center cursor-pointer hover:bg-gray-300 transition-colors">
        <p className="text-3xl mb-2">🏭</p>
        <p className="text-sm font-black tracking-widest uppercase">CENTRALNY OKRĘG PRZEMYSŁOWY</p>
        <p className="mt-2 text-xs leading-snug">
          Wielki program uprzemysłowienia II Rzeczypospolitej realizowany w latach 1936–1939.
          Obejmował budowę fabryk, hut oraz zakładów zbrojeniowych w centralnej Polsce.
        </p>
        <p className="mt-2 opacity-80" style={{ fontSize: '10px' }}>
          Inwestycje państwowe • nowe miejsca pracy • rozwój nowoczesnej gospodarki
        </p>
      </div>
    </aside>
  );
}
