import * as angular from "angular";

angular.module("app").component("sourceLayers", {
  templateUrl: "./source.html",
  bindings: {},
  controller: class SourceLayersCtrl {
    constructor() {}
    $onInit() {}

    public toggleAll() {}

    private toggle(layer) {}
  },
});
