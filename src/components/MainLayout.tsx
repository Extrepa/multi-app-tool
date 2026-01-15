import React, { PropsWithChildren, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../state/useStore';
import { HistoryControls } from './Shared/HistoryControls';
import { ProjectHealthModal } from './Diagnostics/ProjectHealthModal';
import { ModelSelector } from './Shared/ModelSelector';
import { ScreensaverMode } from './Presentation/ScreensaverMode';
import { Activity, Maximize2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { calculateHealthScore } from '../utils/optimizationUtils';
import { ThemeControls } from '@errl-design-system';

interface MainLayoutProps extends PropsWithChildren {
  left?: React.ReactNode;
  right?: React.ReactNode;
  bottom?: React.ReactNode;
}

type LayoutMode = 'split' | 'canvas-dominant' | 'canvas-only' | 'editor-only' | 'drawer';

export const MainLayout: React.FC<MainLayoutProps> = ({ left, right, bottom, children }) => {
  const { mode, project } = useStore();
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [showScreensaver, setShowScreensaver] = useState(false);
  const [isShelfOpen, setIsShelfOpen] = useState(true);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('split');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const healthScore = project ? calculateHealthScore(project).score : 100;
  const [focusWindow, stageCanvas] = useMemo(() => {
    const nodes = React.Children.toArray(children);
    return [nodes[0] ?? null, nodes[1] ?? null];
  }, [children]);
  
  return (
    <div className="flex h-screen w-screen bg-[#121212] text-[#E0E0E0] overflow-hidden">
      {/* Left Mode Selector */}
      {left && (
        <aside className="w-16 bg-[#1E1E1E] border-r border-[#333333] flex flex-col items-center py-4">
          {left}
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-12 bg-[#1E1E1E] border-b border-[#333333] flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-[#E0E0E0]">
              {project?.meta.name || 'Untitled'}
            </div>
            <button
              onClick={() => setShowHealthModal(true)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                healthScore >= 80
                  ? 'bg-[#00FF9D]/20 text-[#00FF9D]'
                  : healthScore >= 60
                  ? 'bg-yellow-400/20 text-yellow-400'
                  : 'bg-red-400/20 text-red-400'
              } hover:opacity-80`}
              title="Project Health (overall consistency and optimization score)"
            >
              <Activity size={12} />
              <span className="hidden sm:inline">Health</span>
              {healthScore}
            </button>
            <button
              onClick={() => setShowScreensaver(true)}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-[#1A1A1A] border border-[#333333] text-[#888888] hover:text-[#E0E0E0] hover:border-[#555555]"
              title="Screensaver Mode (F11)"
            >
              <Maximize2 size={12} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-[#888888]">
              <span className="hidden md:inline">Layout</span>
              <select
                value={layoutMode}
                onChange={(e) => setLayoutMode(e.target.value as LayoutMode)}
                className="px-2 py-1 text-xs bg-[#121212] border border-[#333333] rounded text-[#E0E0E0]"
                title="Layout Mode"
              >
                <option value="split">Split 50/50</option>
                <option value="canvas-dominant">Canvas 70/30</option>
                <option value="canvas-only">Canvas Only</option>
                <option value="editor-only">Editor Only</option>
                <option value="drawer">Editor Drawer</option>
              </select>
              {layoutMode === 'drawer' && (
                <button
                  onClick={() => setIsDrawerOpen((prev) => !prev)}
                  className="px-2 py-1 text-xs bg-[#1A1A1A] border border-[#333333] rounded text-[#888888] hover:text-[#E0E0E0]"
                  title={isDrawerOpen ? 'Hide Editor Drawer' : 'Show Editor Drawer'}
                >
                  {isDrawerOpen ? 'Hide' : 'Show'}
                </button>
              )}
            </div>
            <ThemeControls compact={true} />
            <ModelSelector />
            <HistoryControls />
          </div>
        </div>

        <div className="flex-1 min-h-0 relative">
          {/* Dual Viewport Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode.type}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex min-h-0"
              style={{
                borderLeft: mode.type === 'svg-edit' ? '1px solid #00FF9D' : 
                           mode.type === 'fx-lab' ? '1px solid #FF007A' : 
                           mode.type === 'scene-maker' ? '1px solid #7000FF' : '1px solid #333333',
                boxShadow: mode.type === 'svg-edit' ? '0 0 1px #00FF9D' : 
                          mode.type === 'fx-lab' ? '0 0 1px #FF007A' : 
                          mode.type === 'scene-maker' ? '0 0 1px #7000FF' : 'none',
              }}
            >
              {layoutMode === 'canvas-only' && stageCanvas}
              {layoutMode === 'editor-only' && focusWindow}
              {layoutMode === 'drawer' && (
                <div className="relative flex-1 min-w-0">
                  {stageCanvas}
                  {isDrawerOpen && (
                    <div className="absolute left-4 top-4 bottom-4 w-[360px] max-w-[60%] bg-[#1B1B1B] border border-[#333333] rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.45)] overflow-hidden">
                      {focusWindow}
                    </div>
                  )}
                </div>
              )}
              {layoutMode !== 'canvas-only' && layoutMode !== 'editor-only' && layoutMode !== 'drawer' && (
                <>
                  <div className={`min-w-0 flex-none ${layoutMode === 'canvas-dominant' ? 'w-[30%]' : 'w-1/2'}`}>
                    {focusWindow}
                  </div>
                  <div className={`min-w-0 flex-none ${layoutMode === 'canvas-dominant' ? 'w-[70%]' : 'w-1/2'}`}>
                    {stageCanvas}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Asset Shelf Drawer */}
          {bottom && (
            <motion.div
              initial={false}
              animate={{ y: isShelfOpen ? 0 : 188 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="absolute left-0 right-0 bottom-0 h-[220px] bg-[#1E1E1E] border-t border-[#333333] shadow-[0_-8px_20px_rgba(0,0,0,0.35)]"
            >
              <div className="h-8 flex items-center justify-between px-4 border-b border-[#2A2A2A]">
                <span className="text-xs text-[#888888]">Asset Shelf</span>
                <button
                  onClick={() => setIsShelfOpen((prev) => !prev)}
                  className="text-[#888888] hover:text-[#E0E0E0]"
                  title={isShelfOpen ? 'Collapse' : 'Expand'}
                >
                  {isShelfOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button>
              </div>
              <div className="h-[calc(100%-32px)] overflow-auto">
                {bottom}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Right Inspector Panel */}
      {right && (
        <aside
          className={`bg-[#1E1E1E] border-l border-[#333333] overflow-hidden transition-all duration-200 ${
            isRightCollapsed ? 'w-8' : 'w-[320px]'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="h-8 flex items-center justify-between px-2 border-b border-[#2A2A2A]">
              <span className={`text-[11px] text-[#888888] ${isRightCollapsed ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                Inspector
              </span>
              <button
                onClick={() => setIsRightCollapsed((prev) => !prev)}
                className="text-[#888888] hover:text-[#E0E0E0]"
                title={isRightCollapsed ? 'Expand' : 'Collapse'}
              >
                {isRightCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
              </button>
            </div>
            <div className={`flex-1 overflow-auto ${isRightCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity`}>
              {right}
            </div>
          </div>
        </aside>
      )}

      {/* Health Modal */}
      <ProjectHealthModal isOpen={showHealthModal} onClose={() => setShowHealthModal(false)} />

      {/* Screensaver Mode */}
      <ScreensaverMode isOpen={showScreensaver} onClose={() => setShowScreensaver(false)} />
    </div>
  );
};
