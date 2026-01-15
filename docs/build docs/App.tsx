import React from 'react';
import Sidebar from './components/Sidebar';
import FocusWindow from './components/FocusWindow';
import SceneStage from './components/SceneStage';
import AssetTray from './components/AssetTray';

export default function StudioApp() {
  return (
    <div className="h-screen w-screen bg-[#121212] text-white flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="h-12 border-b border-[#333] flex items-center px-4 justify-between">
        <h1 className="font-bold tracking-tighter text-emerald-400">VIBE STUDIO</h1>
        <div className="flex gap-4 text-xs uppercase tracking-widest text-gray-500">
          <span>Project: Untitled</span>
          <button className="bg-emerald-600 text-white px-3 py-1 rounded">Export</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        {/* Main Dual-Workspace */}
        <main className="flex-1 flex gap-px bg-[#333]">
          {/* Left: Surgical Editor (40%) */}
          <div className="w-[40%] bg-[#121212] overflow-hidden">
            <FocusWindow />
          </div>

          {/* Right: Scene Stage (60%) */}
          <div className="flex-1 bg-[#1a1a1a] relative">
            <SceneStage />
          </div>
        </main>
      </div>

      {/* Bottom Asset Shelf */}
      <AssetTray />
    </div>
  );
}