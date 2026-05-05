import { useState } from 'react';
import { crosswordData } from '../data';

const GRID_SIZE = 14;

type Cell = { letter: string; number?: number; isBlank: boolean } | null;

function buildGrid(): Cell[][] {
  const grid: Cell[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null)
  );

  crosswordData.across.forEach((word) => {
    for (let i = 0; i < word.answer.length; i++) {
      if (!grid[word.row][word.col + i]) {
        grid[word.row][word.col + i] = { letter: word.answer[i], isBlank: false };
      }
      if (i === 0 && grid[word.row][word.col + i]) {
        grid[word.row][word.col + i]!.number = word.number;
      }
    }
  });

  crosswordData.down.forEach((word) => {
    for (let i = 0; i < word.answer.length; i++) {
      if (!grid[word.row + i][word.col]) {
        grid[word.row + i][word.col] = { letter: word.answer[i], isBlank: false };
      }
      if (i === 0 && grid[word.row + i][word.col]) {
        grid[word.row + i][word.col]!.number = word.number;
      }
    }
  });

  return grid;
}

export function Crossword() {
  const [userInput, setUserInput] = useState<Record<string, string>>({});
  const [checked, setChecked]     = useState(false);
  const [correct, setCorrect]     = useState<Record<string, boolean>>({});

  const grid = buildGrid();

  const handleCheck = () => {
    const results: Record<string, boolean> = {};
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
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
      <h3
        className="text-2xl font-black mb-4 text-center border-b-2 border-red-800 pb-2"
        style={{ fontFamily: "'Times New Roman', serif" }}
      >
        ⚙️ CENTRALNY OKRĘG PRZEMYSŁOWY ⚙️
      </h3>
      <p className="text-center text-sm mb-4 italic text-gray-700">
        Program industrializacji II Rzeczypospolitej 1936–1939
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6">
        {/* Grid */}
        <div>
          <div
            className="inline-grid gap-0 border-2 border-gray-800 bg-gray-800"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const key = `${r}-${c}`;
                if (!cell || cell.isBlank) {
                  return <div key={key} className="w-8 h-8 bg-gray-800" />;
                }
                return (
                  <div key={key} className="w-8 h-8 bg-white relative">
                    {cell.number && (
                      <span className="absolute top-0 left-0.5 text-[8px] font-bold text-red-800">
                        {cell.number}
                      </span>
                    )}
                    <input
                      type="text"
                      maxLength={1}
                      value={userInput[key] || ''}
                      onChange={(e) => {
                        setUserInput((prev) => ({ ...prev, [key]: e.target.value }));
                        setChecked(false);
                      }}
                      className={`w-full h-full text-center text-sm font-bold uppercase outline-none border border-gray-300 ${
                        checked ? (correct[key] ? 'bg-green-200' : 'bg-red-200') : 'bg-white'
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
              className="bg-red-800 text-white px-4 py-2 text-xs tracking-widest hover:bg-red-900 transition-colors font-bold"
            >
              SPRAWDŹ ODPOWIEDZI
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-600 text-white px-4 py-2 text-xs tracking-widest hover:bg-gray-800 transition-colors font-bold"
            >
              RESETUJ
            </button>
          </div>

          <div className="mt-4 p-3 bg-amber-50 border border-amber-600 text-xs">
            <p className="font-bold mb-1">ℹ️ Informacja historyczna:</p>
            <p>
              COP – ambitny plan budowy zakładów zbrojeniowych i przemysłu ciężkiego w centralnej
              Polsce, z dala od granic. Realizowany w latach 1936–1939 pod kierunkiem wicepremiera
              Eugeniusza Kwiatkowskiego.
            </p>
          </div>
        </div>

        {/* Clues */}
        <div>
          <div className="border-2 border-red-800 p-3 mb-3 bg-red-50">
            <h4 className="font-bold text-sm mb-2 border-b-2 border-red-800 pb-1">➡️ POZIOMO</h4>
            {crosswordData.across.map((clue) => (
              <p key={clue.number} className="text-sm mb-1.5">
                <span className="font-bold text-red-800">{clue.number}.</span> {clue.clue}
              </p>
            ))}
          </div>
          <div className="border-2 border-red-800 p-3 bg-red-50">
            <h4 className="font-bold text-sm mb-2 border-b-2 border-red-800 pb-1">⬇️ PIONOWO</h4>
            {crosswordData.down.map((clue) => (
              <p key={clue.number} className="text-sm mb-1.5">
                <span className="font-bold text-red-800">{clue.number}.</span> {clue.clue}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Fun facts */}
      <div className="mt-8 border-t-4 border-double border-red-800 pt-6">
        <h3
          className="text-xl font-black mb-6 text-red-900 flex items-center gap-2"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          <span className="bg-red-800 text-white px-2 py-1 italic">CZY WIESZ, ŻE...?</span>
          Ciekawostki o największym projekcie II RP
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🌲', title: 'Miasto z sosnowego lasu',   text: 'Stalowa Wola, jeden z symboli COP, powstała niemal od zera w miejscu, gdzie wcześniej rosły piaszczyste lasy. Nazwa miasta pochodzi od słów ministra spraw wojskowych, gen. Kasprzyckiego, który mówił o "stalowej woli narodu polskiego".' },
            { icon: '📐', title: 'Trójkąt bezpieczeństwa',    text: 'COP ulokowano w tzw. "trójkącie bezpieczeństwa" w widłach Wisły i Sanu. Chodziło o to, by zakłady zbrojeniowe znajdowały się poza zasięgiem ówczesnego lotnictwa Niemiec i ZSRR oraz były osłonięte naturalnymi przeszkodami wodnymi.' },
            { icon: '🚀', title: 'Ekspresowe tempo',           text: 'Budowa Zakładów Południowych (dzisiejsza Huta Stalowa Wola) ruszyła w marcu 1937 roku, a już we wrześniu 1938 roku oddano do użytku pierwsze hale. Cały projekt COP-u miał trwać do 1954 roku, ale wojna przerwała go w trzecim roku realizacji.' },
            { icon: '⚡', title: 'Gigantyczne inwestycje',     text: 'W ramach COP wybudowano nie tylko fabryki, ale też potężne elektrownie wodne (np. w Rożnowie) oraz gazociągi o długości setek kilometrów, które doprowadzały tanią energię z Podkarpacia do nowych ośrodków przemysłowych.' },
            { icon: '✈️', title: 'Orzeł i Łoś',               text: 'To właśnie w COP (w Mielcu i Rzeszowie) produkowano najnowocześniejsze polskie konstrukcje lotnicze, w tym słynny bombowiec PZL.37 Łoś, który w tamtym czasie należał do ścisłej światowej czołówki.' },
            { icon: '💼', title: 'Wizjoner Kwiatkowski',       text: 'Eugeniusz Kwiatkowski, główny twórca COP, uważał, że bez uprzemysłowienia Polska nie utrzyma niepodległości. W ciągu zaledwie kilku lat udało mu się zmniejszyć bezrobocie o setki tysięcy osób i stworzyć nowoczesną klasę robotniczą.' },
          ].map((fact) => (
            <div
              key={fact.title}
              className="bg-white border-l-4 border-red-800 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h5 className="font-bold text-red-800 mb-1 uppercase text-xs">
                {fact.icon} {fact.title}
              </h5>
              <p className="text-xs leading-relaxed text-gray-700">{fact.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center border-2 border-dashed border-gray-300 p-4 opacity-70">
          <p className="text-[10px] uppercase tracking-widest text-gray-500">
            Archiwum Państwowe II Rzeczypospolitej • Dokumentacja Projektowa 1936–1939 • Wydział
            Propagandy Przemysłowej
          </p>
        </div>
      </div>
    </div>
  );
}
