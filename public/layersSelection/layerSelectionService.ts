import { ISourceOption } from "./ISourceOptions";
import * as angular from "angular";

angular.module("app").service(
  "layerSelectionService",
  class LayerSelectionService {
    constructor() {}

    public getAllLeyers(): Array<ISourceOption> {
      // get from server source and layers
      // get from config : canSelectAll , maxSelectedLayers
      return [
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
          canSelectAll: false,
          maxSelectedLayers: 1,
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
          canSelectAll: true,
        },
      ];
    }
  }
);
