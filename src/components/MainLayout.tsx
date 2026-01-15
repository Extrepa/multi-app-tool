import React, { PropsWithChildren, useState } from 'react';
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

export const MainLayout: React.FC<MainLayoutProps> = ({ left, right, bottom, children }) => {
  const { mode, project } = useStore();
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [showScreensaver, setShowScreensaver] = useState(false);
  const [isShelfOpen, setIsShelfOpen] = useState(true);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  
  const healthScore = project ? calculateHealthScore(project).score : 100;
  
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
              title="Project Health"
            >
              <Activity size={12} />
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
            {right && (
              <button
                onClick={() => setIsRightCollapsed((prev) => !prev)}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-[#1A1A1A] border border-[#333333] text-[#888888] hover:text-[#E0E0E0] hover:border-[#555555]"
                title={isRightCollapsed ? 'Show Inspector' : 'Hide Inspector'}
              >
                {isRightCollapsed ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
                Inspector
              </button>
            )}
            {bottom && (
              <button
                onClick={() => setIsShelfOpen((prev) => !prev)}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-[#1A1A1A] border border-[#333333] text-[#888888] hover:text-[#E0E0E0] hover:border-[#555555]"
                title={isShelfOpen ? 'Collapse Asset Shelf' : 'Expand Asset Shelf'}
              >
                {isShelfOpen ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
                Assets
              </button>
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
              {children}
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
