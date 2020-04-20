export interface ISelection {
  id: string;
}

export interface ISourceSelections {
  source: ISelection;
  layers: Array<ISelection>;
}
