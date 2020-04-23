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

angular.module("app").component("selectionDialog", {
  templateUrl: "./selectionDialog.html",
  bindings: {},
  controller: class SelectionDialog {
    selectionService;
    converterService;
    dialog;

    sources: ISoucesListItems;
    searchText: string;

    constructor(layerSelectionService, objectConverterService, $mdDialog) {
      this.selectionService = layerSelectionService;
      this.converterService = objectConverterService;
      this.dialog = $mdDialog;
    }

    $onInit() {
      this.sources = this.initAllSources();
    }

    private closeDialog() {
      this.dialog.cancel();
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
      this.closeDialog();
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
        let source = this.sources[sourceId];
        if (source.maxSelectedLayers && selection) {
          this.selectFirstLayers(source);
        } else {
          this.onSource(source, selection);
        }
      }
    }

    private selectFirstLayers(source: ISouceListItems) {
      for (let i = 0; i < source.maxSelectedLayers; i++) {
        let layerId = Object.keys(source.layers)[i];
        if (!source.layers[layerId].isSelected) {
          this.onSingleLayerSelected(source, layerId);
        }
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

        if (source.maxSelectedLayers == source.numSelectedLayers) {
          this.disableLayers(source, true);
        }
      }
    }

    private onSingleLayerUnSelected(source: ISouceListItems, layerId: string) {
      source.layers[layerId].isSelected = false;
      if (source.numSelectedLayers > 0) source.numSelectedLayers--;

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
