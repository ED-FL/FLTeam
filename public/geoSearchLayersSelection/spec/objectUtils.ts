import { ISouceListItems, IListItem } from "../interfaces/ISoucesListItems";

// ToDo: make static
export class ObjectUtils {
  //ToDo
  public source1Id = "";

  private getLayerContent(name): IListItem {
    return {
      displayName: name,
      isSelected: null,
      isDisabled: null,
    };
  }

  private getSourceContent(name): ISouceListItems {
    return {
      sourceData: {
        displayName: name,
        isSelected: null,
        isDisabled: null,
      },
      numSelectedLayers: null,
      canSelectAll: null,
      maxSelectedLayers: null,
      layers: null,
    };
  }

  public getLayer(): Dictionery<IListItem> {
    return {
      layer1: this.getLayerContent("layer 1"),
    };
  }

  public getLayers(): Dictionery<IListItem> {
    return {
      layer1: this.getLayerContent("layer 1"),
      layer2: this.getLayerContent("layer 2"),
      layer3: this.getLayerContent("layer 3"),
    };
  }

  public getSources(): Dictionery<ISouceListItems> {
    return {
      source1: this.getSourceContent("source 1"),
      source2: this.getSourceContent("source 2"),
      source3: this.getSourceContent("source 3"),
    };
  }

  public getSource(): Dictionery<ISouceListItems> {
    return {
      source1: this.getSourceContent("source 1"),
    };
  }
}
