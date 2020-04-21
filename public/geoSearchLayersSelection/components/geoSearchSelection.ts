import { ISourcesOptionsDict } from "../interfaces/ISourceOptions";
import { ISourcesSelectionsDict } from "../interfaces/ISourceSelections";
import { ISoucesListItems, IListItems } from "../interfaces/ISoucesListItems";
import * as angular from "angular";

angular.module("app").component("layersSelection", {
  templateUrl: "./geoSearchSelection.html",
  bindings: {},
  controller: class LayersSelectionCtrl {
    selectionService;
    converterService;

    sources: ISoucesListItems;
    searchText: string;

    constructor(layerSelectionService, layerItemConverterService) {
      this.selectionService = layerSelectionService;
      this.converterService = layerItemConverterService;
    }

    $onInit() {
      this.sources = this.initAllSources();
    }

    private initAllSources(): ISoucesListItems {
      let sources: ISourcesOptionsDict = this.selectionService.getAllLayers();
      return this.converterService.convertOptionsToListItems(sources);
    }

    private onSave(): ISourcesSelectionsDict {
      return this.converterService.convertListItemsToReasult(this.sources);
    }

    private onChangeAllSelections(selection: boolean) {
      for (let sourceId in this.sources) {
        let value = this.sources[sourceId];
        value.isSourceSelected = selection;
        if (selection && !value.canSelectAll) {
          this.changeLayersSelection(
            selection,
            value.layers,
            value.maxSelectedLayers
          );
        } else {
          this.changeLayersSelection(selection, value.layers);
        }
      }
    }

    private changeLayersSelection(
      selection: boolean,
      layers: Array<IListItems>,
      numElements?: number
    ) {
      if (numElements) {
        for (let i = 0; i < numElements; i++) {
          layers[i].isSelected = selection;
        }
      } else {
        for (let layer of layers) {
          layer.isSelected = selection;
        }
      }
    }
  },
});
