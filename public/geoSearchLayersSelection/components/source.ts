import {
  ISouceListItems,
  ILayersListItems,
} from "../interfaces/ISoucesListItems";
import * as angular from "angular";

const EXPAND_OPTIONS = {
  true: {
    icon: "expand_less",
    style: "layers",
  },
  false: {
    icon: "expand_more",
    style: "hide-layers",
  },
};

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

    isExpanded: boolean;
    expandIcon: string;
    expandClass: string;

    constructor() {}
    $onInit() {
      this.isExpanded = false;
      this.onExpand();
    }

    private toggleAll() {
      if (this.source.sourceData.isSelected) {
        this.selectAll({ source: this.source, selection: false });
      } else {
        this.selectAll({ source: this.source, selection: true });
      }
      if (!this.isExpanded) {
        this.onExpand();
      }
    }

    private toggle(layerId) {
      if (this.source.layers[layerId].isSelected) {
        this.unSelectLayer({ source: this.source, layerId: layerId });
      } else {
        this.selectLayer({ source: this.source, layerId: layerId });
      }
    }

    private onExpand() {
      this.isExpanded = !this.isExpanded;
      let currExpand = this.isExpanded.toString();
      this.expandIcon = EXPAND_OPTIONS[currExpand].icon;
      this.expandClass = EXPAND_OPTIONS[currExpand].style;
    }

    private getSuitableLayersByText(): ILayersListItems {
      if (!this.searchText) {
        return this.source.layers;
      } else {
        return Object.keys(this.source.layers).reduce((filtered, key) => {
          return this.getFilteredLayers(key, filtered);
        }, {});
      }
    }

    private getFilteredLayers(layerId, filtered) {
      if (this.source.layers[layerId].displayName.includes(this.searchText)) {
        filtered[layerId] = this.source.layers[layerId];
      }
      return filtered;
    }
  },
});
