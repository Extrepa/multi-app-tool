import React, { useMemo } from 'react';
import { useStore } from '../../state/useStore';
import { SVGInspector } from './SVGInspector';
import { FXInspector } from './FXInspector';
import { SceneInspector } from './SceneInspector';
import { ExportInspector } from './ExportInspector';
import { StateManager } from './StateManager';
import { PaletteManager } from './PaletteManager';
import { ExtensionManager } from '../Extensions/ExtensionManager';

export const ContextualPanel: React.FC = () => {
  const { mode } = useStore();
  const tips = useMemo(() => {
    switch (mode.type) {
      case 'svg-edit':
        return [
          'Use Pen Tool for new paths; Node Editor for fine control.',
          'Boolean ops require at least two paths.',
          'Grid + snap help keep edits aligned.',
        ];
      case 'fx-lab':
        return [
          'Create a component from an asset, then stack vibes.',
          'Toggle Vibe Preview to compare before/after.',
          'Use Timeline to sync effects to beats.',
        ];
      case 'scene-maker':
        return [
          'Drag assets from the shelf to place them.',
          'Shift-click to multi-select.',
          'Use the viewport size toggle to frame compositions.',
        ];
      case 'export':
        return [
          'Check Palette Manager before export.',
          'Run Optimizer for smaller bundles.',
          'Export formats live in the right panel.',
        ];
      default:
        return ['Pick a mode to see focused tools and tips.'];
    }
  }, [mode.type]);

  const panel = (() => {
    switch (mode.type) {
    case 'svg-edit':
      return (
        <div>
          <SVGInspector />
          <div className="border-t border-[#333333] mt-4">
            <StateManager />
          </div>
        </div>
      );
    case 'fx-lab':
      return <FXInspector />;
    case 'scene-maker':
      return <SceneInspector />;
    case 'export':
      return (
        <div>
          <ExportInspector />
          <PaletteManager />
          <ExtensionManager />
        </div>
      );
    default:
      return (
        <div className="p-4">
          <p className="text-xs text-[#888888]">Select a mode</p>
        </div>
      );
    }
  })();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0 overflow-auto">
        {panel}
      </div>
      <div className="border-t border-[#2A2A2A] p-3 bg-[#181818]">
        <div className="text-[11px] uppercase tracking-wide text-[#666666] mb-2">Tips</div>
        <ul className="space-y-1">
          {tips.map((tip) => (
            <li key={tip} className="text-[11px] text-[#999999]">
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
