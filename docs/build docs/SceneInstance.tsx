import React from 'react';
import { useStudioStore } from '../store/useStudioStore';

export default function SceneInstance({ instance }) {
  // Get the raw asset data from the library using the reference
  const asset = useStudioStore((state) => 
    state.library.assets.find(a => a.id === instance.assetRef)
  );

  if (!asset) return null;

  return (
    <div 
      style={{
        position: 'absolute',
        left: instance.x,
        top: instance.y,
        transform: `scale(${instance.scale}) rotate(${instance.rotation}deg)`,
      }}
      className="hover:outline hover:outline-emerald-500 cursor-move"
    >
      {/* Render the SVG string directly */}
      <div dangerouslySetInnerHTML={{ __html: asset.data }} />
    </div>
  );
}