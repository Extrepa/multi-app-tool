# Professional Vector Editing Implementation Plan
## Based on Multi-tool-Gemini-17 through Gemini-20

**Goal:** Transform the SVG Editor into a professional-grade vector editing suite with surgical precision tools.

---

## Phase 1: Surgical Vector Editing Tools

### 1.1 Node Editor (Path Point Manipulation)
**Priority:** Critical  
**Location:** `src/components/Editors/NodeEditor.tsx`

**Features:**
- Parse SVG path data into commands (M, L, C, Q, Z, etc.)
- Display draggable handles at each path point
- Drag handles to move points
- Toggle between Sharp (corner) and Smooth (curve) nodes
- Snap to Grid (configurable)
- Snap to Point (magnetic)
- Close Path button
- Visual feedback (handles, control points)

**Implementation:**
```typescript
// Path parsing utilities
interface PathCommand {
  type: 'M' | 'L' | 'C' | 'Q' | 'Z' | 'A';
  points: Array<{ x: number; y: number; type?: 'anchor' | 'control' }>;
}

// Node handle rendering
// Draggable interaction
// Path data rebuilding
```

**Integration:**
- Add "Node Editor" button to `SVGToolbar.tsx`
- Activate when tool selected in SVG Edit mode
- Overlay handles on SVG in `FocusWindow.tsx`

---

### 1.2 Pen Tool (Bezier Curve Creation)
**Priority:** Critical  
**Location:** `src/components/Tools/PenTool.tsx`

**Features:**
- Click to place corner point
- Click-and-drag to create curve with control handles
- Add anchor points to existing paths
- Remove anchor points
- Convert corner to curve and vice versa
- Visual preview of path being drawn

**Implementation:**
```typescript
// Interactive path creation
// Bezier curve math
// Control handle manipulation
// Path command generation (M, L, C, Q)
```

**Integration:**
- Add "Pen Tool" button to `SVGToolbar.tsx`
- Activate drawing mode in `FocusWindow.tsx`
- Handle mouse events for path creation

---

### 1.3 Boolean Operations
**Priority:** High  
**Location:** `src/utils/booleanOperations.ts`

**Features:**
- **Union:** Merge shapes into one
- **Subtract:** Cut out shape (cookie cutter)
- **Intersect:** Keep only overlapping areas
- **Exclude:** Keep non-overlapping areas
- Visual preview before applying
- Support for multiple selected paths

**Implementation:**
- Use **Paper.js** library for production-quality operations
- Convert SVG paths to Paper.js Path objects
- Apply boolean operation
- Convert result back to SVG path data
- Fallback to basic implementation if Paper.js unavailable

**Integration:**
- Add "Boolean Ops" button to `SVGToolbar.tsx`
- Show operation menu (Union, Subtract, Intersect, Exclude)
- Apply to selected paths in `SVGEditor.tsx`

---

### 1.4 Stroke & Border Lab
**Priority:** Medium  
**Location:** `src/components/Inspector/StrokeLab.tsx`

**Features:**
- **Dash Arrays:** Custom dash patterns (e.g., "5,3,2,3")
- **Stroke Cap:** Round, Square, Butt
- **Stroke Join:** Miter, Round, Bevel
- **Miter Limit:** Control for sharp corners
- **Stroke Width:** Slider with live preview
- Visual preview of stroke style

**Integration:**
- Add to `SVGInspector.tsx` as new section
- Update selected path's stroke attributes
- Live preview in `SVGEditor.tsx`

---

## Phase 2: Professional UI Layout

### 2.1 Tool Dock (Left Vertical Strip)
**Priority:** High  
**Location:** `src/components/Toolbars/ToolDock.tsx`

**Layout:**
```
┌─────────┐
│   V     │  Selection Tools
│   P     │
├─────────┤
│   P     │  Creation Group
│   R     │  (Pen, Rect, Circle, Star, Polygon)
│   C     │
│   S     │
├─────────┤
│   N     │  Modification Group
│   B     │  (Node, Bucket Fill, Stroke Stylist)
│   S     │
├─────────┤
│   T     │  Text & Shapes
│   L     │
└─────────┘
```

**Features:**
- Grouped tools with visual separators
- Keyboard shortcuts (V, P, R, C, etc.)
- Active tool highlighting
- Tooltips on hover
- Icon-based interface

**Integration:**
- Replace/enhance `ModeSelector.tsx`
- Position on far left of `MainLayout.tsx`
- Coordinate with `SVGToolbar.tsx` (contextual tools)

---

### 2.2 Enhanced Layer Tree
**Priority:** Medium  
**Location:** `src/components/Inspector/EnhancedLayerTree.tsx`

**Features:**
- **Groups & Folders:** Collapsible nested structure
- **Visibility Toggle:** Eye icon to hide/show
- **Lock Toggle:** Padlock to prevent edits
- **Type Indicators:** Visual cues (SVG Path, Component, etc.)
- **Drag-and-Drop:** Reorder layers
- **Context Menu:** Right-click for actions

**Integration:**
- Enhance `SceneInspector.tsx`
- Add to left inner panel (next to Tool Dock)
- Coordinate with `MainLayout.tsx` layout

---

## Phase 3: Animation & Vibe Enhancements

### 3.1 Vibe Keyframer (Timeline)
**Priority:** Medium  
**Location:** `src/components/Inspector/VibeKeyframer.tsx`

**Features:**
- Lightweight timeline UI
- Set Start and End states for properties
- Keyframe markers
- Property tracks (scale, rotation, opacity, color)
- Playhead scrubbing
- Loop toggle
- Duration control

**Integration:**
- Add to `FXInspector.tsx` as new section
- Connect to `vibeLogic.ts` for animation generation
- Export keyframe data in component export

---

### 3.2 Filter Stack
**Priority:** Low  
**Location:** `src/components/Inspector/FilterStack.tsx`

**Features:**
- **Gaussian Blur:** Radius slider
- **Drop Shadow:** Offset, blur, color
- **Inner Glow:** Radius, color, intensity
- **Prismatic Shift:** Chromatic aberration effect
- Stack multiple filters
- Enable/disable individual filters
- Live preview

**Integration:**
- Add to `FXInspector.tsx`
- Apply as SVG filters (`<filter>` elements)
- Export in component export

---

## Phase 4: Workflow Enhancements

### 4.1 Blueprint Inheritance System
**Priority:** Low  
**Location:** `src/state/blueprintSystem.ts`

**Features:**
- Create "Master Blueprint" components
- Components can inherit from blueprints
- Changes to blueprint update all inheriting components
- Override specific properties
- Visual indicator of inheritance

**Integration:**
- Add to `Component` interface in `types.ts`
- Add blueprint actions to `useStore.ts`
- UI in `FXInspector.tsx` or new `BlueprintManager.tsx`

---

### 4.2 Developer Console & Debugger
**Priority:** Low  
**Location:** `src/components/Diagnostics/DeveloperConsole.tsx`

**Features:**
- **JSON Inspector:** Raw code of selected item
- **Vibe Monitor:** Live graph of animation values
- **Draw Call Counter:** Warning for too many SVGs
- **Debug Mode Toggle:** Hotkey `~`
- **Bounding Boxes:** Visual when debug active
- **Anchor Points:** Visual indicators

**Integration:**
- Add debug mode to `useStore.ts`
- Toggle in `MainLayout.tsx` toolbar
- Overlay in `StageCanvas.tsx` and `SVGEditor.tsx`

---

## Implementation Order

### Sprint 1: Core Vector Tools
1. Node Editor (1.1)
2. Pen Tool (1.2)
3. Boolean Operations (1.3)

### Sprint 2: UI & Polish
1. Tool Dock (2.1)
2. Enhanced Layer Tree (2.2)
3. Stroke Lab (1.4)

### Sprint 3: Animation & Effects
1. Vibe Keyframer (3.1)
2. Filter Stack (3.2)

### Sprint 4: Advanced Features
1. Blueprint System (4.1)
2. Developer Console (4.2)

---

## Technical Dependencies

### Libraries to Add
```json
{
  "paper": "^0.12.18",  // Boolean operations
  "bezier-js": "^4.0.0"  // Bezier curve math (optional)
}
```

### New Utility Files
- `src/utils/pathParser.ts` - SVG path parsing
- `src/utils/pathBuilder.ts` - SVG path building
- `src/utils/bezierMath.ts` - Bezier curve calculations
- `src/utils/booleanOperations.ts` - Boolean ops (with Paper.js)

---

## Success Criteria

✅ **Node Editor:** Users can drag individual path points to reshape SVGs  
✅ **Pen Tool:** Users can draw Bezier curves interactively  
✅ **Boolean Ops:** Users can combine shapes with Union/Subtract/Intersect  
✅ **Tool Dock:** Professional grouped tool interface on left  
✅ **Keyframer:** Timeline-based animation editing  

---

## Notes

- Reference implementations exist in `svg_editor` project
- Paper.js integration pattern documented in `svg_editor/docs/PAPERJS_INTEGRATION.md`
- Build docs provide example component structures
- Focus on **surgical precision** - every tool should feel professional

