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

  const startHere = useMemo(() => {
    switch (mode.type) {
      case 'svg-edit':
        return [
          'Pick an asset in the shelf to load it here.',
          'Use Pen or Shape tools to build a base.',
          'Refine with Node Editor and Stroke/Fill controls.',
        ];
      case 'fx-lab':
        return [
          'Select an asset and create a component.',
          'Stack vibe effects and preview live.',
          'Use Timeline to sync motion.',
        ];
      case 'scene-maker':
        return [
          'Drag assets into the stage.',
          'Use the inspector to manage layers.',
          'Resize the viewport to frame your scene.',
        ];
      case 'export':
        return [
          'Pick an export target.',
          'Optimize if the project is heavy.',
          'Download the generated output.',
        ];
      default:
        return ['Choose a mode to begin.'];
    }
  }, [mode.type]);

  const aiNotes = useMemo(
    () => [
      'AI model selection is in the top bar.',
      'AI Trace Tool can convert raster into vector paths.',
      'No key is required unless you use AI tools.',
    ],
    []
  );

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
      <div className="border-t border-[#2A2A2A] p-3 bg-[#181818] space-y-3">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-[#666666] mb-2">Start Here</div>
          <ul className="space-y-1">
            {startHere.map((step) => (
              <li key={step} className="text-[11px] text-[#999999]">
                {step}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wide text-[#666666] mb-2">Tips</div>
          <ul className="space-y-1">
            {tips.map((tip) => (
              <li key={tip} className="text-[11px] text-[#999999]">
                {tip}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wide text-[#666666] mb-2">AI Notes</div>
          <ul className="space-y-1">
            {aiNotes.map((note) => (
              <li key={note} className="text-[11px] text-[#999999]">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
