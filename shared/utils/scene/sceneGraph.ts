/**
 * Scene graph utilities
 * 
 * TODO: Implement scene graph utilities
 * Extract common patterns from figma-clone-engine, multi-tool-app, errl_scene_builder
 */

export interface SceneGraph<T> {
  nodes: Record<string, T>;
  rootIds: string[];
}

/**
 * Get a node from the scene graph
 * 
 * @param graph - Scene graph
 * @param id - Node ID
 * @returns Node or undefined
 */
export function getNode<T>(graph: SceneGraph<T>, id: string): T | undefined {
  return graph.nodes[id];
}

/**
 * Get children of a node
 * 
 * @param graph - Scene graph
 * @param parentId - Parent node ID
 * @returns Array of child nodes
 */
export function getChildren<T extends { parent?: string }>(
  graph: SceneGraph<T>,
  parentId: string
): T[] {
  return Object.values(graph.nodes).filter(node => node.parent === parentId);
}

/**
 * Add a node to the scene graph
 * 
 * @param graph - Scene graph
 * @param node - Node to add
 * @param parentId - Optional parent ID
 * @returns New scene graph
 */
export function addNode<T extends { id: string; parent?: string }>(
  graph: SceneGraph<T>,
  node: T,
  parentId?: string
): SceneGraph<T> {
  const newNode = parentId ? { ...node, parent: parentId } : node;
  return {
    nodes: { ...graph.nodes, [node.id]: newNode },
    rootIds: parentId ? graph.rootIds : [...graph.rootIds, node.id],
  };
}

/**
 * Remove a node from the scene graph
 * 
 * @param graph - Scene graph
 * @param id - Node ID to remove
 * @returns New scene graph
 */
export function removeNode<T>(graph: SceneGraph<T>, id: string): SceneGraph<T> {
  const { [id]: removed, ...nodes } = graph.nodes;
  const rootIds = graph.rootIds.filter(rootId => rootId !== id);
  return { nodes, rootIds };
}
