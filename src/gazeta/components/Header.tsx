import { useState, useEffect } from 'react';

export function Header() {
  const [clockTime, setClockTime] = useState('12:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setClockTime(now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }));
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
        Centralny Okręg Przemysłowy
      </h1>

      {/* Subtitle */}
      <p className="text-sm tracking-widest text-gray-700 mb-2" style={{ fontSize: '10px' }}>
        OGROMNY PROJEKT GOSPODARCZY II RP MAJĄCY NA CELU UPRZEMYSŁOWIENIE POLSKI.
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
        WTOREK, 12 lutym 1937 R. &mdash; WYDANIE PORANNE
      </div>
    </header>
  );
}
