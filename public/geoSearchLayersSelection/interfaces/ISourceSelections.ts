export interface ISelection {
  isAllSelected: boolean;
  layersIds?: Array<string>;
}

export interface ISourcesSelections {
  [sourceId: string]: ISelection;
}
