import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

export default function RuneNode({ data, selected }) {
  // Colores de Maná (Glow intenso)
  const styles = {
    core: 'shadow-[0_0_30px_#C8AA6E] border-[#C8AA6E] bg-black', // Dorado (Tú)
    frontend: 'shadow-[0_0_20px_#10b981] border-[#10b981] bg-black', // Verde (Front)
    backend: 'shadow-[0_0_20px_#3b82f6] border-[#3b82f6] bg-black', // Azul (Back)
    tool: 'shadow-[0_0_20px_#a855f7] border-[#a855f7] bg-black', // Morado (Tools)
  };

  const currentStyle = styles[data.type] || styles.core;

  // Si está seleccionado, brilla más fuerte
  const isSelectedStyle = selected ? 'scale-110 ring-2 ring-white' : 'opacity-80 hover:opacity-100';

  return (
    <div className="relative group">
      {/* Handle Invisible (Conector) */}
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-none" />

      {/* ORBE RÚNICO */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-2 ${currentStyle} ${isSelectedStyle} flex items-center justify-center cursor-pointer transition-all duration-500 backdrop-blur-md relative z-10`}
      >
        {/* Efecto de "Energía Interna" (Pseudo-elemento visual) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

        <div className="text-center flex flex-col items-center justify-center p-1">
          <span className="text-2xl md:text-3xl drop-shadow-md filter">{data.icon}</span>
        </div>
      </motion.div>

      {/* ETIQUETA FLOTANTE (Solo texto abajo, limpio) */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max text-center">
        <span className={`text-[10px] md:text-xs font-cinzel font-bold tracking-widest px-2 py-1 rounded bg-black/80 border border-white/10 ${selected ? 'text-white' : 'text-[#a8a29e]'}`}>
          {data.label}
        </span>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-none" />
    </div>
  );
}