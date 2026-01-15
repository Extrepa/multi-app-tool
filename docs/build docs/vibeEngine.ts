import React, { useState } from 'react';
import { useStudioStore } from '../store/useStudioStore';

export default function FocusWindow() {
  const selection = useStudioStore((state) => state.scene.selection);
  const instance = useStudioStore((state) => 
    state.scene.instances.find(i => i.id === selection)
  );
  const asset = useStudioStore((state) => 
    state.library.assets.find(a => a.id === instance?.assetRef)
  );

  if (!asset) {
    return (
      <div className="h-full flex items-center justify-center text-gray-600 text-sm">
        Select a prop on the stage to edit
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#333] flex justify-between items-center bg-[#1a1a1a]">
        <span className="text-xs font-bold text-emerald-500 uppercase">Focus: {asset.name}</span>
        <div className="flex gap-2">
          <button className="text-[10px] bg-[#333] px-2 py-1 rounded">Nodes</button>
          <button className="text-[10px] bg-[#333] px-2 py-1 rounded">Vibe</button>
        </div>
      </div>
      
      {/* The Surgical Canvas */}
      <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat">
        <div className="absolute inset-0 flex items-center justify-center p-12">
           {/* Scaled up version of the asset for editing */}
           <div 
             className="w-full h-full"
             dangerouslySetInnerHTML={{ __html: asset.data }} 
             style={{ transform: 'scale(4)', transformOrigin: 'center' }}
           />
        </div>
        
        {/* SVG Overlay for Node Manipulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Cursor will implement logic to map SVG path points to draggable handles here */}
        </svg>
      </div>
    </div>
  );
}