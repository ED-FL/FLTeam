import {
  ISourcesOptionsDict,
  ISourceOption,
  ILayerOption,
} from "../interfaces/ISourceOptions";
import { ISoucesListItems, IListItems } from "../interfaces/ISoucesListItems";
import { ISourcesSelectionsDict } from "../interfaces/ISourceSelections";
import * as angular from "angular";

angular.module("app").service(
  "layerItemConverterService",
  class LayerItemConverterService {
    constructor() {}

    public convertListItemsToReasult(): ISourcesSelectionsDict {
      return null;
    }

    public convertOptionsToListItems(
      sources: ISourcesOptionsDict
    ): ISoucesListItems {
      let listItemsSources: ISoucesListItems;
      for (let source in sources) {
        let value = sources[source];
        this.convertSourceToListItem(source, value, listItemsSources);
      }

      return listItemsSources;
    }

    private convertSourceToListItem(
      source: string,
      value: ISourceOption,
      listItemsSources: ISoucesListItems
    ) {
      listItemsSources[source].sourceName = value.sourceName;
      listItemsSources[source].isSourceSelected = false;
      listItemsSources[source].canSelectAll = value.canSelectAll;
      listItemsSources[source].maxSelectedLayers = value.maxSelectedLayers;
      listItemsSources[source].layers = this.convertLayersToListItems(
        value.layers
      );
    }

    private convertLayersToListItems(
      layers: Array<ILayerOption>
    ): Array<IListItems> {
      let listItems = new Array<IListItems>();
      for (let layer of layers) {
        listItems.push({
          isSelected: false,
          displayName: layer.displayName,
          id: layer.id,
        });
      }
      return listItems;
    }
  }
);
