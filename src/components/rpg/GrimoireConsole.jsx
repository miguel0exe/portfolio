import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import remarkGfm from 'remark-gfm';

export default function GrimoireConsole({ spells }) {
  const [search, setSearch] = useState('');
  const [selectedSpell, setSelectedSpell] = useState(null); // Si es null, mostramos la lista. Si tiene algo, mostramos el código.
  const [activeTab, setActiveTab] = useState('all');

  // --- TEMA PERSONALIZADO PARA JETBRAINS MONO ---
  const customTheme = { ...vscDarkPlus };
  Object.keys(customTheme).forEach((key) => {
    if (customTheme[key].fontFamily) {
      customTheme[key].fontFamily = '"JetBrains Mono", monospace';
    }
  });

  const filteredSpells = useMemo(() => {
    return spells.filter(spell => {
      const matchesSearch = spell.frontmatter.title.toLowerCase().includes(search.toLowerCase()) ||
        spell.frontmatter.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesTab = activeTab === 'all' || spell.frontmatter.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab, spells]);

  return (
    // CAMBIO 1: h-auto en móvil para que no se corte, min-h-screen
    <div className="w-full max-w-6xl mx-auto md:h-[80vh] min-h-[70vh] flex flex-col md:flex-row gap-6 p-2 md:p-4">

      {/* --- COLUMNA IZQUIERDA: LISTA --- */}
      {/* LÓGICA MÓVIL: Si hay un hechizo seleccionado, ocultamos esta columna en móvil (hidden), pero la mostramos en desktop (md:flex) */}
      <div className={`w-full md:w-1/3 flex-col gap-4 ${selectedSpell ? 'hidden md:flex' : 'flex'}`}>

        {/* Command Palette */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[#C8AA6E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input
            type="text"
            placeholder="Buscar hechizo..."
            className="w-full bg-[#1c1917] border border-[#44403c] text-[#d6d3d1] rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#C8AA6E] focus:ring-1 focus:ring-[#C8AA6E] transition-all font-mono text-sm shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filtros Scrollables */}
        <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
          {['all', 'frontend', 'backend', 'devops'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded text-xs uppercase tracking-widest font-bold border transition-all whitespace-nowrap ${activeTab === tab
                  ? 'bg-[#C8AA6E] text-black border-[#C8AA6E]'
                  : 'bg-transparent text-[#78716c] border-[#44403c] hover:border-[#C8AA6E]'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar h-[50vh] md:h-auto">
          {filteredSpells.map((spell, index) => (
            <motion.div
              key={index}
              layoutId={index.toString()}
              onClick={() => setSelectedSpell(spell)}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all group ${selectedSpell === spell
                  ? 'bg-[#C8AA6E]/10 border-[#C8AA6E]'
                  : 'bg-[#0c0a09] border-[#44403c] hover:border-[#C8AA6E]/50'
                }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold font-cinzel text-sm md:text-base ${selectedSpell === spell ? 'text-[#C8AA6E]' : 'text-[#e7e5e4]'}`}>
                  {spell.frontmatter.title}
                </h3>
                <span className="text-[10px] bg-[#292524] text-[#a8a29e] px-2 py-0.5 rounded border border-[#44403c] uppercase shrink-0 ml-2">
                  {spell.frontmatter.lang}
                </span>
              </div>
              <p className="text-xs text-[#a8a29e] font-serif italic truncate">{spell.frontmatter.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- COLUMNA DERECHA: LECTOR --- */}
      {/* LÓGICA MÓVIL: Si NO hay hechizo, ocultamos esto en móvil. Si SÍ hay, lo mostramos a pantalla completa. */}
      <div className={`w-full md:w-2/3 bg-[#0c0a09] border border-[#44403c] rounded-xl overflow-hidden shadow-2xl relative flex-col ${selectedSpell ? 'flex' : 'hidden md:flex'}`}>

        {selectedSpell ? (
          <>
            {/* BOTÓN REGRESAR (SOLO MÓVIL) */}
            <div className="md:hidden bg-[#1c1917] p-2 border-b border-[#44403c]">
              <button
                onClick={() => setSelectedSpell(null)}
                className="flex items-center gap-2 text-[#C8AA6E] text-xs font-bold uppercase tracking-widest px-2 py-1"
              >
                ← Volver a la lista
              </button>
            </div>

            {/* Header */}
            <div className="bg-[#1c1917] border-b border-[#44403c] p-3 md:p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#78716c] font-mono truncate max-w-[200px]">
                  ~/{selectedSpell.frontmatter.title.replace(/\s+/g, '-').toLowerCase()}.md
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSpell.frontmatter.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-[#C8AA6E] border border-[#C8AA6E]/30 px-2 rounded-full">#{tag}</span>
                ))}
              </div>
            </div>

            {/* Contenido Markdown */}
            <div className="flex-1 overflow-auto p-4 md:p-6 bg-[#0c0a09] text-gray-300 font-sans text-sm md:text-base leading-relaxed prose prose-invert prose-p:leading-7 prose-headings:font-cinzel prose-headings:text-[#C8AA6E] prose-pre:m-0 prose-pre:p-0 max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={customTheme}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          background: '#0d0d0d',
                          borderRadius: '0.5rem',
                          border: '1px solid #44403c',
                          margin: '1.5rem 0',
                          padding: '1rem',
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '13px', // Un poco más chico en móvil para que quepa
                          lineHeight: '1.5',
                          overflowX: 'auto' // IMPORTANTE: Scroll horizontal
                        }}
                        showLineNumbers={true}
                        wrapLines={false} // Evita que el código se rompa feo, mejor scroll
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-[#292524] px-1.5 py-0.5 rounded text-[#C8AA6E] font-mono text-xs border border-[#44403c]" {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {selectedSpell.rawContent}
              </ReactMarkdown>
            </div>
          </>
        ) : (
          // Estado Vacío
          <div className="h-full flex flex-col items-center justify-center text-[#44403c] p-8 text-center">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z" /></svg>
            <p className="font-cinzel text-lg">Selecciona un pergamino</p>
            <p className="text-xs font-serif italic mt-2 opacity-50">Toca uno de la lista</p>
          </div>
        )}
      </div>
    </div>
  );
}