const SECTIONS = [
  { id: 'strona1',    label: 'STRONA 1'   },
  { id: 'strona2',    label: 'STRONA 2'   },
  { id: 'krzyzowka',  label: 'KRZYZOWKA'  },
  { id: 'mapa',       label: 'MAPA COP'   },
  { id: 'pogoda',     label: 'POGODA'     },
  { id: 'ogloszenia', label: 'OGLOSZENIA' },
];

interface Props {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: Props) {
  return (
      <nav className="border-b-2 border-t-2 border-gray-800 py-2 mb-6 flex flex-wrap justify-center gap-1">
        {SECTIONS.map((s) => (
            <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className={`px-3 py-1 text-xs tracking-widest font-bold transition-all duration-200 ${
                    activeSection === s.id
                        ? 'bg-red-800 text-white'
                        : 'bg-transparent hover:bg-gray-300 text-gray-800'
                }`}
            >
              {s.label}
            </button>
        ))}
      </nav>
  );
}
