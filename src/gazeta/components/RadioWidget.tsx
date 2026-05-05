import { useState, useEffect } from 'react';
import { radioStations } from '../data';

export function RadioWidget() {
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [frequency,  setFrequency]  = useState(95.2);
  const [visualizer, setVisualizer] = useState(Array(15).fill(0));

  useEffect(() => {
    if (!isPlaying) { setVisualizer(Array(15).fill(0)); return; }
    const interval = setInterval(() => {
      setVisualizer((prev) => prev.map(() => Math.random() * 100));
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-[400px]">
      {/* Radio casing */}
      <div className="relative w-80 bg-[#5d2a24] rounded-t-[60px] rounded-b-[30px] p-6 shadow-2xl border-b-[12px] border-[#3d1a16] border-x-[4px]">

        {/* Scale panel */}
        <div className="bg-[#c2935d] rounded-[40px] border-[8px] border-[#3d1a16] p-4 h-40 flex flex-col justify-between relative overflow-hidden shadow-inner">
          {/* Grill texture */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)' }}
          />

          {/* Frequency display */}
          <div className="relative z-10 flex justify-between items-center px-2 py-1 bg-[#b08451] rounded border border-[#8a653d] shadow-sm">
            <span className="text-[#3d1a16] font-serif font-bold text-xs uppercase tracking-tighter">AM / FM</span>
            <span className="text-[#3d1a16] font-mono font-black text-xl">{frequency.toFixed(1)}</span>
            <span className="text-[#3d1a16] font-serif font-bold text-xs">MHz</span>
          </div>

          {/* Visualizer */}
          <div className="relative z-10 flex items-end justify-center gap-1 h-16">
            {visualizer.map((v, i) => (
              <div
                key={i}
                className="transition-all duration-150 ease-in-out"
                style={{
                  width: '6px',
                  height: isPlaying ? `${Math.max(v, 10)}%` : '4px',
                  backgroundColor: isPlaying ? '#4a2522' : '#8a653d',
                  borderRadius: '2px',
                }}
              />
            ))}
          </div>

          {/* Analog scale */}
          <div className="relative z-10 w-full h-4 border-t-2 border-[#3d1a16] mt-1 flex justify-between px-2">
            {[88, 92, 96, 100, 104, 108].map((n) => (
              <span key={n} className="text-[8px] font-bold text-[#3d1a16]">{n}</span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-6 px-2">
          {/* Power knob */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-10 h-10 rounded-full border-4 border-[#3d1a16] shadow-lg transition-transform active:scale-90 ${
              isPlaying ? 'bg-[#ffd93d] rotate-45' : 'bg-[#a37646]'
            }`}
            title="Włącz/Wyłącz"
          />

          {/* Station buttons */}
          <div className="flex gap-2">
            {radioStations.map((s) => (
              <button
                key={s.freq}
                onClick={() => { setFrequency(s.freq); setIsPlaying(true); }}
                className={`w-8 h-8 rounded-full border-2 border-[#3d1a16] text-[8px] font-bold shadow-md transition-all ${
                  Math.abs(frequency - s.freq) < 0.1
                    ? 'bg-[#ffd93d] text-[#3d1a16] scale-110'
                    : 'bg-[#a37646] text-[#3d1a16] hover:bg-[#b08451]'
                }`}
              >
                {s.freq}
              </button>
            ))}
          </div>

          {/* Tuning knob */}
          <div className="relative group">
            <input
              type="range"
              min="87.5" max="108" step="0.1"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="absolute inset-0 w-10 h-10 opacity-0 cursor-pointer z-20"
            />
            <div className="w-10 h-10 rounded-full bg-[#a37646] border-4 border-[#3d1a16] shadow-lg flex items-center justify-center">
              <div
                className="w-1 h-6 bg-[#3d1a16] rounded-full transition-transform"
                style={{ transform: `rotate(${(frequency - 87.5) * 15}deg)` }}
              />
            </div>
          </div>
        </div>

        {/* Feet */}
        <div className="absolute -bottom-3 left-8 w-8 h-3 bg-[#1a0d0c] rounded-b-lg"></div>
        <div className="absolute -bottom-3 right-8 w-8 h-3 bg-[#1a0d0c] rounded-b-lg"></div>
      </div>
    </div>
  );
}
