import { ISouceListItems } from "../interfaces/ISoucesListItems";
import * as angular from "angular";

angular.module("app").component("source", {
  templateUrl: "./source.html",
  bindings: {
    source: "<",
    searchText: "<",
    selectAll: "&",
    selectLayer: "&",
    unSelectLayer: "&",
  },
  controller: class SourceCtrl {
    source: ISouceListItems;
    searchText: string;
    selectAll;
    selectLayer;
    unSelectLayer;

    constructor() {}
    $onInit() {}

    public toggleAll() {
      if (this.source.sourceData.isSelected) {
        this.selectAll({ source: this.source, selection: false });
      } else {
        this.selectAll({ source: this.source, selection: true });
      }
    }

    private toggle(layerId) {
      if (this.source.layers[layerId].isSelected) {
        this.unSelectLayer({ source: this.source, layerId: layerId });
      } else {
        this.selectLayer({ source: this.source, layerId: layerId });
      }
    }
  },
});
