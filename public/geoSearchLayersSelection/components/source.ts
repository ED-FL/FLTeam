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

    private toggle(layer) {
      if (this.source.maxSelectedLayers) {
      } else {
        this.source.layers[layer];
      }
    }
  },
});
