import { useState } from 'react';
import { announcements } from '../data';

export function Announcements() {
  const [clippedCoupons, setClippedCoupons] = useState<Set<number>>(new Set());

  const toggleCoupon = (id: number) => {
    setClippedCoupons((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div>
      <h3
        className="text-2xl font-black mb-4 text-center border-b-2 border-gray-800 pb-2"
        style={{ fontFamily: "'Times New Roman', serif" }}
      >
        &#9830; OGLOSZENIA I KOMUNIKATY &#9830;
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map((a) => (
          <div
            key={a.id}
            className={`border-2 p-4 relative transition-all duration-300 ${
              a.isCoupon
                ? clippedCoupons.has(a.id)
                  ? 'border-green-600 bg-green-50 border-solid'
                  : 'border-dashed border-gray-800 bg-yellow-50'
                : 'border-gray-400'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{a.icon}</span>
              <div className="flex-1">
                <h4 className="font-bold text-sm tracking-widest mb-2">{a.title}</h4>
                <p
                  className="text-sm"
                  style={{ fontFamily: "'Times New Roman', serif", textAlign: 'justify' }}
                >
                  {a.content}
                </p>
              </div>
            </div>

            {a.isCoupon && (
              <button
                onClick={() => toggleCoupon(a.id)}
                className={`mt-3 w-full py-2 text-xs tracking-widest font-bold transition-all ${
                  clippedCoupons.has(a.id)
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
