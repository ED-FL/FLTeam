export interface IListItem {
  displayName: string;
  isSelected: boolean;
  isDisabled: boolean;
}

export interface ILayersListItems {
  [layerId: string]: IListItem;
}

export interface ISouceListItems {
  sourceData: IListItem;
  numSelectedLayers: number;
  canSelectAll: boolean;
  maxSelectedLayers?: number;
  layers?: ILayersListItems;
}

export interface ISoucesListItems {
  [sourceId: string]: ISouceListItems;
}
