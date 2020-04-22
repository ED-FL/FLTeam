import { ISouceListItems } from "../interfaces/ISoucesListItems";
import * as angular from "angular";

angular.module("app").component("source", {
  templateUrl: "./source.html",
  bindings: {
    source: "<",
    selectAll: "&",
    selectLayer: "&",
    unSelectLayer: "&",
  },
  controller: class SourceCtrl {
    source: ISouceListItems;
    selectAll;
    selectLayer;
    unSelectLayer;

    constructor() {}
    $onInit() {}

    public toggleAll() {
      if (this.source.sourceData.isSelected) {
        this.selectAll(this.source, false);
      } else {
        this.selectAll(this.source, true);
      }
    }

    private toggle(layerId) {
      if (this.source.layers[layerId].isSelected) {
        this.unSelectLayer(this.source, layerId);
      } else {
        this.selectLayer(this.source, layerId);
      }
    }
  },
});
