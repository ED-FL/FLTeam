export interface ILayerOption {
  [layerId: string]: { displayName: string };
}

export interface ISourceOption {
  sourceName: string;
  canSelectAll: boolean;
  maxSelectedLayers?: number;
  layers: ILayerOption;
}

export interface ISourcesOptions {
  [sourceId: string]: ISourceOption;
}
