import { IListItem } from "../IListItem";
import * as angular from "angular";

angular.module("app").component("sourceLayers", {
  templateUrl: "./sourceLayers.html",
  bindings: {
    source: "=",
    layers: "=",
    canSelectAll: "<",
    maxSelectedLayers: "<",
  },
  controller: class SourceLayersCtrl {
    source: IListItem;
    layers: Array<IListItem>;
    canSelectAll: boolean;
    maxSelectedLayers: number;
    isAllSelected: boolean;

    constructor() {}
    $onInit() {
      this.isAllSelected = false;
    }

    public toggleAll() {
      this.isAllSelected =
        !this.isAllSelected && this.canSelectAll ? true : false;

      for (let layer of this.layers) {
        this.toggle(layer, this.isAllSelected);
      }
    }

    private toggle(layer, value?: boolean) {
      layer.isSelected = value ? value : !layer.isSelected;
    }
  },
});
