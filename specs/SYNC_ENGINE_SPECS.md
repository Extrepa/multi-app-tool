# Sync Engine: Focus Window vs. Stage Canvas

## The "Master-Instance" Relationship
1. **Source of Truth:** All raw SVG/PNG data lives in `project.library.assets`.
2. **Instances:** The `project.scene` only contains `ref_id` and transform data (x, y, rotation).
3. **Live Update Loop:** 
   - When the **Focus Window** (SVG Editor) modifies an asset, it must trigger a state update to the library.
   - The **Stage Canvas** must use a memoized selector to watch the library. 
   - Any instance on the stage sharing that `ref_id` must re-render immediately.

## Performance Optimization
- **Ghosting:** While dragging a vertex in the Focus Window, the Stage Canvas should render a simplified "proxy" or low-res version to maintain 60fps.
- **Debouncing:** Scene-wide logic (like auto-saving the JSON) should happen 500ms after the user stops editing in the Focus Window.

