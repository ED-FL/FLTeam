import * as angular from "angular";

angular.module("app").component("geoSearchSelection", {
  templateUrl: "./geoSearchSelection.html",
  bindings: {},
  controller: class GeoSearchSelectionCtrl {
    mdDialog;
    constructor($mdDialog) {
      this.mdDialog = $mdDialog;
    }

    $onInit() {}

    public changeGeoSearchLayers(ev) {
      this.mdDialog
        .show({
          template: "<selection-dialog></selection-dialog>",
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          fullscreen: false,
        })
        .then(
          function (data) {
            //on save
          },
          function (error) {
            //on cancle
          }
        );
    }
  },
});
