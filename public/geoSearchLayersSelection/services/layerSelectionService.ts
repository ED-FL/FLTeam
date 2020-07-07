import { ISourceOption } from "../interfaces/ISourceOptions";
import { ISelection } from "../interfaces/ISourceSelections";
import * as angular from "angular";

angular.module("app").service(
  "layerSelectionService",
  class LayerSelectionService {
    constructor() {}

    public getAllSources(): ISourceOption {
      // get from server source and layers
      // get from config : canSelectAll , maxSelectedLayers
      let allSources = {
        "1": {
          sourceName: "אלסטיק",
          canSelectAll: true,
          maxSelectedLayers: null,
          layers: {
            "11": {
              displayName: "שכבה 1 באלסטיק",
            },
            "12": {
              displayName: "שכבה 2 באלסטיק",
            },
          },
        },
        "2": {
          sourceName: "הענק הירוק",
          canSelectAll: false,
          maxSelectedLayers: 2,
          layers: {
            "21": {
              displayName: "שכבה 1 בענק",
            },
            "22": {
              displayName: "שכבה 2 בענק",
            },
            "23": {
              displayName: "שכבה 3 בענק",
            },
          },
        },
      };

      return allSources;
    }

    public geoSeachLayesrSelected(selection: Dictionery<ISelection>) {}
  }
);
