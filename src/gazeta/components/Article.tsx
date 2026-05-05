import type { Article } from '../data';

// ============ ARTICLE CARD ============

interface ArticleCardProps {
  article: Article;
  onExpand: (id: number) => void;
}

export function ArticleCard({ article, onExpand }: ArticleCardProps) {
  return (
    <article
      className={`border border-gray-400 p-4 mb-4 ${
        article.highlighted ? 'border-2 border-gray-800 bg-amber-50' : ''
      }`}
    >
      {article.subtitle && (
        <p className="text-xs tracking-widest text-red-800 font-bold mb-1 uppercase">
          {article.subtitle}
        </p>
      )}
      <h2
        className="text-xl font-black mb-2 leading-tight cursor-pointer hover:text-red-800 transition-colors"
        style={{ fontFamily: "'Times New Roman', serif" }}
        onClick={() => onExpand(article.id)}
      >
        {article.title}
      </h2>
      <p
        className="text-sm leading-relaxed text-gray-800"
        style={{ fontFamily: "'Times New Roman', serif", textAlign: 'justify', textIndent: '2em' }}
      >
        {article.content}
      </p>
      <div className="flex justify-between items-center mt-3 border-t border-dotted border-gray-400 pt-2">
        {article.author && (
          <span className="text-xs tracking-widest text-gray-600 font-bold">{article.author}</span>
        )}
        <button
          onClick={() => onExpand(article.id)}
          className="text-xs bg-gray-800 text-white px-3 py-1 hover:bg-red-800 transition-colors tracking-widest"
        >
          CZYTAJ DALEJ &#8594;
        </button>
      </div>
    </article>
  );
}

// ============ EXPANDED ARTICLE MODAL ============

interface ExpandedArticleProps {
  article: Article;
  onClose: () => void;
}

export function ExpandedArticle({ article, onClose }: ExpandedArticleProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-amber-50 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 border-2 border-gray-800 relative"
        style={{ boxShadow: '5px 5px 20px rgba(0,0,0,0.5)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gray-300 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:text-red-800 text-2xl font-bold z-10"
        >
          &#10005;
        </button>

        {article.subtitle && (
          <p className="text-sm tracking-widest text-red-800 font-bold mb-2">{article.subtitle}</p>
        )}
        <h2
          className="text-3xl font-black mb-4 leading-tight"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          {article.title}
        </h2>

        <div className="border-t border-b border-gray-400 py-1 mb-4 flex justify-between text-xs text-gray-600">
          <span>Centralny Okręg Przemysłowy &bull; NR 156</span>
          <span>WTOREK, 12 Luty 1937</span>
        </div>

        <div
          className="text-base leading-relaxed text-gray-800"
          style={{ fontFamily: "'Times New Roman', serif", textAlign: 'justify' }}
        >
          {article.fullContent.split('\n\n').map((p, i) => (
            <p key={i} className="mb-3" style={{ textIndent: i > 0 ? '2em' : 0 }}>
              {p}
            </p>
          ))}
        </div>

        {article.author && (
          <div className="mt-6 text-right border-t border-gray-400 pt-3">
            <span className="text-xs tracking-widest font-bold text-gray-600">{article.author}</span>
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="bg-red-800 text-white px-6 py-2 text-sm tracking-widest hover:bg-red-900 transition-colors"
          >
            POWROT DO GAZETY
          </button>
        </div>
      </div>
    </div>
  );
}
