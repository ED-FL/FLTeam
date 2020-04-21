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
      source: string,
      value: ISourceOption,
      listItemsSources: ISoucesListItems
    ) {
      listItemsSources[source] = {
        sourceName: value.sourceName,
        isSourceSelected: false,
        canSelectAll: value.canSelectAll,
        maxSelectedLayers: value.maxSelectedLayers,
        numSelectedLayers: 0,
        layers: this.convertLayersToListItems(value.layers),
      };
    }

    private convertLayersToListItems(layers: ILayerOption): ILayersListItems {
      let listItems: ILayersListItems = {};

      for (let layer in layers) {
        let value = layers[layer];

        listItems[layer] = {
          isSelected: false,
          isDisabled: false,
          displayName: value.displayName,
        };
      }
      return listItems;
    }
  }
);
