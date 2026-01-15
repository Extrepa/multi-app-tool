# UI/UX Specification: Dual-Viewport Studio

## Screen Division
1. **Left Panel (The Modes):** Vertical icon bar (SVG Edit, FX Lab, Scene Maker, Export).
2. **Center-Left Window (Focus Workspace):** 
   - High-detail zoom view of the active SVG/Pin.
   - Grid toggles and vector point manipulation.
3. **Center-Right Window (Scene Canvas):** 
   - 16:9 aspect ratio "Stage."
   - Ability to drag, drop, and layer multiple assets.
4. **Right Panel (The Inspector):** 
   - **Mode: SVG:** Show Stroke, Fill, Paths.
   - **Mode: FX/Vibe:** Show Animation Sliders, Pulse, Glow settings.
   - **Mode: Scene:** Show Layer Tree (Z-index management).
5. **Bottom Tray (The Asset Shelf):** 
   - Visual thumbnails of all "Props" and "Components."

## Component Switching Logic
- Clicking an object in the **Scene Canvas** automatically loads it into the **Focus Workspace**.
- Switching "Modes" only changes the Tools (Sidebar) and the Inspector (Right Panel), not the Canvas positions.

## UI Styling (Vibe)
- Professional Dark Mode.
- Minimalist borders to maximize drawing space.
- Floating "Action" buttons for "Send to FX Lab" or "Add to Scene."

