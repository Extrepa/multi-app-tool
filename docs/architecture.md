# Architecture Documentation

**Project:** multi-tool-app
**Type:** Web App
**Last Updated:** 2026-01-10

## Technical Architecture

### Technology Stack

- **React**
- **Paper.js**
- **Zustand**
### Project Type

Web App

## Architecture Overview

multi-tool-app is a unified creative suite combining SVG editing, FX/vibe logic, and scene composition in a dual-viewport interface.

### Core Architecture

**Technical Stack:**
- React - UI framework
- Paper.js - Vector graphics library
- Zustand - State management
- Framer Motion - Animations
- React Router DOM - Navigation
- Lucide React - Icons

### Dual-Viewport System

**Focus Window (Left):**
- Detailed editing view
- High-detail SVG editing
- Grid overlay and zoom controls
- Precision editing tools

**Stage Canvas (Right):**
- Scene composition view
- Drag and drop assets
- Layer management
- Transform objects
- Full scene overview

### Component Structure

**Editors (`src/components/Editors/`):**
- Focus Window component
- Stage Canvas component
- Viewport coordination

**Inspector (`src/components/Inspector/`):**
- Contextual sidebars
- SVG inspector
- FX inspector
- Scene inspector
- Export inspector

**Library (`src/components/Library/`):**
- Asset shelf
- Thumbnail management
- Library organization

**State (`src/state/`):**
- Zustand store for project state
- Centralized state management
- State persistence

**Engine (`src/engine/`):**
- Vibe logic system
- Export pipelines
- Processing utilities

## Key Design Decisions

### Dual-Viewport Design
- **Rationale**: Separate detailed editing from scene composition
- **Benefit**: Better workflow, less clutter
- **Implementation**: Two synchronized viewports

### Paper.js Integration
- **Rationale**: Professional vector editing capabilities
- **Benefit**: Advanced path manipulation
- **Usage**: Vector operations, path editing

### Zustand State Management
- **Rationale**: Lightweight, performant state
- **Benefit**: Simple API, good performance
- **Implementation**: Centralized project state

## Dependencies
- `react`, `react-dom` - UI framework
- `zustand` - State management
- `framer-motion` - Animations
- `react-router-dom` - Navigation
- `lucide-react` - Icons
- `paper` - Vector graphics

## Design Patterns

### Tool-Based Architecture
- Each tool is independent
- Shared state via Zustand
- Tool switching via keyboard shortcuts

### Export Pipeline
- Multiple export formats
- Flash bundle export
- React component export
- Static SVG export
- JSON export

## Performance Considerations

### Viewport Optimization
- Efficient rendering for dual viewports
- Optimized Paper.js operations
- State management for performance

### Asset Management
- Thumbnail generation
- Efficient asset loading
- Library organization

## Related Documentation

- [Feature Implementation Plan](FEATURE_IMPLEMENTATION_PLAN.md) - Missing features
- [System Documentation](01_SYSTEM_OVERVIEW_AND_UX.md) - System overview
- [Project Structure](project-structure.md) - File organization
