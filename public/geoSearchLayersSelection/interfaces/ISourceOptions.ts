export interface ILayerOption {
  displayName: string;
  id: string;
}

export interface ISourceOption {
  sourceName: string;
  canSelectAll: boolean;
  maxSelectedLayers?: number;
  layers: Array<ILayerOption>;
}

export interface ISourcesOptionsDict {
  [sourceId: string]: ISourceOption;
}
