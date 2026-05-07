import { useState } from 'react';

import { articles }       from './data';
import { Header }         from './components/Header';
import { Navigation }     from './components/Navigation';
import { SearchBar }      from './components/SearchBar';
import { ArticleCard, ExpandedArticle } from './components/Article';
import { Crossword }      from './components/Crossword';
import { COPMap }         from './components/COPMap';
import { Sidebar }        from './components/Sidebar';
import {PoniatowaPage} from "./components/PoniatowaPage.tsx";

export default function App() {
  const [activeSection,   setActiveSection]   = useState('strona1');
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
  const [searchQuery,     setSearchQuery]     = useState('');
  const [pageFlip,        setPageFlip]        = useState(false);

  const handleNavigate = (section: string) => {
    setPageFlip(true);
    setTimeout(() => {
      setActiveSection(section);
      setPageFlip(false);
    }, 300);
  };

  const filteredArticles = searchQuery
      ? articles.filter(
          (a) =>
              a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              a.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : articles;

  return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div
              className="relative bg-amber-50 p-6 md:p-10 shadow-2xl transition-all duration-300"
              style={{
                transform: pageFlip ? 'rotateY(90deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease-in-out',
                backgroundImage: `
              radial-gradient(ellipse at 85% 15%, rgba(139,90,43,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 10% 90%, rgba(139,90,43,0.06) 0%, transparent 40%)
            `,
              }}
          >
            {/* Paper texture overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                  backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.1) 28px, rgba(0,0,0,0.1) 29px)',
                }}
            />

            {/* Fold mark */}
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-40" />

            <Header />
            <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
            <SearchBar onSearch={setSearchQuery} />

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main content */}
              <main className="flex-1 min-w-0">
                {(activeSection === 'strona1' || activeSection === 'strona2') && (
                    <div>
                      {searchQuery && (
                          <div className="bg-yellow-100 border border-yellow-600 p-2 mb-4 text-sm">
                            Znaleziono {filteredArticles.length} artykulow dla zapytania: {searchQuery}
                          </div>
                      )}

                      <div className={activeSection === 'strona1' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                        {filteredArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} onExpand={setExpandedArticle} />
                        ))}
                      </div>

                      {filteredArticles.length === 0 && (
                          <div className="text-center py-12">
                            <p className="text-2xl">&#128269;</p>
                            <p className="text-lg mt-2">Brak artykulow spelniajacych kryteria</p>
                            <p className="text-sm text-gray-600 mt-1">Sprobuj innego zapytania, towarzyszu</p>
                          </div>
                      )}

                      <div className="text-center mt-6 border-t border-gray-400 pt-4">
                    <span className="text-sm tracking-widest">
                      &mdash; STRONA {activeSection === 'strona1' ? '1' : '2'} Z 2 &mdash;
                    </span>
                      </div>
                    </div>
                )}

                {activeSection === 'krzyzowka'  && <Crossword />}
                {activeSection === 'mapa'       && <COPMap />}
                {activeSection === 'poniatowa'       && <PoniatowaPage />}
              </main>

              {/* Sidebar */}
              <div className="lg:w-80 flex-shrink-0">
                <Sidebar />
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-10 border-t-4 border-double border-gray-800 pt-4 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="flex-1 h-px bg-gray-400"></div>
                <span className="text-2xl">&#11088;</span>
                <div className="flex-1 h-px bg-gray-400"></div>
              </div>
              <p className="text-xs tracking-widest text-gray-600">
                Centralny Okręg Przemysłowy &mdash; CZERWONA 6/8, WARSZAWA &bull; TELEFON REDAKCJI:
                20-20-44
              </p>
              <p className="text-xs tracking-widest text-gray-600 mt-1">
                NAKLAD: 800 000 EGZEMPLARZY &bull; DRUK: RUCH &bull; RCL Warszawa
              </p>
              <p className="text-gray-500 mt-2" style={{ fontSize: '10px' }}>
                &copy; 1974 RSW Prasa-Ksiazka-Ruch &mdash; Wszelkie prawa zastrzezone. Kopiowanie bez
                zezwolenia KC PZPR zabronione.
              </p>
            </footer>
          </div>
        </div>

        {/* Expanded article modal */}
        {expandedArticle !== null && (
            <ExpandedArticle
                article={articles.find((a) => a.id === expandedArticle)!}
                onClose={() => setExpandedArticle(null)}
            />
        )}
      </div>
  );
}
