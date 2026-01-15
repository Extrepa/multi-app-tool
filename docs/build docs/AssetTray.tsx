import React from 'react';
import { useStudioStore } from '../store/useStudioStore';

export default function AssetTray() {
  const assets = useStudioStore((state) => state.library.assets);
  const addAsset = useStudioStore((state) => state.addAsset);

  const createDefaultPin = () => {
    const id = `asset_${Date.now()}`;
    addAsset({
      id,
      name: "New Pin",
      data: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#00FF9D" /></svg>`,
      type: 'svg'
    });
  };

  return (
    <div className="h-40 border-t border-[#333] bg-[#1a1a1a] flex flex-col">
      <div className="p-2 border-b border-[#333] flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-tighter text-gray-400">Project Assets</span>
        <button 
          onClick={createDefaultPin}
          className="text-[10px] bg-emerald-600/20 text-emerald-400 border border-emerald-600/40 px-2 py-0.5 rounded hover:bg-emerald-600 hover:text-white transition-all"
        >
          + Create Pin
        </button>
      </div>
      
      <div className="flex-1 flex gap-4 p-4 overflow-x-auto items-center">
        {assets.map(asset => (
          <div 
            key={asset.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("assetId", asset.id)}
            className="w-20 h-20 bg-[#121212] border border-[#333] rounded flex items-center justify-center cursor-grab active:cursor-grabbing hover:border-emerald-500 transition-colors"
            title={asset.name}
          >
            <div className="w-12 h-12" dangerouslySetInnerHTML={{ __html: asset.data }} />
          </div>
        ))}
      </div>
    </div>
  );
}