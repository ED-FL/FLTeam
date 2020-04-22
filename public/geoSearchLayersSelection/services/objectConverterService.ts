import {
  ISourcesOptionsDict,
  ISourceOption,
  ILayerOption,
} from "../interfaces/ISourceOptions";
import {
  ISoucesListItems,
  ILayersListItems,
} from "../interfaces/ISoucesListItems";
import * as angular from "angular";

angular.module("app").service(
  "objectConverterService",
  class ObjectConverterService {
    constructor() {}

    public convertOptionsToListItems(
      sources: ISourcesOptionsDict
    ): ISoucesListItems {
      let listItemsSources: ISoucesListItems = {};
      for (let source in sources) {
        let value = sources[source];
        this.convertSourceToListItem(source, value, listItemsSources);
      }

      return listItemsSources;
    }

    private convertSourceToListItem(
      sourceId: string,
      source: ISourceOption,
      listItemsSources: ISoucesListItems
    ) {
      listItemsSources[sourceId] = {
        sourceData: {
          displayName: source.sourceName,
          isSelected: false,
          isDisabled: !source.canSelectAll,
        },
        canSelectAll: source.canSelectAll,
        maxSelectedLayers: source.maxSelectedLayers,
        numSelectedLayers: 0,
        layers: this.convertLayersToListItems(source.layers),
      };
    }

    private convertLayersToListItems(layers: ILayerOption): ILayersListItems {
      let listItems: ILayersListItems = {};

      for (let layer in layers) {
        let value = layers[layer];

        listItems[layer] = {
          displayName: value.displayName,
          isSelected: false,
          isDisabled: false,
        };
      }
      return listItems;
    }
  }
);
