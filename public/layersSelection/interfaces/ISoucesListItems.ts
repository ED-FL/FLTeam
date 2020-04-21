import { ILayerOption } from "./ISourceOptions";

export interface IListItems extends ILayerOption {
  isSelected: boolean;
}

export interface ISouceListItems {
  sourceName: string;
  isSourceSelected: boolean;
  canSelectAll: boolean;
  maxSelectedLayers?: number;
  layers?: Array<IListItems>;
}

export interface ISoucesListItems {
  [sourceId: string]: ISouceListItems;
}
