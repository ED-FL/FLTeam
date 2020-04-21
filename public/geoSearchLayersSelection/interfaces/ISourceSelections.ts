export interface ISourceSelection {
  isAllSelected: boolean;
  layersIds?: Array<string>;
}

export interface ISourcesSelectionsDict {
  [sourceId: string]: ISourceSelection;
}
