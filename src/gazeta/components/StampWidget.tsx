import { useState } from 'react';
import { stamps } from '../data';

export function StampWidget() {
  const [collected, setCollected] = useState(new Set<number>());

  const toggleStamp = (id: number) => {
    setCollected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-[400px] mx-auto p-4 bg-[#f4ece1] shadow-2xl border border-[#d4c5b3] font-serif overflow-hidden">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-double border-[#5d4037] pb-2">
        <h4 className="text-lg font-black tracking-tighter text-[#3d2b1f] leading-tight">
          BUDUJEMY C.O.P. — 1938
        </h4>
        <p className="text-[9px] uppercase tracking-[0.1em] text-[#5d4037] font-bold">
          Kolekcja Inwestycji Modernizacyjnych
        </p>
      </div>

      {/* Stamp grid */}
      <div className="grid grid-cols-3 gap-3">
        {stamps.map((s) => (
          <div key={s.id} className="relative w-full aspect-[3/4]">
            <button
              onClick={() => toggleStamp(s.id)}
              className={`w-full h-full p-1.5 flex flex-col items-center justify-between transition-all duration-500 ${
                collected.has(s.id) ? 'grayscale-0 scale-105 z-10' : 'grayscale-[0.4] hover:grayscale-0'
              }`}
              style={{
                backgroundColor: s.bgColor,
                border: '6px dotted #f4ece1',
                outline: `2px solid ${s.bgColor}`,
                boxShadow: collected.has(s.id)
                  ? '5px 5px 15px rgba(0,0,0,0.3)'
                  : '2px 2px 5px rgba(0,0,0,0.1)',
                transform: collected.has(s.id)
                  ? `rotate(${s.id % 2 === 0 ? 2 : -2}deg) scale(1.05)`
                  : 'scale(1)',
              }}
            >
              {/* Inner decorative border */}
              <div className="absolute inset-1 border border-white/20 pointer-events-none"></div>

              <span className="text-[8px] font-bold text-white/90 tracking-widest leading-none">POLSKA</span>
              <span className="text-2xl my-1 filter drop-shadow-sm">{s.symbol}</span>

              <div className="w-full flex flex-col items-center overflow-hidden">
                <span className="text-[8px] font-black text-white leading-[1.1] text-center w-full break-words uppercase px-0.5">
                  {s.name}
                </span>
                <span className="text-[6px] font-medium text-white/70 uppercase tracking-tighter mt-0.5">
                  {s.desc}
                </span>
              </div>

              <span className="text-[9px] font-bold text-white/95 self-end leading-none">{s.value}</span>
            </button>

            {/* Postmark overlay */}
            {collected.has(s.id) && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="w-14 h-14 border-2 border-black/40 rounded-full flex items-center justify-center -rotate-12">
                  <div className="text-[6px] font-black text-black/40 text-center uppercase leading-tight border-y border-black/40 w-full">
                    WARSZAWA<br />1938<br />COP
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer quote */}
      <div className="mt-6 p-2 bg-[#efe6d5] border border-[#d4c5b3] text-[8px] text-[#5d4037] text-center leading-tight italic">
        "COP – to tętno nowego życia gospodarczego Polski."
      </div>
    </div>
  );
}
