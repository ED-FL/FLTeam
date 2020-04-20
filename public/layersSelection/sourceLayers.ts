angular.module("app").component("sourceLayers", {
  templateUrl: "./sourceLayers.html",
  bindings: {
    sourceName: "<",
    layers: "<",
  },
  controller: class SourceLayersCtrl {
    selected: Array<string>;
    constructor() {}
    toggleAll() {}
    toggle(item, list) {}
    onSelectedElements() {}
  },
});
