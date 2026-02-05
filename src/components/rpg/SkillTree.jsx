import { Background, Controls, ReactFlow, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import RuneNode from './RuneNode';

// --- CONFIGURACIÓN RADIAL (Como un sistema solar) ---
// Centro: Tú. Órbitas: Skills.
const initialNodes = [
  // CENTRO (Core)
  { id: '1', type: 'rune', position: { x: 0, y: 0 }, data: { label: 'Artífice', type: 'core', icon: '🧙‍♂️', desc: 'Nivel 3. El núcleo de todo el conocimiento.' } },

  // ÓRBITA SUPERIOR (Frontend)
  { id: '2', type: 'rune', position: { x: -150, y: -150 }, data: { label: 'Frontend', type: 'frontend', icon: '🎨', desc: 'Dominio de la interfaz visual.' } },
  { id: '3', type: 'rune', position: { x: -250, y: -250 }, data: { label: 'React', type: 'frontend', icon: '⚛️', desc: 'Librería UI principal.' } },
  { id: '4', type: 'rune', position: { x: -50, y: -250 }, data: { label: 'Tailwind', type: 'frontend', icon: '🍃', desc: 'Estilos atómicos.' } },

  // ÓRBITA INFERIOR (Backend)
  { id: '5', type: 'rune', position: { x: 150, y: 150 }, data: { label: 'Backend', type: 'backend', icon: '⚙️', desc: 'Lógica de servidor.' } },
  { id: '6', type: 'rune', position: { x: 250, y: 250 }, data: { label: 'Java', type: 'backend', icon: '☕', desc: 'Lenguaje Enterprise.' } },
  { id: '7', type: 'rune', position: { x: 50, y: 300 }, data: { label: 'Spring', type: 'backend', icon: '🌱', desc: 'Microservicios y API.' } },
  { id: '8', type: 'rune', position: { x: 350, y: 150 }, data: { label: 'SQL', type: 'backend', icon: '🐘', desc: 'Persistencia de datos.' } },
];

// Estilos de las líneas (Golden streams)
const edgeOptions = {
  animated: true,
  style: { stroke: '#C8AA6E', strokeWidth: 2, opacity: 0.5 },
};

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', ...edgeOptions },
  { id: 'e1-5', source: '1', target: '5', ...edgeOptions },

  { id: 'e2-3', source: '2', target: '3', ...edgeOptions, style: { stroke: '#10b981', strokeWidth: 1, opacity: 0.4 } },
  { id: 'e2-4', source: '2', target: '4', ...edgeOptions, style: { stroke: '#10b981', strokeWidth: 1, opacity: 0.4 } },

  { id: 'e5-6', source: '5', target: '6', ...edgeOptions, style: { stroke: '#3b82f6', strokeWidth: 1, opacity: 0.4 } },
  { id: 'e5-7', source: '5', target: '7', ...edgeOptions, style: { stroke: '#3b82f6', strokeWidth: 1, opacity: 0.4 } },
  { id: 'e7-8', source: '7', target: '8', ...edgeOptions, style: { stroke: '#3b82f6', strokeWidth: 1, opacity: 0.4 } },
];

const nodeTypes = { rune: RuneNode };

export default function SkillTree() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onNodeClick = (event, node) => setSelectedSkill(node.data);

  return (
    // CAMBIO IMPORTANTE: bg-transparent y borde sutil
    <div className="w-full h-[80vh] relative rounded-xl border border-[#C8AA6E]/20 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-sm">

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        attributionPosition="bottom-left"
        // Ocultar la grilla por defecto para que se vean tus estrellas del layout
        proOptions={{ hideAttribution: true }}
      >
        {/* Grilla muy sutil, casi invisible */}
        <Background color="#C8AA6E" gap={40} size={1} style={{ opacity: 0.1 }} />

        {/* Controles personalizados para que no se vean blancos */}
        <Controls className="!bg-[#1c1917] !border-[#44403c] [&>button]:!fill-[#C8AA6E] [&>button]:!border-b-[#44403c] hover:[&>button]:!bg-[#292524]" />
      </ReactFlow>

      {/* PANEL LATERAL (Grimorio Deslizable) */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-full md:w-96 h-full bg-[#0c0a09]/95 border-l border-[#C8AA6E] backdrop-blur-xl p-8 shadow-2xl z-50 flex flex-col"
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 p-2 text-[#a8a29e] hover:text-[#C8AA6E] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
            </button>

            <div className="mt-6 flex flex-col items-center text-center">
              <div className="text-7xl mb-6 drop-shadow-[0_0_15px_rgba(200,170,110,0.5)] animate-pulse-slow">
                {selectedSkill.icon}
              </div>

              <h2 className="text-3xl font-cinzel text-[#C8AA6E] mb-2">{selectedSkill.label}</h2>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C8AA6E] to-transparent mb-6"></div>

              <p className="text-[#d6d3d1] font-serif text-lg leading-relaxed italic">
                "{selectedSkill.desc}"
              </p>
            </div>

            {/* Barra de Progreso RPG */}
            <div className="mt-10">
              <div className="flex justify-between text-xs text-[#C8AA6E] uppercase tracking-widest mb-2 font-bold">
                <span>Dominio de la Habilidad</span>
                <span>LVL 5</span>
              </div>
              <div className="w-full bg-[#1c1917] h-3 rounded-full border border-[#44403c] overflow-hidden relative">
                {/* Barra con brillo */}
                <div className="bg-gradient-to-r from-[#C8AA6E]/60 to-[#C8AA6E] h-full w-[85%] relative">
                  <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-white shadow-[0_0_10px_white]"></div>
                </div>
              </div>
            </div>

            <div className="mt-auto text-center">
              <p className="text-xs text-[#57534e] font-mono">Runas vinculadas detectadas.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}