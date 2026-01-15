import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
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
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('canvas-dominant');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileInspectorOpen, setIsMobileInspectorOpen] = useState(false);
  const shelfHeight = isMobile ? 180 : 220;
  const shelfPeek = 32;
  const shelfOffset = shelfHeight - shelfPeek;

  const healthScore = project ? calculateHealthScore(project).score : 100;
  const [focusWindow, stageCanvas] = useMemo(() => {
    const nodes = React.Children.toArray(children);
    return [nodes[0] ?? null, nodes[1] ?? null];
  }, [children]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 1024px)');
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <div className="relative flex flex-col md:flex-row h-screen w-screen bg-[#121212] text-[#E0E0E0] overflow-hidden">
      {/* Left Mode Selector */}
      {left && (
        <aside className="w-full md:w-16 bg-[#1E1E1E] border-b md:border-b-0 md:border-r border-[#333333] flex flex-row md:flex-col items-center md:items-stretch px-2 md:px-0 py-2 md:py-4">
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
                <option value="canvas-dominant">Canvas 75/25</option>
                <option value="split">Split 50/50</option>
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
            {isMobile && (
              <div className="flex items-center gap-2 text-xs text-[#888888]">
                <button
                  onClick={() => setLayoutMode('canvas-only')}
                  className={`px-2 py-1 rounded border ${
                    layoutMode === 'canvas-only'
                      ? 'bg-[#00FF9D]/20 text-[#00FF9D] border-[#00FF9D]/40'
                      : 'bg-[#1A1A1A] text-[#888888] border-[#333333]'
                  }`}
                  title="Stage Canvas"
                >
                  Stage
                </button>
                <button
                  onClick={() => {
                    setLayoutMode('drawer');
                    setIsDrawerOpen(true);
                  }}
                  className={`px-2 py-1 rounded border ${
                    layoutMode === 'drawer'
                      ? 'bg-[#00FF9D]/20 text-[#00FF9D] border-[#00FF9D]/40'
                      : 'bg-[#1A1A1A] text-[#888888] border-[#333333]'
                  }`}
                  title="Focus Window"
                >
                  Focus
                </button>
                {right && (
                  <button
                    onClick={() => setIsMobileInspectorOpen(true)}
                    className="px-2 py-1 rounded border bg-[#1A1A1A] text-[#888888] border-[#333333]"
                    title="Inspector"
                  >
                    Inspector
                  </button>
                )}
              </div>
            )}
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
                  <div className={`min-w-0 flex-none ${layoutMode === 'canvas-dominant' ? 'w-[25%]' : 'w-1/2'}`}>
                    {focusWindow}
                  </div>
                  <div className={`min-w-0 flex-none ${layoutMode === 'canvas-dominant' ? 'w-[75%]' : 'w-1/2'}`}>
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
              animate={{ y: isShelfOpen ? 0 : shelfOffset }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="absolute left-0 right-0 bottom-0 z-20 bg-[#1E1E1E] border-t border-[#333333] shadow-[0_-8px_20px_rgba(0,0,0,0.35)]"
              style={{ height: shelfHeight }}
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
        <>
          <div
            className={`hidden md:block fixed top-12 bottom-0 right-0 z-30 bg-[#1E1E1E] border-l border-[#333333] shadow-[-12px_0_24px_rgba(0,0,0,0.35)] transition-transform duration-200 ${
              isRightCollapsed ? 'translate-x-[calc(100%-18px)]' : 'translate-x-0'
            } w-[320px]`}
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
            <button
              onClick={() => setIsRightCollapsed((prev) => !prev)}
              className="absolute top-24 -left-4 w-4 h-20 bg-[#1E1E1E] border border-[#333333] rounded-l text-[#888888] hover:text-[#E0E0E0]"
              title={isRightCollapsed ? 'Open Inspector' : 'Close Inspector'}
            >
              {isRightCollapsed ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
            </button>
          </div>
          {isMobile && (
            <div className={`md:hidden fixed inset-0 z-40 ${isMobileInspectorOpen ? '' : 'pointer-events-none'}`}>
              <div
                className={`absolute inset-0 bg-black/40 transition-opacity ${isMobileInspectorOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsMobileInspectorOpen(false)}
              />
              <div
                className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-[#1E1E1E] border-l border-[#333333] shadow-[-12px_0_24px_rgba(0,0,0,0.4)] transition-transform ${
                  isMobileInspectorOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="h-10 flex items-center justify-between px-3 border-b border-[#2A2A2A]">
                  <span className="text-xs text-[#888888]">Inspector</span>
                  <button
                    onClick={() => setIsMobileInspectorOpen(false)}
                    className="text-[#888888] hover:text-[#E0E0E0]"
                  >
                    Close
                  </button>
                </div>
                <div className="h-[calc(100%-40px)] overflow-auto">
                  {right}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Health Modal */}
      <ProjectHealthModal isOpen={showHealthModal} onClose={() => setShowHealthModal(false)} />

      {/* Screensaver Mode */}
      <ScreensaverMode isOpen={showScreensaver} onClose={() => setShowScreensaver(false)} />
    </div>
  );
};
