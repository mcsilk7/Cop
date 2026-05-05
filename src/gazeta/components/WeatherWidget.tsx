import { useState } from 'react';
import { pogody } from '../data';

export function WeatherWidget() {
  const [expandedCity, setExpandedCity] = useState<string | null>(null);

  return (
    <div>
      <h3
        className="text-2xl font-black mb-4 text-center border-b-2 border-gray-800 pb-2"
        style={{ fontFamily: "'Times New Roman', serif" }}
      >
        &#9830; PROGNOZA POGODY &#9830;
      </h3>
      <p className="text-xs text-center mb-4 tracking-widest">
        INSTYTUT METEOROLOGII I GOSPODARKI WODNEJ
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {pogody.map((p) => (
          <button
            key={p.miasto}
            onClick={() => setExpandedCity(expandedCity === p.miasto ? null : p.miasto)}
            className={`border p-4 text-left transition-all duration-300 ${
              expandedCity === p.miasto
                ? 'border-red-800 bg-red-50 border-2'
                : 'border-gray-400 hover:border-gray-800'
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
        <p className="mt-1">
          Pamietaj, towarzyszu! Na dluga zime przygotuj sie juz teraz. Remontuj piece, izoluj okna!
        </p>
      </div>
    </div>
  );
}
