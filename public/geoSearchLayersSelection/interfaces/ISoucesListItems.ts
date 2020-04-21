export interface ILayerListItem {
  displayName: string;
  isSelected: boolean;
}

export interface ILayersListItems {
  [layerId: string]: ILayerListItem;
}

export interface ISouceListItems {
  sourceName: string;
  isSourceSelected: boolean;
  canSelectAll: boolean;
  maxSelectedLayers?: number;
  layers?: ILayersListItems;
}

export interface ISoucesListItems {
  [sourceId: string]: ISouceListItems;
}
