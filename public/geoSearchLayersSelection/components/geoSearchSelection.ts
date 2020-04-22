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
        if (value.source.isSelected && value.canSelectAll) {
          reasults[source] = this.saveAllLayers();
        } else {
          reasults[source] = this.saveSelectedLayers(value);
        }
      }
      return reasults;
    }

    private saveAllLayers() {
      let result: ISourceSelection;
      result.isAllSelected = true;
      return result;
    }

    private saveSelectedLayers(source) {
      let result: ISourceSelection;
      result.isAllSelected = false;
      result.layersIds = new Array<string>();
      for (let layerId in source.layers) {
        let value = source.layers[layerId];
        if (value.isSelected) {
          result.layersIds.push(layerId);
        }
      }

      return result;
    }

    private onAllSources(selection: boolean) {
      for (let sourceId in this.sources) {
        this.onSource(this.sources[sourceId], selection);
      }
    }

    private onSource(source: ISouceListItems, selection: boolean) {
      if (source.canSelectAll || !selection) {
        source.sourceData.isSelected = selection;
        for (let layerId in source.layers) {
          if (selection) this.onSingleLayerSelected(source, layerId);
          else this.onSingleLayerUnSelected(source, layerId);
        }
      }
    }

    private onSingleLayerSelected(source: ISouceListItems, layerId: string) {
      if (
        !source.maxSelectedLayers ||
        source.maxSelectedLayers > source.numSelectedLayers
      ) {
        source.layers[layerId].isSelected = true;
        source.numSelectedLayers++;
      }
      if (source.maxSelectedLayers == source.numSelectedLayers) {
        this.disableLayers(source, true);
      }
    }

    private onSingleLayerUnSelected(source: ISouceListItems, layerId: string) {
      source.layers[layerId].isSelected = false;
      source.numSelectedLayers--;

      if (
        source.maxSelectedLayers &&
        source.maxSelectedLayers > source.numSelectedLayers
      ) {
        this.disableLayers(source, false);
      }
    }

    private disableLayers(source: ISouceListItems, disable: boolean) {
      for (let layerId in source.layers) {
        let layer = source.layers[layerId];
        if (!layer.isSelected) layer.isDisabled = disable;
      }
    }
  },
});
