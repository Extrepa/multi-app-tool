// vibeLogic.ts - The math behind the magic
export const VibeEffects = {
  pulse: (intensity: number, speed: number) => ({
    scale: [1, 1 + intensity, 1],
    transition: { duration: 2 / speed, repeat: Infinity }
  }),
  glow: (color: string, radius: number) => ({
    filter: [`drop-shadow(0 0 0px ${color})`, `drop-shadow(0 0 ${radius}px ${color})`],
    transition: { duration: 1.5, yoyo: Infinity }
  }),
  float: (amplitude: number) => ({
    y: [0, -amplitude, 0],
    transition: { duration: 3, ease: "easeInOut", repeat: Infinity }
  })
};

// Types for Cursor to use in the Store
export interface VibeSettings {
  id: string;
  activeVibes: ('pulse' | 'glow' | 'float' | 'shake')[];
  params: {
    intensity: number;
    color: string;
    speed: number;
  };
}

