export interface IOption {
  displayName: string;
  id: string;
}

export interface ISourceOptions {
  source: IOption;
  layers: Array<IOption>;
}
