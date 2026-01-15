# Scene Maker: Interaction & Prop Logic

## Layering & Z-Index
1. **The Stack:** Use a standard array-based layering system. The last item in the `scene.layers.objects` array is rendered on top.
2. **Reordering:** The **Inspector Sidebar** must feature a "Layer List" where users can drag rows to change the Z-index of props on the Stage.

## Transformation Mechanics
- **Direct Manipulation:** Props on the Stage should have "Transform Handles" (corners for scaling, top handle for rotation).
- **Focus Sync:** When a user transforms a Prop on the Stage, the `x, y, scale, rotation` coordinates must update in the JSON State instantly.
- **Multi-Instance:** If the user drags the same "Neon Star" Prop onto the stage twice, they create two unique entries in the `scene_graph` that both point to the same `library_id`. 
    - *Constraint:* Changing the SVG path in the Focus Window updates BOTH stars. Changing the X/Y position in the Stage updates only the SELECTED star.

## Drag and Drop
- Users can drag assets from the **Bottom Asset Tray** directly onto the **Stage Canvas**.
- On drop, the system generates a new UUID for that specific instance on the stage.

