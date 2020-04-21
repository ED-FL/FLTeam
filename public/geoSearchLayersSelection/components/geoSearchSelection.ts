import { ISourcesOptionsDict } from "../interfaces/ISourceOptions";
import {
  ISourcesSelectionsDict,
  ISourceSelection,
} from "../interfaces/ISourceSelections";
import {
  ISoucesListItems,
  ILayersListItems,
  ISouceListItems,
} from "../interfaces/ISoucesListItems";
import * as angular from "angular";

angular.module("app").component("geoSearchSelection", {
  templateUrl: "./geoSearchSelection.html",
  bindings: {},
  controller: class GeoSearchSelectionCtrl {
    selectionService;
    converterService;

    sources: ISoucesListItems;
    searchText: string;

    constructor(layerSelectionService, objectConverterService) {
      this.selectionService = layerSelectionService;
      this.converterService = objectConverterService;
    }

    $onInit() {
      this.sources = this.initAllSources();
    }

    private initAllSources(): ISoucesListItems {
      let sources: ISourcesOptionsDict = this.selectionService.getAllSources();
      return this.converterService.convertOptionsToListItems(sources);
    }

    private onSave(): ISourcesSelectionsDict {
      let reasults: ISourcesSelectionsDict = {};
      for (let source in this.sources) {
        let value = this.sources[source];
        reasults[source] = this.saveSource(value);
      }
      return reasults;
    }

    private saveSource(source: ISouceListItems): ISourceSelection {
      let result: ISourceSelection;
      if (source.isSourceSelected && source.canSelectAll) {
        result.isAllSelected = true;
      } else {
        result.isAllSelected = false;
        result.layersIds = new Array<string>();
        for (let layerId in source.layers) {
          let value = source.layers[layerId];
          if (value.isSelected) {
            result.layersIds.push(layerId);
          }
        }
      }
      return result;
    }

    public onChangeAllSelections(selection: boolean) {
      for (let sourceId in this.sources) {
        this.changeSourceSelection(this.sources[sourceId], selection);
      }
    }

    private changeSourceSelection(
      sources: ISouceListItems,
      selection: boolean
    ) {
      sources.isSourceSelected = selection;
      if (selection && !sources.canSelectAll) {
        this.changeLayersSelection(
          selection,
          sources.layers,
          sources.maxSelectedLayers
        );
      } else {
        this.changeLayersSelection(selection, sources.layers);
      }
    }

    private changeLayersSelection(
      selection: boolean,
      layers: ILayersListItems,
      numElements?: number
    ) {
      if (numElements) {
        for (let i = 0; i < numElements; i++) {
          Object.values(layers)[i].isSelected = selection;
        }
      } else {
        for (let layer in layers) {
          let value = layers[layer];
          value.isSelected = selection;
        }
      }
    }
  },
});
