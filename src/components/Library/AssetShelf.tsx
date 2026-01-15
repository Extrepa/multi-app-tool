import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '../../state/useStore';
import { createComponentFromAsset } from '../../utils/helpers';
import { AssetSearch } from './AssetSearch';
import type { Asset } from '../../state/types';
import { createErrlPrefab } from '../../utils/errlPrefab';
import { createErrlAssets } from '../../utils/errlAssets';
import { getErrlExportSnippet } from '../../utils/errlExport';

export const AssetShelf: React.FC = () => {
  const { project, setSelection, addSceneObject, mode, addComponent, selection, insertPrefab, addAsset, updateAsset, updateComponent } = useStore();
  const [draggedAsset, setDraggedAsset] = useState<string | null>(null);
  const isFXLabMode = mode.type === 'fx-lab';
  const [activeTab, setActiveTab] = useState<'assets' | 'components' | 'prefabs' | 'actions'>(
    isFXLabMode ? 'components' : 'assets'
  );

  if (!project) {
    return (
      <div className="p-4">
        <p className="text-xs text-[#888888]">No project loaded</p>
      </div>
    );
  }

  const handleAssetClick = (assetId: string) => {
    if (mode.type === 'fx-lab') {
      // In FX Lab mode, create a component from the asset and select it
      const asset = project?.library.assets.find(a => a.id === assetId);
      if (asset) {
        const newComponent = createComponentFromAsset(asset);
        addComponent(newComponent);
        setSelection({ componentId: newComponent.id });
      }
    } else {
      // In other modes, just select the asset
      setSelection({ assetId });
    }
  };

  const handleComponentClick = (componentId: string) => {
    setSelection({ componentId });
  };

  const handleDragStart = (e: React.DragEvent, assetId: string) => {
    setDraggedAsset(assetId);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', assetId);
  };

  const handleDragEnd = () => {
    setDraggedAsset(null);
  };

  const tabs = useMemo(() => {
    const base: Array<{ id: 'assets' | 'components' | 'prefabs' | 'actions'; label: string; hidden?: boolean }> = [
      { id: 'assets', label: 'Assets' },
      { id: 'components', label: 'Components', hidden: !isFXLabMode },
      { id: 'prefabs', label: 'Prefabs' },
      { id: 'actions', label: 'Actions' },
    ];
    return base.filter((tab) => !tab.hidden);
  }, [isFXLabMode]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 px-4 py-2 border-b border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-1 text-[11px] rounded border ${
                activeTab === tab.id
                  ? 'bg-[#00FF9D]/15 text-[#00FF9D] border-[#00FF9D]/40'
                  : 'bg-[#121212] text-[#888888] border-[#333333] hover:text-[#E0E0E0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="ml-auto w-52">
          <AssetSearch compact />
        </div>
      </div>

      <div className="flex-1 px-4 py-3 overflow-hidden">
        {activeTab === 'components' && (
          <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2">
            {project.library.components.length === 0 && (
              <div className="text-xs text-[#888888]">No components yet.</div>
            )}
            {project.library.components.map((component) => {
              const baseAsset = project.library.assets.find(a => a.id === component.base_asset);
              const isSelected = selection.componentId === component.id;
              return (
                <div
                  key={component.id}
                  onClick={() => handleComponentClick(component.id)}
                  className={`min-w-[120px] cursor-pointer p-2 bg-[#121212] rounded border transition-colors ${
                    isSelected
                      ? 'border-[#00FF9D] bg-[#2D2D2D]'
                      : 'border-[#333333] hover:border-[#00FF9D]'
                  }`}
                >
                  <div className="h-16 bg-[#1E1E1E] rounded mb-2 flex items-center justify-center overflow-hidden">
                    {baseAsset ? (
                      <div
                        className="w-full h-full"
                        style={{ transform: 'scale(0.8)' }}
                        dangerouslySetInnerHTML={{ __html: baseAsset.data }}
                      />
                    ) : (
                      <div className="text-xs text-[#666666]">No asset</div>
                    )}
                  </div>
                  <div className="text-xs text-[#E0E0E0] truncate">{component.name}</div>
                  <div className="text-[10px] text-[#888888]">COMPONENT</div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'prefabs' && (
          <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2">
            {(!project.library.prefabs || project.library.prefabs.length === 0) && (
              <div className="text-xs text-[#888888]">No prefabs yet.</div>
            )}
            {project.library.prefabs?.map((prefab) => (
              <div
                key={prefab.id}
                className="min-w-[120px] cursor-pointer p-2 bg-[#121212] rounded border border-[#333333] hover:border-[#00FF9D]"
                title={prefab.name}
              >
                <div className="h-16 bg-[#1E1E1E] rounded mb-2 flex items-center justify-center">
                  <div className="text-xs text-[#666666]">PREFAB</div>
                </div>
                <div className="text-xs text-[#E0E0E0] truncate">{prefab.name}</div>
                <div className="text-[10px] text-[#888888]">{prefab.sceneGraph.objects.length} objects</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => insertPrefab(createErrlPrefab())}
              className="px-3 py-2 text-xs bg-[#00FF9D] text-[#121212] rounded hover:bg-[#00E08C]"
            >
              Add Errl Rig
            </button>
            <button
              onClick={() => {
                const { assets, components } = createErrlAssets();
                const existingAssets = new Set(project.library.assets.map((a) => a.id));
                const existingComponents = new Set(project.library.components.map((c) => c.id));
                assets.forEach((asset) => {
                  if (!existingAssets.has(asset.id)) addAsset(asset);
                });
                components.forEach((comp) => {
                  if (!existingComponents.has(comp.id)) addComponent(comp);
                });
              }}
              className="px-3 py-2 text-xs bg-[#121212] text-[#E0E0E0] rounded border border-[#333] hover:bg-[#1e1e1e]"
            >
              Seed Assets
            </button>
            <button
              onClick={() => {
                const { assets, components } = createErrlAssets();
                const existingAssets = new Set(project.library.assets.map((a) => a.id));
                const existingComponents = new Set(project.library.components.map((c) => c.id));
                assets.forEach((asset) => {
                  if (!existingAssets.has(asset.id)) addAsset(asset);
                });
                components.forEach((comp) => {
                  if (!existingComponents.has(comp.id)) addComponent(comp);
                });
                insertPrefab(createErrlPrefab());
              }}
              className="px-3 py-2 text-xs bg-[#121212] text-[#E0E0E0] rounded border border-[#333] hover:bg-[#1e1e1e]"
            >
              Seed + Prefab
            </button>
            <button
              onClick={() => {
                const snippet = getErrlExportSnippet();
                if (navigator?.clipboard?.writeText) {
                  navigator.clipboard.writeText(snippet);
                  alert('Errl export snippet copied to clipboard.');
                } else {
                  console.log(snippet);
                }
              }}
              className="px-3 py-2 text-xs bg-[#121212] text-[#E0E0E0] rounded border border-[#333] hover:bg-[#1e1e1e]"
            >
              Copy Export Snippet
            </button>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2">
            {project.library.assets.map((asset) => (
              <div
                key={asset.id}
                draggable
                onDragStart={(e) => handleDragStart(e, asset.id)}
                onDragEnd={handleDragEnd}
                onClick={() => handleAssetClick(asset.id)}
                className={`min-w-[120px] cursor-pointer p-2 bg-[#121212] rounded border transition-colors ${
                  draggedAsset === asset.id
                    ? 'border-[#00FF9D] opacity-50'
                    : selection.assetId === asset.id && !isFXLabMode
                    ? 'border-[#00FF9D] bg-[#2D2D2D]'
                    : 'border-[#333333] hover:border-[#00FF9D]'
                }`}
              >
                <div className="h-16 bg-[#1E1E1E] rounded mb-2 flex items-center justify-center overflow-hidden">
                  <div
                    className="w-full h-full"
                    style={{
                      transform: 'scale(0.8)',
                    }}
                    dangerouslySetInnerHTML={{ __html: asset.data }}
                  />
                </div>
                <div className="text-xs text-[#E0E0E0] truncate">{asset.name}</div>
                <div className="text-[10px] text-[#888888]">{asset.type.toUpperCase()}</div>
              </div>
            ))}
            {project.library.assets.length === 0 && (
              <div className="text-xs text-[#888888]">No assets in library.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
