import { ISourceOption } from "../interfaces/ISourceOptions";
import * as angular from "angular";

angular.module("app").service(
  "layerSelectionService",
  class LayerSelectionService {
    constructor() {}

    public getAllLeyers(): Array<ISourceOption> {
      // get from server source and layers
      // get from config : canSelectAll , maxSelectedLayers
      return [];
    }
  }
);
