import { ISourceOptions } from "../ISourceOptions";
import * as angular from "angular";

angular.module("app").component("layersSelection", {
  templateUrl: "./layersSelection.html",
  bindings: {},
  controller: class LayersSelectionCtrl {
    sources: Array<ISourceOptions>;
    searchText: string;

    constructor() {
      this.getAllLayers();
    }

    private getAllLayers() {
      this.sources = [
        {
          source: {
            displayName: "הענק הירוק",
            id: "1",
          },
          layers: [
            {
              displayName: "שכבה 1 בענק",
              id: "11",
            },
            {
              displayName: "שכבה 2 בענק",
              id: "12",
            },
          ],
        },
        {
          source: {
            displayName: "אלסטיק",
            id: "2",
          },
          layers: [
            {
              displayName: "שכבה 1 באלסטיק",
              id: "21",
            },
            {
              displayName: "שכבה 2 באלסטיק",
              id: "22",
            },
          ],
        },
      ];
    }

    private layersSelected() {}
  },
});
