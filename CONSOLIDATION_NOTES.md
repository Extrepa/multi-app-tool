# Multi-Tool App - Consolidation Notes

**Created:** 2027-01-07  
**Project:** `multi-tool-app`

---

## Overview

Multi-Tool App is an **intentional combination project** that unifies SVG editing, FX Lab, and Scene Maker. It explicitly combines functionality from multiple projects per its PRD.

---

## Consolidation Opportunities

### High Priority

1. **History Hook** ✅ **COMPLETED**
   - ~~Current: Zustand store with history~~ (migrated)
   - Migrated to: `shared/utils/historyManager.ts` (HistoryManager class for Zustand stores)
   - Pattern: Past/present/future in Zustand, maxHistory: 50
   - Migration Guide: [MIGRATION_GUIDE_HISTORY_HOOKS.md](../MIGRATION_GUIDE_HISTORY_HOOKS.md)

2. **Paper.js Utilities** ✅ **COMPLETED**
   - ~~Current: Custom Paper.js utilities~~ (migrated)
   - Migrated to: `shared/utils/paper/`
   - Operations: Boolean ops, path offset, path simplification
   - Migration Guide: [MIGRATION_GUIDE_PAPER_JS.md](../MIGRATION_GUIDE_PAPER_JS.md)
   - Status: Components updated to use shared utilities, old files removed

3. **Export Utilities**
   - Current: [`src/engine/exporters/`](src/engine/exporters/)
   - Migrate to: `shared/utils/export/`
   - Formats: Flash bundle, React components, SVG, PNG, JSON, ZIP
   - Migration Guide: [MIGRATION_GUIDE_EXPORT_UTILITIES.md](../MIGRATION_GUIDE_EXPORT_UTILITIES.md)

### Medium Priority

4. **Design System**
   - Current: Custom styling
   - Migrate to: `shared/design-system/`
   - Benefit: Consistent styling

5. **Scene Graph Utilities**
   - Current: Scene graph in Zustand store
   - Consider: `shared/utils/scene/`
   - Benefit: Shared scene graph patterns

---

## Relationship to Other Projects

### Combines Functionality From

- **`svg_editor`** - SVG editing mode
  - Decision: Keep both, share utilities
  - Extract: Shared SVG/Paper.js utilities

- **`errl_vibecheck`/`ErrlFXLab`** - FX Lab mode
  - Decision: Keep both, share FX utilities if beneficial

- **`errl_scene_builder`** - Scene Maker mode
  - Decision: Keep both, share scene graph utilities

---

## Migration Status

- [x] History hook migrated ✅ (2027-01-07)
- [x] Paper.js utilities migrated ✅ (2027-01-07)
- [x] Keyboard shortcuts migrated ✅ (2027-01-07 - basic operations use shared hook)
- [ ] Export utilities migrated
- [ ] Design system migrated
- [ ] Scene graph utilities migrated (if applicable)

---

## Notes

- This is an **intentional combination project**
- Should remain as unified suite
- Can benefit from shared utilities
- PRD documents combination: [`specs/PRD_SYSTEM_OVERVIEW.md`](specs/PRD_SYSTEM_OVERVIEW.md)

---

## References

- [PRD System Overview](specs/PRD_SYSTEM_OVERVIEW.md)
- [Project Similarity Analysis](../PROJECT_SIMILARITY_ANALYSIS.md)
- [Migration Guides](../MIGRATION_GUIDE_*.md)
