export interface IListItem {
  displayName: string;
  isSelected: boolean;
  isDisabled: boolean;
}

export interface ISouceListItems {
  sourceData: IListItem;
  numSelectedLayers: number;
  canSelectAll: boolean;
  maxSelectedLayers?: number;
  layers?: Dictionery<IListItem>;
}
