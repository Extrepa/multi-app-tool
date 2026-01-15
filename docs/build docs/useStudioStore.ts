import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface StudioState {
  // The Library (Atoms & Molecules)
  library: {
    assets: any[]; // Raw SVGs/PNGs
    components: any[]; // Assets + Vibes
  };
  // The Scene (The Universe)
  scene: {
    instances: any[]; // References to assets on stage
    selection: string | null; // ID of currently clicked item
  };
  // Actions
  addAsset: (asset: any) => void;
  instantiateAsset: (assetId: string, x: number, y: number) => void;
  updateAssetData: (assetId: string, newData: string) => void;
  selectInstance: (instanceId: string | null) => void;
}

export const useStudioStore = create<StudioState>((set) => ({
  library: { assets: [], components: [] },
  scene: { instances: [], selection: null },

  addAsset: (asset) => set((state) => ({
    library: { ...state.library, assets: [...state.library.assets, asset] }
  })),

  instantiateAsset: (assetId, x, y) => set((state) => ({
    scene: {
      ...state.scene,
      instances: [...state.scene.instances, {
        id: uuidv4(),
        assetRef: assetId,
        x, y, scale: 1, rotation: 0
      }]
    }
  })),

  updateAssetData: (assetId, newData) => set((state) => ({
    library: {
      ...state.library,
      assets: state.library.assets.map(a => a.id === assetId ? { ...a, data: newData } : a)
    }
  })),

  selectInstance: (id) => set((state) => ({
    scene: { ...state.scene, selection: id }
  }))
}));