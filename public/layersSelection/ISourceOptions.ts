export interface IOption {
  displayName: string;
  id: string;
}

export interface ISourceOption {
  source: IOption;
  canSelectAll: boolean;
  maxSelectedLayers?: number;
  layers: Array<IOption>;
}
