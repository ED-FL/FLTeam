import { ISouceListItems } from "../interfaces/ISoucesListItems";
import * as angular from "angular";

angular.module("app").component("source", {
  templateUrl: "./source.html",
  bindings: {
    sourceId: "<",
    source: "=",
  },
  controller: class SourceCtrl {
    sourceId: string;
    source: ISouceListItems;

    constructor() {}
    $onInit() {}

    public toggleAll() {}

    private toggle(id, layer, event) {
      if (this.source.layers[id].isSelected) {
        this.unSelectedLayer(id);
      } else {
        this.selectedLayer(id);
      }
    }

    private selectedLayer(layerId) {
      this.source.layers[layerId].isSelected = true;
      this.source.numSelectedLayers++;

      if (
        this.source.maxSelectedLayers &&
        this.source.maxSelectedLayers == this.source.numSelectedLayers
      ) {
        this.disableLayers(true);
      }
    }

    private unSelectedLayer(layerId) {
      this.source.layers[layerId].isSelected = false;
      this.source.numSelectedLayers--;

      if (
        this.source.maxSelectedLayers &&
        this.source.maxSelectedLayers > this.source.numSelectedLayers
      ) {
        this.disableLayers(false);
      }
    }

    private disableLayers(disable: boolean) {
      for (let layer in this.source.layers) {
        let value = this.source.layers[layer];
        if (!value.isSelected) value.isDisabled = disable;
      }
    }
  },
});
