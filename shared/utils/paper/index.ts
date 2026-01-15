export { 
  unionPaths, 
  subtractPaths, 
  intersectPaths, 
  excludePaths,
  performBooleanOperation,
  performBooleanOperationMultiple,
  loadPaperJS,
  type BooleanOperation
} from './booleanOps';
export { offsetPath, expandStrokeToFill } from './pathOffset';
export { simplifyPath, simplifyPathData, simplifySvgPaths } from './pathSimplifier';
export { pathToSVG, svgToPath } from './pathOperations';
