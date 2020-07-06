export interface ILayerOption {
  displayName: string;
}

export interface ISourceOption {
  sourceName: string;
  canSelectAll: boolean;
  maxSelectedLayers?: number;
  layers: Dictionery<ILayerOption>;
}
