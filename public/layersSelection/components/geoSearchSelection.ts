import { ISourcesOptionsDict } from "../interfaces/ISourceOptions";
import { ISourcesSelectionsDict } from "../interfaces/ISourceSelections";
import { ISoucesListItems } from "../interfaces/ISoucesListItems";
import * as angular from "angular";

angular.module("app").component("layersSelection", {
  templateUrl: "./geoSearchSelection.html",
  bindings: {},
  controller: class LayersSelectionCtrl {
    sources: ISoucesListItems;
    searchText: string;

    selectionService;
    converterService;

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

    private onReset() {}
  },
});
