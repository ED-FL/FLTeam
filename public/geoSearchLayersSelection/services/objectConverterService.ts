import { ISourceOption, ILayerOption } from "../interfaces/ISourceOptions";
import { ISouceListItems, IListItem } from "../interfaces/ISoucesListItems";
import * as angular from "angular";

angular.module("app").service(
  "objectConverterService",
  class ObjectConverterService {
    constructor() {}

    public convertOptionsToListItems(
      sources: ISourceOption
    ): Dictionery<ISouceListItems> {
      let listItemsSources: Dictionery<ISouceListItems> = {};
      for (let source in sources) {
        let value = sources[source];
        this.convertSourceToListItem(source, value, listItemsSources);
      }

      return listItemsSources;
    }

    private convertSourceToListItem(
      sourceId: string,
      source: ISourceOption,
      listItemsSources: Dictionery<ISouceListItems>
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

    private convertLayersToListItems(
      layers: Dictionery<ILayerOption>
    ): Dictionery<IListItem> {
      let listItems: Dictionery<IListItem> = {};

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
