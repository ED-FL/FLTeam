import { ISourcesOptions } from "../interfaces/ISourceOptions";
import {
  ISourcesSelections,
  ISelection,
} from "../interfaces/ISourceSelections";
import {
  ISoucesListItems,
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
      let sources: ISourcesOptions = this.selectionService.getAllSources();
      return this.converterService.convertOptionsToListItems(sources);
    }

    private onSave() {
      let reasults: ISourcesSelections = {};
      for (let sourceId in this.sources) {
        let source = this.sources[sourceId];
        if (source.sourceData.isSelected && source.canSelectAll) {
          reasults[sourceId] = this.saveAllLayers();
        } else {
          reasults[sourceId] = this.saveSelectedLayers(source);
        }
      }
      this.selectionService.geoSeachLayesrSelected(reasults);
    }

    private saveAllLayers(): ISelection {
      return {
        isAllSelected: true,
      };
    }

    private saveSelectedLayers(source): ISelection {
      let layersIds = new Array<string>();
      for (let layerId in source.layers) {
        if (source.layers[layerId].isSelected) {
          layersIds.push(layerId);
        }
      }

      return {
        isAllSelected: false,
        layersIds: layersIds,
      };
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
