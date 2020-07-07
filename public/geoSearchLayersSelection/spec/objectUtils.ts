import { ISouceListItems, IListItem } from "../interfaces/ISoucesListItems";
import { ISourceOption } from "../interfaces/ISourceOptions";
import { ISelection } from "../interfaces/ISourceSelections";

// ToDo: make static
export class ObjectUtils {
  //ToDo: change in all useges
  public source1 = "source1";
  public source2 = "source2";
  public source3 = "source3";
  public layer1 = "layer1";
  public layer2 = "layer2";
  public layer3 = "layer3";

  private getLayerListItemContent(name): IListItem {
    return {
      displayName: name,
      isSelected: null,
      isDisabled: null,
    };
  }

  private getSourceListItemContent(name): ISouceListItems {
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

  private getSourceOptionContent(name): ISourceOption {
    return {
      sourceName: name,
      canSelectAll: null,
      maxSelectedLayers: null,
      layers: {
        layer1: { displayName: this.layer1 },
        layer2: { displayName: this.layer2 },
        layer3: { displayName: this.layer3 },
      },
    };
  }

  private getSelectionContent(): ISelection {
    return { isAllSelected: null, layersIds: null };
  }

  public getSourceOption(): Dictionery<ISourceOption> {
    return {
      source1: this.getSourceOptionContent(this.source1),
    };
  }

  public getSelection(): Dictionery<ISelection> {
    return {
      source1: this.getSelectionContent(),
    };
  }

  public getLayer(): Dictionery<IListItem> {
    return {
      layer1: this.getLayerListItemContent(this.layer1),
    };
  }

  public getLayers(): Dictionery<IListItem> {
    return {
      layer1: this.getLayerListItemContent(this.layer1),
      layer2: this.getLayerListItemContent(this.layer2),
      layer3: this.getLayerListItemContent(this.layer3),
    };
  }

  public getSources(): Dictionery<ISouceListItems> {
    return {
      source1: this.getSourceListItemContent(this.source1),
      source2: this.getSourceListItemContent(this.source2),
      source3: this.getSourceListItemContent(this.source3),
    };
  }

  public getSource(): Dictionery<ISouceListItems> {
    return {
      source1: this.getSourceListItemContent(this.source1),
    };
  }
}
